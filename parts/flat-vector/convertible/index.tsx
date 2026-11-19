import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Open-top convertible, side view, facing right: low body, a windscreen only, and the roof folded down behind.
// Room scale: about 740 px wide and 280 px tall at s = 1. Origin = floor centre; the tyres stand on y.
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
  const body = p.color && p.color !== "none" ? p.color : C.teal;
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
      <ellipse cx={0} cy={0} rx={380} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* low open body with a rounded tail */}
          <path d="M -360 -70 Q -368 -150 -320 -158 L 120 -158 L 280 -172 Q 362 -170 368 -110 L 368 -70 Q 368 -40 340 -40 L -335 -40 Q -360 -40 -360 -70 Z" fill={body} />
          <rect x={-360} y={-92} width={728} height={52} rx={24} fill={shade(body, 0.18)} />
          {/* folded roof stowed behind the seats */}
          <path d="M -250 -158 Q -236 -205 -180 -212 L -96 -212 Q -72 -212 -62 -184 L -56 -158 Z" fill={shade(body, 0.3)} />
          <rect x={-250} y={-158} width={194} height={8} rx={4} fill={shade(body, 0.42)} />
          {/* windscreen with a frame on top */}
          <path d="M 150 -165 L 100 -262 L 126 -262 L 182 -166 Z" fill={C.sky} />
          <rect x={96} y={-268} width={34} height={9} rx={4} fill={C.greyDark} />
          {/* headrest and door detail */}
          <rect x={-30} y={-204} width={34} height={46} rx={12} fill={shade(body, 0.35)} />
          <rect x={-10} y={-150} width={6} height={100} rx={3} fill={shade(body, 0.22)} />
          <rect x={60} y={-128} width={36} height={9} rx={4} fill={shade(body, 0.3)} />
          {/* lights and bumpers */}
          <path d="M 340 -140 Q 362 -136 366 -112 L 340 -112 Z" fill={C.yellow} />
          <rect x={-350} y={-140} width={16} height={30} rx={5} fill={C.red} />
          <rect x={344} y={-60} width={36} height={18} rx={8} fill={C.greyDark} />
          <rect x={-378} y={-60} width={36} height={18} rx={8} fill={C.greyDark} />
          {arch(-220, 76)}
          {arch(215, 76)}
        </g>
        {wheel(-220, 76)}
        {wheel(215, 76)}
      </g>
    </g>
  );
}
