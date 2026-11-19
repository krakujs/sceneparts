import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tow truck, side view, facing right: cab at the front, low flatbed at the back with a winch and a tilted boom
// carrying a hook on a cable. An amber beacon sits on the cab roof.
// Room scale: about 820 px wide and 460 px tall at s = 1. Origin = floor centre; the wheels stand on y.
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
  const body = p.color && p.color !== "none" ? p.color : C.orange;
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
      <ellipse cx={0} cy={0} rx={420} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* chassis */}
          <rect x={-380} y={-170} width={770} height={40} rx={8} fill={frame} />
          {/* low flatbed deck with a rail along the top */}
          <rect x={-380} y={-270} width={480} height={110} rx={10} fill={body} />
          <rect x={-380} y={-276} width={480} height={12} rx={4} fill={shade(body, 0.25)} />
          {/* winch drum on the deck */}
          <rect x={-320} y={-292} width={120} height={22} rx={8} fill={C.greyDark} />
          <circle cx={-260} cy={-281} r={9} fill={C.greyLight} />
          {/* tilted boom: pivots on the winch, leans back over the rear */}
          <g transform="rotate(-28 -260 -276)">
            <rect x={-273} y={-620} width={26} height={350} rx={10} fill={shade(body, 0.2)} />
          </g>
          {/* pulley and cable with a hook at the boom tip */}
          <circle cx={-421} cy={-580} r={14} fill={C.greyLight} />
          <rect x={-424} y={-580} width={6} height={210} fill={C.greyDark} />
          <path d="M -421 -372 Q -421 -340 -395 -340 Q -372 -340 -372 -362" fill="none" stroke={C.greyDark} strokeWidth={9} strokeLinecap="round" />
          {/* cab */}
          <path d="M 110 -160 L 110 -370 Q 110 -400 140 -400 L 260 -400 Q 290 -400 310 -370 L 360 -260 Q 380 -235 380 -200 L 380 -160 Z" fill={body} />
          <path d="M 150 -372 L 250 -372 Q 268 -372 278 -352 L 318 -270 L 150 -270 Z" fill={C.sky} />
          <rect x={200} y={-260} width={8} height={100} rx={3} fill={shade(body, 0.22)} />
          {/* amber beacon on the cab roof */}
          <rect x={172} y={-412} width={56} height={14} rx={5} fill={C.greyDark} />
          <circle cx={200} cy={-424} r={44} fill={C.yellow} opacity={0.35} />
          <rect x={176} y={-436} width={48} height={26} rx={12} fill={C.orange} />
          {/* headlight and bumpers */}
          <rect x={368} y={-226} width={14} height={24} rx={6} fill={C.yellow} />
          <rect x={372} y={-140} width={26} height={20} rx={6} fill={C.greyDark} />
          <rect x={-388} y={-240} width={12} height={40} rx={4} fill={C.red} />
          {arch(-265, 80)}
          {arch(285, 80)}
        </g>
        {wheel(-265, 80)}
        {wheel(285, 80)}
      </g>
    </g>
  );
}
