import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pharmacy front: a green plus-shaped sign (a generic health symbol, not a red cross), a pill icon in the window and a door.
// Origin = bottom centre on the ground. About 620 px wide and 760 px tall at s = 1.
// anim "lights": the pill in the window rocks gently with "lights" (a slow tilt).
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.white;
  const green = p.color2 && p.color2 !== "none" ? p.color2 : C.green;
  const anim: string = p.anim ?? "none";
  const tilt = anim === "lights" ? Math.sin((f / 40) * Math.PI * 2) * 12 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={8} rx={330} ry={18} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* building */}
        <rect x={-300} y={-560} width={600} height={560} rx={14} fill={wall} />
        <rect x={-320} y={-600} width={640} height={50} rx={10} fill={green} />
        <rect x={-300} y={-22} width={600} height={14} fill={shade(wall, 0.12)} />
        {/* green plus sign on a bracket */}
        <rect x={-6} y={-690} width={8} height={100} fill={C.greyDark} />
        <rect x={-68} y={-770} width={136} height={136} rx={22} fill={green} />
        <rect x={-22} y={-748} width={44} height={92} rx={8} fill={C.white} />
        <rect x={-46} y={-724} width={92} height={44} rx={8} fill={C.white} />
        {/* window with a pill icon */}
        <rect x={-270} y={-400} width={260} height={230} rx={12} fill={C.greyDark} />
        <rect x={-258} y={-388} width={236} height={206} rx={8} fill={C.sky} />
        <path d="M -230 -388 L -200 -388 L -240 -182 L -262 -182 Z" fill={C.white} opacity={0.35} />
        <g transform={`translate(-140 -290) rotate(${f1(-35 + tilt)})`}>
          <rect x={-70} y={-30} width={140} height={60} rx={30} fill={C.white} />
          <rect x={0} y={-30} width={70} height={60} rx={30} fill={C.blue} />
          <rect x={-56} y={-20} width={40} height={10} rx={5} fill={C.white} opacity={0.6} />
        </g>
        {/* door and small window */}
        <rect x={60} y={-400} width={170} height={378} rx={12} fill={C.brownDark} />
        <rect x={78} y={-382} width={134} height={130} rx={8} fill={C.sky} />
        <circle cx={206} cy={-100} r={9} fill={C.yellow} />
        <rect x={80} y={-236} width={130} height={10} fill={shade(green, 0.2)} />
        <rect x={-300} y={-12} width={600} height={12} fill={C.greyDark} />
      </g>
    </g>
  );
}
