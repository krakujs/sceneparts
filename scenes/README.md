# Scene packs

Complete, production-tested scene components from real Shorts channels, shared as-is. Use them when you want a whole
finished beat (a lighthouse keeper in a storm, a 90s kid turning the roof antenna) rather than building it from parts.

| Pack | What it is | Scenes |
| --- | --- | --- |
| `jobs-that-vanished` | Vintage storybook explainers about jobs that no longer exist (lamplighters, knocker-uppers, ice cutters…) plus the generic scene types (hook, setting, worker, stat, versus, timeline, desk, photo) | 60+ |
| `bachpan-ki-yadein` | 90s Indian childhood nostalgia (roof antenna, gully cricket, postcards) and its kit | 3 episodes + kit |

Differences from parts:

- Scenes are **Remotion components** (`React.FC<SceneProps>`, props `{ scene: { visual, … }, ep, dur }`) and need `remotion` plus the pack's own `kit/`, `theme.ts` and `types.ts` (all included). Parts are pure SVG and need nothing.
- Each scene reads its options from `scene.visual`; the comment at the top of each file lists them.
- A few scenes show photos through `staticFile(...)`; those images are not in this repo – supply your own (the catalogue lists them as `needs assets`).
- Scenes are reviewed like parts, but they are not held to the 40 KB part limit.

Find one: `sceneparts scenes "lighthouse storm"`. Use one: copy its pack folder into your Remotion project and render the component inside a `<Composition>` with a `scene` object, for example:

```tsx
import { Keeper23 } from "./jobs-that-vanished/custom/ep023_LighthouseKeeper";
<Composition id="Keeper" component={Keeper23} width={1080} height={1920} fps={30} durationInFrames={150}
  defaultProps={{ dur: 150, ep: { id: "demo", number: 1, job: "", years: "", place: "", scenes: [] }, scene: { id: "s1", type: "custom", narration: "", visual: { mode: "lamp", headline: "THE LAST KEEPER" } } }} />
```

Many reusable pieces from these packs are also available as strict parts: `storybook/*` (figure, icons, street, sky, world sets and props, god silhouette) and `india-90s/*` (kid, parents, CRT TV, antenna, rooftops, gully, postcard…).
