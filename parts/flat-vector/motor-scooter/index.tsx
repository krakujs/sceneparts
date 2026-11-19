import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Generic step-through motor scooter, side view, facing right: rounded body cover over the rear wheel,
// a seat, a low floorboard, a tall front shield with a headlight, a handlebar stem and two small wheels.
// Room scale: about 520 px wide and 440 px tall at s = 1. Origin = floor centre; the wheels stand on y.
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
      {[0, 1, 2].map((k) => (
        <rect key={k} x={cx - r * 0.08} y={cy - r * 0.5} width={r * 0.16} height={r * 0.5} rx={3}
          fill={shade(rim, 0.25)} transform={`rotate(${k * 60} ${cx} ${cy})`} />
      ))}
    </g>
    <circle cx={cx} cy={cy} r={r * 0.15} fill={shade(rim, 0.35)} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const body = p.color && p.color !== "none" ? p.color : C.blue;
  const rim = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 12 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -3 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* body cover over the rear wheel, seat on top */}
          <path d="M -230 -150 Q -240 -250 -160 -270 L 20 -270 Q 60 -270 70 -230 L 60 -150 Z" fill={body} />
          <rect x={-225} y={-300} width={250} height={36} rx={18} fill={C.ink} />
          {/* low floorboard */}
          <rect x={-120} y={-128} width={250} height={36} rx={14} fill={shade(body, 0.2)} />
          {/* front shield rising to the handlebar */}
          <path d="M 110 -150 L 150 -360 Q 180 -400 220 -380 L 230 -150 Z" fill={body} />
          <path d="M 140 -150 L 160 -340 L 176 -340 L 160 -150 Z" fill={shade(body, 0.2)} opacity={0.6} />
          {/* stem, handlebar and headlight */}
          <rect x={190} y={-440} width={22} height={260} rx={10} fill={C.greyDark} />
          <rect x={160} y={-456} width={92} height={18} rx={9} fill={C.inkSoft} />
          <rect x={150} y={-464} width={26} height={34} rx={10} fill={C.ink} />
          <rect x={236} y={-464} width={26} height={34} rx={10} fill={C.ink} />
          <circle cx={222} cy={-340} r={24} fill={C.yellow} />
          {/* front fork and tail light */}
          <rect x={196} y={-170} width={18} height={110} rx={6} fill={C.greyDark} />
          <rect x={-240} y={-230} width={16} height={24} rx={5} fill={C.red} />
        </g>
        {wheel(-170, -56, 56, rim, spin)}
        {wheel(200, -56, 56, rim, spin)}
      </g>
    </g>
  );
}
