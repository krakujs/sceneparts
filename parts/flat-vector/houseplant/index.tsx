import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Leafy indoor plant in a pot: broad leaves fanning out of the soil. Origin = centre of the pot base on the floor.
// anim "sway" moves the leaves gently, each one a little out of step.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
/** One leaf rooted at (0,0) and reaching up to (0,-len); left half in the main colour, right half shaded. */
const leaf = (len: number, w: number, c: string, dk: string) => (
  <g>
    <path d={`M 0 0 C ${f1(-w)} ${f1(-len * 0.3)} ${f1(-w * 0.9)} ${f1(-len * 0.8)} 0 ${f1(-len)} C ${f1(w * 0.9)} ${f1(-len * 0.8)} ${f1(w)} ${f1(-len * 0.3)} 0 0 Z`} fill={c} />
    <path d={`M 0 0 C ${f1(w)} ${f1(-len * 0.3)} ${f1(w * 0.9)} ${f1(-len * 0.8)} 0 ${f1(-len)} Z`} fill={dk} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const leafC = p.color && p.color !== "none" ? p.color : C.green;
  const potC = p.color2 && p.color2 !== "none" ? p.color2 : "#C9704E";
  const anim: string = p.anim ?? "none";
  const sway = anim === "sway";
  // [angle, length, width]
  const leaves: [number, number, number][] = [
    [-88, 230, 100], [-64, 300, 110], [-40, 330, 120], [-16, 350, 118], [6, 340, 116],
    [28, 320, 118], [50, 300, 112], [72, 260, 104], [0, 240, 96],
  ];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {leaves.map(([a, len, w], i) => {
          const c = i % 2 ? shade(leafC, -0.12) : leafC;
          const swayDeg = sway ? 3 * Math.sin((f * 2 * Math.PI) / 90 + i * 0.6) : 0;
          return (
            <g key={i} transform={`translate(0 -240) rotate(${f1(a + swayDeg)})`}>
              {leaf(len, w, c, shade(c, 0.2))}
            </g>
          );
        })}
        <rect x={-146} y={-244} width={292} height={52} rx={16} fill={potC} />
        <ellipse cx={0} cy={-244} rx={128} ry={16} fill="#5E3B26" />
        <path d="M -120 -196 L -96 -20 Q -94 -6 -80 -6 H 80 Q 94 -6 96 -20 L 120 -196 Z" fill={potC} />
        <path d="M 40 -196 L 120 -196 L 96 -20 L 40 -20 Z" fill={shade(potC, 0.2)} />
        <rect x={62} y={-244} width={84} height={52} rx={16} fill={shade(potC, 0.2)} />
      </g>
    </g>
  );
}
