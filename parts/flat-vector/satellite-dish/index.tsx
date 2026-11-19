import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Satellite dish in 3/4 front view: the concave bowl is visible, with a feed arm and LNB in front of it, on a pole and base.
// Origin = bottom centre (the ground). Room scale: at s = 1 about 600 px wide and 880 px tall. Use s about 0.4 for a rooftop or garden scene.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 80) * 2)})`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const dish = p.color && p.color !== "none" ? p.color : C.white;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const sig = (k: number) => (anim === "pulse" ? 0.2 + 0.8 * (0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 50 - k * 0.9)) : 1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-130} y={-60} width={260} height={60} rx={12} fill={frame} />
        <rect x={-22} y={-430} width={44} height={375} rx={8} fill={frame} />
        {/* bracket from pole to the back of the dish */}
        <path d="M0,-440 L-70,-600" fill="none" stroke={frame} strokeWidth={26} strokeLinecap="round" />
        {/* the dish: rim, dark lower-left of the bowl, bright upper-right of the bowl */}
        <ellipse cx={0} cy={-620} rx={300} ry={240} fill={dish} />
        <ellipse cx={-34} cy={-592} rx={274} ry={212} fill={shade(dish, 0.38)} />
        <ellipse cx={8} cy={-644} rx={254} ry={184} fill={shade(dish, 0.05)} />
        {/* feed arm struts to the LNB */}
        <path d="M-20,-392 L52,-640" fill="none" stroke={frame} strokeWidth={22} strokeLinecap="round" />
        {/* LNB with its arm */}
        <rect x={36} y={-660} width={24} height={40} rx={8} fill={frame} />
        <rect x={18} y={-700} width={72} height={46} rx={12} fill={frame} />
        <rect x={26} y={-694} width={16} height={12} rx={4} fill={C.sky} />
        {/* signal arcs, visible in the pulse mode */}
        {[0, 1, 2].map((k) => (
          <path key={k} d={`M${96 + k * 22},-736 Q${120 + k * 22},-722 ${96 + k * 22},-708`} fill="none" stroke={C.blue} strokeWidth={10} strokeLinecap="round" opacity={sig(k)} />
        ))}
      </g>
    </g>
  );
}
