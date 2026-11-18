import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Baobab: a huge fat bottle-shaped trunk with a small flat crown of stubby branches. Origin = centre of the trunk base on the ground.
// About 900 px wide and 960 px tall at s = 1. anim sway moves the small crown.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const leaf = p.color && p.color !== "none" ? p.color : C.green;
  const bark = p.color2 && p.color2 !== "none" ? p.color2 : "#B49A7C";
  const anim: string = p.anim ?? "none";
  const sway = anim === "sway" ? 1.5 * Math.sin((f * 2 * Math.PI) / 100) : 0;
  const dark = shade(leaf, 0.2);
  const tips: [number, number, number, number][] = [[-320, -745, 130, 60], [320, -740, 130, 60], [-150, -810, 110, 55], [150, -810, 110, 55], [0, -880, 150, 60]];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={280} ry={20} fill={C.shadow} />
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        {/* bottle trunk */}
        <path d="M -150 0 C -230 -40 -235 -200 -210 -360 C -190 -500 -130 -620 -120 -760 L 120 -760 C 130 -620 190 -500 210 -360 C 235 -200 230 -40 150 0 Z" fill={bark} />
        <path d="M 0 0 L 150 0 C 230 -40 235 -200 210 -360 C 190 -500 130 -620 120 -760 L 0 -760 Z" fill={shade(bark, 0.18)} />
        {[[-70, -430, -300, -170], [60, -460, 80, -250], [-20, -560, -10, -330]].map(([a, b, c, d], i) => (
          <path key={i} d={`M ${a} ${b} Q ${c} ${(b + d) / 2} ${d * 0.6 + c * 0.4} ${d}`} stroke={shade(bark, 0.25)} strokeWidth={8} strokeLinecap="round" fill="none" opacity={0.6} />
        ))}
        {/* stubby branches */}
        <path d="M -30 -730 Q -180 -760 -300 -740" stroke={bark} strokeWidth={46} strokeLinecap="round" fill="none" />
        <path d="M 30 -730 Q 190 -760 300 -730" stroke={shade(bark, 0.15)} strokeWidth={46} strokeLinecap="round" fill="none" />
        <path d="M 0 -740 Q -20 -820 0 -860" stroke={bark} strokeWidth={44} strokeLinecap="round" fill="none" />
        <g transform={`rotate(${f1(sway)} 0 -760)`}>
          {tips.map(([tx, ty, rx, ry], i) => <ellipse key={`s${i}`} cx={tx + 10} cy={ty + 18} rx={rx} ry={ry} fill={dark} />)}
          {tips.map(([tx, ty, rx, ry], i) => <ellipse key={`m${i}`} cx={tx} cy={ty} rx={rx} ry={ry} fill={leaf} />)}
        </g>
      </g>
    </g>
  );
}
