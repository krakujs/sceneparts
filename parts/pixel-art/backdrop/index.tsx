import React from "react";
import { random, type PartProps } from "@sceneparts/core";
import { PAL, Pixels, gridOf, outlined, font } from "../style/index";

// Pixel-art backdrop generator + tile kit. Full-frame 1080x1920 game-style backgrounds built from 8x8-cell tiles
// (SVG patterns, so a whole floor costs one rect), blocky skies with drifting clouds, pixel silhouettes
// (hills, mountains, city, trees, sea) and a time-of-day tint. Every pixel-art scene/background preset imports
// these exports (TileRect, TileMap, PixSky, Far, Tint, Panel, PixText, Icon, ...) so they all look the same.

/** Tile colours (upper-case chars) added on top of the style palette. */
export const TP: Record<string, string> = {
  ...PAL,
  G: "#7ed36b", D: "#8a5a36", E: "#6e4528", F: "#a06c44", S: "#8d93a0", T: "#646a78", U: "#b9bec8",
  W: "#3f8fe0", V: "#8fd0f8", L: "#f2601f", Y: "#ffd23f", B: "#b5523b", R: "#7f3426", M: "#d8c8b0",
  P: "#b07a45", Q: "#7f5230", N: "#ecd08a", O: "#d2b06a", I: "#bfe8f6", J: "#7cc4e4", K: "#2a2a40", H: "#3d3d5c",
  C: "#4a7a3a", X: "#38506e", Z: "#e8eef6",
};

/** 8x8 tiles; a list of maps = animation frames. */
export const TILES: Record<string, string[][]> = {
  grass: [["GGeGGGGe", "eeeeGeee", "efeeeefe", "DfDDDfDD", "DDDEDDDD", "DDDDDDED", "DEDDDDDD", "DDDDEDDD"]],
  dirt: [["DDDEDDDD", "DDDDDDED", "DEDDDDDD", "DDDDDDDD", "DDDDEDDD", "EDDDDDDD", "DDDDDEDD", "DDEDFDDD"]],
  lawn: [["eeeeeeee", "eGeeeefe", "eeeeeeee", "eeefeeee", "eeeeeGee", "feeeeeee", "eeeeeeee", "eeGeeefe"]],
  water: [
    ["WWWWWWWW", "WVVWWWWW", "WWWWWWWW", "WWWWWWWW", "WWWWWVVW", "WWWWWWWW", "WWWWWWWW", "WWWWWWWW"],
    ["WWWWWWWW", "WWWVVWWW", "WWWWWWWW", "WWWWWWWW", "WWVWWWWW", "VWWWWWWV", "WWWWWWWW", "WWWWWWWW"],
  ],
  waterTop: [
    ["VVWWVVVW", "WWWWWWWW", "WWWWWWWW", "WWVVWWWW", "WWWWWWWW", "WWWWWWWW", "WWWWWVWW", "WWWWWWWW"],
    ["WVVVWWVV", "WWWWWWWW", "WWWWWWWW", "WWWWVVWW", "WWWWWWWW", "WWWWWWWW", "WVWWWWWW", "WWWWWWWW"],
  ],
  brick: [["BBBBBBBM", "BBBBBBBM", "RRRRRRRM", "MMMMMMMM", "BBBMBBBB", "BBBMBBBB", "RRRMRRRR", "MMMMMMMM"]],
  stone: [["UUUUUUUT", "USSSSSST", "USSSSSST", "USSSgSST", "USSSSSST", "USSSSSST", "USSSSSST", "TTTTTTTT"]],
  wall: [["SSSSSSST", "SSSSSSST", "SSSSSSST", "TTTTTTTT", "SSSTSSSS", "SSSTSSSS", "SSSTSSSS", "TTTTTTTT"]],
  dungeon: [["HHHHHHHK", "HHHHHHHK", "HHHgHHHK", "KKKKKKKK", "HHHKHHHH", "HHHKHHHH", "HHHKHHHH", "KKKKKKKK"]],
  rock: [["dddTdddd", "dTddddkd", "ddddTddd", "kdddddTd", "ddTddddd", "dddddkdd", "Tddddddd", "dddTdddT"]],
  wood: [["PPPPPQPP", "PPPPPQPP", "PPPPPQPP", "QQQQQQQQ", "PQPPPPPP", "PQPPPPPP", "PQPPPPPP", "QQQQQQQQ"]],
  sand: [["NNNNNNNN", "NNONNNNN", "NNNNNNON", "NNNNNNNN", "NNNNONNN", "ONNNNNNN", "NNNNNNNN", "NNNONNNN"]],
  snow: [["wwwwwwww", "wwwwZwww", "wwwwwwww", "wZwwwwww", "wwwwwwIw", "wwwwwwww", "wwIwwwww", "wwwwwwww"]],
  snowTop: [["wwwwwwww", "wwZwwwww", "IwwwwIww", "wwwwwwww", "wwwIwwww", "wwwwwwwZ", "wZwwwwww", "wwwwwIww"]],
  ice: [["IIIIIIII", "IwIIIIII", "IIwIIIII", "IIIIIIJI", "IIIIIJII", "IIIIIIII", "IJIIIIII", "IIIIIIIw"]],
  lava: [
    ["LLLLYLLL", "LYLLLLLr", "LLLLLLLL", "rLLLYYLL", "LLLLLLLL", "LLYLLLrL", "LLLLLLLL", "LrLLLLYL"],
    ["LLYLLLLL", "LLLLLYLL", "rLLLLLLL", "LLLLLLLr", "LYYLLLLL", "LLLLLLYL", "LLrLLLLL", "LLLLYLLL"],
  ],
  metal: [["gggggggd", "gdgggdgd", "gggggggd", "gggggggd", "gggggggd", "gdgggdgd", "gggggggd", "dddddddd"]],
  tiles: [["wwwwwwwg", "wwwwwwwg", "wwwwwwwg", "wwwwwwwg", "wwwwwwwg", "wwwwwwwg", "wwwwwwwg", "gggggggg"]],
  checker: [["wwwwkkkk", "wwwwkkkk", "wwwwkkkk", "wwwwkkkk", "kkkkwwww", "kkkkwwww", "kkkkwwww", "kkkkwwww"]],
  carpet: [["rrrrrrrr", "rRrrrRrr", "rrrrrrrr", "rrrRrrrr", "rrrrrrrr", "rRrrrRrr", "rrrrrrrr", "rrrRrrrr"]],
  road: [["dddddddd", "dddKdddd", "dddddddd", "dddddKdd", "dddddddd", "dKdddddd", "dddddddd", "ddddddKd"]],
  path: [["OONOOOON", "ONNNOONO", "OOOOONOO", "NOONOOOO", "OOOONOON", "OONOOOOO", "NOOOOONO", "OOONOOOO"]],
  crops: [["eeCeeCee", "eCeeeeCe", "CeeCeeCe", "eeeeCeee", "DDDDDDDD", "EDEDEDED", "DDDDDDDD", "DEDDDEDD"]],
  roof: [["rrrrrrrr", "RRRRRRRR", "rrrrrrrr", "RRRRRRRR", "rrrrrrrr", "RRRRRRRR", "rrrrrrrr", "RRRRRRRR"]],
  block: [["YYYYYYYo", "YoooooYo", "YooYooYo", "YoYoYoYo", "YooYooYo", "YoooooYo", "YYYYYYYo", "oooooooo"]],
  ground: [["xxxxxxxu", "xuxxxxxu", "xxxxxuxu", "xxxxxxxu", "uuuuuuuu", "xxxuxxxx", "xuxuxxux", "uuuuuuuu"]],
  bush: [["..eeee..", ".eGeeee.", "eeeeGeee", "eGeeeeef", "eeeeeeff", "eeeeefff", ".effffe.", "..ffff.."]],
  cloud: [["..wwww..", ".wwwwww.", "wwwwwwww", "wwwwwwww", "wwwwwwww", "Iwwwwwww", ".IIIIII.", "........"]],
  bricks2: [["oooooook", "oYoooook", "oooooook", "kkkkkkkk", "ooookooo", "oooYkooo", "ooookooo", "kkkkkkkk"]],
  star: [["...y....", "...y....", ".yyyyy..", "..yyy...", ".yy.yy..", "........", "........", "........"]],
};
export type TileName = keyof typeof TILES | string;

const frameOf = (name: string, f: number, fps = 12) => {
  const fr = TILES[name] ?? TILES.dirt;
  return Math.floor(f / fps) % fr.length;
};

/** Pattern defs + one rect: fill (x,y,w,h) with a repeating tile. cell = px per tile pixel (tile = 8 cells). */
export const TileRect: React.FC<{ tile: TileName; x: number; y: number; w: number; h: number; cell?: number; f?: number; pal?: Record<string, string>; ox?: number; oy?: number; opacity?: number }> = ({ tile, x, y, w, h, cell = 12, f = 0, pal, ox, oy, opacity }) => {
  const fr = TILES[tile] ?? TILES.dirt;
  const i = frameOf(tile, f);
  const P = { ...TP, ...(pal ?? {}) };
  const key = pal ? Object.entries(pal).map(([k, v]) => k + v.replace("#", "")).join("") : "";
  const id = `pxt-${tile}-${cell}-${i}-${key}-${Math.round(ox ?? x)}-${Math.round(oy ?? y)}`;
  const T = cell * 8;
  return (
    <g shapeRendering="crispEdges" opacity={opacity}>
      <defs>
        <pattern id={id} patternUnits="userSpaceOnUse" x={ox ?? x} y={oy ?? y} width={T} height={T}>
          <Pixels grid={gridOf(fr[i])} px={cell} pal={P} />
        </pattern>
      </defs>
      <rect x={x} y={y} width={w} height={h} fill={`url(#${id})`} />
    </g>
  );
};

/** One tile (or sprite-ish block) drawn directly. */
export const Tile: React.FC<{ tile: TileName; x: number; y: number; cell?: number; f?: number; pal?: Record<string, string> }> = ({ tile, x, y, cell = 12, f = 0, pal }) => {
  const fr = TILES[tile] ?? TILES.dirt;
  return <Pixels grid={gridOf(fr[frameOf(tile, f)])} px={cell} pal={{ ...TP, ...(pal ?? {}) }} x={x} y={y} />;
};

/** A map of tiles: rows of chars, legend maps a char to a tile name ("." = empty). Origin top-left at (x, y). */
export const TileMap: React.FC<{ rows: string[]; legend: Record<string, TileName>; x?: number; y?: number; cell?: number; f?: number; pal?: Record<string, string> }> = ({ rows, legend, x = 0, y = 0, cell = 12, f = 0, pal }) => {
  const T = cell * 8;
  const out: React.ReactNode[] = [];
  rows.forEach((row, r) => {
    let q = 0;
    while (q < row.length) {
      const c = row[q];
      if (!legend[c]) { q++; continue; }
      let e = q + 1;
      while (e < row.length && row[e] === c) e++;
      out.push(<TileRect key={`${r}-${q}`} tile={legend[c]} x={x + q * T} y={y + r * T} w={(e - q) * T} h={T} cell={cell} f={f} pal={pal} ox={x} oy={y} />);
      q = e;
    }
  });
  return <g>{out}</g>;
};

/** Seeded 0..1 number. */
export const rnd = (seed: number | string, i: number) => random(`px:${seed}:${i}`);
/** Snap a value to the pixel grid (default 12 px). */
export const snap = (v: number, g = 12) => Math.round(v / g) * g;

export type Time = "day" | "dusk" | "night" | "space";
export const TIMES: Time[] = ["day", "dusk", "night", "space"];
export const asTime = (t: unknown): Time => (TIMES.includes(t as Time) ? (t as Time) : "day");

const SKYB: Record<Time, string[]> = {
  day: ["#4fa3e8", "#5ab4f0", "#6bbdf1", "#7cc6f2", "#93d2f5"],
  dusk: ["#3b2f6e", "#6a3f86", "#b4528a", "#ec7a5c", "#f7b267"],
  night: ["#0d1030", "#141a44", "#1b2456", "#23305e", "#2c3b6e"],
  space: ["#07071a", "#0b0b22", "#0f0f2a", "#121232", "#15153a"],
};
const CLOUD = ["...wwww.....", ".wwwwwwww...", "wwwwwwwwwww.", "gwwwwwwwwwwg", ".gggggggggg."];
const CLOUD2 = ["....www.......", "..wwwwwww.ww..", ".wwwwwwwwwwwww", "wwwwwwwwwwwwww", ".gggggggggggg."];
const MOON = ["..wwww..", ".wwwwgw.", "wwgwwwww", "wwwwwwgw", "wwwwwwww", "wgwwwwww", ".wwwgww.", "..wwww.."];
const SUN = ["..yyyy..", ".yyyyyy.", "yyyyyyyy", "yyyyyyyy", "yyyyyyyy", "yyyyyyyy", ".yyyyyy.", "..yyyy.."];

/** Banded blocky sky down to `to`, with optional clouds, sun/moon and stars. */
export const PixSky: React.FC<{ time?: Time; to?: number; f?: number; clouds?: number; seed?: number; drift?: boolean; body?: boolean }> = ({ time = "day", to = 1920, f = 0, clouds = 3, seed = 1, drift = true, body = true }) => {
  const b = SKYB[time];
  const band = snap(to / b.length, 24);
  const stars = time === "night" || time === "space";
  const cl = time === "space" ? 0 : clouds;
  return (
    <g shapeRendering="crispEdges">
      {b.map((c, i) => <rect key={i} x={0} y={i * band} width={1080} height={i === b.length - 1 ? Math.max(0, to - i * band) : band + 1} fill={c} />)}
      {stars && Array.from({ length: time === "space" ? 70 : 40 }).map((_, i) => {
        const sx = snap(rnd(seed, i) * 1068), sy = snap(rnd(seed, i + 99) * (to - 40));
        const tw = Math.floor((f + i * 7) / 18) % 4 === 0;
        const big = i % 9 === 0;
        return <rect key={"s" + i} x={sx} y={sy} width={big ? 12 : 6} height={big ? 12 : 6} fill={tw ? "#9aa6d8" : i % 5 ? "#f5f1e8" : "#f7d154"} />;
      })}
      {body && time === "day" && <Pixels grid={outlined(gridOf(SUN), "o")} px={18} x={780} y={150} />}
      {body && time === "dusk" && <Pixels grid={gridOf(SUN)} px={24} pal={{ ...PAL, y: "#ffb347" }} x={600} y={snap(to - 150)} />}
      {body && time === "night" && <Pixels grid={gridOf(MOON)} px={18} x={790} y={170} />}
      {Array.from({ length: cl }).map((_, i) => {
        const w0 = (i % 2 ? CLOUD2[0].length : CLOUD[0].length) * 18;
        const span = 1080 + w0 + 200;
        const base = rnd(seed, i + 300) * span;
        const cx = snap((((base + (drift ? f * (0.6 + i * 0.25) : 0)) % span) + span) % span - w0 - 100);
        const cy = snap(120 + rnd(seed, i + 400) * Math.max(100, to * 0.45));
        const pal = time === "dusk" ? { ...PAL, w: "#f6c6b0", g: "#c98aa0" } : time === "night" ? { ...PAL, w: "#4a5688", g: "#36406e" } : PAL;
        return <Pixels key={"c" + i} grid={gridOf(i % 2 ? CLOUD2 : CLOUD)} px={i % 3 === 2 ? 18 : 24} pal={pal} x={cx} y={cy} />;
      })}
    </g>
  );
};

/** Column heights (px from base) every `step` px across the frame. */
const heights = (kind: string, seed: number, maxH: number, step: number) => {
  const n = Math.ceil(1080 / step) + 1;
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    const t = i / n;
    let h = 0;
    if (kind === "hills") h = maxH * (0.45 + 0.3 * Math.sin(t * 7 + seed) + 0.2 * Math.sin(t * 17 + seed * 3));
    if (kind === "mountains") {
      for (let k = 0; k < 4; k++) {
        const pxk = rnd(seed, k + 50) * 1.1 - 0.05, ph = maxH * (0.6 + rnd(seed, k + 60) * 0.4);
        h = Math.max(h, ph - Math.abs(t - pxk) * maxH * 3.2);
      }
    }
    if (kind === "trees") h = maxH * (0.55 + 0.25 * Math.abs(Math.sin(t * 22 + seed)) + 0.15 * Math.sin(t * 9 + seed));
    out.push(Math.max(step, snap(h, step)));
  }
  return out;
};

export type FarKind = "none" | "hills" | "mountains" | "city" | "trees" | "sea";
export const FARS: FarKind[] = ["none", "hills", "mountains", "city", "trees", "sea"];
const shadeFor = (time: Time, day: string, dusk: string, night: string) => (time === "day" ? day : time === "dusk" ? dusk : night);

/** Pixel silhouette standing on `base`: hills, mountains (snow caps), city (lit windows at night), trees or sea. */
export const Far: React.FC<{ kind: FarKind; base: number; time?: Time; seed?: number; maxH?: number; f?: number; tint?: string }> = ({ kind, base, time = "day", seed = 1, maxH = 360, f = 0, tint }) => {
  if (kind === "none") return null;
  const step = 24;
  if (kind === "sea") {
    return (
      <g shapeRendering="crispEdges">
        <TileRect tile="waterTop" x={0} y={base - 240} w={1080} h={240} cell={12} f={f} pal={time === "night" ? { W: "#25407a", V: "#4a6fb0" } : time === "dusk" ? { W: "#5a5aa0", V: "#f2a07a" } : undefined} />
      </g>
    );
  }
  if (kind === "city") {
    const out: React.ReactNode[] = [];
    let x = -24, i = 0;
    const body = tint ?? shadeFor(time, "#6f86a8", "#4b3f6e", "#1d2448");
    const win = time === "day" ? "#a9d4f0" : "#f7d154";
    while (x < 1080) {
      const w = (3 + Math.floor(rnd(seed, i) * 4)) * step, h = snap(maxH * (0.4 + rnd(seed, i + 20) * 0.6), step);
      out.push(<rect key={"b" + i} x={x} y={base - h} width={w - 12} height={h} fill={body} />);
      for (let wy = base - h + 24; wy < base - 24; wy += 48)
        for (let wx = x + 12; wx < x + w - 24; wx += 24)
          if (rnd(seed, wx * 7 + wy) > (time === "day" ? 0.55 : 0.4)) out.push(<rect key={`w${wx}-${wy}`} x={wx} y={wy} width={12} height={12} fill={win} />);
      x += w; i++;
    }
    return <g shapeRendering="crispEdges">{out}</g>;
  }
  const hs = heights(kind, seed, maxH, step);
  const main = tint ?? (kind === "mountains" ? shadeFor(time, "#7d87a6", "#5b4a7a", "#2a3156") : kind === "trees" ? shadeFor(time, "#2e6b45", "#3a3f5e", "#16263a") : shadeFor(time, "#5fae5a", "#55537a", "#1f3346"));
  const light = kind === "mountains" ? shadeFor(time, "#f5f1e8", "#e7c6c6", "#8b95c2") : kind === "trees" ? shadeFor(time, "#4caf50", "#4c5276", "#22364a") : shadeFor(time, "#7ed36b", "#6a6890", "#2a4458");
  return (
    <g shapeRendering="crispEdges">
      {hs.map((h, i) => <rect key={i} x={i * step} y={base - h} width={step + 0.6} height={h} fill={main} />)}
      {hs.map((h, i) => {
        if (kind === "mountains") { const line = maxH * 0.6; if (h <= line) return null; const cap = Math.min(96, snap(h - line, 12) + 24); return <rect key={"c" + i} x={i * step} y={base - h} width={step + 0.6} height={cap} fill={light} />; }
        return <rect key={"c" + i} x={i * step} y={base - h} width={step + 0.6} height={12} fill={light} />;
      })}
    </g>
  );
};

/** Whole-frame time-of-day tint over a scene (day = nothing). */
export const Tint: React.FC<{ time?: Time; indoor?: boolean; y?: number }> = ({ time = "day", indoor, y = 0 }) => {
  if (time === "day") return null;
  const c = time === "dusk" ? "#b4528a" : "#0d1030";
  const o = time === "dusk" ? (indoor ? 0.1 : 0.22) : indoor ? 0.22 : 0.45;
  return <rect x={0} y={y} width={1080} height={Math.max(0, 1920 - y)} fill={c} opacity={o} />;
};

/** Game UI panel: dark box, light double border, stepped corners. */
export const Panel: React.FC<{ x: number; y: number; w: number; h: number; fill?: string; border?: string; step?: number }> = ({ x, y, w, h, fill = PAL.n, border = PAL.w, step = 12 }) => (
  <g shapeRendering="crispEdges">
    <rect x={x + step} y={y + step} width={w} height={h} fill={PAL.k} opacity={0.45} />
    <rect x={x + step} y={y} width={w - 2 * step} height={h} fill={PAL.k} />
    <rect x={x} y={y + step} width={w} height={h - 2 * step} fill={PAL.k} />
    <rect x={x + step} y={y + step} width={w - 2 * step} height={h - 2 * step} fill={border} />
    <rect x={x + 2 * step} y={y + 2 * step} width={w - 4 * step} height={h - 4 * step} fill={fill} />
  </g>
);

/** Chunky monospace game text. */
export const PixText: React.FC<{ x: number; y: number; text: string; size?: number; fill?: string; anchor?: "start" | "middle" | "end"; shadow?: boolean }> = ({ x, y, text, size = 48, fill = PAL.w, anchor = "middle", shadow = true }) => (
  <g>
    {shadow && <text x={x + size / 12 + 2} y={y + size / 12 + 2} textAnchor={anchor} fontFamily={font} fontWeight={700} fontSize={size} fill={PAL.k}>{text}</text>}
    <text x={x} y={y} textAnchor={anchor} fontFamily={font} fontWeight={700} fontSize={size} fill={fill}>{text}</text>
  </g>
);

/** Small UI icons (8x8 maps, outlined): heart, half, empty, coin, star, gem, key, potion, sword, skull. */
export const ICONS: Record<string, string[]> = {
  heart: [".rr.rr..", "rwrrrrr.", "rrrrrrr.", "rrrrrrr.", ".rrrrr..", "..rrr...", "...r....", "........"],
  half: [".rr.gg..", "rwrgggg.", "rrrgggg.", "rrrgggg.", ".rrggg..", "..rgg...", "...g....", "........"],
  empty: [".gg.gg..", "gggdggg.", "gdddddg.", "gdddddg.", ".gdddg..", "..gdg...", "...g....", "........"],
  coin: ["..yyyy..", ".yywwyy.", "yyywyyyo", "yyywyyyo", "yyywyyyo", "yyywyyyo", ".yyyyyo.", "..oooo.."],
  star: ["...y....", "...y....", "yyyyyyy.", ".yyyyy..", "..yyy...", ".yy.yy..", ".y...y..", "........"],
  gem: [".cccccc.", "ccwccccb", "cwccccbb", ".ccccbb.", "..ccbb..", "...cb...", "........", "........"],
  key: [".yyy....", "y...y...", "y...y...", ".yyyyyyy", "......y.", "....y.yy", "........", "........"],
  potion: ["...gg...", "...ww...", "..wppw..", ".pmpppp.", ".pppppp.", ".pppppp.", "..pppp..", "........"],
  sword: [".......w", "......wg", ".....wg.", "..y.wg..", "...yg...", "..uyy...", ".u......", "u......."],
  skull: [".wwwwww.", "wwwwwwww", "wkkwwkkw", "wkkwwkkw", "wwwkkwww", ".wwwwww.", ".wkwkwk.", "..wwww.."],
  chest: ["xxxxxxxx", "xuuuuuux", "yyyyyyyy", "xuuyyuux", "xuuyyuux", "xuuuuuux", "xxxxxxxx", "........"],
};
export const Icon: React.FC<{ name: string; x: number; y: number; cell?: number; outline?: boolean }> = ({ name, x, y, cell = 12, outline = true }) => {
  const g = gridOf(ICONS[name] ?? ICONS.star);
  return <Pixels grid={outline ? outlined(g) : g} px={cell} x={x} y={y} />;
};

/** Small pixel tree (stands on x, y). size = cell px. */
export const PixTree: React.FC<{ x: number; y: number; cell?: number; kind?: "round" | "pine" | "palm" | "dead"; pal?: Record<string, string> }> = ({ x, y, cell = 12, kind = "round", pal }) => {
  const M: Record<string, string[]> = {
    round: ["...eeee...", ".eeGeeeee.", "eeGeeeeeef", "eeeeeeeeff", "eeeeeefeff", ".eeffeeff.", "..ffffff..", "....uu....", "....uu....", "....uu....", "...uuuu..."],
    pine: ["....f....", "...fef...", "..fefef..", "...fef...", "..feeef..", ".feefeef.", "..feeef..", ".feeeeef.", "feeeeeeef", "....u....", "....u...."],
    palm: ["..ee..ee..", ".eeeeeeee.", "ee..ee..ee", "e...ux...e", "....xu....", "....ux....", "....xu....", "...ux.....", "...xu.....", "...ux.....", "..uuxu...."],
    dead: ["u...u..u", ".u.u..u.", "..uu.u..", "...uuu..", "...uu...", "...uu...", "...uu...", "...uu...", "..uuuu.."],
  };
  const g = outlined(gridOf(M[kind] ?? M.round));
  const w = g[0].length * cell, h = g.length * cell;
  return <Pixels grid={g} px={cell} pal={{ ...TP, ...(pal ?? {}) }} x={snap(x - w / 2, cell)} y={y - h} />;
};

/** Ground band from y to the bottom: a surface tile row then a fill tile. */
export const GroundBand: React.FC<{ y: number; top?: TileName; body?: TileName; f?: number; cell?: number; pal?: Record<string, string> }> = ({ y, top = "grass", body = "dirt", f = 0, cell = 12, pal }) => {
  const T = cell * 8;
  return (
    <g>
      <TileRect tile={top} x={0} y={y} w={1080} h={T} cell={cell} f={f} pal={pal} />
      {y + T < 1920 && <TileRect tile={body} x={0} y={y + T} w={1080} h={1920 - y - T} cell={cell} f={f} pal={pal} ox={0} oy={y + T} />}
    </g>
  );
};

export const GROUNDS: Record<string, [TileName, TileName]> = {
  grass: ["grass", "dirt"], dirt: ["dirt", "dirt"], sand: ["sand", "sand"], snow: ["snowTop", "snow"], stone: ["stone", "stone"],
  brick: ["brick", "brick"], wood: ["wood", "wood"], water: ["waterTop", "water"], lava: ["lava", "lava"], ice: ["ice", "ice"],
  road: ["road", "road"], metal: ["metal", "metal"], blocks: ["ground", "ground"],
};
export const GROUND_NAMES = ["none", ...Object.keys(GROUNDS)];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const gy = snap(p.groundY ?? 1600, 12);
  const g = GROUNDS[p.ground ?? "grass"];
  const far: FarKind = FARS.includes(p.far) ? p.far : "hills";
  const seed = p.seed ?? 1;
  const drift = (p.anim ?? "drift") === "drift";
  return (
    <g>
      <PixSky time={time} to={gy} f={p.f} clouds={p.clouds ?? 3} seed={seed} drift={drift} />
      {far === "mountains" && <Far kind="hills" base={gy} time={time} seed={seed + 3} maxH={180} />}
      <Far kind={far} base={gy} time={time} seed={seed} maxH={far === "mountains" ? 620 : far === "city" ? 560 : far === "trees" ? 260 : 320} f={p.f} />
      {g && <GroundBand y={gy} top={g[0]} body={g[1]} f={p.f} />}
      <Tint time={time === "space" ? "night" : time} y={gy} />
    </g>
  );
}
