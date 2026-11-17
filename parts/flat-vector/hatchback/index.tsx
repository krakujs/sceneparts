import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Compact hatchback, side view, facing right: short body, steep rear hatch, one flat roof, two glass panels.
// Room scale: about 640 px wide and 300 px tall at s = 1. Origin = floor centre; the tyres stand on y.
// anim "drive": the wheels spin and the body bounces a little; vx moves the car along x (px per frame).
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
  const body = p.color && p.color !== "none" ? p.color : C.orange;
  const rim = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 9 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -4 : 0;
  const wheel = (cx: number, r: number) => (
    <g>
      <circle cx={cx} cy={-r} r={r} fill={C.ink} />
      <circle cx={cx} cy={-r} r={r * 0.58} fill={rim} />
      <g transform={`rotate(${f1(spin)} ${cx} ${-r})`}>
        {[0, 1, 2, 3, 4].map((k) => (
          <rect key={k} x={cx - r * 0.07} y={-r - r * 0.52} width={r * 0.14} height={r * 0.52} rx={4}
            fill={shade(rim, 0.25)} transform={`rotate(${k * 72} ${cx} ${-r})`} />
        ))}
      </g>
      <circle cx={cx} cy={-r} r={r * 0.16} fill={shade(rim, 0.35)} />
    </g>
  );
  const arch = (cx: number, r: number) => (
    <path d={`M ${cx - r - 9} ${-r} A ${r + 9} ${r + 9} 0 0 1 ${cx + r + 9} ${-r} Z`} fill={C.ink} opacity={0.85} />
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={340} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* steep rear hatch and short roof */}
          <path d="M -305 -185 L -240 -282 Q -232 -290 -215 -290 L -40 -290 Q -20 -290 -8 -274 L 70 -186 Z" fill={body} />
          {/* lower body */}
          <path d="M -310 -70 Q -315 -170 -300 -180 L 310 -180 Q 325 -180 326 -150 L 326 -70 Q 326 -42 298 -42 L -284 -42 Q -310 -42 -310 -70 Z" fill={body} />
          <rect x={-310} y={-92} width={636} height={50} rx={22} fill={shade(body, 0.18)} />
          {/* glass */}
          <path d="M -292 -192 L -236 -272 L -150 -272 L -150 -192 Z" fill={C.sky} />
          <path d="M -136 -192 L -136 -272 L -40 -272 L 42 -192 Z" fill={C.sky} />
          {/* door seam and handle */}
          <rect x={20} y={-180} width={8} height={130} rx={3} fill={shade(body, 0.22)} />
          <rect x={-60} y={-150} width={34} height={9} rx={4} fill={shade(body, 0.3)} />
          {/* lights and bumpers */}
          <path d="M 300 -150 Q 322 -146 326 -124 L 300 -124 Z" fill={C.yellow} />
          <rect x={-316} y={-150} width={18} height={34} rx={6} fill={C.red} />
          <rect x={296} y={-62} width={36} height={20} rx={8} fill={C.greyDark} />
          <rect x={-326} y={-62} width={36} height={20} rx={8} fill={C.greyDark} />
          {arch(-190, 72)}
          {arch(190, 72)}
        </g>
        {wheel(-190, 72)}
        {wheel(190, 72)}
      </g>
    </g>
  );
}
