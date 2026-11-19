/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector beans: a neat mound of 12 kidney beans (color red | brown | black) with a green bean pod lying in front.
// Origin = resting point (bottom centre), honours flip.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 5)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(f / 20))})`;
  return "";
};

type V = [number, number];
const bez = (P: V[], t: number): V => {
  const u = 1 - t;
  return [
    u * u * u * P[0][0] + 3 * u * u * t * P[1][0] + 3 * u * t * t * P[2][0] + t * t * t * P[3][0],
    u * u * u * P[0][1] + 3 * u * u * t * P[1][1] + 3 * u * t * t * P[2][1] + t * t * t * P[3][1],
  ];
};
/** Kidney bean outline: an ellipse with a dip on its top edge. rx 40, ry 23 gives an 80 x 46 bean. */
const kidney = (rx: number, ry: number, dip: number) => {
  const pts: V[] = [];
  for (let i = 0; i < 48; i++) {
    const th = (i / 48) * Math.PI * 2;
    let d = th + Math.PI / 2;
    d = Math.atan2(Math.sin(d), Math.cos(d));
    const g = Math.exp(-(d * d) / 0.2);
    pts.push([rx * Math.cos(th), ry * Math.sin(th) * (1 - dip * g)]);
  }
  return "M " + pts.map(([a, b]) => `${f1(a)} ${f1(b)}`).join(" L ") + " Z";
};
const BEAN = kidney(40, 23, 0.4);

// 12 beans in a mound: bottom row 5, middle row 4, top row 3. Rows overlap a little; gaps show between neighbours.
const ROWS: [number, number[]][] = [
  [-25, [-176, -88, 0, 88, 176]],
  [-63, [-132, -44, 44, 132]],
  [-101, [-88, 0, 88]],
];
const HEAP: [number, number, number][] = ROWS.flatMap(([cy, xs]) => xs.map((cx) => [cx, cy, 0] as [number, number, number]))
  .map(([cx, cy], i) => [cx, cy, ((i * 37) % 11 - 5) * 1.6] as [number, number, number]);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const anim: string = p.anim ?? "none";
  const beanCol = p.color === "black" ? "#2C2A33" : p.color === "brown" ? C.brown : C.redDark;
  const beanDark = shade(beanCol, 0.35);

  // green bean pod in front: slim curved centreline, tapering width, 4 bumps
  const P: V[] = [[-172, -26], [-60, -58], [60, 4], [172, -26]];
  const N = 40;
  const cl: V[] = [], pl: V[] = [], pr: V[] = [];
  for (let i = 0; i <= N; i++) cl.push(bez(P, i / N));
  for (let i = 0; i <= N; i++) {
    const a = cl[Math.max(0, i - 1)], b = cl[Math.min(N, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
    const w = 9 + 12 * Math.sin((Math.PI * i) / N);
    pl.push([cl[i][0] - (dy / len) * w, cl[i][1] + (dx / len) * w]);
    pr.push([cl[i][0] + (dy / len) * w, cl[i][1] - (dx / len) * w]);
  }
  const podD = "M " + [...pl, ...pr.slice().reverse()].map(([a, b]) => `${f1(a)} ${f1(b)}`).join(" L ") + " Z";
  const bumps = [0.2, 0.4, 0.6, 0.8].map((t) => bez(P, t));

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={210} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f) || undefined}>
        {HEAP.map(([cx, cy, r], i) => (
          <g key={i} transform={`translate(${cx} ${cy}) rotate(${f1(r)})`}>
            <path d={BEAN} transform="translate(0 5)" fill={beanDark} />
            <path d={BEAN} fill={beanCol} />
            <ellipse cx={-20} cy={-12} rx={10} ry={4.5} fill="#FFFFFF" opacity={0.35} transform="rotate(-22 -20 -12)" />
          </g>
        ))}
        <path d={podD} fill={C.green} />
        <path d={"M " + pl.slice(6, 34).map(([a, b]) => `${f1(a)} ${f1(b)}`).join(" L ")} stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" fill="none" opacity={0.35} />
        {bumps.map(([bx, by], i) => (
          <ellipse key={i} cx={bx} cy={by} rx={8} ry={6} fill={C.green} stroke="none" />
        ))}
        {bumps.map(([bx, by], i) => (
          <ellipse key={"s" + i} cx={bx + 2} cy={by + 3} rx={7} ry={3} fill={shade(C.green, 0.3)} opacity={0.6} />
        ))}
        <line x1={-172} y1={-10} x2={-184} y2={-18} stroke={C.greenDark} strokeWidth={6} strokeLinecap="round" />
      </g>
    </g>
  );
}
