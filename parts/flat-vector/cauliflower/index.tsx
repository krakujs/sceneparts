/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector cauliflower: a cream bumpy head cradled by green leaves. Origin = resting point, honours flip.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 5)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(f / 20))})`;
  return "";
};

// curd florets [x, y, r]
const HEAD: [number, number, number][] = [
  [0, -285, 110], [-100, -240, 84], [100, -240, 84], [-55, -355, 84], [55, -355, 84],
  [-120, -305, 66], [120, -305, 66], [0, -395, 70],
];
const LIGHTS: [number, number, number][] = [[-50, -390, 14], [-105, -320, 10], [30, -415, 12], [95, -330, 9]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const anim: string = p.anim ?? "none";
  const curd: string = p.color ?? "#F6EED8";
  const H2 = HEAD.map(([a, b, c]): [number, number, number] => [a * 1.08, -300 + (b + 300) * 1.08, c * 1.08]);
  const leafC = C.green;
  const vein = shade(C.green, 0.3);

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={15} fill={C.shadow} />
      <g transform={motion(anim, f) || undefined}>
        {/* back leaves wrap up the sides */}
        <path d="M 0 0 C -170 -40 -210 -190 -120 -310 C -95 -210 -60 -100 0 0 Z" fill={shade(leafC, 0.1)} />
        <path d="M 0 0 C 170 -40 210 -190 120 -310 C 95 -210 60 -100 0 0 Z" fill={shade(leafC, 0.1)} />
        <path d="M 0 -4 Q -80 -150 -120 -290" stroke={vein} strokeWidth={6} strokeLinecap="round" fill="none" />
        <path d="M 0 -4 Q 80 -150 120 -290" stroke={vein} strokeWidth={6} strokeLinecap="round" fill="none" />
        {/* curd */}
        {H2.map(([cx, cy, r], i) => <circle key={"s" + i} cx={cx} cy={cy} r={r} fill={shade(curd, 0.15)} />)}
        {H2.map(([cx, cy, r], i) => <circle key={"m" + i} cx={cx - 5} cy={cy - 5} r={r - 5} fill={curd} />)}
        {LIGHTS.map(([cx, cy, r], i) => <circle key={"l" + i} cx={cx} cy={cy} r={r} fill="#FFFFFF" opacity={0.5} />)}
        {/* front leaves cradle the base */}
        <path d="M 0 0 C -60 -6 -100 -36 -96 -82 C -70 -50 -36 -24 0 0 Z" fill={leafC} />
        <path d="M 0 0 C 60 -6 100 -36 96 -82 C 70 -50 36 -24 0 0 Z" fill={leafC} />
        <path d="M 0 -2 Q -48 -40 -86 -76" stroke={vein} strokeWidth={5} strokeLinecap="round" fill="none" />
        <path d="M 0 -2 Q 48 -40 86 -76" stroke={vein} strokeWidth={5} strokeLinecap="round" fill="none" />
      </g>
    </g>
  );
}
