---
name: studio-capsule-cinema
description: "Create music-led minimalist films with cream capsule characters, sparse dark sets and articulated JavaScript rigs with precise hand, foot and prop contacts."
---

# Capsule Cinema — Articulated

Use for authored minimalist character stories with deliberate physical acting. Read [production.md](references/production.md), [style-bible.md](references/style-bible.md), and the template's [rig review standard](assets/template/rig-revisions/RIG-STANDARD.md) before adding actions.

Visual authority: the user-approved **rig-refined version 2**, not the earlier awkward drawer-rest pose. Cream bald capsule characters, tiny dark eyes, expressive brows, thin muted outlines and spare near-black sets. This is a distinct look from large-eyed hoodie thumbnails. Do not transfer the old brothers anatomy into it.

Copy `assets/template/` to a new directory. It contains the approved six-scene Hyperframes source, native Canvas drawing on a Three.js orthographic plane, deterministic GSAP animation, audio and the corrected drawer-pose module. No generated-video call is needed to reproduce it. Three.js is a presentation layer here, not a 3D character model.

Start from actable key poses: neutral, anticipation, contact, extreme, release and rest. Use attached prop anchors and planted feet. When a contact solver yields an awkward silhouette, author the return pose/arc explicitly instead of accepting valid joint coordinates as good anatomy. Preserve approved push-up and seated poses as benchmarks.

The drawer correction separates the approved contact IK pose from an authored return: shoulder leads, forearm follows, wrist stays clear of the cabinet and the hand rests beside the thigh. Preserve the mitten shape. Do not add wrist patches that create contour seams. The example deliberately changes projected 2D lengths between reaching and frontal rest views; do not generalize that into uncontrolled limb stretch.

For grounded push-ups, palms/toes are fixed and torso/leg axes preserve their lengths. For sitting, hips contact the ledge and legs hang below it. Use head angle, gaze and brows before adding large gestures. Do not substitute continuous bobbing for acting.

Use music and timed Foley without narration by default. New stories do not automatically require a shadow character: the magenta habit figure is a narrative device in the example. A hopeful dawn palette and a held ending are choices, not mandatory endings for every subject.

Run `node rig-revisions/check-drawer.mjs` inside the copied template when editing that mechanism. Inspect consecutive action phases and the encoded clip; these checks do not prove subjective acting quality. Compare untouched shots after changes to shared rig code. The previous five unaffected sample frames were pixel-identical after the drawer refinement.

To make an independent working copy: `python3 scripts/new_project.py /absolute/path/to/new-project` from this skill folder. Then run the copied project with the pinned commands in its package.json.
