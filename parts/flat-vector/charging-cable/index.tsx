import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Thick coiled charging cable with a chunky plug head and a USB-style connector. Stroke weight 26 px for bold lines.
// Origin = bottom centre (the floor line). Hero scale: at s = 1 about 490 px wide and 280 px tall. Use s about 0.35 next to a person.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const RINGS = [0, 1, 2, 3, 4];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const cable = p.color && p.color !== "none" ? p.color : C.inkSoft;
  const plug = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={40} cy={0} rx={270} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* coil: stacked loops, lower half of each loop in shade to read as depth */}
        {RINGS.map((i) => {
          const cy = -50 - i * 46;
          return (
            <g key={i}>
              <ellipse cx={-80} cy={cy} rx={110} ry={30} fill="none" stroke={cable} strokeWidth={26} />
              <path d={`M-190,${cy} A110,30 0 0 0 30,${cy}`} fill="none" stroke={shade(cable, 0.25)} strokeWidth={26} />
            </g>
          );
        })}
        {/* cable tail to the plug */}
        <path d="M30,-50 C110,-50 80,-22 150,-22" fill="none" stroke={cable} strokeWidth={26} strokeLinecap="round" />
        {/* chunky plug head with grip ridges */}
        <rect x={140} y={-72} width={120} height={72} rx={14} fill={plug} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={160 + i * 26} y={-60} width={10} height={48} rx={5} fill={shade(plug, 0.25)} />
        ))}
        {/* metal USB-style tongue */}
        <rect x={258} y={-50} width={50} height={28} rx={5} fill={C.greyLight} />
        <rect x={266} y={-43} width={34} height={14} rx={3} fill={C.grey} />
      </g>
    </g>
  );
}
