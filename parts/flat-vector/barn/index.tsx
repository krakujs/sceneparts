import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Red barn, front view: gambrel (two-slope) roof, a hay-loft door above a pair of white X-braced doors.
// Origin = centre of the floor line. About 820 px wide and 780 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const red = p.color && p.color !== "none" ? p.color : C.red;
  const white = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const lamp = anim === "lights" && Math.floor(f / 12) % 2 ? C.yellow : C.sand;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={420} ry={22} fill={C.shadow} />
        {/* gambrel roof: steep lower slopes, shallow top */}
        <path d="M -430 -470 L -330 -760 L 330 -760 L 430 -470 Z" fill={shade(red, 0.12)} />
        <path d="M -460 -440 L -340 -720 L -300 -740 L -420 -460 Z" fill={white} opacity={0.5} />
        <path d="M -330 -760 L 330 -760 L 300 -780 L -300 -780 Z" fill={C.greyDark} />
        {/* walls */}
        <rect x={-380} y={-470} width={760} height={470} rx={6} fill={red} />
        <rect x={-380} y={-40} width={760} height={40} fill={shade(red, 0.2)} />
        {/* hay-loft door with a hoist beam */}
        <rect x={-110} y={-640} width={220} height={150} rx={6} fill={shade(red, 0.3)} />
        <rect x={-100} y={-630} width={200} height={130} rx={4} fill={C.brownDark} />
        <rect x={-130} y={-660} width={260} height={16} rx={4} fill={white} />
        <rect x={-6} y={-700} width={12} height={40} fill={C.greyDark} />
        <rect x={-30} y={-615} width={60} height={24} rx={4} fill={lamp} />
        {/* white trim */}
        <rect x={-380} y={-480} width={760} height={12} fill={white} />
        {/* double doors with X bracing */}
        <rect x={-210} y={-330} width={420} height={290} rx={4} fill={white} />
        <rect x={-196} y={-316} width={184} height={262} rx={4} fill={shade(red, 0.05)} />
        <rect x={12} y={-316} width={184} height={262} rx={4} fill={shade(red, 0.05)} />
        <path d="M -196 -316 L -12 -54 M -12 -316 L -196 -54 M 12 -316 L 196 -54 M 196 -316 L 12 -54" stroke={white} strokeWidth={14} strokeLinecap="round" />
        <rect x={-210} y={-330} width={420} height={12} fill={shade(white, 0.1)} />
        {/* side ground step */}
        <rect x={-260} y={-40} width={520} height={20} rx={6} fill={C.greyLight} />
      </g>
    </g>
  );
}
