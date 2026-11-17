/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector broccoli: a bumpy green crown made of clustered circles on a pale green stalk.
// Origin = resting point (bottom centre), honours flip.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 5)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(f / 20))})`;
  return "";
};

// crown florets: [x, y, r] in local units, stalk top hidden under the crown
const FLORETS: [number, number, number][] = [
  [0, -300, 100], [-100, -245, 82], [100, -245, 82], [-150, -185, 66], [150, -185, 66],
  [-60, -355, 86], [60, -355, 86], [0, -400, 78], [-125, -325, 68], [125, -325, 68],
  [-30, -225, 78], [35, -225, 78],
];
const LIGHTS: [number, number, number][] = [[-60, -395, 18], [-120, -320, 14], [40, -410, 16], [150, -225, 12]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const anim: string = p.anim ?? "none";
  const green: string = p.color ?? C.green;
  const stalkC = "#CFE8A8";

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={15} fill={C.shadow} />
      <g transform={motion(anim, f) || undefined}>
        <path d="M -62 0 Q -50 -130 -40 -245 L 40 -245 Q 50 -130 62 0 Z" fill={shade(stalkC, 0.12)} />
        <path d="M -52 0 Q -42 -130 -34 -245 L 22 -245 Q 26 -130 40 0 Z" fill={stalkC} />
        {FLORETS.map(([cx, cy, r], i) => <circle key={"s" + i} cx={cx} cy={cy} r={r} fill={shade(green, 0.25)} />)}
        {FLORETS.map(([cx, cy, r], i) => <circle key={"m" + i} cx={cx - 5} cy={cy - 5} r={r - 5} fill={green} />)}
        {LIGHTS.map(([cx, cy, r], i) => <circle key={"l" + i} cx={cx} cy={cy} r={r} fill={C.lime} opacity={0.45} />)}
      </g>
    </g>
  );
}
