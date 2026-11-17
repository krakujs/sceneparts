import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tanker truck, side view, facing right: a cab at the front pulling a long cylindrical tank trailer behind it.
// Room scale: about 850 px wide and 400 px tall at s = 1. Origin = floor centre; the wheels stand on y.
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
  const body = p.color && p.color !== "none" ? p.color : C.blue;
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
      <ellipse cx={0} cy={0} rx={440} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* trailer chassis */}
          <rect x={-440} y={-170} width={640} height={36} rx={8} fill={frame} />
          {/* long cylindrical tank, drawn as a capsule seen from the side */}
          <rect x={-430} y={-330} width={620} height={170} rx={85} fill={body} />
          <rect x={-420} y={-250} width={600} height={14} rx={7} fill={shade(body, 0.2)} />
          {/* filler hatch on top */}
          <rect x={-150} y={-352} width={50} height={24} rx={6} fill={frame} />
          {/* coupling between trailer and cab */}
          <rect x={150} y={-152} width={40} height={22} rx={6} fill={C.ink} />
          {/* cab */}
          <path d="M 175 -170 L 175 -340 Q 175 -370 205 -370 L 300 -370 Q 330 -370 345 -340 L 400 -250 Q 412 -230 412 -200 L 412 -170 Z" fill={body} />
          <path d="M 215 -345 L 292 -345 Q 302 -345 310 -330 L 344 -270 L 215 -270 Z" fill={C.sky} />
          <rect x={230} y={-262} width={8} height={92} rx={3} fill={shade(body, 0.22)} />
          {/* headlight and bumper */}
          <rect x={402} y={-222} width={14} height={26} rx={6} fill={C.yellow} />
          <rect x={400} y={-152} width={24} height={22} rx={6} fill={C.greyDark} />
          {arch(-340, 72)}
          {arch(-190, 72)}
          {arch(290, 72)}
        </g>
        {wheel(-340, 72)}
        {wheel(-190, 72)}
        {wheel(290, 72)}
      </g>
    </g>
  );
}
