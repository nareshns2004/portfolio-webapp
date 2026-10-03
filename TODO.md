# TODO

Backlog from CLAUDE.md, ordered by impact.

- [x] 1. **Stop the bleeding.** Dead links, proficiency %, roadmap progress bar removed.
- [x] 2. **Hero + proof strip.** Problem-first hero (3 options in an HTML comment), tags re-ordered, proof strip (goodput, nicprof, kvwire, HF models). Upstream slot is a `TODO(naresh)`; see below.
- [x] 3. **"Two problems I work on."** Reliability (goodput) and Efficiency (kvwire), honest status, linked.
- [x] 4. **"Upstream & evidence."** nicprof, kptk, LinuxMemoryManager PR #10. vLLM / cudagraph / libbpf entries wait on links.
- [x] 5. **"Foundations."** Skill area → artifact, with stage (runnable / design / early / write-up). Roadmap + Skills removed.
- [x] 6. **Profiles.** Proof of work: GitHub, Hugging Face, LeetCode. Social: LinkedIn, Substack, X. Docker Hub + Google Developers removed.
- [ ] 7. **First case study page** (`work/training-orchestrator.html`), once goodput has something runnable (M2+).
- [x] 8. **Writing index.** `assets/js/data.js`; 5 interactive posts + 4 Substack posts.
- [x] 9. **Share preview.** `og-image.png` (1200×630), `summary_large_image`.
- [ ] 10. **Visual refresh.** Design plan first; wait for approval. (Hero ring animation is in; palette/typefaces unchanged apart from contrast fixes.)
- [ ] 11. **Second case study** (`work/disaggregated-inference.html`) when kvwire has results.

## New ideas

- [ ] Post: "The packet path: kernel stack vs XDP vs DPDK vs RDMA" (interactive, foundations story). Link the DPDK Substack essay.
- [ ] Post: rail-optimized vs fat-tree topology explorer (where NCCL traffic actually goes).
- [ ] When goodput / kvwire publish a first measured result, add it to the proof strip with a link to the run directory.

## Open questions for Naresh

- **vLLM PR #50618**: on GitHub it's by JohnQinAMD and unmerged. Did you contribute under another account, or is it a different PR number? Send the link and it becomes the first proof item.
- Links for the **cudagraph padding issue** and the **libbpf BTF fix**, if they exist.
- Hero line: pick A, B or C (HTML comment at the top of the hero in `index.html`). A is live.
- **Hugging Face model cards** are empty (license only). Even a short card (task, data, eval) makes the proof strip much stronger.
- The 5 removed posts (XDP 14 Mpps, DPDK PMD, RDMA, RoCE/PFC, SR-IOV): publish any real drafts on Substack and add them to `data.js`.

Next session starts with: answer the open questions above (links), then item 10's design plan.
