import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wrought-iron double gate hung between two brick pillars with stone caps and a lantern on each pillar.
// Origin = ground centre. About 840 px wide and 700 px tall at s = 1.
// anim "lights": the two pillar lanterns glow in turn.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const brick = p.color && p.color !== "none" ? p.color : C.redDark;
  const iron = p.color2 && p.color2 !== "none" ? p.color2 : C.inkSoft;
  const anim: string = p.anim ?? "none";
  const lampOn = (k: number) => anim === "lights" && Math.floor(f / 10) % 2 === k;
  const bars = (x0: number, dir: number) => Array.from({ length: 10 }, (_, i) => x0 + dir * i * 30);
  const leftBars = bars(-290, 1);
  const rightBars = bars(290, -1);
  const pillar = (px: number, key: string) => (
    <g key={key}>
      <rect x={px} y={-560} width={90} height={560} fill={brick} />
      <rect x={px} y={-560} width={10} height={560} fill={C.white} opacity={0.12} />
      {Array.from({ length: 15 }, (_, k) => (
        <rect key={k} x={px} y={-36 * (k + 1) - 3} width={90} height={4} fill={shade(brick, 0.3)} />
      ))}
      <rect x={px - 12} y={-40} width={114} height={40} rx={6} fill={C.greyLight} />
      <rect x={px - 18} y={-600} width={126} height={40} rx={6} fill={C.greyLight} />
      <rect x={px - 8} y={-604} width={106} height={10} rx={4} fill={shade(C.greyLight, 0.12)} />
      <path d={`M ${px - 18} -600 L ${px + 45} -652 L ${px + 108} -600 Z`} fill={C.greyLight} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={0} rx={460} ry={18} fill={C.shadow} />
        {pillar(-400, "lp")}
        {pillar(310, "rp")}
        {/* lanterns on the pyramid caps */}
        <rect x={-358} y={-668} width={6} height={18} fill={iron} />
        <rect x={352} y={-668} width={6} height={18} fill={iron} />
        <circle cx={-355} cy={-690} r={22} fill={lampOn(0) ? C.yellow : C.sky} />
        <circle cx={355} cy={-690} r={22} fill={lampOn(1) ? C.yellow : C.sky} />
        {/* gate leaves */}
        <rect x={-300} y={-480} width={296} height={12} rx={4} fill={iron} />
        <rect x={4} y={-480} width={296} height={12} rx={4} fill={iron} />
        <rect x={-300} y={-300} width={296} height={10} rx={4} fill={iron} />
        <rect x={4} y={-300} width={296} height={10} rx={4} fill={iron} />
        <rect x={-300} y={-96} width={296} height={10} rx={4} fill={iron} />
        <rect x={4} y={-96} width={296} height={10} rx={4} fill={iron} />
        {leftBars.map((bx) => (
          <g key={`l${bx}`}>
            <rect x={bx - 4} y={-480} width={8} height={440} fill={iron} />
            <path d={`M ${bx - 10} -480 L ${bx + 10} -480 L ${bx} -512 Z`} fill={iron} />
          </g>
        ))}
        {rightBars.map((bx) => (
          <g key={`r${bx}`}>
            <rect x={bx - 4} y={-480} width={8} height={440} fill={iron} />
            <path d={`M ${bx - 10} -480 L ${bx + 10} -480 L ${bx} -512 Z`} fill={iron} />
          </g>
        ))}
        {/* scroll medallions on each leaf and a centre finial */}
        <circle cx={-150} cy={-388} r={26} fill={iron} />
        <circle cx={-150} cy={-388} r={12} fill={shade(iron, 0.35)} />
        <circle cx={150} cy={-388} r={26} fill={iron} />
        <circle cx={150} cy={-388} r={12} fill={shade(iron, 0.35)} />
        <circle cx={0} cy={-500} r={12} fill={iron} />
        {/* stone threshold */}
        <rect x={-340} y={-14} width={680} height={14} rx={6} fill={C.grey} />
      </g>
    </g>
  );
}
