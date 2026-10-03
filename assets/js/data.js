/*
  Writing index. Adding a post is a one-line edit: append an object.
    kind: "interactive" → a page under posts/ on this site
          "substack"    → links out to Substack (don't duplicate content here)
    date: "YYYY-MM-DD"  (sorted newest first; featured posts are pinned first)
*/
window.POSTS = [
  { kind: "interactive", featured: true, date: "2026-10-03", tag: "Reliability", minutes: 8,
    title: "One dead link, 512 idle GPUs: ring all-reduce under failure",
    summary: "Cut a link in a live ring and watch every rank time out the same way. Symptoms are global, the cause is local.",
    url: "posts/ring-allreduce-failure.html" },
  { kind: "interactive", featured: true, date: "2026-10-03", tag: "Efficiency", minutes: 7,
    title: "The KV-cache bill: what disaggregated inference has to move",
    summary: "A calculator for the bytes prefill hands to decode and the wire time it costs, for real model configs and link speeds.",
    url: "posts/kv-cache-transfer.html" },
  { kind: "interactive", date: "2026-10-03", tag: "Fabric", minutes: 7,
    title: "PFC: the lossless network that can freeze itself",
    summary: "Step a toy RoCE fabric into a pause-frame deadlock, then turn on ECN and watch it stay up. Also: why the loudest port is often the victim.",
    url: "posts/pfc-deadlock.html" },
  { kind: "interactive", date: "2026-10-03", tag: "Reliability", minutes: 6,
    title: "How often should a 16K-GPU job checkpoint?",
    summary: "Young/Daly with sliders: cluster size, failure rate, checkpoint cost and restart cost, plotted as goodput.",
    url: "posts/checkpoint-interval.html" },
  { kind: "interactive", date: "2026-10-03", tag: "Reliability", minutes: 6,
    title: "Reading the crime scene: triaging an NCCL timeout",
    summary: "An incident drill. Every rank reports the same timeout; use GPU, NIC and NCCL signals to find the one that caused it.",
    url: "posts/nccl-timeout-triage.html" },

  { kind: "substack", date: "2026-05-07", tag: "Virtualization",
    title: "Virtualization: The Foundation of Modern Cloud Computing",
    summary: "How virtualization abstracts compute, storage and networking so many environments share one physical system.",
    url: "https://nareshns2004.substack.com/p/virtualization-the-foundation-of" },
  { kind: "substack", date: "2026-05-03", tag: "DPDK",
    title: "Intel’s DPDK: The Userspace Data Plane That Rewired High-Performance Networking",
    summary: "Why the Linux network stack hits a wall, and how DPDK’s userspace drivers bypass it.",
    url: "https://nareshns2004.substack.com/p/intels-dpdk-the-userspace-data-plane" },
  { kind: "substack", date: "2026-05-01", tag: "AI Systems",
    title: "LLM Operating System (LLM OS) — LLM Agent",
    summary: "The LLM-as-operating-system model compared with a traditional OS.",
    url: "https://nareshns2004.substack.com/p/llm-operating-system-llm-os-llm-agent" },
  { kind: "substack", date: "2026-04-26", tag: "AI Infra",
    title: "AI-ML Infrastructure Engineering Roadmap",
    summary: "What AI infrastructure engineering is, and the layers it spans.",
    url: "https://nareshns2004.substack.com/p/ai-ml-infrastructure-engineering" },
];
