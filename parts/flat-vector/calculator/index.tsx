import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pocket calculator: solar strip, a display of bars and a 4 x 5 key grid. Origin = bottom centre.
// anim "tap": the equals key is pressed down again and again.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const COLS = [-105, -35, 35, 105];
const ROWS = [-350, -280, -210, -140, -70];
// Key kinds per [row][col]: n = number, f = function, o = operator, e = equals.
const KEYS = [
  "fffo", "nnno", "nnno", "nnno", "nnne",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.greyDark;
  const anim: string = p.anim ?? "none";
  const press = anim === "tap" ? Math.max(0, Math.sin((f * 2 * Math.PI) / 45)) : 0;
  const fill = (kind: string) => (kind === "n" ? C.white : kind === "f" ? C.greyLight : kind === "o" ? C.orange : C.teal);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-170} y={-560} width={340} height={560} rx={36} fill={body} />
        <rect x={-150} y={-542} width={300} height={6} rx={3} fill={C.white} opacity={0.2} />
        <rect x={-60} y={-548} width={120} height={8} rx={4} fill={shade(body, 0.35)} />
        <rect x={-140} y={-520} width={280} height={120} rx={14} fill={C.paper} />
        {[[220, -478, 28], [140, -436, 26]].map(([w, yy, h], i) => (
          <rect key={i} x={112 - w} y={yy} width={w} height={h} rx={8} fill={C.ink} />
        ))}
        {ROWS.map((ry, r) =>
          COLS.map((cx, c) => {
            const kind = KEYS[r][c];
            const isEq = kind === "e";
            const dy = isEq ? 4 * press : 0;
            return (
              <g key={`${r}-${c}`} transform={`translate(0 ${f1(dy)})`}>
                <rect x={cx - 28} y={ry - 24} width={56} height={56} rx={14} fill={shade(fill(kind), 0.25)} />
                <rect x={cx - 28} y={ry - 28} width={56} height={56} rx={14} fill={isEq && press > 0.5 ? shade(C.teal, 0.1) : fill(kind)} />
                <rect x={cx - 16} y={ry - 18} width={22} height={6} rx={3} fill={C.white} opacity={kind === "n" ? 0.6 : 0.4} />
              </g>
            );
          }),
        )}
      </g>
    </g>
  );
}
