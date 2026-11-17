import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wheeled recycling bin with a generic chasing-arrows symbol (three simple arrows in a triangle, no text).
// Origin = bottom centre between the wheels; about 700 px tall at s = 1 (roughly a 1.2 m bin for a person ~1000 px).
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "tilt") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 60) * 2.5)})`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})`;
  return "";
};

// Symbol geometry: centre and radius of the arrow circle, drawn in the bin's front.
const CY = -340, R = 110;
const at = (deg: number) => { const a = (deg * Math.PI) / 180; return [R * Math.cos(a), CY + R * Math.sin(a)] as const; };
const arrow = (a0: number, a1: number) => {
  const [x0, y0] = at(a0), [x1, y1] = at(a1), [tx, ty] = at(a1 + 16);
  const ux = Math.cos((a1 * Math.PI) / 180), uy = Math.sin((a1 * Math.PI) / 180);
  const head = [
    [x1 + 26 * ux, y1 + 26 * uy], [tx, ty], [x1 - 26 * ux, y1 - 26 * uy],
  ].map(([hx, hy]) => `${hx.toFixed(1)},${hy.toFixed(1)}`).join(" ");
  return { d: `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${R} ${R} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`, head };
};
const ARROW = arrow(-100, -20);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.green;
  const lid = shade(c, 0.2);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* wheels, half hidden by the body */}
        <circle cx={-150} cy={-34} r={34} fill={C.inkSoft} />
        <circle cx={150} cy={-34} r={34} fill={C.inkSoft} />
        {/* tapered body with a darker right side */}
        <path d="M -200 -620 L 200 -620 L 170 -100 Q 166 -60 130 -60 L -130 -60 Q -166 -60 -170 -100 Z" fill={c} />
        <path d="M 96 -612 L 200 -612 L 170 -100 Q 166 -60 130 -60 L 96 -60 Z" fill={shade(c, 0.2)} />
        {/* three chasing arrows, each one turned 120 degrees from the last */}
        {[0, 120, 240].map((k) => (
          <g key={k} transform={`rotate(${k} 0 ${CY})`}>
            <path d={ARROW.d} stroke={C.white} strokeWidth={34} fill="none" />
            <polygon points={ARROW.head} fill={C.white} />
          </g>
        ))}
        {/* lid */}
        <rect x={-226} y={-676} width={452} height={64} rx={26} fill={lid} />
        <rect x={-190} y={-668} width={380} height={10} rx={5} fill={C.white} opacity={0.2} />
      </g>
    </g>
  );
}
