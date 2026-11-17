import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Extension cord: a power strip lying flat with four sockets and a power switch, a coiled cable leaving one end
// and a plug at the end of the coil. Origin = bottom centre (the strip rests on y), hero size.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const SOCKETS = [-156, -92, -28, 36];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.yellow;
  const dk = shade(c, 0.2);

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-80} cy={0} rx={300} ry={12} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* cable: from the strip's left end down into the coil */}
        <path d="M -200 -60 C -250 -60 -262 -20 -300 -20" fill="none" stroke={C.inkSoft} strokeWidth={16} strokeLinecap="round" />
        {/* coiled cable, a stack of flat loops */}
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={i} cx={-340} cy={-18 - i * 14} rx={78 - i * 4} ry={20} fill="none" stroke={C.inkSoft} strokeWidth={14} />
        ))}
        {/* plug at the end of the coil */}
        <rect x={-440} y={-40} width={70} height={36} rx={12} fill={C.inkSoft} />
        <rect x={-466} y={-30} width={30} height={8} rx={4} fill={C.greyLight} />
        <rect x={-466} y={-16} width={30} height={8} rx={4} fill={C.greyLight} />

        {/* strip body with a shaded lower edge */}
        <rect x={-200} y={-110} width={360} height={110} rx={20} fill={c} />
        <rect x={-200} y={-22} width={360} height={22} rx={10} fill={dk} />
        {/* four sockets, each with two slots */}
        {SOCKETS.map((sx) => (
          <g key={sx}>
            <rect x={sx} y={-92} width={52} height={60} rx={10} fill={dk} />
            <rect x={sx + 12} y={-70} width={8} height={18} rx={3} fill={C.ink} />
            <rect x={sx + 32} y={-70} width={8} height={18} rx={3} fill={C.ink} />
          </g>
        ))}
        {/* power switch and pilot light at the right end */}
        <rect x={100} y={-80} width={44} height={24} rx={8} fill={C.greyDark} />
        <circle cx={122} cy={-96} r={6} fill={C.green} />
      </g>
    </g>
  );
}
