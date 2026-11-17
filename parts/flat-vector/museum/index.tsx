import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Museum: grand stairs up to a columned front with a pediment and blank hanging banners. Origin = bottom centre. About 880 px wide and 800 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : "#F2EADB";
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : "#E0A21F";
  const anim: string = p.anim ?? "none";
  const lit = (i: number) => (anim === "lights" ? 0.45 + 0.55 * (0.5 + 0.5 * Math.sin((f - i * 12) / 6)) : 1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={-6} rx={470} ry={22} fill={C.shadow} />
        {/* grand stairs */}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={-300 - i * 30} y={-16 - i * 22} width={600 + i * 60} height={22} rx={6} fill={shade(wall, 0.08 + i * 0.05)} />
        ))}
        <rect x={-420} y={-120} width={840} height={20} rx={6} fill={shade(wall, 0.25)} />
        {/* body and pediment */}
        <rect x={-380} y={-660} width={760} height={560} rx={10} fill={wall} />
        <path d="M -440 -660 L 0 -790 L 440 -660 Z" fill={roof} />
        <path d="M -390 -660 L 0 -760 L 390 -660 Z" fill={shade(roof, 0.12)} />
        <rect x={-440} y={-668} width={880} height={18} rx={6} fill={shade(roof, 0.2)} />
        {/* columns */}
        {[-310, -200, -90, 90, 200, 310].map((cx) => (
          <g key={cx}>
            <rect x={cx - 22} y={-640} width={44} height={520} fill={C.white} />
            <rect x={cx + 8} y={-640} width={14} height={520} fill={shade(C.white, 0.12)} />
          </g>
        ))}
        {/* hanging banners (blank) */}
        {[-145, 145].map((bx) => (
          <g key={bx}>
            <rect x={bx - 36} y={-560} width={72} height={200} fill={C.orange} />
            <rect x={bx - 36} y={-560} width={72} height={20} fill={shade(C.orange, 0.2)} />
            <path d={`M ${bx - 36} -360 L ${bx} -330 L ${bx + 36} -360 Z`} fill={C.orange} />
          </g>
        ))}
        {/* central door */}
        <rect x={-70} y={-340} width={140} height={220} rx={10} fill={C.brownDark} />
        <rect x={-58} y={-328} width={52} height={200} rx={6} fill={C.skyDeep} />
        <rect x={6} y={-328} width={52} height={200} rx={6} fill={C.skyDeep} />
      </g>
    </g>
  );
}
