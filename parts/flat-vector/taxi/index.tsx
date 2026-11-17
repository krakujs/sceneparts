import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Yellow taxi cab, side view, facing right: saloon shape, a blank roof sign box (no words) and a checker stripe.
// Room scale: about 760 px wide and 340 px tall at s = 1. Origin = floor centre; the tyres stand on y.
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
  const body = p.color && p.color !== "none" ? p.color : C.yellow;
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
  // checker stripe: two rows of small squares along the lower body
  const checks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={390} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* saloon body */}
          <path d="M -370 -70 Q -376 -150 -352 -172 L -240 -176 L -190 -290 L 75 -290 L 150 -180 L 330 -172 Q 372 -165 378 -120 L 378 -70 Q 378 -40 350 -40 L -345 -40 Q -370 -40 -370 -70 Z" fill={body} />
          <rect x={-370} y={-92} width={748} height={52} rx={24} fill={shade(body, 0.18)} />
          {/* checker stripe */}
          {checks.map((i) => (
            <g key={i}>
              <rect x={-372 + i * 18} y={-118} width={18} height={9} fill={i % 2 === 0 ? C.ink : C.white} />
              <rect x={-372 + i * 18} y={-109} width={18} height={9} fill={i % 2 === 0 ? C.white : C.ink} />
            </g>
          ))}
          {/* glass */}
          <path d="M -228 -186 L -184 -278 L -110 -278 L -110 -186 Z" fill={C.sky} />
          <path d="M -96 -186 L -96 -278 L 64 -278 L 128 -186 Z" fill={C.sky} />
          <rect x={-14} y={-180} width={8} height={100} rx={3} fill={shade(body, 0.22)} />
          {/* blank roof sign box */}
          <rect x={-62} y={-342} width={124} height={52} rx={10} fill={C.white} />
          <rect x={-62} y={-300} width={124} height={10} rx={4} fill={C.greyLight} />
          <rect x={-40} y={-292} width={80} height={6} rx={3} fill={C.greyDark} />
          {/* lights and bumpers */}
          <path d="M 350 -150 Q 372 -145 376 -120 L 350 -120 Z" fill={C.white} />
          <rect x={-372} y={-150} width={22} height={34} rx={6} fill={C.red} />
          <rect x={350} y={-62} width={40} height={20} rx={8} fill={C.greyDark} />
          <rect x={-385} y={-62} width={40} height={20} rx={8} fill={C.greyDark} />
          {arch(-235, 78)}
          {arch(235, 78)}
        </g>
        {wheel(-235, 78)}
        {wheel(235, 78)}
      </g>
    </g>
  );
}
