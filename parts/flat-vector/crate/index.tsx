import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Slatted wooden shipping crate in front 3/4 view: about 660 px wide and 600 px tall at s = 1.
// Origin = bottom centre (stands on y). anim: bob, wobble, pop.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : C.sand;
  const edge = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={340} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* right side face, in shade */}
        <path d="M300 -600 L380 -640 L380 -40 L300 0 Z" fill={shade(wood, 0.25)} />
        {/* top, in light */}
        <path d="M-300 -600 L-220 -640 L380 -640 L300 -600 Z" fill={C.white} opacity={0.25} />
        {/* front face */}
        <rect x={-300} y={-600} width={600} height={600} rx={8} fill={wood} />
        {/* front slats */}
        {[-520, -440, -360, -280, -200, -120].map((sy) => (
          <rect key={sy} x={-300} y={sy} width={600} height={44} rx={6} fill={shade(wood, 0.12)} />
        ))}
        {/* cross battens */}
        {[-300, 0, 280].map((bx) => (
          <rect key={bx} x={bx - 22} y={-600} width={44} height={600} fill={edge} />
        ))}
        {/* metal corner brackets */}
        {[[-300, -600], [262, -600], [-300, -48], [262, -48]].map(([cx, cy], i) => (
          <rect key={i} x={cx} y={cy} width={38} height={48} rx={6} fill={C.greyDark} />
        ))}
        {/* top board line */}
        <rect x={-300} y={-600} width={600} height={18} rx={4} fill={shade(wood, 0.2)} />
      </g>
    </g>
  );
}
