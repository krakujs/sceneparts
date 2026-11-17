import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector brownies: two stacked square dark-brown brownies with a crackly top, shown in oblique view.
// Origin = resting point (bottom centre), honours flip and s. Hero size ~400 px wide at s = 1.

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Brownie(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = p.x ?? 540, y = p.y ?? 1560;
  const anim = p.anim ?? "none";
  const dark = p.color ?? "#5E3B26";
  const W = 270, H = 100, DX = 70, DY = -52; // front face size, depth offset

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // one brownie block whose front-left-bottom corner is at (bx, by)
  const block = (bx: number, by: number, w: number, h: number, key: string) => {
    const fx = bx - w / 2, fy = by - h; // front face top-left
    const front = `M ${f1(fx)} ${f1(fy)} L ${f1(fx + w)} ${f1(fy)} L ${f1(fx + w)} ${f1(fy + h)} L ${f1(fx)} ${f1(fy + h)} Z`;
    const side = `M ${f1(fx + w)} ${f1(fy)} L ${f1(fx + w + DX)} ${f1(fy + DY)} L ${f1(fx + w + DX)} ${f1(fy + DY + h)} L ${f1(fx + w)} ${f1(fy + h)} Z`;
    const top = `M ${f1(fx)} ${f1(fy)} L ${f1(fx + DX)} ${f1(fy + DY)} L ${f1(fx + w + DX)} ${f1(fy + DY)} L ${f1(fx + w)} ${f1(fy)} Z`;
    // crackly top: pale fissures across the top face
    const cracks = [[0.15, 0.2, 0.42, 0.55], [0.42, 0.1, 0.62, 0.7], [0.6, 0.35, 0.88, 0.2], [0.25, 0.7, 0.55, 0.85], [0.7, 0.8, 0.9, 0.5]];
    const crackEls = cracks.map(([u1, v1, u2, v2], i) => {
      const ax = fx + DX * v1 + (w) * u1, ay = fy + DY * v1;
      const bxp = fx + DX * v2 + w * u2, byp = fy + DY * v2;
      return <path key={i} d={`M ${f1(ax)} ${f1(ay)} L ${f1(bxp)} ${f1(byp)}`} stroke="#B9875E" strokeWidth={5} strokeLinecap="round" />;
    });
    return (
      <g key={key}>
        <path d={side} fill={shade(dark, 0.3)} />
        <path d={front} fill={dark} />
        <path d={top} fill={shade(dark, 0.12)} />
        {crackEls}
        <path d={`M ${f1(fx + 16)} ${f1(fy + h - 22)} L ${f1(fx + w - 16)} ${f1(fy + h - 22)}`} stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" opacity={0.12} />
      </g>
    );
  };

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={W * 0.62 + DX} ry={18} fill={C.shadow} />
      <g transform={tr}>
        {block(-10, 0, W, H, "bottom")}
        {block(0, -H + 4, W - 30, H, "top")}
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Brownie {...p} />;
}
