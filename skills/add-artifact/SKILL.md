---
name: add-artifact
description: Add a real museum photo (CC0 / public domain only) to a SceneParts story, with the credit line. Use when a Short should show "the real statue/amulet/papyrus" or the user asks for a real artifact.
---

# Add a real museum artifact

Only CC0 / public-domain images are allowed (safe for monetised channels). `sceneparts` refuses anything else.

1. Search: `sceneparts artifact --query "Anubis jackal" --source met --list` (sources: `met` = The Met Open Access, `aic` = Art Institute of Chicago, `all`). Use simple object words: deity name + object type ("Sekhmet statue", "heart scarab", "Book of the Dead papyrus").
2. Pick the best match by title and fetch it: `sceneparts artifact --id met:<id> --label "Statue of Anubis · Egypt · 664–332 BC"`. Keep the label under ~45 characters: name · place · date.
3. The command saves `public/artifacts/artifactNN.jpg`, writes `public/artifacts.json` with the credit, and prints a ready `"artifact": {…}` snippet. Paste it into `story.json` and set `at` (seconds) to the line that mentions the object. It stays on screen until the next cut unless you set `until`.
4. Put the `credit` text in the video description. Run `sceneparts validate` again.

If nothing CC0 exists for the subject, say so and skip it. Never use British Museum or other non-commercial images.
