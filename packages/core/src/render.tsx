import React from "react";
import { camAt, camTransform } from "./camera.js";
import { anim, clamp } from "./math.js";
import { Atmos } from "./Atmos.js";
import { Paper } from "./Paper.js";
import { getPart, getStyle } from "./registry.js";
import type { ItemSpec, PartProps, Registry, ShotSpec, StorySpec, Style } from "./types.js";

/* eslint-disable @typescript-eslint/no-explicit-any */

const RESERVED = new Set(["t", "at", "until", "layer"]);

type Ctx = { reg: Registry; style: Style; styleId: string; f: number; d: number; t: number };

/** Draw one item: find its part, apply manifest defaults, ease number params given as [from, to], render. */
export const Item: React.FC<{ it: ItemSpec; ctx: Ctx }> = ({ it, ctx }) => {
  const entry = getPart(ctx.reg, it.t, ctx.styleId);
  if (!entry?.component) return null;
  const props: Record<string, any> = {};
  for (const p of entry.manifest.params) if (p.default !== undefined) props[p.name] = p.default;
  const numeric = new Set(entry.manifest.params.filter((p) => p.type === "number").map((p) => p.name));
  for (const [k, v] of Object.entries(it)) {
    if (RESERVED.has(k)) continue;
    props[k] = numeric.has(k) ? anim(v, ctx.t) : v;
  }
  const C = entry.component;
  const all: PartProps = { ...props, f: ctx.f, d: ctx.d, t: ctx.t, style: ctx.style, render: (child, key) => <Item key={key} it={child} ctx={ctx} /> };
  return <C {...all} />;
};

const layerOf = (reg: Registry, styleId: string, it: ItemSpec) => it.layer ?? getPart(reg, it.t, styleId)?.manifest.layer ?? "mid";

/** One shot: parallax layers under an eased camera, optional night / red tint, screen-space items on top. */
export const Shot: React.FC<{ s: ShotSpec; f: number; d: number; reg: Registry; styleId: string; seed?: string }> = ({ s, f, d, reg, styleId, seed = "" }) => {
  const style = getStyle(reg, styleId);
  const t = clamp(f / Math.max(1, d));
  const ctx: Ctx = { reg, style, styleId, f, d, t };
  if (s.template) return <Item it={{ ...(s.params ?? {}), t: s.template }} ctx={ctx} />;
  const keys: number[][] = s.cam ?? [[540, 960, 1], [540, 960, 1.06]];
  const c = camAt(keys, f, d, seed + (s.id ?? ""), { auto: s.auto !== false, shake: s.shake ?? 0 });
  const vis = (it: ItemSpec) => f >= (it.at ?? 0) * d && f <= (it.until ?? 1.01) * d;
  const items = s.items ?? [];
  const pass = (layer: string, prefix = "") => items.map((it, i) => (layerOf(reg, styleId, it) === layer && vis(it) ? <Item key={prefix + i} it={it} ctx={ctx} /> : null));
  const skyY = typeof s.sky === "number" ? s.sky : style.decor?.skyY ?? 70;
  const groundY = typeof s.ground === "number" ? s.ground : style.decor?.groundY ?? 1520;
  return (
    <g>
      {s.bg ? <rect x={0} y={0} width={1080} height={1920} fill={s.bg} /> : null}
      <g transform={camTransform(c, 0.55)}>
        {s.night ? <rect x={-600} y={-600} width={2280} height={3120} fill="#1b2340" opacity={0.6} /> : null}
        {s.sky !== false && style.decor?.sky ? style.decor.sky(skyY) : null}
        {pass("bg")}
      </g>
      <g transform={camTransform(c)}>
        {pass("mid")}
        {s.ground !== false && style.decor?.ground ? style.decor.ground(groundY) : null}
        {(s.over ?? []).map((it, i) => <Item key={`o${i}`} it={it} ctx={ctx} />)}
      </g>
      <g transform={camTransform(c, 1.3)}>{pass("fg")}</g>
      {s.tint ? <rect x={0} y={0} width={1080} height={1920} fill="#c4101c" opacity={anim(s.tint, t, 0)} style={{ mixBlendMode: "multiply" }} /> : null}
      {pass("screen", "s")}
    </g>
  );
};

export type ShotWindow = { index: number; start: number; len: number; shot: ShotSpec };

export const storyFrames = (story: StorySpec, fps = story.fps ?? 30) => {
  const last = story.shots[story.shots.length - 1];
  return Math.max(1, Math.round((story.duration ?? (last?.at ?? 0) + 3) * fps));
};

/** Frame windows of every shot (shot.at is seconds from the start of the story). */
export const shotWindows = (story: StorySpec, fps = story.fps ?? 30): ShotWindow[] => {
  const total = storyFrames(story, fps);
  const starts = story.shots.map((s) => Math.round((s.at ?? 0) * fps));
  return story.shots.map((shot, i) => ({ index: i, start: starts[i], len: (i + 1 < starts.length ? starts[i + 1] : total) - starts[i], shot }));
};

export const shotAt = (story: StorySpec, frame: number, fps = story.fps ?? 30): ShotWindow | undefined => {
  const ws = shotWindows(story, fps);
  let w = ws[0];
  for (const x of ws) if (frame >= x.start) w = x;
  return w;
};

/**
 * The whole picture for one frame, as a single 1080x1920 <svg>. Pure: same story + frame = same SVG,
 * so it renders in Remotion, in a browser, or server-side for previews.
 */
export const StoryFrame: React.FC<{ story: StorySpec; frame: number; reg: Registry; fps?: number; uid?: string }> = ({ story, frame, reg, fps = story.fps ?? 30, uid = "s" }) => {
  const w = shotAt(story, frame, fps);
  if (!w) return null;
  const style = getStyle(reg, story.style);
  const local = frame - w.start;
  const isLoop = w.shot.loop === "in";
  const first = shotWindows(story, fps)[0];
  const node = isLoop
    ? <Shot s={first.shot} f={0} d={first.len} reg={reg} styleId={story.style} seed="shot-0" />
    : <Shot s={w.shot} f={local} d={w.len} reg={reg} styleId={story.style} seed={`shot-${w.index}`} />;
  const boil = story.boil !== false;
  const seed = isLoop ? 1 : 1 + (Math.floor(frame / 3) % 5);
  const cut = w.index > 0 && !isLoop;
  const flash = cut && local < 3 ? (3 - local) / 3 : 0;
  const whip = cut && local < 4 ? (4 - local) * 6 : 0;
  const shotForLook = isLoop ? first.shot : w.shot;
  const night = !!(shotForLook.night || shotForLook.params?.night);
  const atmos = story.atmos === false ? null : typeof story.atmos === "object" ? story.atmos : {};
  const fid = `boil-${uid}`;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={1080} height={1920} viewBox="0 0 1080 1920">
      <defs>
        <filter id={fid} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="turbulence" baseFrequency="0.014" numOctaves={2} seed={seed} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={boil ? 5 : 0} result="d" />
          {whip ? <feGaussianBlur in="d" stdDeviation={`${whip} 0`} /> : null}
        </filter>
        {style.defs}
      </defs>
      {style.paper ? <Paper base={style.paper.base} fibre={style.paper.fibre} stain={style.paper.stain} uid={uid} /> : <rect width={1080} height={1920} fill="#ffffff" />}
      <g filter={`url(#${fid})`}>{node}</g>
      {flash ? <rect width={1080} height={1920} fill="#fff6dc" opacity={flash * 0.6} /> : null}
      {atmos ? <Atmos f={isLoop ? 0 : frame} night={night} rays={shotForLook.rays} grade={shotForLook.grade} dust={atmos.dust ?? 1} uid={uid} /> : null}
    </svg>
  );
};

/** Render one part on its own (catalogue tiles, `sceneparts check`). */
export const partStory = (id: string, example: Record<string, any>, styleId: string, extra: ItemSpec[] = []): StorySpec => ({
  style: styleId,
  duration: 3,
  atmos: false,
  boil: false,
  shots: [{ at: 0, auto: false, cam: [[540, 960, 1], [540, 960, 1]], sky: false, items: [...extra, { ...example, t: id }] }],
});
