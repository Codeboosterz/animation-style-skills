---
name: studio-illustrated-authored
description: "Create fully authored illustrated cartoon films from layered approved artwork, facial cels and controlled rigid props without generated video."
---

# Illustrated Cartoon — Fully Authored

Use for rich illustrated characters and sets with restrained, repeatable local animation. Read [production.md](references/production.md) and [style-bible.md](references/style-bible.md). This shares the expressive brothers artwork with the hybrid skill but has a different animation pipeline: no generated footage.

Build layered reference art with registered neutral/closed eyes, mouth states, torso regions, hands and prop plates. Use original artwork to define the look; do not redraw the cast as capsule figures. Keep facial patches aligned to the source texture and erase the underlying contour cleanly so doubled eyes/mouths cannot appear.

Copy `assets/template/` into a new working directory. The six-scene example uses GSAP + JavaScript + Three.js texture-based 2D drawing, and a real rigid door hinge inside Hyperframes. The included instrumental Suno score and Foley support the existing story. For a new film, storyboard music-led visible causes/reactions rather than retaining long holds whose meaning depended on old narration.

Match the tool to the action: local blinks, restrained breath deformation, expression cels, controlled hand and door movement. Do not describe this template as a full skeletal character rig. It has no validated walking, complex turns or large gestural acting. When the new brief needs those actions, build and preview appropriate pose artwork/rigs rather than stretching a face patch or drifting a whole still.

Music is Suno through Kie when a new score is needed; use timed licensed/original Foley. Fola remains optional for requested speech. Reusing assets avoids new generation fees, but artwork preparation, code and review still cost time.

Check neutral alignment, eyes fully closed, expression changes, hand contact, prop pivot and return poses. Seek selected states in reverse order and compare them to forward-seek snapshots. Review the output at delivery size and report stillness or acting limitations candidly.

To make an independent working copy: `python3 scripts/new_project.py /absolute/path/to/new-project` from this skill folder. Then run the copied project with the pinned commands in its package.json.
