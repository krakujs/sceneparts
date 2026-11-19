import React from "react";
import type { Style } from "@sceneparts/core";

// Pixel art style: a 16-colour palette, crisp square pixels drawn as SVG rects (shapeRendering crispEdges),
// a dark auto-outline around sprites, blocky sky / ground bands and a chunky title plate.
// Parts draw pixel maps: arrays of strings, one char per cell, "." = empty. Chars index the palette below;
// role chars (s S h H t T i I l L z Z a A) are filled per part from params (skin, hair, top, inner, legs, shoes, accent).

export const PAL: Record<string, string> = {
  k: "#1b1b2e", // ink / outline
  w: "#f5f1e8", // white
  g: "#a8b0bd", // light grey
  d: "#5a6170", // dark grey
  r: "#d2403f", // red
  o: "#f08a3c", // orange
  y: "#f7d154", // yellow
  e: "#4caf50", // green
  f: "#2e6b45", // dark green
  c: "#5ab4f0", // sky blue
  b: "#2f5fb8", // blue
  n: "#23305e", // navy
  p: "#7a4bb5", // purple
  m: "#ef8fb4", // pink
  u: "#7a4a2b", // brown
  x: "#c9874f", // tan / wood
};
export const INK = PAL.k;
/** Default cell size in px at s = 1. */
export const PX = 24;

export const SKIN: Record<string, string> = { light: "#ffe0c4", fair: "#f1c39b", tan: "#d99a6c", medium: "#b97a4c", brown: "#8a5532", dark: "#5c3820" };
export const HAIR: Record<string, string> = { black: "#24202a", brown: "#6b3f22", auburn: "#93391f", blonde: "#ecc15a", red: "#cf5a2c", grey: "#a3a3ab", white: "#ece9e0", blue: "#3f6fd6", pink: "#ef7fb0", green: "#4caf50", purple: "#7a4bb5" };

/** Resolve a colour param: a palette char, a named skin/hair, or a hex colour. */
export const col = (v: string | undefined, fallback: string, named?: Record<string, string>) => {
  if (!v || v === "none") return fallback;
  if (named && named[v]) return named[v];
  if (v.length === 1 && PAL[v]) return PAL[v];
  return v;
};
/** Darker version of a hex colour (for the one shade). */
export const shade = (hex: string, k = 0.25) => {
  const h = hex.replace("#", "");
  if (h.length !== 6) return hex;
  const c = [0, 2, 4].map((i) => Math.round(parseInt(h.slice(i, i + 2), 16) * (1 - k)));
  return "#" + c.map((v) => v.toString(16).padStart(2, "0")).join("");
};

export type Grid = string[][];
/** A pixel map as rows; a single string may separate rows with "/". */
export type PixelMap = string | string[];
export const rowsOf = (m: PixelMap): string[] => (Array.isArray(m) ? m : m.split("/"));

export const makeGrid = (w: number, h: number): Grid => Array.from({ length: h }, () => Array.from({ length: w }, () => "."));
/** Fill a rectangle of cells (clipped to the grid). */
export const fill = (g: Grid, x: number, y: number, w: number, h: number, c: string) => {
  for (let r = y; r < y + h; r++) for (let q = x; q < x + w; q++) if (g[r] && q >= 0 && q < g[r].length) g[r][q] = c;
};
/** Stamp a pixel map onto the grid at (x, y); "." cells are skipped; mirror=true flips it horizontally. */
export const stamp = (g: Grid, m: PixelMap, x: number, y: number, mirror = false) => {
  const rows = rowsOf(m);
  rows.forEach((row, r) => {
    for (let q = 0; q < row.length; q++) {
      const ch = mirror ? row[row.length - 1 - q] : row[q];
      if (ch !== "." && ch !== " " && g[y + r] && x + q >= 0 && x + q < g[y + r].length) g[y + r][x + q] = ch;
    }
  });
};
/** Add a one-cell outline (char k) around every filled cell (4-neighbour). Grows the grid by 1 on each side. */
export const outlined = (g: Grid, k = "k"): Grid => {
  const h = g.length + 2, w = (g[0]?.length ?? 0) + 2;
  const out = makeGrid(w, h);
  g.forEach((row, r) => row.forEach((c, q) => { out[r + 1][q + 1] = c; }));
  const filled = (r: number, q: number) => r >= 0 && r < h && q >= 0 && q < w && out[r][q] !== "." && out[r][q] !== "#";
  for (let r = 0; r < h; r++)
    for (let q = 0; q < w; q++)
      if (out[r][q] === "." && (filled(r - 1, q) || filled(r + 1, q) || filled(r, q - 1) || filled(r, q + 1))) out[r][q] = "#";
  return out.map((row) => row.map((c) => (c === "#" ? k : c)));
};
export const gridOf = (m: PixelMap): Grid => {
  const rows = rowsOf(m);
  const w = Math.max(...rows.map((r) => r.length));
  return rows.map((r) => Array.from({ length: w }, (_, i) => (r[i] && r[i] !== " " ? r[i] : ".")));
};

/** Draw a grid as merged rects. Origin = top-left of the grid; px = cell size. pal maps chars to colours. */
export const Pixels: React.FC<{ grid: Grid; px?: number; pal?: Record<string, string>; x?: number; y?: number; opacity?: number }> = ({ grid, px = PX, pal = PAL, x = 0, y = 0, opacity }) => {
  const rects: React.ReactNode[] = [];
  grid.forEach((row, r) => {
    let q = 0;
    while (q < row.length) {
      const c = row[q];
      if (c === "." || !(pal[c] ?? PAL[c])) { q++; continue; }
      let e = q + 1;
      while (e < row.length && row[e] === c) e++;
      rects.push(<rect key={`${r}-${q}`} x={x + q * px} y={y + r * px} width={(e - q) * px + 0.6} height={px + 0.6} fill={pal[c] ?? PAL[c]} />);
      q = e;
    }
  });
  return <g shapeRendering="crispEdges" opacity={opacity}>{rects}</g>;
};

/** Blocky title plate: dark box with a light border and chunky monospace words. */
export const font = "'Press Start 2P', 'Courier New', Courier, monospace";
export const Title: React.FC<{ x: number; y: number; lines: string[]; accent?: string; size?: number; pop?: number }> = ({ x, y, lines, accent, size = 72, pop = 1 }) => {
  const w = Math.max(...lines.map((l) => l.length)) * size * 0.68 + 96;
  const h = lines.length * size * 1.25 + 72;
  const step = 12;
  const W = Math.ceil(w / step) * step, H = Math.ceil(h / step) * step;
  return (
    <g transform={`translate(${x} ${y}) scale(${pop})`} shapeRendering="crispEdges">
      <rect x={-W / 2 + step} y={-H / 2 + step} width={W} height={H} fill={INK} opacity={0.45} />
      <rect x={-W / 2} y={-H / 2} width={W} height={H} fill={PAL.n} />
      <rect x={-W / 2 + step} y={-H / 2 + step} width={W - 2 * step} height={H - 2 * step} fill="none" stroke={PAL.w} strokeWidth={step} />
      {lines.map((l, i) => (
        <text key={i} x={0} y={-H / 2 + 36 + size + i * size * 1.25} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={size} fill={l === accent ? PAL.y : PAL.w}>{l}</text>
      ))}
    </g>
  );
};

const CLOUD = ["...wwww.....", ".wwwwwwww...", "wwwwwwwwwww.", "gwwwwwwwwwwg", ".gggggggggg."];
const Sky: React.FC = () => (
  <g shapeRendering="crispEdges">
    <rect x={0} y={0} width={1080} height={1920} fill="#7cc6f2" />
    <rect x={0} y={0} width={1080} height={480} fill="#5ab4f0" />
    <rect x={0} y={480} width={1080} height={48} fill="#6bbdf1" />
    <Pixels grid={gridOf(CLOUD)} px={24} x={96} y={260} />
    <Pixels grid={gridOf(CLOUD)} px={18} x={700} y={560} />
  </g>
);
const Ground: React.FC<{ y: number }> = ({ y }) => (
  <g shapeRendering="crispEdges">
    <rect x={0} y={y} width={1080} height={1920 - y} fill="#8a5a36" />
    <rect x={0} y={y} width={1080} height={48} fill={PAL.e} />
    <rect x={0} y={y + 48} width={1080} height={24} fill={PAL.f} />
    {Array.from({ length: 23 }).map((_, i) => <rect key={i} x={i * 48} y={y + 96 + (i % 3) * 72} width={24} height={24} fill="#6e4528" />)}
    {Array.from({ length: 23 }).map((_, i) => <rect key={"b" + i} x={i * 48 + 24} y={y + 168 + (i % 4) * 60} width={24} height={24} fill="#a06c44" />)}
  </g>
);

const style: Style = {
  id: "pixel-art",
  ink: INK,
  accent: PAL.y,
  font,
  paper: null,
  decor: { skyY: 0, groundY: 1600, sky: () => <Sky />, ground: (y: number) => <Ground y={y} /> },
  title: (p) => <Title {...p} />,
};
export default style;
