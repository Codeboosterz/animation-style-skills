# Animation Style Skills

Five reusable editing styles developed and reviewed on 9 November 2026. The latest capsule-character rig refinement is saved as an approved reference. This is a private collection of skills, style bibles, editable examples and review lessons.

| Skill | Look and editorial language | Workflow | Best fit |
|---|---|---|---|
| [B1 Minimal Stickman](skills/studio-b1-minimal/SKILL.md) | Clean paper ground, slim figures, rear over-shoulder staging and precise object inserts | Authored Canvas/JS + GSAP, optional Fola; future assembly in Hyperframes | Habits, learning, productivity explainers |
| [A5 Historical Cartoon](skills/studio-a5-history/SKILL.md) | Adult stick-cartoon anatomy, period wardrobe and painterly environments | Story research + approved images; current Wan/authored routing; Hyperframes and optional Fola | History and documentary explainers |
| [Expressive Cartoon — Hybrid](skills/studio-expressive-hybrid/SKILL.md) | Large eyes, bold brows, compact hoodies, emotional close-ups and warm endings | 70% authored / 30% Wan by finished runtime; all-Wan variant documented separately | Expressive acting with controlled props |
| [Illustrated Cartoon — Authored](skills/studio-illustrated-authored/SKILL.md) | Same rich illustrated look, using registered facial and hand layers | 100% local layered animation + GSAP/Three.js + Hyperframes + Suno | Quiet stories that reuse artwork |
| [Capsule Cinema — Articulated](skills/studio-capsule-cinema/SKILL.md) | Cream capsule figures, sparse dark sets, deliberate physical actions | Native JS rigs + GSAP + Three.js drawing plane + Hyperframes + Suno/Foley | Repeatable character acting and exact contacts |

The all-Wan and 70/30 tests share one drawing style, so they are two recorded variants of the expressive-cartoon skill. The fully authored illustrated and capsule workflows are separate: one animates layered images, the other draws and articulates body parts directly. No map animation was completed; Gemini Omni remains a documented specialized tool rather than an invented sixth style.

## Preview before importing

**[Open the visual catalogue →](GALLERY.md)** — posters and reference videos for all five styles.

After cloning or downloading the repository ZIP, open **gallery.html** in any modern browser to play the videos offline. Each skill also bundles its own MP4, poster, provenance and offline player under `assets/reference/`. Installing or sharing one skill folder therefore includes the reference video, without needing the rest of the repository or this computer.

On GitHub, select a poster or **Watch / download MP4**. If GitHub does not show an inline player, use its raw/download control; the local gallery always points directly to the bundled file. Because this repository is private, recipients need repository access or a copy of the downloaded files. Sharing the skill does not change applicable media/provider terms; see [notices](THIRD-PARTY.md).

## Watch the actual examples

- [B1 revised procrastination, 30s](examples/studio-b1-minimal/preview.mp4)
- [A5 Suriname, 60s — legacy generation](examples/studio-a5-history/preview.mp4)
- [Expressive cartoon, all-Wan, 30s](examples/studio-expressive-hybrid/wan-only-preview.mp4)
- [Expressive cartoon, 70/30, 30s](examples/studio-expressive-hybrid/preview.mp4)
- [Illustrated fully authored, 30s](examples/studio-illustrated-authored/preview.mp4)
- [Capsule cinema, approved rig v2, 30s](examples/studio-capsule-cinema/preview.mp4)
- [Ledger Mini/Omni test — both failed strict compliance](examples/experiments/ledger-mini-vs-omni.mp4)

The latest approval is recorded in [approval.json](examples/studio-capsule-cinema/approval.json). Example manifests contain SHA-256 hashes and the original project-relative source location. Videos are reference deliverables, not arbitrary templates for a new script.

## Use in Codex

These are standard standalone skill directories. With this repository cloned, copy the five `skills/studio-*` folders into `~/.codex/skills/`, or use the installed skill-installer's GitHub helper:

```sh
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo Codeboosterz/animation-style-skills --method git \
  --path skills/studio-b1-minimal skills/studio-a5-history skills/studio-expressive-hybrid skills/studio-illustrated-authored skills/studio-capsule-cinema
```

Authenticate Git for this private repository first. The helper intentionally refuses to overwrite an already-installed skill. Newly installed skills are available on the next turn.

Example requests:

- `Use $studio-b1-minimal for a 45-second narrated story about starting homework. Show the storyboard first.`
- `Use $studio-a5-history for a source-checked short about the printing press.`
- `Use $studio-expressive-hybrid for a 70/30 emotional cartoon about two friends.`
- `Use $studio-illustrated-authored for a music-led story using layered artwork.`
- `Use $studio-capsule-cinema for our next story. Keep the approved rig quality and preview new actions first.`

## Editable starting projects

The hybrid, illustrated-authored and capsule skills each include `assets/template/` with local assets and pinned Hyperframes 0.9.26 commands. Make a copy before adapting:

```sh
python3 skills/studio-capsule-cinema/scripts/new_project.py /absolute/path/to/new-film
cd /absolute/path/to/new-film
npm run check
npx --yes hyperframes@0.9.26 preview --background
```

B1 includes a portable drawing module and layout references, not a full migrated Hyperframes master. A5 includes direction and image boards, not a newly tested Wan-based A5 project. Its old generated film is preserved as evidence of the look, not proof that another model will reproduce it automatically.

## Production rules and records

- Hyperframes owns new-film edits, audio and final export. GSAP/JavaScript handle animation; Three.js is used where it helps. Wan is optional according to the selected style.
- Seedance Mini is retired. Old clips are historical records; no executable Mini submission workflow is included.
- Suno supplies music. Fola / Gemini 3.8 Flash TTS supplies optional speech, not general sound effects.
- [Style and workflow analysis](docs/style-analysis.md)
- [Experiment history](docs/experiment-history.md)
- [Cost interpretation](docs/costs.md)
- [Third-party notices](THIRD-PARTY.md)

No API keys, account receipts, desktop screenshots or downloaded reference films are included. Credential loading belongs outside browser-served templates. The `.env.example` contains only an empty placeholder.
