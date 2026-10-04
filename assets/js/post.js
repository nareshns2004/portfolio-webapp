/* Small helpers shared by the interactive posts. No dependencies. */
window.P = (function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const SVGNS = 'http://www.w3.org/2000/svg';

  // Paint values containing var() go through style: presentation attributes don't take var() in every browser.
  const PAINT = new Set(['fill', 'stroke']);
  function svg(tag, attrs = {}, parent) {
    const el = document.createElementNS(SVGNS, tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (PAINT.has(k) && String(v).includes('var(')) el.style.setProperty(k, v);
      else el.setAttribute(k, v);
    }
    if (parent) parent.appendChild(el);
    return el;
  }

  // Bind a range/select input to its <output> and a change callback.
  function bind(id, fmt, onChange) {
    const input = document.getElementById(id);
    const out = document.querySelector(`output[for="${id}"]`);
    const update = () => {
      if (out) out.textContent = fmt ? fmt(+input.value, input) : input.value;
      onChange && onChange();
    };
    input.addEventListener('input', update);
    if (out && fmt) out.textContent = fmt(+input.value, input);
    return input;
  }

  function bytes(n) {
    const u = ['B', 'KiB', 'MiB', 'GiB', 'TiB'];
    let i = 0;
    while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
    return `${n >= 100 ? n.toFixed(0) : n >= 10 ? n.toFixed(1) : n.toFixed(2)} ${u[i]}`;
  }

  function seconds(s) {
    if (!isFinite(s)) return '∞';
    if (s < 1e-3) return `${(s * 1e6).toFixed(0)} µs`;
    if (s < 1) return `${(s * 1e3).toFixed(s < 0.01 ? 2 : 1)} ms`;
    if (s < 120) return `${s.toFixed(1)} s`;
    if (s < 7200) return `${(s / 60).toFixed(1)} min`;
    if (s < 172800) return `${(s / 3600).toFixed(1)} h`;
    return `${(s / 86400).toFixed(1)} days`;
  }

  const num = (n, d = 0) => n.toLocaleString('en', { maximumFractionDigits: d, minimumFractionDigits: d });
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return { $, $$, svg, bind, bytes, seconds, num, reduced };
})();
