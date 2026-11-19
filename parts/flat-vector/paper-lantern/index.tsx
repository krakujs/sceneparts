import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Round paper lantern with ribs, gold caps and a tassel, hanging from a short cord.
// Origin = the top hook point (the lantern hangs from y; default y puts it in the upper half of the frame).
// About 360 px wide and 600 px tall at s = 1 including the tassel.
// anim "sway": the lantern swings like a pendulum and the tassel trails behind. anim "glow": the light pulses.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 300;
  const red = p.color && p.color !== "none" ? p.color : C.red;
  const gold = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const swing = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 90) * 5 : 0;
  const tassel = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 90 - 0.6) * 9 : 0;
  const glow = anim === "glow" ? 0.2 + 0.12 * (0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 60)) : 0.22;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${f1(swing)})`}>
        <path d="M 0 0 L 0 44" stroke={C.inkSoft} strokeWidth={5} strokeLinecap="round" />
        <circle cx={0} cy={0} r={8} fill={C.inkSoft} />
        {/* soft glow around the paper */}
        <circle cx={0} cy={270} r={250} fill={C.yellow} opacity={glow} />
        {/* paper body */}
        <ellipse cx={0} cy={270} rx={180} ry={200} fill={red} />
        <ellipse cx={-58} cy={270} rx={150} ry={170} fill={shade(red, 0.12)} opacity={0.35} />
        {[-110, -55, 0, 55, 110].map((rx) => (
          <path key={rx} d={`M ${rx} 74 Q ${rx * 1.7} 270 ${rx} 466`} fill="none" stroke={shade(red, 0.25)} strokeWidth={8} opacity={0.5} />
        ))}
        <ellipse cx={-96} cy={210} rx={20} ry={58} fill={C.white} opacity={0.22} transform="rotate(-14 -96 210)" />
        {/* gold caps */}
        <rect x={-64} y={40} width={128} height={26} rx={10} fill={gold} />
        <rect x={-64} y={460} width={128} height={26} rx={10} fill={shade(gold, 0.12)} />
        <circle cx={0} cy={38} r={12} fill={shade(gold, 0.2)} />
        {/* tassel swinging from the bottom cap */}
        <g transform={`rotate(${f1(tassel)} 0 486)`}>
          <line x1={0} y1={486} x2={0} y2={522} stroke={shade(gold, 0.15)} strokeWidth={5} />
          <circle cx={0} cy={530} r={15} fill={gold} />
          {[-16, -8, 0, 8, 16].map((dx) => (
            <line key={dx} x1={0} y1={544} x2={dx * 1.6} y2={604} stroke={gold} strokeWidth={6} strokeLinecap="round" />
          ))}
        </g>
      </g>
    </g>
  );
}
