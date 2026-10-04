/* Hero figure: ring all-reduce loses a link, the stall spreads, every rank times out, the job restores
   onto a spare, and a goodput timeline records what it cost. Static single frame under reduced motion;
   paused when off-screen or when the tab is hidden. */
(function () {
  const svg = document.getElementById('hero-fig');
  if (!svg) return;
  const NS = 'http://www.w3.org/2000/svg';
  const N = 8, CX = 220, CY = 165, R = 122;
  const PAINT = new Set(['fill', 'stroke']);
  const pos = i => { const a = -Math.PI / 2 + 2 * Math.PI * i / N; return [CX + R * Math.cos(a), CY + R * Math.sin(a)]; };

  // Paint values go through style so var() works everywhere (presentation attributes don't take var() in all browsers).
  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) {
      if (PAINT.has(k) && String(attrs[k]).includes('var(')) e.style.setProperty(k, attrs[k]);
      else e.setAttribute(k, attrs[k]);
    }
    if (parent) parent.appendChild(e);
    return e;
  }

  function draw(s) {
    svg.textContent = '';
    const defs = el('defs', {}, svg);
    const pat = el('pattern', { id: 'hero-hatch', width: 6, height: 6, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, defs);
    el('line', { x1: 0, y1: 0, x2: 0, y2: 6, stroke: 'var(--graphite)', 'stroke-width': 2 }, pat);
    const hatch = 'url(#hero-hatch)';

    for (let i = 0; i < N; i++) {
      const [x1, y1] = pos(i), [x2, y2] = pos((i + 1) % N);
      const down = s.linkDown && i === 2;
      el('line', { x1, y1, x2, y2, stroke: down ? 'var(--fault)' : 'var(--ink)', 'stroke-width': down ? 2 : 1.2, 'stroke-dasharray': down ? '4 4' : 'none' }, svg);
      if (down) {
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
        el('path', { d: `M${mx - 7},${my - 7} L${mx + 7},${my + 7} M${mx + 7},${my - 7} L${mx - 7},${my + 7}`, stroke: 'var(--fault)', 'stroke-width': 2.5 }, svg);
      }
      if (s.flowing) {
        const t = s.t % 1;
        el('circle', { cx: x1 + (x2 - x1) * t, cy: y1 + (y2 - y1) * t, r: 3.5, fill: 'var(--signal)' }, svg);
      }
    }
    for (let i = 0; i < N; i++) {
      const [x, y] = pos(i);
      const spare = s.spare && i === 3;
      el('rect', { x: x - 27, y: y - 15, width: 54, height: 30, rx: 2, fill: 'var(--paper)', stroke: s.timeout ? 'var(--fault)' : 'var(--ink)', 'stroke-width': 1.3, 'stroke-dasharray': spare ? '3 2' : 'none' }, svg);
      if (s.stalled.has(i)) el('rect', { x: x - 27, y: y - 15, width: 54, height: 30, rx: 2, fill: hatch, opacity: 0.5 }, svg);
      el('text', { x, y: y + 4, 'text-anchor': 'middle', 'font-size': 11, 'font-weight': 600, fill: 'var(--ink)' }, svg).textContent = spare ? 'GPU3′' : 'GPU' + i;
    }
    el('text', { x: CX, y: CY - 4, 'text-anchor': 'middle', 'font-size': 11, fill: 'var(--graphite)' }, svg).textContent = 'ring all-reduce';
    el('text', { x: CX, y: CY + 14, 'text-anchor': 'middle', 'font-size': 11.5, 'font-weight': 600, fill: s.labelColor || 'var(--graphite)' }, svg).textContent = s.label || '';

    // Goodput timeline
    const BX = 20, BW = 400, BY = 338;
    el('text', { x: BX, y: BY - 8, 'font-size': 10.5, fill: 'var(--graphite)', 'letter-spacing': '0.06em' }, svg).textContent = 'GOODPUT TIMELINE';
    el('rect', { x: BX, y: BY, width: BW, height: 14, fill: 'none', stroke: 'var(--rule-strong)' }, svg);
    const total = s.bar.reduce((a, [, l]) => a + l, 0) || 1;
    const scale = Math.min(1, BW / (total * 34));
    let x = BX;
    for (const [kind, len] of s.bar) {
      const w = Math.max(0, len * 34 * scale);
      el('rect', { x, y: BY, width: w, height: 14, fill: kind === 'ok' ? 'var(--signal)' : kind === 'stall' ? hatch : 'var(--fault)' }, svg);
      x += w;
    }
    const lost = s.bar.some(([k]) => k !== 'ok');
    el('text', { x: BX, y: BY + 32, 'font-size': 10.5, fill: 'var(--graphite)' }, svg).textContent =
      lost ? 'blue = training · hatched = stalled · red = restart' : 'blue = productive training time';
  }

  // Reduced motion: one frame that tells the whole story (spare in place, all three bar segments).
  const STATIC = { flowing: true, t: 0.5, spare: true, stalled: new Set(),
    bar: [['ok', 5], ['stall', 2.4], ['restart', 1.4], ['ok', 2.4]], label: 'restored on spare' };

  const SCRIPT = [['flow', 3.4], ['fail', 0.7], ['spread', 2.2], ['timeout', 1.1], ['restore', 1.6], ['resume', 3.0]];
  const CYCLE = SCRIPT.reduce((a, [, d]) => a + d, 0);
  const startOf = p => { let a = 0; for (const [q, d] of SCRIPT) { if (q === p) return a; a += d; } return a; };
  const dur = p => SCRIPT.find(([q]) => q === p)[1];

  function stateAt(t) {
    let phase = 'flow', pt = 0;
    for (const [p, d] of SCRIPT) { const a = startOf(p); if (t < a + d) { phase = p; pt = (t - a) / d; break; } }
    const s = { stalled: new Set(), bar: [['ok', Math.min(t, startOf('spread'))]], t: t * 1.4 };
    if (phase === 'flow') { s.flowing = true; s.label = 'all ranks progressing'; }
    if (phase === 'fail') { s.linkDown = true; s.label = 'link 2→3 fails'; s.labelColor = 'var(--fault)'; }
    if (phase === 'spread' || phase === 'timeout') {
      s.linkDown = true;
      const k = phase === 'spread' ? Math.floor(pt * N) + 1 : N;
      for (let j = 0; j < k; j++) s.stalled.add((3 + j) % N);
      s.bar.push(['stall', t - startOf('spread')]);
      s.timeout = phase === 'timeout';
      s.label = phase === 'spread' ? 'stall spreads hop by hop' : 'all 8 ranks time out';
      if (s.timeout) s.labelColor = 'var(--fault)';
    }
    if (phase === 'restore' || phase === 'resume') {
      s.spare = true;
      s.bar.push(['stall', dur('spread') + dur('timeout')]);
      s.bar.push(['restart', phase === 'restore' ? t - startOf('restore') : dur('restore')]);
      if (phase === 'restore') { s.label = 'restoring on spare'; s.stalled = new Set([...Array(N).keys()]); }
      else { s.flowing = true; s.bar.push(['ok', t - startOf('resume')]); s.label = 'training resumed'; }
    }
    return s;
  }

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  let raf = null, onScreen = true, t0 = performance.now(), elapsed = 0;
  function frame(now) {
    const t = ((elapsed + (now - t0)) / 1000) % CYCLE;
    draw(stateAt(t));
    raf = requestAnimationFrame(frame);
  }
  function start() {
    if (raf || reduce.matches || document.hidden || !onScreen) return;
    t0 = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    if (!raf) return;
    cancelAnimationFrame(raf); raf = null;
    elapsed += performance.now() - t0;
  }
  function apply() { if (reduce.matches) { stop(); draw(STATIC); } else start(); }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; onScreen ? start() : stop(); }).observe(svg);
  }
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  reduce.addEventListener('change', apply);
  draw(reduce.matches ? STATIC : stateAt(0));
  apply();
})();
