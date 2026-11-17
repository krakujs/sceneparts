/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector pineapple: golden oval body with a criss-cross diamond pattern and a spiky green crown.
// Origin = resting point (bottom centre), honours flip.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 5)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(f / 20))})`;
  return "";
};
const leaf = (L: number, W: number) => `M 0 0 Q ${f1(L / 2)} ${f1(-W)} ${f1(L)} 0 Q ${f1(L / 2)} ${f1(W)} 0 0 Z`;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const anim: string = p.anim ?? "none";
  const col: string = p.color ?? "#F2B134";
  const lineC = shade(col, 0.3);

  // two families of diagonals make a diamond lattice; the clip keeps them inside the body
  const lines: React.ReactNode[] = [];
  for (let k = -6; k <= 6; k++) {
    const x0 = k * 58;
    lines.push(<line key={"a" + k} x1={x0 - 200} y1={-375} x2={x0 + 200} y2={25} />);
    lines.push(<line key={"b" + k} x1={x0 - 200} y1={25} x2={x0 + 200} y2={-375} />);
  }

  // crown leaves, outer first so the centre leaves sit on top
  const crown: [number, number, number][] = [[-42, 120, 0], [42, 120, 0], [-28, 150, 1], [28, 150, 1], [-14, 170, 2], [14, 170, 2], [0, 185, 2]];
  const leafCol = ["#7FBF4E", shade(C.green, 0.2), C.green];

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <defs>
        <clipPath id="pineapple-body">
          <ellipse cx={0} cy={-175} rx={150} ry={175} />
        </clipPath>
      </defs>
      <ellipse cx={0} cy={0} rx={165} ry={15} fill={C.shadow} />
      <g transform={motion(anim, f) || undefined}>
        {crown.map(([a, L, k], i) => (
          <g key={i} transform={`translate(0 -330) rotate(${f1(-90 + a)})`}>
            <path d={leaf(L, 26)} fill={leafCol[k]} />
          </g>
        ))}
        <ellipse cx={-7} cy={-170} rx={150} ry={175} fill={shade(col, 0.2)} />
        <g transform="translate(-7 -5)">
          <g clipPath="url(#pineapple-body)" stroke={lineC} strokeWidth={6} strokeLinecap="round" fill="none">
            {lines}
          </g>
          <ellipse cx={-72} cy={-200} rx={14} ry={58} fill="#FFFFFF" opacity={0.35} transform="rotate(10 -72 -200)" />
        </g>
      </g>
    </g>
  );
}
