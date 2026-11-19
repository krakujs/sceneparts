import React from "react";
import { ui, startFrame, type UI } from "../stat-card/index";
import { clamp, ease, type PartProps } from "@sceneparts/core";

// Paint brush stroke: a thick, slightly wavy swash of paint with a rounded loaded start, a dry-brush finish that
// thins into a few long streaks (not spikes), paler bristle streaks along its length and a couple of droplets.
// It paints itself on from left to right (a growing clip), then holds. Centred on (x, y); `angle` tilts it.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u: UI = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const x = p.x ?? 540, y = p.y ?? 960;
  const W = p.w ?? 760, H = p.h ?? 150;
  const col = p.color ?? u.accent;
  const len = p.len ?? 16;
  const f = p.f ?? 0;
  const k = at <= 0 && (p.anim ?? "paint") === "none" ? 1 : ease(clamp((f - at) / len));
  const L = -W / 2, R = W / 2, h = H / 2;
  // main body: loaded rounded start on the left, wavy top/bottom edges, tapering finish on the right
  const body = [
    `M ${L + h * 0.6} ${-h}`,
    `C ${L + W * 0.25} ${-h * 1.12}, ${L + W * 0.5} ${-h * 0.82}, ${L + W * 0.72} ${-h * 0.95}`,
    `C ${L + W * 0.86} ${-h * 1.02}, ${R - W * 0.06} ${-h * 0.7}, ${R} ${-h * 0.45}`,
    `C ${R - W * 0.05} ${-h * 0.15}, ${R - W * 0.03} ${h * 0.1}, ${R - W * 0.02} ${h * 0.3}`,
    `C ${R - W * 0.12} ${h * 0.75}, ${L + W * 0.62} ${h * 1.05}, ${L + W * 0.4} ${h * 0.92}`,
    `C ${L + W * 0.2} ${h * 0.82}, ${L + h * 0.5} ${h * 1.08}, ${L + h * 0.5} ${h * 1.0}`,
    `C ${L - h * 0.15} ${h * 0.9}, ${L - h * 0.2} ${-h * 0.85}, ${L + h * 0.6} ${-h} Z`,
  ].join(" ");
  // dry-brush streaks continuing past the finish, each a long thin tapered sliver of a different length
  const streaks: [number, number, number][] = [[-0.62, 0.16, 0.06], [-0.2, 0.1, 0.05], [0.28, 0.13, 0.055], [0.62, 0.07, 0.045]];
  const id = `cbs-${Math.round(x)}-${Math.round(y)}-${Math.round(W)}`;
  return (
    <g transform={`translate(${x} ${y}) rotate(${p.angle ?? -4}) scale(${s})`}>
      <defs>
        <clipPath id={id}>
          <rect x={L - h} y={-H * 2} width={Math.max(1, (W + h * 2 + W * 0.2) * k)} height={H * 4} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <path d={body} fill={col} />
        {streaks.map(([sy, ln, th], i) => {
          const y0 = sy * h, x0 = R - W * 0.12, x1 = R + W * ln;
          return <path key={i} d={`M ${x0} ${y0 - th * H} Q ${(x0 + x1) / 2} ${y0 - th * H * 0.7} ${x1} ${y0 + 2} Q ${(x0 + x1) / 2} ${y0 + th * H * 0.6} ${x0} ${y0 + th * H} Z`} fill={col} />;
        })}
        {/* paler bristle streaks along the stroke for texture */}
        {[-0.55, -0.2, 0.15, 0.5].map((sy, i) => (
          <path key={i} d={`M ${L + W * (0.08 + i * 0.04)} ${sy * h} Q ${0} ${sy * h - 6} ${R - W * (0.12 + i * 0.03)} ${sy * h + 4}`}
            stroke="#FFFFFF" strokeOpacity={0.16} strokeWidth={H * 0.05} strokeLinecap="round" fill="none" />
        ))}
        {/* a darker band of thicker paint near the start */}
        <path d={`M ${L + h * 0.2} ${-h * 0.5} Q ${L + W * 0.2} ${-h * 0.75} ${L + W * 0.38} ${-h * 0.55}`} stroke="#000000" strokeOpacity={0.1} strokeWidth={H * 0.12} strokeLinecap="round" fill="none" />
        {/* droplets */}
        <circle cx={L + W * 0.3} cy={h * 1.35} r={H * 0.06} fill={col} />
        <circle cx={L + W * 0.36} cy={h * 1.5} r={H * 0.035} fill={col} />
      </g>
    </g>
  );
}
