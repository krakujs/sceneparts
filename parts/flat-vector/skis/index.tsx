import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// A pair of skis standing upright on their tails, tips up, with two ski poles leaning out beside them.
// Origin = bottom centre; the tails rest on y.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const base = p.color && p.color !== "none" ? p.color : C.blue;
  const stripe = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 40) + 1) * 8 : 0;
  const sway = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 60) * 2 : 0;
  // one ski: tail at the bottom (y 0), tip at the top (y -780), centred on cx
  const ski = (cx: number) => (
    <g>
      <path d={`M ${f1(cx - 34)} -30 Q ${f1(cx - 40)} -400 ${f1(cx - 30)} -700 Q ${f1(cx)} -790 ${f1(cx + 30)} -700 Q ${f1(cx + 40)} -400 ${f1(cx + 34)} -30 Q ${f1(cx)} 0 ${f1(cx - 34)} -30 Z`} fill={base} />
      <path d={`M ${f1(cx + 10)} -30 Q ${f1(cx + 16)} -400 ${f1(cx + 8)} -690 Q ${f1(cx + 30)} -700 ${f1(cx + 30)} -700 Q ${f1(cx + 40)} -400 ${f1(cx + 34)} -30 Q ${f1(cx + 20)} -10 ${f1(cx + 10)} -30 Z`} fill={shade(base, 0.2)} />
      <rect x={cx - 26} y={-420} width={52} height={10} rx={5} fill={stripe} />
      <rect x={cx - 30} y={-300} width={60} height={26} rx={8} fill={C.ink} />
      <rect x={cx - 22} y={-300} width={44} height={8} rx={4} fill={C.greyDark} />
    </g>
  );
  const pole = (sx: number) => (
    <g>
      <line x1={sx} y1={-650} x2={sx + 40 * Math.sign(sx)} y2={-4} stroke={C.greyDark} strokeWidth={8} strokeLinecap="round" />
      <circle cx={sx} cy={-660} r={22} fill={C.ink} />
      <ellipse cx={sx + 40 * Math.sign(sx) * 0.9} cy={-6} rx={26} ry={7} fill={C.greyDark} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y + bob)}) scale(${p.flip ? -s : s} ${s}) rotate(${f1(sway)})`}>
      <ellipse cx={0} cy={0} rx={240} ry={12} fill={C.shadow} />
      {pole(-190)}
      {pole(190)}
      {ski(-62)}
      {ski(62)}
    </g>
  );
}
