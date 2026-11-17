import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pickup truck, side view, facing right: a cab at the front and an open cargo bed behind it.
// Room scale: about 750 px wide and 430 px tall at s = 1. Origin = floor centre; the tyres stand on y.
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
  const body = p.color && p.color !== "none" ? p.color : C.brown;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 9 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -4 : 0;
  const wheel = (cx: number, r: number) => (
    <g>
      <circle cx={cx} cy={-r} r={r} fill={C.ink} />
      <circle cx={cx} cy={-r} r={r * 0.58} fill={C.greyLight} />
      <g transform={`rotate(${f1(spin)} ${cx} ${-r})`}>
        {[0, 1, 2, 3, 4].map((k) => (
          <rect key={k} x={cx - r * 0.07} y={-r - r * 0.52} width={r * 0.14} height={r * 0.52} rx={4}
            fill={C.grey} transform={`rotate(${k * 72} ${cx} ${-r})`} />
        ))}
      </g>
      <circle cx={cx} cy={-r} r={r * 0.16} fill={C.grey} />
    </g>
  );
  const arch = (cx: number, r: number) => (
    <path d={`M ${cx - r - 9} ${-r} A ${r + 9} ${r + 9} 0 0 1 ${cx + r + 9} ${-r} Z`} fill={C.ink} opacity={0.85} />
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={385} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* chassis */}
          <rect x={-370} y={-150} width={740} height={36} rx={8} fill={frame} />
          {/* open cargo bed with a rim along the top */}
          <rect x={-360} y={-300} width={380} height={150} rx={10} fill={body} />
          <rect x={-360} y={-300} width={380} height={16} rx={6} fill={shade(body, 0.2)} />
          <rect x={-360} y={-190} width={380} height={8} rx={4} fill={shade(body, 0.2)} />
          {/* cab */}
          <path d="M 20 -150 L 20 -390 Q 20 -425 55 -425 L 230 -425 Q 270 -425 290 -385 L 345 -260 Q 352 -240 352 -210 L 352 -150 Z" fill={body} />
          <path d="M 60 -400 L 220 -400 Q 240 -400 252 -372 L 290 -290 L 60 -290 Z" fill={C.sky} />
          <rect x={110} y={-280} width={8} height={130} rx={3} fill={shade(body, 0.22)} />
          <rect x={150} y={-220} width={40} height={9} rx={4} fill={shade(body, 0.3)} />
          {/* headlight and bumpers */}
          <rect x={330} y={-236} width={20} height={22} rx={6} fill={C.yellow} />
          <rect x={340} y={-132} width={40} height={24} rx={8} fill={C.greyDark} />
          <rect x={-380} y={-128} width={30} height={20} rx={6} fill={C.greyDark} />
          {arch(-230, 84)}
          {arch(215, 84)}
        </g>
        {wheel(-230, 84)}
        {wheel(215, 84)}
      </g>
    </g>
  );
}
