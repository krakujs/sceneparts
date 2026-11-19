import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Generic high-speed train, side view, facing right: white body, very long pointed nose at the front,
// blue stripe running the length, row of windows and a cab window in the nose. Not a copy of any real livery.
// Room scale: about 980 px wide and 300 px tall at s = 1. Origin = floor centre; the wheels stand on y.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const wheel = (cx: number, cy: number, r: number, rim: string, spin: number) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={C.ink} />
    <circle cx={cx} cy={cy} r={r * 0.58} fill={rim} />
    <g transform={`rotate(${f1(spin)} ${cx} ${cy})`}>
      {[0, 1, 2, 3, 4].map((k) => (
        <rect key={k} x={cx - r * 0.07} y={cy - r * 0.52} width={r * 0.14} height={r * 0.52} rx={4}
          fill={shade(rim, 0.25)} transform={`rotate(${k * 72} ${cx} ${cy})`} />
      ))}
    </g>
    <circle cx={cx} cy={cy} r={r * 0.16} fill={shade(rim, 0.35)} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const stripe = p.color && p.color !== "none" ? p.color : C.blue;
  const rim = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 10 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -2 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={460} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* long white body with a pointed nose at the front (right) */}
          <path d="M -480 -220 Q -480 -240 -460 -240 L 180 -240 C 280 -240 360 -210 420 -170 L 490 -120 Q 492 -110 480 -106 L -470 -106 Q -480 -106 -480 -120 Z" fill={C.white} />
          {/* lower skirt */}
          <path d="M -480 -130 L 470 -130 L 480 -106 L -470 -106 Z" fill={C.greyLight} />
          {/* blue stripe following the body */}
          <path d="M -480 -170 L 380 -170 L 430 -150 L 480 -118 L 480 -108 L -470 -108 Z" fill={stripe} />
          {/* roof edge */}
          <rect x={-470} y={-252} width={860} height={14} rx={7} fill={C.greyLight} />
          {/* side windows */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={-430 + i * 92} y={-215} width={70} height={36} rx={8} fill={C.sky} />
          ))}
          {/* pointed cab window in the nose */}
          <path d="M 260 -218 Q 330 -214 380 -190 L 260 -170 Z" fill={C.sky} />
          {/* front light */}
          <path d="M 466 -150 Q 478 -146 480 -134 L 452 -134 Z" fill={C.yellow} />
        </g>
        {wheel(-330, -58, 58, rim, spin)}
        {wheel(-180, -58, 58, rim, spin)}
        {wheel(120, -58, 58, rim, spin)}
        {wheel(260, -58, 58, rim, spin)}
      </g>
    </g>
  );
}
