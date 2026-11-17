import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tuk-tuk (auto rickshaw), side view, facing right: one continuous curved roof from the windscreen back to the
// rear, a rounded yellow-green cowl with headlight at the front over ONE small front wheel, a windscreen and
// handlebar behind it, an open side showing a bench seat, and a rounded rear body over ONE big rear wheel.
// Room scale: about 700 px wide and 560 px tall at s = 1. Origin = floor centre; the wheels stand on y.
// anim "drive": wheels spin and the body bounces; vx moves it along x (px per frame).
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
  const body = p.color && p.color !== "none" ? p.color : "#B5D84A";
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
  const roof = "#2B3A33";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={350} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* wheel arches (dark, behind the wheels) */}
          <circle cx={-200} cy={-95} r={106} fill={C.ink} opacity={0.85} />
          <circle cx={235} cy={-62} r={70} fill={C.ink} opacity={0.85} />
          {/* chassis */}
          <rect x={-340} y={-226} width={520} height={22} rx={8} fill={C.greyDark} />
          {/* one continuous curved roof, from the windscreen back to the rear */}
          <path d="M -352 -468 Q -340 -526 -270 -526 L 30 -526 Q 110 -526 150 -436 L 176 -402 Q 180 -392 168 -390 L -326 -390 Q -350 -390 -352 -416 Z" fill={roof} />
          <rect x={-352} y={-404} width={20} height={170} rx={6} fill={roof} />
          <rect x={136} y={-420} width={16} height={180} rx={6} fill={roof} />
          {/* windscreen, behind it the handlebar */}
          <path d="M 44 -500 Q 104 -488 132 -424 L 44 -414 Z" fill={C.sky} />
          <path d="M 118 -330 L 214 -176" stroke={C.greyDark} strokeWidth={14} strokeLinecap="round" fill="none" />
          <path d="M 98 -336 L 150 -348" stroke={C.ink} strokeWidth={14} strokeLinecap="round" fill="none" />
          {/* open side: bench seat with backrest */}
          <rect x={-300} y={-300} width={270} height={34} rx={12} fill={C.brown} />
          <rect x={-312} y={-366} width={24} height={72} rx={9} fill={shade(C.brown, 0.15)} />
          {/* rounded rear body over the big rear wheel */}
          <path d="M -352 -226 L -352 -170 Q -352 -250 -280 -250 L -140 -250 Q -120 -250 -120 -226 L -120 -150 Q -120 -132 -140 -132 L -352 -132 Z" fill={body} />
          <path d="M -352 -226 L -352 -170 Q -352 -132 -320 -132 L -352 -132 Z" fill={shade(body, 0.15)} />
          <rect x={-352} y={-246} width={232} height={14} rx={7} fill={shade(body, 0.18)} />
          {/* rounded front cowl and nose over the small front wheel */}
          <path d="M 40 -336 L 120 -336 Q 240 -326 262 -246 L 272 -150 Q 272 -128 250 -128 L 40 -128 Z" fill={body} />
          <path d="M 40 -150 L 272 -150 L 272 -128 L 40 -128 Z" fill={shade(body, 0.2)} />
          <circle cx={262} cy={-252} r={20} fill={C.yellow} />
          {/* front fork and tail light */}
          <rect x={226} y={-180} width={16} height={120} rx={6} fill={C.greyDark} />
          <rect x={-364} y={-210} width={14} height={30} rx={6} fill={C.red} />
        </g>
        {wheel(-200, 95)}
        {wheel(235, 62)}
      </g>
    </g>
  );
}
