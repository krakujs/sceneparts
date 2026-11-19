import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Open board game box lying flat, seen from above at an angle: a lid with a winding path of round spaces,
// three coloured tokens and two dice. Origin = bottom centre. About 760 px wide, 420 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
// Path through a 6 x 3 grid of spaces, snaking left and right.
const GRID: [number, number][] = [
  [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0],
  [5, 1], [4, 1], [3, 1], [2, 1], [1, 1], [0, 1],
  [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2],
];
const CELL_X = 90, CELL_Y = 70, X0 = -225, Y0 = -220;
const spot = (i: number): [number, number] => {
  const [c, r] = GRID[i];
  return [X0 + c * CELL_X, Y0 + r * CELL_Y];
};
const DICE_FACE = [3, 5];

function Die({ cx, cy, size, face }: { cx: number; cy: number; size: number; face: number }) {
  const h = size / 2, q = size * 0.24;
  const pips: [number, number][] = face === 3 ? [[-1, -1], [0, 0], [1, 1]] : face === 5 ? [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]] : [[0, 0]];
  return (
    <g transform={`translate(${f1(cx)} ${f1(cy)})`}>
      <rect x={-h} y={-h + size * 0.12} width={size} height={size} rx={size * 0.18} fill={shade(C.white, 0.15)} />
      <rect x={-h} y={-h} width={size} height={size} rx={size * 0.18} fill={C.white} />
      {pips.map(([px, py], i) => <circle key={i} cx={f1(px * q)} cy={f1(py * q)} r={size * 0.09} fill={C.red} />)}
    </g>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const lid = p.color && p.color !== "none" ? p.color : C.orange;
  const path = p.accent && p.accent !== "none" ? p.accent : C.blue;
  const anim: string = p.anim ?? "none";
  // The first token hops along the path, one space per 20 frames, then holds.
  const step = anim === "move" ? Math.min(GRID.length - 1, Math.floor(f / 20)) : 2;
  const hopT = anim === "move" ? (f % 20) / 20 : 0;
  const [sx, sy] = spot(step), [nx, ny] = spot(Math.min(GRID.length - 1, step + 1));
  const tokX = anim === "move" ? sx + (nx - sx) * hopT : sx;
  const tokY = anim === "move" ? sy + (ny - sy) * hopT - Math.sin(hopT * Math.PI) * 30 : sy;
  const bobY = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const popS = anim === "pop" ? (() => { const tt = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (tt - 1) ** 3 + c1 * (tt - 1) ** 2; })() : 1;
  const pathD = GRID.map(([c, r], i) => `${i === 0 ? "M" : "L"} ${f1(X0 + c * CELL_X)} ${f1(Y0 + r * CELL_Y)}`).join(" ");
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={390} ry={16} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bobY)}) scale(${f1(popS)})`}>
        {/* box base and lid edge */}
        <rect x={-380} y={-300} width={760} height={300} rx={26} fill={shade(lid, 0.25)} />
        <rect x={-360} y={-320} width={720} height={290} rx={22} fill={lid} />
        {/* board inside the lid */}
        <rect x={-330} y={-290} width={660} height={230} rx={18} fill={C.paper} />
        <path d={pathD} fill="none" stroke={C.skyDeep} strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" />
        {GRID.map((_, i) => {
          const [px, py] = spot(i);
          return <circle key={i} cx={f1(px)} cy={f1(py)} r={26} fill={i % 2 === 0 ? path : shade(path, -0.25)} />;
        })}
        {/* start and finish markers */}
        <circle cx={f1(spot(0)[0])} cy={f1(spot(0)[1])} r={12} fill={C.yellow} />
        <circle cx={f1(spot(GRID.length - 1)[0])} cy={f1(spot(GRID.length - 1)[1])} r={12} fill={C.yellow} />
        {/* tokens */}
        <g transform={`translate(${f1(tokX)} ${f1(tokY)})`}>
          <ellipse cx={0} cy={6} rx={22} ry={7} fill={C.shadow} />
          <circle cx={0} cy={0} r={22} fill={C.red} />
          <circle cx={0} cy={-5} r={8} fill={C.white} opacity={0.5} />
        </g>
        <circle cx={f1(spot(7)[0] + 14)} cy={f1(spot(7)[1])} r={20} fill={C.green} />
        <circle cx={f1(spot(12)[0] - 12)} cy={f1(spot(12)[1] + 4)} r={20} fill={C.yellow} />
        {/* dice */}
        <Die cx={265} cy={-235} size={56} face={DICE_FACE[0]} />
        <Die cx={300} cy={-170} size={56} face={DICE_FACE[1]} />
      </g>
    </g>
  );
}
