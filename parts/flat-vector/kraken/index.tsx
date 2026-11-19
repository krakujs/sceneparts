import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Kraken: friendly cartoon giant octopus with a purple dome head, big eyes and curling tentacles rising from the waves.
// Origin = bottom of the included water strip (y). About 900 px wide and 900 px tall at s = 1.
// anim: wave (tentacles sway) | none.
/* eslint-disable @typescript-eslint/no-explicit-any */
const wave = (y0: number, a: number) => {
  let d = `M -700 ${y0}`;
  for (let i = -700; i < 700; i += 140) d += ` Q ${i + 70} ${y0 - a} ${i + 140} ${y0}`;
  return d;
};
// A tentacle: a chain of points that starts under the water and curls outward at the tip.
const tentacle = (x0: number, dir: number, phase: number) => {
  const N = 20, step = 26;
  let px = x0, py = -120, h = -Math.PI / 2 + dir * 0.22;
  const pts: [number, number][] = [[px, py]];
  for (let k = 1; k <= N; k++) {
    h += dir * (0.01 + 0.9 * Math.max(0, k / N - 0.5) ** 2) + Math.sin(phase + k * 0.3) * 0.02;
    px += Math.cos(h) * step;
    py += Math.sin(h) * step;
    pts.push([px, py]);
  }
  return pts;
};
const TENT: [number, number, number][] = [[-230, -1, 0], [-150, -1, 1.1], [-70, -1, 2.2], [70, 1, 0.7], [150, 1, 1.8], [230, 1, 2.9]];

export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1600, s = 1, f = 0, flip = false } = p as any;
  const body: string = p.color && p.color !== "none" ? p.color : "#7B5CD6";
  const dark = shade(body, 0.2), light = "#9B7BE8";
  const anim: string = p.anim ?? "wave";
  const t = anim === "wave" ? f * 0.05 : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      {TENT.map(([x0, dir, ph], i) => {
        const pts = tentacle(x0, dir, ph + t);
        const d = pts.map(([px, py], k) => `${k === 0 ? "M" : "L"} ${px.toFixed(1)} ${py.toFixed(1)}`).join(" ");
        return (
          <g key={i}>
            <path d={d} stroke={i % 2 ? dark : body} strokeWidth={46} strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {[5, 9, 13].map((k) => (
              <circle key={k} cx={pts[k][0]} cy={pts[k][1]} r={6} fill="#C9B6F2" />
            ))}
          </g>
        );
      })}
      <ellipse cx={0} cy={-600} rx={230} ry={280} fill={body} />
      <ellipse cx={-80} cy={-720} rx={40} ry={90} fill="#FFFFFF" opacity={0.18} />
      <circle cx={-120} cy={-780} r={26} fill={light} />
      <circle cx={110} cy={-790} r={20} fill={light} />
      <circle cx={-150} cy={-500} r={16} fill={light} />
      <circle cx={160} cy={-520} r={16} fill={light} />
      <circle cx={-88} cy={-600} r={60} fill="#FFFFFF" />
      <circle cx={88} cy={-600} r={60} fill="#FFFFFF" />
      <circle cx={-72} cy={-596} r={32} fill={C.ink} />
      <circle cx={104} cy={-596} r={32} fill={C.ink} />
      <circle cx={-60} cy={-612} r={10} fill="#FFFFFF" />
      <circle cx={116} cy={-612} r={10} fill="#FFFFFF" />
      <circle cx={-150} cy={-520} r={26} fill={C.pink} opacity={0.55} />
      <circle cx={150} cy={-520} r={26} fill={C.pink} opacity={0.55} />
      <path d="M -60 -490 Q 0 -440 60 -490" stroke={C.ink} strokeWidth={10} fill="none" strokeLinecap="round" />
      <path d={`${wave(-150, 36)} L 700 0 L -700 0 Z`} fill="#2E8BC6" />
      <path d={wave(-150, 36)} stroke="#FFFFFF" strokeWidth={8} fill="none" opacity={0.85} />
    </g>
  );
}
