# Library expansion runbook (orchestrator)

A scheduled task starts a fresh session every hour. That session is the **orchestrator**: it plans the next batch from `queue.json`, briefs **Haiku sub-agents** to draw the parts, checks and reviews their work, integrates it, and commits it to the `library/expansion` branch / PR. Sub-agents do the drawing; the orchestrator never skips review.

Goal: 3,000+ high-quality, original, reusable parts. Fewer good parts beat more bad ones: a part that looks wrong, is unrecognisable, cut off, or resembles a known franchise character, brand or real person is deleted, not committed.

## 0. Where things are
- Laptop (reach it with the Desktop Commander tools, e.g. `mcp__remote-devices__Desktop_Commander__start_process`): repo `/home/kraken/animagra/sceneparts`, lock + logs in `/home/kraken/animagra/_expansion/`.
- Cloud workspace (your Bash): build area `/home/claude/sp`. GitHub is not reachable from the cloud, so all git/gh happens on the laptop.
- Desktop Commander calls must return within ~80 s: run anything longer with `nohup … > /home/kraken/animagra/_expansion/<name>.log 2>&1 &` and poll the log.
- Move files laptop → cloud with `device_stage_files`, cloud → laptop by writing under `/mnt/user-data/outputs/` and `device_commit_files`. Move whole folders as one `.tgz`.

## 1. Lock and pick the batch
1. Laptop: `mkdir -p ~/animagra/_expansion`. If `~/animagra/_expansion/lock` exists and is younger than 100 minutes, stop: a previous run is still working. Otherwise write the current time into it. Always delete it at the end, also after a failure.
2. Laptop: `cd ~/animagra/sceneparts && git fetch -q && git checkout -q library/expansion && git pull -q --ff-only`.
3. Read `docs/expansion/queue.json`. Take the first entry whose `status` is `partial` (use its `remaining` names) or else `todo`. None left → write "Queue complete" in your final message (the user can then disable the scheduled task) and stop.

## 2. Set up the build area
1. Laptop: `git archive --format=tar.gz -o ~/animagra/_expansion/repo.tgz HEAD`; stage it; in the cloud: `rm -rf /home/claude/sp && mkdir -p /home/claude/sp && tar xzf <staged> -C /home/claude/sp && cd /home/claude/sp && npm install --include=dev --no-audit --no-fund && npm run build`.
2. `node packages/cli/src/cli.mjs` is the CLI (`sceneparts` below). Useful: `styles`, `search "<words>"`, `info <id>`, `new <type> <style>/<name>`, `check <ids…>` (writes preview PNGs to `.sceneparts/check/`).

## 3. Plan and brief
1. Slugs: kebab-case of each name (`"hot air balloon"` → `hot-air-balloon`). Skip a name if `parts/<style>/<slug>` exists or `sceneparts search` shows an equivalent in the same style.
2. **Foundation first** (if the entry's `brief` asks for a new style or generator): brief ONE Haiku sub-agent for the style part and the generator(s). Then review it yourself: Read its preview PNG(s), ask for fixes or fix it yourself until it is clearly good. Everything else in the batch depends on it.
3. Split the remaining names into chunks of ~20. Start up to 6 Haiku sub-agents at a time with the Agent tool: `model: "haiku"`, `subagent_type: "general-purpose"`, one chunk each, using the brief template below. Run them in parallel; start more as chunks finish.

### Sub-agent brief template
> You are drawing parts for SceneParts, an open MIT library of animated SVG parts. Work only inside `/home/claude/sp/parts/<style>/` and only on these parts: <list of slug – name – one-line idea>.
> Read first: `/home/claude/sp/CONTRIBUTING.md`, `/home/claude/sp/parts/<style>/style/index.tsx`, and as examples `<2–3 existing part folders in this style, e.g. the generator and one preset>`. Use `node packages/cli/src/cli.mjs info <generator id>` for generator params.
> Each part = `part.json` + `index.tsx` (default export `function Part(p: PartProps<any>)` returning SVG `<g>`). Canvas 1080×1920; characters, props and scenery stand on `y` (bottom centre, default 1520–1600), face right and honour `flip`; backgrounds fill the canvas; effects/text centre on x, y. Motion only from `p.f` / `p.d`. Imports only `react`, `@sceneparts/core`, `../style/index` and parts listed in `uses` (as `../<name>/index`). No Math.random, dates, network, external URLs, foreignObject. ≤ 40 KB.
> Presets of a generator: `index.tsx` imports the generator and fixes its look (see the example preset); `part.json` copies the generator's params minus the fixed ones.
> part.json: `id`, `type` (<type>), `style`, `name`, `summary` (one line ≤120 chars saying what it is and when to use it), 4–10 lowercase `tags` people would search for, `params` (type, default, values for enums, short note), `example`, `uses`, `author: "krakujs"`, `license: "MIT"`, `origin: "original"`, `version: "1.0.0"`.
> Draw it so it is recognisable at phone size: clear silhouette, the style's palette and outline, sensible proportions (a person ≈ 1000 px tall at s = 1 unless the style says otherwise). Never copy a known character, brand, logo or real person; no text logos; nothing gory or sexual.
> When done, run `cd /home/claude/sp && node packages/cli/src/cli.mjs check <your ids>` and fix every ERROR. Then Read 2 of the preview PNGs it lists and fix anything that looks wrong.
> Reply with JSON only: `{"done": ["<id>", …], "failed": [{"id": "<id>", "why": "…"}]}`.

## 4. Review and integrate (orchestrator)
1. `sceneparts check <all new ids>` – must be all ✓. Delete what still fails.
2. Read preview PNGs: every generator/style, at least 3 random presets per sub-agent, and every part a sub-agent reported as shaky. Delete or fix parts that are wrong, ugly, cut off, overlapping the frame edge, unrecognisable, duplicated, or IP-risky. Spot-check that summaries and tags are accurate.
3. `npx tsc -p parts/tsconfig.json` must pass.
4. Update `docs/expansion/queue.json` for this entry: `status` `done` (or `partial` with `remaining` = names not built), `built` = number of parts added, `date`. Append a row to `docs/expansion/PROGRESS.md`: batch, parts added, running total (`find parts -name part.json | wc -l`), date.

## 5. Commit (laptop)
1. Cloud: `tar czf /mnt/user-data/outputs/batch.tgz <the parts/<style> folders you touched> docs/expansion` (plus any engine/CLI file you changed, which should be rare and called out). `device_commit_files` it to `~/animagra/_expansion/batch.tgz`.
2. Laptop: `cd ~/animagra/sceneparts && tar xzf ../_expansion/batch.tgz && node packages/cli/src/cli.mjs check <new ids> && npx tsc -p parts/tsconfig.json` (background + poll if slow).
3. `git add parts docs/expansion && git commit -q -s -m "Expansion <batch id>: <title> (<n> parts)" && git push -q origin library/expansion`.
4. Make sure the PR exists: `gh pr view library/expansion --json url` or create it: base `main`, title `Library expansion (overnight batches)`, body = this runbook's goal + "one commit per batch; review commit by commit". Comment on the PR: batch id, parts added, running total, anything deleted and why.
5. Delete the lock. Final message: batch, parts added, running total, PR link, anything that needs the user.

## Rules that never change
- Human review only: never merge, never push to `main`, never enable auto-merge.
- Never commit secrets, personal data, or anything from the private channels (Danny / "YOU" character, scripts, voices).
- Commits are signed off (`-s`) and use the repo's configured noreply email.
