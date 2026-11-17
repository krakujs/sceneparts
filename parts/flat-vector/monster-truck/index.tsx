import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Monster truck, side view, facing right: a pickup body lifted high on huge chunky tyres with tread blocks.
// Room scale: about 790 px wide and 650 px tall at s = 1. Origin = floor centre; the tyres stand on y.
// anim "drive": the wheels spin and the body bounces a little; vx moves it along x (px per frame).
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const body = p.color && p.color !== "none" ? p.color : C.purple;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 6 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -6 : 0;
  // huge chunky tyre: tread blocks around the edge, a grey rim with spokes that turn
  const wheel = (cx: number, r: number) => (
    <g>
      <circle cx={cx} cy={-r} r={r} fill={C.ink} />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((k) => (
        <rect key={k} x={cx - r * 0.13} y={-2 * r + 8} width={r * 0.26} height={30} rx={8}
          fill={C.inkSoft} transform={`rotate(${k * 30} ${cx} ${-r})`} />
      ))}
      <circle cx={cx} cy={-r} r={r * 0.6} fill={frame} />
      <g transform={`rotate(${f1(spin)} ${cx} ${-r})`}>
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <rect key={k} x={cx - r * 0.08} y={-r - r * 0.5} width={r * 0.16} height={r * 0.5} rx={6}
            fill={shade(frame, 0.3)} transform={`rotate(${k * 60} ${cx} ${-r})`} />
        ))}
      </g>
      <circle cx={cx} cy={-r} r={r * 0.18} fill={C.greyLight} />
    </g>
  );
  const arch = (cx: number, r: number) => (
    <path d={`M ${cx - r - 14} ${-r} A ${r + 14} ${r + 14} 0 0 1 ${cx + r + 14} ${-r} Z`} fill={C.ink} opacity={0.85} />
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={410} ry={18} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* chassis lifted high above the tyres */}
          <rect x={-380} y={-330} width={760} height={40} rx={12} fill={frame} />
          {/* lower body */}
          <rect x={-340} y={-400} width={680} height={72} rx={14} fill={body} />
          {/* open cargo bed */}
          <rect x={-340} y={-520} width={340} height={124} rx={10} fill={body} />
          <rect x={-340} y={-520} width={340} height={16} rx={6} fill={shade(body, 0.2)} />
          {/* cab */}
          <path d="M 0 -400 L 0 -610 Q 0 -640 30 -640 L 230 -640 Q 270 -640 290 -600 L 340 -470 L 340 -400 Z" fill={body} />
          <path d="M 30 -612 L 226 -612 Q 252 -612 262 -586 L 300 -490 L 30 -490 Z" fill={C.sky} />
          <rect x={150} y={-480} width={8} height={70} rx={3} fill={shade(body, 0.22)} />
          {/* headlight and bumper */}
          <rect x={330} y={-440} width={14} height={22} rx={5} fill={C.yellow} />
          <rect x={328} y={-360} width={24} height={20} rx={6} fill={C.greyDark} />
          {arch(-235, 150)}
          {arch(245, 150)}
        </g>
        {wheel(-235, 150)}
        {wheel(245, 150)}
      </g>
    </g>
  );
}
