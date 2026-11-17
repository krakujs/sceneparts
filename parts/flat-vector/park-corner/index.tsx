import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Park corner: a round-topped tree, a wooden bench on a paved path, and a tall lamp post with a glass lantern.
// Origin = bottom centre on the ground under the bench. About 800 px wide and 960 px tall at s = 1.
// anim "lights": the lantern glows on and off and the leaves sway with f.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const leaf = p.color && p.color !== "none" ? p.color : C.green;
  const wood = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  const sway = anim === "lights" ? Math.sin((f / 50) * Math.PI * 2) * 4 : 0;
  const lit = anim === "lights" && Math.floor(f / 30) % 2 === 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={8} rx={400} ry={18} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* paved path */}
        <path d="M -400 -20 L 400 -20 L 330 0 L -330 0 Z" fill={C.greyLight} />
        <path d="M -300 -4 L 300 -4" stroke={C.grey} strokeWidth={3} />
        {/* tree: trunk and round crown */}
        <rect x={-270} y={-420} width={34} height={410} rx={10} fill={wood} />
        <rect x={-262} y={-420} width={8} height={410} fill={shade(wood, 0.2)} />
        <g transform={`translate(${f1(sway)} 0)`}>
          <circle cx={-252} cy={-560} r={150} fill={leaf} />
          <circle cx={-360} cy={-480} r={100} fill={leaf} />
          <circle cx={-150} cy={-480} r={100} fill={leaf} />
          <circle cx={-252} cy={-660} r={110} fill={shade(leaf, 0.1)} />
          <circle cx={-300} cy={-600} r={28} fill={C.white} opacity={0.15} />
        </g>
        {/* bench on the path */}
        <rect x={60} y={-190} width={260} height={22} rx={8} fill={wood} />
        <rect x={60} y={-150} width={260} height={18} rx={8} fill={shade(wood, 0.1)} />
        <rect x={70} y={-130} width={18} height={130} fill={C.greyDark} />
        <rect x={292} y={-130} width={18} height={130} fill={C.greyDark} />
        <rect x={60} y={-250} width={260} height={22} rx={8} fill={wood} />
        <rect x={60} y={-250} width={260} height={8} rx={4} fill={shade(wood, 0.2)} />
        {/* lamp post with a glass lantern */}
        <rect x={352} y={-820} width={16} height={820} fill={C.greyDark} />
        <rect x={322} y={-300} width={76} height={20} rx={8} fill={C.greyDark} />
        <rect x={320} y={-860} width={80} height={44} rx={12} fill={C.greyDark} />
        <path d="M 324 -860 L 360 -900 L 396 -860 Z" fill={C.greyDark} />
        <rect x={330} y={-848} width={60} height={24} rx={6} fill={lit ? C.yellow : C.sky} />
        <circle cx={360} cy={-836} r={8} fill={lit ? C.white : C.grey} opacity={lit ? 0.9 : 0.4} />
      </g>
    </g>
  );
}
