import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// 8x8 board seen from the front and above: rows get narrower towards the far edge, so the board reads as a
// tilted plane. Origin = centre of the board. A few simple pawn-like pieces stand on it. About 820 px wide.
const f1 = (v: number) => v.toFixed(1);
const W = 820, H = 420; // near width, board depth on screen
const TOP = -H / 2, BOT = H / 2;
const TILT = 0.7; // far edge is 70 % of the near edge width
// Map board coordinates (u, v) in [0, 8] (u across, v from far edge 0 to near edge 8) to screen.
const proj = (u: number, v: number): [number, number] => {
  const t = v / 8;
  const half = (W / 2) * (1 - (1 - TILT) * (1 - t));
  const sx = (u / 8 - 0.5) * 2 * half;
  const sy = TOP + t * (BOT - TOP);
  return [sx, sy];
};
const sq = (c: number, r: number) => {
  const pts = [proj(c, r), proj(c + 1, r), proj(c + 1, r + 1), proj(c, r + 1)];
  return pts.map(([px, py]) => `${f1(px)},${f1(py)}`).join(" ");
};
// Standing pieces: pawn-like silhouette at the centre of a square, scaled by row depth.
const piece = (c: number, r: number, fill: string, key: string) => {
  const [px, py] = proj(c + 0.5, r + 0.6);
  const sc = 0.55 + 0.45 * ((r + 0.6) / 8);
  return (
    <g key={key} transform={`translate(${f1(px)} ${f1(py)}) scale(${f1(sc)})`}>
      <ellipse cx={0} cy={0} rx={38} ry={10} fill={C.shadow} />
      <rect x={-32} y={-18} width={64} height={18} rx={8} fill={fill} />
      <path d="M -22 -18 L -12 -100 L 12 -100 L 22 -18 Z" fill={fill} />
      <circle cx={0} cy={-122} r={28} fill={fill} />
      <rect x={-22} y={-22} width={44} height={6} rx={3} fill={shade(fill, 0.15)} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1320;
  const dark = p.color && p.color !== "none" ? p.color : C.brown;
  const light = p.accent && p.accent !== "none" ? p.accent : C.white;
  const anim: string = p.anim ?? "none";
  const squares: React.ReactElement[] = [];
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
    squares.push(<polygon key={`${c}-${r}`} points={sq(c, r)} fill={(c + r) % 2 === 0 ? C.paper : dark} />);
  }
  // Light pawns on row 6 and dark pawns on row 1; one light pawn slides forward during "move".
  const slide = anim === "move" ? Math.min(1, Math.max(0, (f % 60 - 10) / 30)) : 0;
  const pieces: React.ReactElement[] = [];
  for (let c = 1; c < 6; c += 2) pieces.push(piece(c, 1, dark, `d${c}`));
  for (let c = 0; c < 8; c += 2) if (!(c === 4 && anim === "move")) pieces.push(piece(c, 6, light, `l${c}`));
  const moveRow = 6 - 2 * slide;
  pieces.push(piece(4, moveRow, light, "mv"));
  const bobY = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const popS = anim === "pop" ? (() => { const tt = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (tt - 1) ** 3 + c1 * (tt - 1) ** 2; })() : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`translate(0 ${f1(bobY)}) scale(${f1(popS)})`}>
        <polygon points={`${f1(-W / 2 - 24)},${f1(TOP - 24)} ${f1(W / 2 + 24)},${f1(TOP - 24)} ${f1(W / 2 + 40)},${f1(BOT + 40)} ${f1(-W / 2 - 40)},${f1(BOT + 40)}`} fill={shade(dark, 0.25)} />
        {squares}
        {pieces}
      </g>
    </g>
  );
}
