/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector strawberry: heart-shaped berry with yellow seeds and a green leafy cap.
// Origin = resting point (bottom tip touches y), honours flip.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 5)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(f / 20))})`;
  return "";
};
const leaf = (L: number, W: number) => `M 0 0 Q ${f1(L / 2)} ${f1(-W)} ${f1(L)} 0 Q ${f1(L / 2)} ${f1(W)} 0 0 Z`;

const BODY = "M 0 -205 C -40 -255 -150 -265 -160 -190 C -168 -130 -90 -50 0 0 C 90 -50 168 -130 160 -190 C 150 -265 40 -255 0 -205 Z";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const anim: string = p.anim ?? "none";
  const col: string = p.color ?? C.red;

  // seeds on a staggered grid, kept inside the body
  const seeds: [number, number][] = [];
  for (let yy = -225; yy <= -45; yy += 40) {
    const half = Math.min(120, -yy * 1.5);
    const off = (Math.round(-yy / 40) % 2) * 20;
    for (let xx = -half + 10 + off; xx <= half - 6; xx += 40) seeds.push([xx, yy]);
  }
  const sepals: [number, number, number][] = [[-165, 100, 0], [-135, 120, 1], [-105, 130, 0], [-75, 130, 1], [-45, 120, 0], [-15, 100, 1]];

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={135} ry={13} fill={C.shadow} />
      <g transform={motion(anim, f) || undefined}>
        <path d="M 0 -196 Q 6 -228 2 -256" stroke={C.greenDark} strokeWidth={10} strokeLinecap="round" fill="none" />
        <path d={BODY} fill={shade(col, 0.22)} />
        <g transform="translate(-6 -4)">
          <path d={BODY} fill={col} />
          {seeds.map(([sx, sy], i) => <ellipse key={i} cx={sx} cy={sy} rx={4.5} ry={7} fill={C.yellow} />)}
          <ellipse cx={-80} cy={-150} rx={14} ry={24} fill="#FFFFFF" opacity={0.4} transform="rotate(18 -80 -150)" />
        </g>
        {sepals.map(([a, L, k], i) => (
          <g key={i} transform={`translate(0 -200) rotate(${a})`}>
            <path d={leaf(L, 34)} fill={k ? C.greenDark : C.green} />
            <path d={`M 0 0 L ${L * 0.85} 0`} stroke={shade(C.green, 0.3)} strokeWidth={4} strokeLinecap="round" />
          </g>
        ))}
      </g>
    </g>
  );
}
