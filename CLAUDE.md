# portfolio-webapp — instructions for Claude Code

Put this file at the repo root as `CLAUDE.md`. Read it fully at the start of every session.

## How we work (read first)

I work on this site in short weekend sessions of **20–30 minutes**. So:

- At the start of a session, read `TODO.md` and propose doing **only the top unchecked item**. If it won't fit in ~25 minutes, split it and do the first half.
- Every session ends with the site in a deployable state and one commit with a clear message. No half-finished refactors left on main.
- At the end of a session, check off what was done in `TODO.md` and write one line under "Next session starts with:".
- When you need my input, ask one specific question. Don't block on it: leave a `TODO(naresh):` marker and move on.
- Create `TODO.md` in session 1 from the backlog below if it doesn't exist.

## Current state (as of Oct 2026)

- Single `index.html` (~1,500 lines) with inline CSS and JS, Google Fonts (JetBrains Mono + Syne), dark theme. No build step. **Keep it that way for now.** The content is the bottleneck, not the stack. Splitting CSS/JS into files is fine when it helps; a framework migration is out of scope unless I ask.
- Sections: hero, Roadmap (with a "~40% complete" progress bar), Skills (with proficiency percentages), Infra Deep Dives (generic topic descriptions), Blog (5 posts whose "Read post" links have no `href`), Achievements (unlinked claims), Developer Profiles, Contact.

## What the site is for

I'm a GPU cluster networking and distributed-training infrastructure engineer: ~9 years below the framework layer (kernel networking, RDMA/RoCE, DPDK, SR-IOV, KVM, NCCL, GPU infra). The audience is hiring managers and staff engineers at AI labs and top infra teams. They give the site 10 seconds, then maybe 90, then maybe 10 minutes.

The site's one job is to turn a glance into a click on verifiable proof: a repo, a merged PR, a model card, a write-up. It is a funnel into proof-of-work, not a learning journal or a résumé.

The story is two-part, mirroring how AI lab infra orgs are organized:
- **Reliability at scale**: fault-tolerant training orchestrator (fault injection, NCCL timeout signatures, DCGM telemetry, topology-aware checkpoint-restart), plus the Hugging Face incident classifier and root-cause reasoning model.
- **Efficiency at scale**: disaggregated inference engine (prefill/decode pools, RDMA KV-cache transfer, Triton fused attention).

Kernel/eBPF/DPDK/RDMA depth is the *foundation* that makes both stories credible. It is not the headline.

## Hard rules

- Never invent numbers, benchmarks, dates, or claims. Every claim on the page links to evidence (repo, PR, post, model card, image) or gets a `TODO(naresh): link evidence or cut` marker. If I don't supply the link, remove the claim.
- No element without a working destination: no `<a>` without `href`, no "Read post" to nowhere.
- No self-rated proficiency (percentages, bars, "x% complete"). Skills are shown through what they produced.
- Status is honest: "in progress" is fine and should link to the repo or build log.
- Keep or improve: meta description, Open Graph tags, JSON-LD Person schema, accessibility (alt text, focus states, contrast), and `prefers-reduced-motion`.

## Backlog (ordered by impact; one item ≈ one session)

1. **Stop the bleeding.** Fix or remove every dead link (the blog "Read post" anchors: link to the real Substack post if it exists, otherwise remove the card). Remove the proficiency percentages and the roadmap progress bar. Remove the LeetCode profile card and its JSON-LD entry.
2. **Hero + proof strip.** Rewrite the hero so the first line is the problem I solve for GPU clusters (offer me 3 one-line options in a comment; I'll pick). Re-order the tags so GPU cluster networking / distributed training / NCCL / RDMA lead and eBPF/XDP follow. Add a proof strip directly under it with 3–4 linked facts: the merged vLLM PR #50618 (ROCm fault fix), the Docker Hub image (~1K pulls; link the image), years in kernel networking, plus one slot for `TODO(naresh)`.
3. **Replace "Infra Deep Dives" with "Two problems I work on."** Two blocks, Reliability at scale and Efficiency at scale. Each has problem (1 sentence), why it's hard (1 sentence), my approach (2–3 sentences), status, headline result *only if real*, and links (repo, related HF models, related posts). The topic descriptions from the old section can move into an "Areas" line under Foundations if worth keeping.
4. **Replace "Achievements" with "Upstream & evidence."** OSS first (vLLM PR, the cudagraph padding issue, the libbpf fix if I give the link). Each entry gets one line on what broke and what changed, plus a link. Any unlinkable item gets a `TODO(naresh)`.
5. **Replace Roadmap + Skills with "Foundations."** A compact evidence map: each skill area → the artifact that proves it (repo, post, PR). Areas without evidence are listed plainly with no rating, or cut.
6. **Developer Profiles cleanup.** Keep GitHub, Hugging Face, Substack, LinkedIn, Docker Hub (or GHCR if I've moved). Make GitHub and Hugging Face visually primary; the rest go in the footer.
7. **First case study page** (`work/training-orchestrator.html`), only once the repo has something runnable. Fixed template: Problem → Why it's hard → Architecture (SVG or Mermaid) → Key decisions and trade-offs rejected → Results with methodology (hardware, topology, baseline, how measured) → What broke → What's next → Links. Link it from the Reliability block.
8. **Writing index.** Blog cards pull from a small JSON array (title, date, url, tag, summary) so adding a post is a one-line edit. Link out to Substack; don't duplicate content.
9. **Share preview.** A static Open Graph image (1200×630) and `twitter:card` set to `summary_large_image`.
10. **Visual refresh (last).** Only after content is done. Propose a design plan first (4–6 named colors, 1–2 typefaces, wireframes, one memorable hero moment drawn from my world, such as a ring all-reduce losing a link and recovering from a checkpoint, kept lightweight and static under reduced motion). Move away from the generic dark-terminal dev look (JetBrains Mono + near-black). Wait for my approval before implementing; split across several sessions.
11. **Second case study** (`work/disaggregated-inference.html`) when that project has results.

Next session starts with: item 1.
