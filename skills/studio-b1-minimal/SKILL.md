---
name: studio-b1-minimal
description: "Create clean B1 stickman explainers with paper-like backgrounds, clear rear over-shoulder staging, object inserts and optional Fola narration."
---

# B1 Minimal Stickman

## Watch the bundled reference

[Reference video](assets/reference/preview.mp4) · [Poster](assets/reference/poster.jpg) · [Offline player](assets/reference/index.html). These files travel with this standalone skill. Show the preview link when introducing the style, and inspect the reference to calibrate proportions, staging, pacing and motion before producing new work. Keep the new brief's story and cast; do not treat the sample as a mandatory script. Approved revised example; the portable drawing module is supplied separately.


Use for clean, lightly hand-drawn explainers about habits, learning and everyday decisions. Read [production.md](references/production.md), then [style-bible.md](references/style-bible.md). The 30-second procrastination film is an example, not a required script.

Keep the slim round-headed figure, cream/white paper ground, dark single-pass contours and very sparse warm accents. Put the character on a physically coherent working axis with the relevant object. For desk scenes, use a genuine rear over-shoulder master and inserts derived from the same set. Preserve object locations across cuts; the laptop must be ahead of the seated actor.

Make editing follow the thought: establish hesitation, isolate the distraction, show a small actionable change, then hold modest progress. Clean silhouettes, hand contacts and foreground occlusion take priority over line texture. Do not revive stray curves, gratuitous arrows or decorative motion trails.

Use JavaScript/Canvas or SVG rigs with GSAP inside Hyperframes. `assets/b1-drawing.js` preserves the approved example's shared set, poses and camera crops as a browser-ready drawing reference; `shot-ledger.json`, `captions.json` and the board images preserve the edit. It is not a complete Hyperframes composition. Integrate `drawB1(ctx, shotIndex, globalTime)` on a timed canvas inside one scene per composition; give the module a licensed `StoryHand` font. The drawing area is 1280×610; the original 1280×720 delivery reserves the lower area for captions. For new resolutions, scale the stage and caption area together.

Fola narration is useful when explaining a method. Measure the actual recording before timing cuts or captions; do not invent word timestamps. For a requested music-only version, rewrite the board around visible action rather than retaining narration-dependent holds.

Review rear-view geometry, wrist attachment, grip/contact/release, prop occlusion and readable screen inserts. A timer must progress by actual elapsed story time. The original example's build used the legacy B1 runtime; future final assembly/export uses Hyperframes, not that old pipeline.
