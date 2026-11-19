import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Low wedge-shaped two-seater sports car, side view, facing right: sharp nose, low cockpit, rear spoiler.
// Room scale: about 720 px wide and 250 px tall at s = 1. Origin = floor centre; the tyres stand on y.
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
  const body = p.color && p.color !== "none" ? p.color : C.red;
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
      <ellipse cx={0} cy={0} rx={370} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* wedge body: high tail, low nose, cockpit peak near the middle */}
          <path d="M -360 -55 Q -362 -150 -340 -160 L -250 -168 L -130 -222 Q -90 -242 -30 -244 L 60 -240 L 210 -165 L 330 -130 Q 362 -120 362 -90 L 362 -55 Q 362 -45 350 -45 L -350 -45 Q -360 -45 -360 -55 Z" fill={body} />
          {/* racing stripe */}
          <rect x={-330} y={-105} width={680} height={10} rx={5} fill={shade(body, 0.25)} />
          {/* cockpit glass */}
          <path d="M -118 -172 L -40 -226 L 56 -228 L 178 -170 Z" fill={C.sky} />
          {/* rear spoiler on two posts */}
          <rect x={-330} y={-190} width={10} height={30} fill={C.greyDark} />
          <rect x={-300} y={-190} width={10} height={30} fill={C.greyDark} />
          <rect x={-368} y={-208} width={110} height={16} rx={7} fill={shade(body, 0.2)} />
          {/* nose light and tail light */}
          <path d="M 330 -128 Q 352 -126 358 -104 L 330 -104 Z" fill={C.yellow} />
          <rect x={-356} y={-120} width={14} height={22} rx={5} fill={C.red} />
          <rect x={300} y={-52} width={80} height={10} rx={5} fill={C.greyDark} />
          {arch(-225, 68)}
          {arch(225, 68)}
        </g>
        {wheel(-225, 68)}
        {wheel(225, 68)}
      </g>
    </g>
  );
}
