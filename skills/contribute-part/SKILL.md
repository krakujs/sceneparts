---
name: contribute-part
description: Add a new part (character, prop, scenery, background, effect, text, template or style) to the SceneParts library by pull request, after a search found nothing suitable. Use when you drew something reusable for a video, or the user asks to contribute or register a character/part.
---

# Contribute a part to SceneParts

Every part drawn once should be reusable by everyone. Contributions are reviewed by a human maintainer before merge; your job is to make that review easy.

## Before you start
- **Ask the user first.** The PR is opened from *their* GitHub account and released under MIT. Say so in one sentence and wait for a yes.
- **Search 2–3 ways** (`sceneparts search "<synonyms>" --type <type>`). If something close exists, use or extend it instead.
- **Never contribute** copyrighted or trademarked characters, brands or logos (no Mickey, Pikachu, Nike swoosh…), real people, or anything sexual, hateful or violent beyond cartoon peril. Generic archetypes ("a cartoon plumber", "a jackal-headed god") are fine.

## Steps
1. `gh repo clone krakujs/sceneparts && cd sceneparts && npm install --include=dev && npm run build` (skip if you have a clone).
2. Scaffold: `node packages/cli/src/cli.mjs new <type> <style>/<name>` (kebab-case). New style? `new style <style>/style` first (palette, paper, optional bands and title card).
3. Write `index.tsx`:
   - Default export `function Part(p: PartProps<any>)` returning SVG. Draw around the anchor: `x, y` = bottom centre for characters, props and scenery (facing right; honour `flip`), centre for effects and text, whole canvas for backgrounds and templates.
   - Canvas 1080 × 1920; a person ≈ 1000 px tall at `s = 1`. Thick outline and the style's palette (`import { INK, … } from "../style/index"`).
   - Motion only from `p.f` (frame) and `p.d` (shot length). Number params given as `[from, to]` arrive already eased.
   - Imports: `react`, `@sceneparts/core`, and other parts as `"../<name>/index"` (same style) or `"../../<style>/<name>/index"`, each listed in `uses`.
   - Not allowed: `Math.random`, dates/clocks, network, `eval`, `dangerouslySetInnerHTML`, `<script>`, `<foreignObject>`, external URLs, `window`/`document`/`process`. Max 40 KB, 50 ms per frame.
4. Write `part.json`: a one-line `summary` (≤120 chars, says what it is and when to use it), 4–10 lowercase `tags` people would search for, every param with `type`, `default`, `values` for enums and a short `note`, a typical `example`, `author` = the user's GitHub handle.
5. `node packages/cli/src/cli.mjs check <style>/<name>` → fix every ERROR, then **look at the preview PNG it writes** and fix anything that looks wrong (proportions, outline, cut-off parts, enum variants).
6. With the user's OK: `node packages/cli/src/cli.mjs pr <style>/<name>` (forks, branches, signs off the commit, opens the PR with the checklist). Give the user the PR link and tell them a maintainer will review it.

CI repeats every check, renders the preview for the reviewer, and flags possible duplicates or famous names. Nothing merges without a human approval.
