import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Three-blade wind turbine on a tapered tower with a nacelle. Room scale (about 1000 px tall).
// Origin = centre of the foundation on the ground. anim "spin": the blades rotate.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 0.8)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const BLADE = "M -16 0 C -36 -80 -22 -200 0 -280 C 22 -200 36 -80 16 0 Z";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.white;
  const anim: string = p.anim ?? "none";
  const angle = anim === "spin" ? f * 3 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-70} y={-16} width={140} height={16} rx={4} fill={C.greyDark} />
        <polygon points="-45,0 45,0 20,-700 -20,-700" fill={body} />
        <polygon points="10,0 45,0 20,-700 4,-700" fill={shade(body, 0.15)} />
        <rect x={-12} y={-90} width={24} height={50} rx={10} fill={C.greyDark} />
        <rect x={-40} y={-730} width={130} height={56} rx={26} fill={body} />
        <rect x={-40} y={-704} width={130} height={30} rx={14} fill={shade(body, 0.15)} />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(100 -702) rotate(${f1(angle + i * 120)})`}>
            <path d={BLADE} fill={body} />
            <path d="M 0 -8 C -8 -80 -6 -180 0 -260 C 6 -180 8 -80 0 -8 Z" fill={shade(body, 0.12)} />
          </g>
        ))}
        <circle cx={100} cy={-702} r={26} fill={shade(body, 0.15)} />
        <circle cx={100} cy={-702} r={10} fill={C.greyDark} />
      </g>
    </g>
  );
}
