---
name: studio-expressive-hybrid
description: "Create large-eye expressive cartoon stories with approved reference art, Wan acting shots and a 70 percent authored / 30 percent generated Hyperframes workflow."
---

# Expressive Cartoon — Hybrid

## Watch the bundled reference

[Reference video](assets/reference/preview.mp4) · [Poster](assets/reference/poster.jpg) · [Offline player](assets/reference/index.html). These files travel with this standalone skill. Show the preview link when introducing the style, and inspect the reference to calibrate proportions, staging, pacing and motion before producing new work. Keep the new brief's story and cast; do not treat the sample as a mandatory script. The primary example is the approved 70/30 version. A separate all-Wan variant is included for comparison.


Use for compact, expressive cartoon stories where selected generated acting adds value. Read [production.md](references/production.md), [style-bible.md](references/style-bible.md) and [workflow-variants.md](references/workflow-variants.md).

Preserve the reference's oversized ivory heads, large white eyes/black pupils, strong brows, clean bold outlines and compact clothing silhouettes. Lock cast, screen positions, room layout and eyelines in approved reference images before animating. Conventional realistic body proportions were rejected in the example.

Default to the approved 70/30 allocation by **finished runtime**: 70% authored motion, 30% Wan 3.0. Put exact prop/door motion, holds and reusable facial actions in GSAP/JavaScript/Three.js; reserve generated footage for acting that benefits from it. Do not force a percentage by stretching unsuitable footage. Explain any meaningful change in allocation.

The collection also preserves the all-Wan version as a separate documented variant of the same visual style. Use that route when specifically requested or when the shot plan justifies it; it is not a sixth drawing style. See the variant reference for the actual source-duration versus finished-duration cost distinction.

Copy `assets/template/` to a new work directory for a portable approved hybrid example. It contains six Hyperframes compositions, approved art/layers, two trimmed Wan shots and the original Fola mix. The copied example intentionally still tells the brothers story; replace script/art/timing for a new topic. New stories default to music-led unless the user requests narration. Do not treat the included Fola audio as a universal soundtrack.

Generated prompts specify a single permitted action, initial/final pose, stationary objects and excluded extra motion. Reject unrequested turns, talking mouths, changing grips, sliding feet or character redesign. Trim only when the retained action still tells the intended story. Review fixed phone contacts, grounded sitting and the real door hinge throughout movement.

To make an independent working copy: `python3 scripts/new_project.py /absolute/path/to/new-project` from this skill folder. Then run the copied project with the pinned commands in its package.json.
