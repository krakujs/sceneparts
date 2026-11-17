import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Bus stop: a shelter with a roof, glass back panel, bench, and a pole beside it with a round sign showing a bus pictogram.
// Origin = floor centre under the bench. Room scale: about 810 px wide and 800 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const roof = p.color && p.color !== "none" ? p.color : C.blue;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* glass back panel with reflections */}
        <rect x={-290} y={-730} width={580} height={480} fill={C.skyDeep} />
        <path d="M -230 -730 L -180 -730 L -250 -250 L -290 -250 Z" fill={C.white} opacity={0.4} />
        <path d="M 120 -730 L 140 -730 L 80 -250 L 60 -250 Z" fill={C.white} opacity={0.3} />
        {/* bench */}
        <rect x={-180} y={-210} width={18} height={210} fill={frame} />
        <rect x={162} y={-210} width={18} height={210} fill={frame} />
        <rect x={-200} y={-240} width={400} height={30} rx={8} fill={C.brown} />
        {/* roof and posts */}
        <rect x={-316} y={-740} width={22} height={740} fill={frame} />
        <rect x={294} y={-740} width={22} height={740} fill={frame} />
        <rect x={-330} y={-800} width={660} height={60} rx={18} fill={roof} />
        <rect x={-320} y={-752} width={640} height={12} fill={shade(roof, 0.25)} />
        {/* pole with a round bus sign */}
        <rect x={392} y={-680} width={16} height={680} fill={frame} />
        <circle cx={400} cy={-745} r={80} fill={roof} />
        <rect x={360} y={-770} width={80} height={46} rx={10} fill={C.white} />
        <rect x={368} y={-762} width={24} height={22} rx={4} fill={C.sky} />
        <rect x={408} y={-762} width={24} height={22} rx={4} fill={C.sky} />
        <circle cx={370} cy={-718} r={10} fill={C.ink} />
        <circle cx={430} cy={-718} r={10} fill={C.ink} />
      </g>
    </g>
  );
}
