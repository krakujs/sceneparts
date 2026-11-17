---
name: make-video
description: Make an animated 9:16 video (Short, Reel, TikTok, explainer) from SceneParts parts by writing one story.json, then validating, previewing and rendering it to MP4. Use for "make a short/reel/animated video about …", "turn this script into an animation".
---

# Make a video with SceneParts

You write **one JSON file** (`story.json`). Parts draw everything. Never write SVG/TSX for the video itself.

## Setup (once)
- New project: `npx -y @sceneparts/cli init my-video && cd my-video && npm install`.
- Without npm access: `gh repo clone krakujs/sceneparts && cd sceneparts && npm install --include=dev && npm run build`, work in `examples/<name>/`, and run `node packages/cli/src/cli.mjs …` instead of `sceneparts …`.

## Steps
1. **Script.** Line 1 is the hook (6–10 words, the most surprising fact). ~80–100 words for 35–45 s; one beat per line.
2. **Style.** `sceneparts styles`, pick one that fits the subject and audience.
3. **Parts.** For each beat, find parts with the `find-and-use-parts` skill (search → info → add). Note ids and params.
4. **Shots.** One shot per line or beat, 1.5–4 s each, hard cuts. Vary the camera: `cam` keys `[[x, y, zoom], [x, y, zoom]]` (push in for reveals, pull out for scale), `shake` for danger, `night: true` for dread, `grade` warm|night|red|gold, `tint` red 0–1.
5. **story.json:**
   ```json
   { "style": "egypt-tomb", "duration": 21, "loop": true,
     "shots": [
       { "at": 0, "template": "drop-in-opener", "params": { "name": "TRAVELLER", "act": "poke", "other": { "t": "anubis" }, "headline": ["HE POKED", "ANUBIS"] } },
       { "at": 2.6, "cam": [[540, 1000, 1.0], [540, 900, 1.25]], "items": [ { "t": "scale", "tip": [0, 18], "left": "heart-heavy", "right": "feather" }, { "t": "text", "y": 430, "text": "HEAVIER THAN TRUTH?" } ] },
       { "at": 20.6, "loop": "in" } ],
     "captions": [ { "from": 0.3, "to": 2.5, "text": "He poked the god of the dead." } ] }
   ```
   Shot `at` = seconds. Template shots (`"template": "<id>", "params": {…}`) draw a whole scene, e.g. the recurring-character opener.
6. **Validate:** `sceneparts validate story.json` → fix every ERROR (messages say how).
7. **Preview:** `sceneparts preview story.json` → open `preview.png` (contact sheet, seconds to make). Check: characters inside the frame, text readable and not covering faces, each shot visibly different. Fix, preview again.
8. **Voice-over:** the user's audio in `public/voice.mp3` and `"audio": "voice.mp3"`. If they have none, say so; render with captions only.
9. **Render once:** `sceneparts render story.json` → `out/<folder>.mp4`. Uses Remotion (free for individuals and teams up to 3 people; larger companies need a Remotion company licence – mention once if the user is a company). In sandboxes where Chrome can't be downloaded, pass `--browser <path to chrome-headless-shell>`.

## Seamless loop
`"loop": true`, last shot `{ "at": <end − 0.4>, "loop": "in" }`, last caption unfinished so it runs into line 1. The last frame then equals frame 0.

## If you had to draw a new part
Run the `contribute-part` skill afterwards so the next person doesn't pay for it again.
