import React from "react";
import type { PartProps } from "@sceneparts/core";
import { inkEach } from "../style/index";

// Kick scooter (ink sketch): a human-powered push scooter in side view, facing right, drawn as flat shapes
// and inked per shape by inkEach. Origin = bottom centre, the wheels stand on y. About 570 px wide and
// 560 px tall at s = 1. No motor, battery, display or logos.
/* eslint-disable @typescript-eslint/no-explicit-any */

const DECK = "#5B86C4";
const TYRE = "#3A3634";
const HUB = "#C9C6BF";
const METAL = "#9A9790";
const GRIP = "#3A3634";
const f1 = (v: number) => v.toFixed(1);

const WHEEL_R = 56;
const REAR = { x: -210, y: -WHEEL_R };
const FRONT = { x: 210, y: -WHEEL_R };

// Annular sector (used for the rear foot-brake fender). Angles in degrees, SVG y-down, so 270 is straight up.
const sector = (cx: number, cy: number, r1: number, r2: number, a1: number, a2: number) => {
  const pt = (r: number, a: number) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)];
  const [o1x, o1y] = pt(r2, a1);
  const [o2x, o2y] = pt(r2, a2);
  const [i2x, i2y] = pt(r1, a2);
  const [i1x, i1y] = pt(r1, a1);
  return `M ${f1(o1x)} ${f1(o1y)} A ${r2} ${r2} 0 0 1 ${f1(o2x)} ${f1(o2y)} L ${f1(i2x)} ${f1(i2y)} A ${r1} ${r1} 0 0 0 ${f1(i1x)} ${f1(i1y)} Z`;
};

// Pop-in easing over the first 20 frames (0 -> 1).
const popScale = (f: number) => {
  const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

// Solid tyre, grey rim, light spokes that turn with spin, and a light hub.
const Wheel = ({ x, y, spin }: { x: number; y: number; spin: number }) => (
  <g>
    <circle cx={x} cy={y} r={WHEEL_R} fill={TYRE} />
    <circle cx={x} cy={y} r={WHEEL_R - 14} fill={METAL} />
    <g transform={`translate(${f1(x)} ${f1(y)}) rotate(${f1(spin)})`}>
      {[0, 60, 120].map((a) => (
        <rect key={a} x={-2.5} y={-38} width={5} height={76} rx={2} fill={HUB} transform={`rotate(${a})`} />
      ))}
    </g>
    <circle cx={x} cy={y} r={11} fill={HUB} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const body = p.color && p.color !== "none" ? p.color : DECK;
  const anim: string = p.anim ?? "none";
  const spin = anim === "roll" ? f * 12 : 0;
  const pop = anim === "pop" ? popScale(f) : 1;
  const sx = p.flip ? -s : s;
  return inkEach(
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${f1(sx)} ${f1(s)})`}>
      <g transform={`scale(${f1(pop)})`}>
        {/* wheels first so the frame sits over the tyres */}
        <Wheel x={REAR.x} y={REAR.y} spin={spin} />
        <Wheel x={FRONT.x} y={FRONT.y} spin={spin} />
        {/* rear foot-brake fender over the back wheel, pressed by the heel to brake */}
        <path d={sector(REAR.x, REAR.y, 62, 80, 190, 350)} fill={body} />
        {/* long low deck */}
        <rect x={-260} y={-138} width={480} height={22} rx={11} fill={body} />
        {/* front fork down to the hub, then the slanted stem up to the handlebar */}
        <rect x={200} y={-100} width={20} height={50} fill={METAL} />
        <path d="M 202 -100 L 226 -100 L 196 -520 L 176 -520 Z" fill={body} />
        {/* T handlebar: crossbar with a rubber grip at each end */}
        <rect x={140} y={-536} width={92} height={16} rx={8} fill={METAL} />
        <rect x={122} y={-560} width={22} height={50} rx={11} fill={GRIP} />
        <rect x={226} y={-560} width={22} height={50} rx={11} fill={GRIP} />
      </g>
    </g>,
    6
  );
}
