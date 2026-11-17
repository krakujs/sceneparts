---
name: find-and-use-parts
description: Find ready-made animated parts (characters, props, scenery, backgrounds, effects, text, templates) in the SceneParts library and use them in a story.json, instead of drawing SVG/TSX from scratch. Use whenever a video, animation or illustrated scene needs a character, object or setting.
---

# Find and use SceneParts parts

SceneParts is an open library of animated TSX parts. Using a part costs a search and a few lines of JSON; drawing one costs thousands of tokens. **Always search before drawing.**

## Rules that keep it cheap
1. Search, then read only the manifest (`sceneparts info <id>`). **Never open a part's index.tsx** to use it.
2. One style per video (`sceneparts styles`). Search inside it with `--style`; `core` parts (text, title, burst, bang, tag, sweat, rect, image, drop-in-opener) work in every style.
3. Prefer presets (e.g. `egypt-tomb/anubis`) over configuring a generic figure yourself.
4. Nothing fits after 2–3 different searches? Compose it from existing parts (a crowd = several characters, a god = `figure` with `kind: "god"` + `head` + `crown`). Still nothing → draw it and contribute it with the `contribute-part` skill.

## Commands
`sceneparts` is `npx -y @sceneparts/cli` (or `node packages/cli/src/cli.mjs` in a clone of github.com/krakujs/sceneparts).

```bash
sceneparts styles                                   # what styles exist
sceneparts search "jackal god" --style egypt-tomb   # ~10 one-line results with param names
sceneparts info egypt-tomb/anubis                   # params, defaults, allowed values, example
sceneparts add egypt-tomb/anubis egypt-tomb/scale   # in a project: copies parts (+ what they use) into ./parts, pinned
```

## In story.json
An item is `{ "t": "<id or short name>", ...params }`. Short names resolve inside the story's `style`, then `core`.
- Canvas 1080 × 1920; characters/props stand on `y` (ground 1520 in styles with a ground band), `x` is their centre, `s` scales (1 ≈ a 1000 px tall person).
- Any `number` param can be `[from, to]` and is eased across the shot (move, grow, tip, glow).
- `at` / `until` (0–1) = when in the shot the item is visible. `layer`: bg | mid | fg | screen.
- Unknown params are ignored, and `sceneparts validate` warns about them.
