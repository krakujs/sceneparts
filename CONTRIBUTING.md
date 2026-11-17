# Contributing parts

Thank you! The library grows one part at a time, and every part saves the next person from drawing it again.

## The short version

```bash
gh repo clone krakujs/sceneparts && cd sceneparts && npm install --include=dev && npm run build
node packages/cli/src/cli.mjs search "<what you need>"            # make sure it doesn't exist
node packages/cli/src/cli.mjs new character flat-vector/firefighter
# draw index.tsx, fill in part.json
node packages/cli/src/cli.mjs check flat-vector/firefighter       # every CI rule + a preview PNG
node packages/cli/src/cli.mjs pr flat-vector/firefighter          # fork, signed-off commit, PR
```

With Claude, the `contribute-part` skill does all of this and asks you before opening the PR.

## What makes a good part

- **Reusable:** a generic archetype with params (pose, colour, mood), not a one-off scene.
- **In a style:** uses its style's palette, outline and proportions (`parts/<style>/style`). A new look = a new style; start with `new style <name>/style` and a few parts.
- **Findable:** a one-line summary that says what it is and when to use it; 4–10 lowercase tags people would actually search for.
- **Documented params:** every param has a type, a default, allowed `values` for enums and a short note. The `example` shows the most typical use.

## Rules (enforced by `sceneparts check` and CI)

- Files: `part.json` + `index.tsx` (+ optional `README.md`). Id = folder = `<style>/<name>`, kebab-case.
- Imports: `react`, `@sceneparts/core`, and other parts as `"../<name>/index"` or `"../../<style>/<name>/index"`, each listed in `uses`.
- Pure and deterministic: no `Math.random`, clocks, network, `eval`, `dangerouslySetInnerHTML`, `<script>`, `<foreignObject>`, external URLs, `window` / `document` / `process`.
- At most 40 KB of source and 50 ms to render a frame.
- `license: "MIT"`, `origin: "original"`, `author`: your GitHub handle. Commits signed off (`git commit -s`, Developer Certificate of Origin).

## What we can't accept

Copyrighted or trademarked characters, brands and logos (even "inspired by" look-alikes), real people, and sexual, hateful or gratuitously violent content. Cartoon peril is fine; the library is meant to be safe for all ages. AI-generated parts are welcome when they don't copy an existing work.

## Review

Every PR is reviewed by a human maintainer; nothing is merged automatically. CI posts preview sheets and may add `needs-ip-check` or `possible-duplicate` labels to help the reviewer. We aim to answer within 48 hours. See [GOVERNANCE.md](GOVERNANCE.md).
