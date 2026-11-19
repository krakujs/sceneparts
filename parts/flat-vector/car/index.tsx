import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Generic family car, side view, facing right: rounded body, two windows, door line, headlight, tail light.
// Room scale: about 760 px wide and 300 px tall at s = 1. Origin = floor centre; the tyres stand on y.
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
  const body = p.color && p.color !== "none" ? p.color : C.blue;
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
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={390} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* cabin roof and windows */}
          <path d="M -220 -170 L -150 -285 Q -138 -300 -115 -300 L 95 -300 Q 120 -300 136 -284 L 230 -170 Z" fill={body} />
          <path d="M -185 -180 L -130 -270 L -20 -270 L -20 -180 Z" fill={C.sky} />
          <path d="M 5 -180 L 5 -270 L 100 -270 L 185 -180 Z" fill={C.sky} />
          <path d="M -150 -270 L -120 -270 L -170 -180 L -185 -180 Z" fill="#FFFFFF" opacity={0.45} />
          {/* lower body */}
          <path d="M -370 -70 Q -380 -165 -300 -180 L 300 -185 Q 375 -175 378 -95 L 378 -70 Q 378 -40 350 -40 L -345 -40 Q -370 -40 -370 -70 Z" fill={body} />
          <rect x={-370} y={-90} width={748} height={50} rx={24} fill={shade(body, 0.18)} />
          {/* door lines and handles */}
          <rect x={-12} y={-180} width={8} height={130} rx={3} fill={shade(body, 0.22)} />
          <rect x={185} y={-175} width={8} height={120} rx={3} fill={shade(body, 0.22)} />
          <rect x={-90} y={-150} width={40} height={10} rx={5} fill={shade(body, 0.3)} />
          <rect x={110} y={-150} width={40} height={10} rx={5} fill={shade(body, 0.3)} />
          {/* lights and bumpers */}
          <path d="M 340 -150 Q 372 -145 376 -120 L 340 -120 Z" fill={C.yellow} />
          <rect x={-372} y={-150} width={22} height={34} rx={6} fill={C.red} />
          <rect x={350} y={-62} width={40} height={20} rx={8} fill={C.greyDark} />
          <rect x={-385} y={-62} width={40} height={20} rx={8} fill={C.greyDark} />
          {/* wheel arches */}
          <path d="M -320 -40 A 92 92 0 0 1 -136 -40 Z" fill={C.ink} opacity={0.85} />
          <path d="M 136 -40 A 92 92 0 0 1 320 -40 Z" fill={C.ink} opacity={0.85} />
        </g>
        {wheel(-228, 80)}
        {wheel(228, 80)}
      </g>
    </g>
  );
}
