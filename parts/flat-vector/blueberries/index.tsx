/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector blueberries: a small heap of 12 blue-navy berries, each with a star-shaped crown mark.
// Origin = resting point (bottom centre), honours flip.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 5)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(f / 20))})`;
  return "";
};

const R = 46;
const star = (cx: number, cy: number, ro: number, ri: number) => {
  const pts: string[] = [];
  for (let k = 0; k < 10; k++) {
    const a = -Math.PI / 2 + (k * Math.PI) / 5, r = k % 2 === 0 ? ro : ri;
    pts.push(`${f1(cx + Math.cos(a) * r)} ${f1(cy + Math.sin(a) * r)}`);
  }
  return pts.join(" ");
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const anim: string = p.anim ?? "none";
  const col: string = p.color ?? "#3C4D8E";

  // rows from the top down; 1 + 2 + 4 + 5 = 12 berries, top row drawn first
  const rows: [number, number[]][] = [
    [-238, [0]],
    [-174, [-80, 80]],
    [-110, [-120, -40, 40, 120]],
    [-46, [-160, -80, 0, 80, 160]],
  ];
  const berries: [number, number][] = rows.flatMap(([cy, xs]) => xs.map((cx) => [cx, cy] as [number, number]));

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={15} fill={C.shadow} />
      <g transform={motion(anim, f) || undefined}>
        {berries.map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={R} fill={shade(col, 0.3)} />
            <circle cx={cx - 4} cy={cy - 5} r={R - 4} fill={col} />
            <polygon points={star(cx + 2, cy + 2, 13, 5.5)} fill={C.navy} opacity={0.9} />
            <ellipse cx={cx - 20} cy={cy - 22} rx={9} ry={6} fill="#FFFFFF" opacity={0.4} transform={`rotate(-35 ${f1(cx - 20)} ${f1(cy - 22)})`} />
          </g>
        ))}
      </g>
    </g>
  );
}
