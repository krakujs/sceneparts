import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tall boxy SUV / 4x4, side view, facing right: upright body, roof rails, big wheels, high ground clearance.
// Room scale: about 740 px wide and 370 px tall at s = 1. Origin = floor centre; the tyres stand on y.
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
  const arch = (cx: number, r: number) => (
    <path d={`M ${cx - r - 9} ${-r} A ${r + 9} ${r + 9} 0 0 1 ${cx + r + 9} ${-r} Z`} fill={C.ink} opacity={0.85} />
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={380} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* tall boxy body with a flat roof and a short sloped nose */}
          <path d="M -340 -80 L -340 -300 Q -340 -330 -310 -330 L 230 -330 Q 280 -330 300 -290 L 345 -200 Q 360 -180 360 -150 L 360 -80 Q 360 -50 330 -50 L -310 -50 Q -340 -50 -340 -80 Z" fill={body} />
          {/* roof rails */}
          <rect x={-300} y={-346} width={540} height={12} rx={6} fill={C.greyDark} />
          <rect x={-290} y={-334} width={10} height={14} fill={C.greyDark} />
          <rect x={228} y={-334} width={10} height={14} fill={C.greyDark} />
          {/* glass */}
          <rect x={-300} y={-300} width={168} height={120} rx={14} fill={C.sky} />
          <rect x={-120} y={-300} width={200} height={120} rx={14} fill={C.sky} />
          <path d="M 236 -300 L 292 -300 L 334 -210 L 236 -210 Z" fill={C.sky} />
          <rect x={-132} y={-300} width={12} height={120} fill={shade(body, 0.22)} />
          {/* lower cladding */}
          <rect x={-340} y={-110} width={700} height={60} rx={18} fill={shade(body, 0.2)} />
          <rect x={-100} y={-200} width={8} height={90} rx={3} fill={shade(body, 0.22)} />
          {/* lights and bumpers */}
          <rect x={330} y={-200} width={28} height={30} rx={8} fill={C.yellow} />
          <rect x={-346} y={-230} width={14} height={40} rx={6} fill={C.red} />
          <rect x={340} y={-106} width={30} height={40} rx={8} fill={C.greyDark} />
          <rect x={-372} y={-106} width={32} height={40} rx={8} fill={C.greyDark} />
          {arch(-215, 105)}
          {arch(215, 105)}
        </g>
        {wheel(-215, 105)}
        {wheel(215, 105)}
      </g>
    </g>
  );
}
