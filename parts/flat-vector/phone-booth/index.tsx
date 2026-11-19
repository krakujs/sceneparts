import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Generic glass phone booth, front view: glass walls in a frame, a roof with a blank sign, a telephone with keypad
// and handset mounted on the back wall, a door handle and an interior lamp. Origin = bottom centre; it stands on y.
// No national colours, crowns or emblems. About 500 px wide and 860 px tall at s = 1.
// anim "lights": the interior lamp switches on and glows. "pop" scales in.
const f1 = (v: number) => v.toFixed(1);
const popScale = (anim: string, f: number) => {
  if (anim !== "pop") return 1;
  const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const frame = p.color && p.color !== "none" ? p.color : C.teal;
  const accent = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const lampOn = anim === "lights" ? Math.min(1, f / 30) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={280} ry={18} fill={C.shadow} />
      <g transform={`scale(${f1(popScale(anim, f))})`}>
        <rect x={-260} y={-30} width={520} height={30} rx={8} fill={C.greyDark} />
        {/* glass walls */}
        <rect x={-200} y={-700} width={400} height={670} rx={14} fill={C.sky} />
        <rect x={-170} y={-680} width={28} height={620} rx={10} fill={C.white} opacity={0.45} />
        <rect x={-128} y={-680} width={10} height={620} fill={C.white} opacity={0.35} />
        {/* interior lamp */}
        <rect x={-110} y={-688} width={220} height={12} rx={6} fill={lampOn > 0 ? C.yellow : C.greyLight} opacity={lampOn > 0 ? lampOn : 1} />
        {/* frame */}
        <rect x={-220} y={-700} width={26} height={670} rx={6} fill={frame} />
        <rect x={194} y={-700} width={26} height={670} rx={6} fill={frame} />
        <rect x={-200} y={-420} width={400} height={16} fill={frame} />
        <rect x={-236} y={-760} width={472} height={60} rx={12} fill={frame} />
        <rect x={110} y={-360} width={14} height={70} rx={7} fill={C.greyDark} />
        {/* telephone on the back wall */}
        <rect x={-80} y={-600} width={160} height={170} rx={18} fill={C.greyDark} />
        <rect x={-96} y={-628} width={192} height={34} rx={17} fill={C.ink} />
        <rect x={-50} y={-596} width={100} height={16} rx={4} fill={C.sky} />
        {[-556, -526, -496].map((cy) =>
          [-36, 0, 36].map((cx) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={9} fill={C.greyLight} />),
        )}
        {/* roof and blank sign */}
        <rect x={-250} y={-790} width={500} height={36} rx={12} fill={shade(frame, 0.15)} />
        <rect x={-140} y={-862} width={280} height={72} rx={12} fill={accent} />
        <rect x={-120} y={-846} width={240} height={40} rx={8} fill={C.white} />
      </g>
    </g>
  );
}
