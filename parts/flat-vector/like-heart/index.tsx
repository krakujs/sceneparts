import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector like-heart reaction: a white heart in a round red bubble, with mini hearts floating up.
// Centre (x, y), about 480 px wide at s = 1. Motion comes only from p.f.

const heartPath = "M 0 118 C -150 22 -190 -40 -190 -100 C -190 -160 -140 -185 -100 -185 C -50 -185 -18 -150 0 -115 C 18 -150 50 -185 100 -185 C 140 -185 190 -160 190 -100 C 190 -40 150 22 0 118 Z";
const mini = [
  { x: -250, y0: 40, d: 0, sz: 0.3 },
  { x: 245, y0: 70, d: 24, sz: 0.26 },
  { x: 120, y0: -120, d: 48, sz: 0.36 },
];

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? C.red;
  const anim: string = p.anim ?? "pulse";
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  let sc = 1, rot = 0, dy = 0;
  if (anim === "pulse") sc = 1 + Math.sin(f * 0.22) * 0.05;
  else if (anim === "bounce") dy = -Math.abs(Math.sin(f * 0.2)) * 14;
  else if (anim === "wobble") rot = Math.sin(f * 0.16) * 5;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * k * (p.flip ? -1 : 1)} ${s * k}) rotate(${rot}) translate(0 ${dy}) scale(${sc})`}>
      {p.border !== false && <circle cx={0} cy={0} r={236} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={34} />}
      <circle cx={0} cy={18} r={220} fill={C.shadow} />
      <circle cx={0} cy={12} r={220} fill={shade(col, 0.22)} />
      <circle cx={0} cy={0} r={220} fill={col} />
      <g transform="translate(0 -6) scale(0.7)">
        <path d={heartPath} transform="translate(0 22)" fill="#E9D6DA" />
        <path d={heartPath} fill="#FFFFFF" />
      </g>
            {mini.map((m, i) => {
        const t = ((f + m.d) % 70) / 70;
        const my = m.y0 - t * 170, mx = m.x + t * (m.x > 0 ? 20 : -20), op = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;
        return (
          <g key={i} transform={`translate(${mx} ${my}) scale(${m.sz})`} opacity={Math.max(0, op)}>
            <path d={heartPath} fill={C.pink} stroke="#FFFFFF" strokeWidth={28} strokeLinejoin="round" />
            <path d={heartPath} fill={C.pink} />
          </g>
        );
      })}
    </g>
  );
}
