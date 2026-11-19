import React from "react";
import { clamp, random, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Snow globe shake: a glass dome on a wooden base, with a small house and tree inside. The globe wobbles hard
// while the snow whirls; the wobble dies away and the snow sinks to the floor. Closed-form per flake, so any frame renders alone.

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 960;
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const sd = String(p.seed ?? "globe");
  const n = Math.round(clamp(Number(p.count ?? 55), 10, 120));
  const R = 190;
  const cid = `globe-clip-${sd.replace(/[^a-zA-Z0-9]/g, "")}`;
  const shake = Math.exp(-lf / 28);
  const wobble = 14 * Math.sin(lf * 0.55) * shake;
  const bob = 10 * Math.sin(lf * 0.5) * shake;
  const flakes = Array.from({ length: n }, (_, i) => {
    const q = (k: number) => random(`${sd}-${i}-${k}`);
    const ang = q(0) * Math.PI * 2, rr = Math.sqrt(q(1)) * (R - 18);
    const x0 = Math.cos(ang) * rr;
    const y0 = Math.sin(ang) * rr * 0.9 - 30;
    const v = 1.2 + q(2) * 0.8;
    const A = 160 * (0.5 + q(3));
    const floor = 150 - q(4) * 30;
    const yy = y0 + v * lf + A * (1 - Math.exp(-lf / 28));
    const xx = x0 + 22 * Math.sin(lf * 0.12 + q(5) * 6.28) * (0.1 + shake * 0.9);
    return { x: xx, y: Math.min(yy, floor), r: 3 + q(6) * 4 };
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <defs>
        <clipPath id={cid}>
          <circle cx={0} cy={0} r={R} />
        </clipPath>
      </defs>
      <g transform={`rotate(${wobble.toFixed(2)} 0 200) translate(${bob.toFixed(1)} 0)`}>
        <circle cx={0} cy={0} r={200} fill="#DDF1FF" opacity={0.45} />
        <g clipPath={`url(#${cid})`}>
          <rect x={-42} y={40} width={84} height={80} fill="#F3E3C3" stroke={u.ink} strokeWidth={5} />
          <path d="M-58 42 L0 -6 L58 42 Z" fill="#C8453A" stroke={u.ink} strokeWidth={5} strokeLinejoin="round" />
          <rect x={-12} y={82} width={24} height={38} fill="#7A4A2A" />
          <rect x={-30} y={56} width={16} height={16} fill="#8FD3F4" stroke={u.ink} strokeWidth={3} />
          <rect x={-120} y={95} width={18} height={40} fill="#7A4A2A" />
          <path d="M-129 100 L-111 -10 L-93 100 Z" fill="#3E9B5A" stroke={u.ink} strokeWidth={4} strokeLinejoin="round" />
          {flakes.map((f, i) => (
            <circle key={i} cx={f.x.toFixed(1)} cy={f.y.toFixed(1)} r={f.r.toFixed(1)} fill="#FFFFFF" stroke="rgba(120,140,160,0.45)" strokeWidth={1.5} />
          ))}
        </g>
        <path d="M-150 -60 Q-170 -110 -110 -150" fill="none" stroke="#FFFFFF" strokeWidth={14} strokeLinecap="round" opacity={0.55} />
        <circle cx={0} cy={0} r={200} fill="none" stroke={u.ink} strokeWidth={8} />
      </g>
      <rect x={-170} y={190} width={340} height={60} rx={14} fill="#8B5A2B" stroke={u.ink} strokeWidth={8} />
      <rect x={-185} y={240} width={370} height={24} rx={10} fill="#6B4420" stroke={u.ink} strokeWidth={6} />
    </g>
  );
}
