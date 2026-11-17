/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector chilies: two curved, tapering chilies with green stems, lying on the ground. color = red | green.
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
/** Point on a cubic bezier. */
const bez = (P: V[], t: number): V => {
  const u = 1 - t;
  return [
    u * u * u * P[0][0] + 3 * u * u * t * P[1][0] + 3 * u * t * t * P[2][0] + t * t * t * P[3][0],
    u * u * u * P[0][1] + 3 * u * u * t * P[1][1] + 3 * u * t * t * P[2][1] + t * t * t * P[3][1],
  ];
};
/** A tapering tube along a cubic centreline: centre, left and right edge samples. */
const tube = (P: V[], N: number, wf: (t: number) => number) => {
  const Cn: V[] = [], L: V[] = [], R: V[] = [];
  for (let i = 0; i <= N; i++) Cn.push(bez(P, i / N));
  for (let i = 0; i <= N; i++) {
    const a = Cn[Math.max(0, i - 1)], b = Cn[Math.min(N, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len, ny = dx / len, w = wf(i / N);
    L.push([Cn[i][0] + nx * w, Cn[i][1] + ny * w]);
    R.push([Cn[i][0] - nx * w, Cn[i][1] - ny * w]);
  }
  return { Cn, L, R };
};
const poly = (pts: V[]) => "M " + pts.map(([a, b]) => `${f1(a)} ${f1(b)}`).join(" L ") + " Z";

const CHILI_A: V[] = [[-150, -330], [-214, -226], [-156, -96], [-64, -10]];
const CHILI_B: V[] = [[150, -330], [214, -226], [156, -96], [64, -10]];
const wf = (t: number) => 36 * Math.pow(1 - Math.pow(t, 1.8), 0.55) + 0.5;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const anim: string = p.anim ?? "none";
  const green = p.color === "green";
  const body = green ? "#5DB85A" : C.red;
  const bodyDark = green ? C.greenDark : C.redDark;
  const stemC = green ? C.greenDark : C.green;

  const chili = (P: V[], stemTo: V, i: number) => {
    const { Cn, L, R } = tube(P, 40, wf);
    const hl = L.slice(4, 30).map(([a, b], k) => {
      const c = Cn[k + 4];
      return [c[0] + (a - c[0]) * 0.55, c[1] + (b - c[1]) * 0.55] as V;
    });
    return (
      <g key={i}>
        <line x1={P[0][0]} y1={P[0][1]} x2={stemTo[0]} y2={stemTo[1]} stroke={stemC} strokeWidth={18} strokeLinecap="round" />
        <path d={poly([...L, ...R.slice().reverse()])} fill={body} />
        <path d={poly([...Cn, ...R.slice().reverse()])} fill={bodyDark} opacity={0.85} />
        <path d={"M " + hl.map(([a, b]) => `${f1(a)} ${f1(b)}`).join(" L ")} stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" fill="none" opacity={0.45} />
      </g>
    );
  };

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={210} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f) || undefined}>
        {chili(CHILI_A, [-168, -380], 0)}
        {chili(CHILI_B, [168, -380], 1)}
      </g>
    </g>
  );
}
