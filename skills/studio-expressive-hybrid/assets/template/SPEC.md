# A Door Opens — 70/30 comparison preview

User authorized a hybrid test of the same approved film. This is a preview for
review, not a new final-film approval. Original preview remains untouched.

Canvas 1920×1080, 30fps, 900 frames / 30 seconds. Authored 630 frames / 21 seconds
(70%); Wan 270 frames / 9 seconds (30%). Fola mix is a byte-identical copy with
the same 0.35s start, same native speech rate and same gain. Same single knock.

## Shot routing
- 0–4.5: approved hallway art. GSAP controls one blink and 2.2px local breathing.
- 4.5–11.7: approved rear over-shoulder art. GSAP controls 3px local hoodie breathing;
  head, hands, blank phone screen and grip are fixed.
- 11.7–15.8: same approved trimmed Wan reaction take as original preview.
- 15.8–20.133333: registered transparent hand/sleeve layer from the original reference; one GSAP knock and
  withdrawal. Three.js rotates a textured rigid door around its right-side hinge
  by 0.28 radians. Gap stays dark; no invented room view or moving knob.
- 20.133333–25.033333: same approved trimmed Wan seated take as original preview.
- 25.033333–30: approved warm ending art. Local hoodie breathing and separately
  timed eye blinks. Older LEFT / hood up; younger RIGHT / hood down; grounded feet.

The final cut is 11 frames later than the original to make the split exactly
630 authored / 270 Wan frames. All other cuts and narration timing match.

## Visual constraints
No camera move, title, labels, new story action or soundtrack change in the film.
No character redesign, sliding feet, drifting phone, lip-sync, or wardrobe change.
Use approved PNGs as textures. Blink-layer edits affect only small eye regions.
Breathing deforms only bounded hoodie regions by 1.6–3 source pixels. It does not
move a whole still or pan/zoom the camera. Background and contacts are fixed.
Door/hand are deterministic 2D-texture rigs with a real 3D hinge.
All clocks are paused GSAP timelines / hf-seek; no autonomous animation loop.

## QA
Check pixel alignment at neutral poses, closed eyelids, knock contact, withdrawal,
partial door opening and both separate blinks. Inspect Hyperframes snapshots,
decoded export, timeline durations and source provenance. Compare matched-time
original/hybrid playback with identical narration; do not claim listening if only
audio analysis is performed. Document stiffness or registration issues candidly.

## Cost accounting
No new Kie video or TTS job is needed for this test: existing Wan takes and audio
are reused. Four new still-layer edits use the built-in image tool; that tool's
cost and rig-authoring time are not included in Kie savings.
Historical Wan takes reused here were 5s + 6s = 11 generated seconds (176 credits).
Allocated fresh-production equivalent with those durations: 176.85 credits,
including 0.85 for Fola, versus original 480.85 credits. That is about 63% lower.
A planned 4s + 5s generation could supply the 9s final allocation at 144.85 credits
including Fola, about 70% lower, but that shorter-job yield is an estimate.
Finished-screen share and provider-billed generation duration are separate.
