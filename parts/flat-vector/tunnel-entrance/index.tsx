import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tunnel entrance: a concrete portal arch set into a grassy hillside, with a dark tunnel mouth and a road in front.
// Origin = ground centre at the foot of the portal; the road runs across the frame below it.
// Room scale: about 1000 px wide and 560 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const hill = p.color && p.color !== "none" ? p.color : C.green;
  const concrete = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* hillside with a shaded side */}
        <path d="M -500 0 C -500 -330 -300 -560 0 -560 C 300 -560 500 -330 500 0 Z" fill={hill} />
        <path d="M 0 -560 C 300 -560 500 -330 500 0 L 300 0 C 290 -260 170 -440 0 -560 Z" fill={shade(hill, 0.15)} />
        {/* concrete portal and dark tunnel mouth */}
        <path d="M -240 0 V -300 A 240 240 0 0 1 240 -300 V 0 Z" fill={concrete} />
        <path d="M -150 0 V -270 A 150 150 0 0 1 150 -270 V 0 Z" fill={C.ink} />
        <path d="M -90 0 V -260 A 90 90 0 0 1 90 -260 V 0 Z" fill={C.inkSoft} opacity={0.6} />
        <circle cx={0} cy={-400} r={8} fill={C.yellow} />
        {/* road in front, with centre dashes */}
        <rect x={-520} y={0} width={1040} height={44} fill={C.greyDark} />
        {[-460, -320, -180, -40, 100, 240, 380].map((dx) => (
          <rect key={dx} x={dx} y={18} width={70} height={8} rx={4} fill={C.white} />
        ))}
      </g>
    </g>
  );
}
