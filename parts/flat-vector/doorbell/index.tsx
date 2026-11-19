import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Doorbell: wall-mounted doorbell plate with a round press button. anim "ring": every second the button is pressed
// and three sound arcs ripple out to the right. Wall item: centred on (x, y), no ground shadow.
// Faces the viewer, honours flip, s and anim. Hero size.
const f1 = (v: number) => v.toFixed(1);
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const CYCLE = 60;

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/** Arc of radius r centred on (cx, cy), from angle -a to +a (degrees), drawn to the right. */
const arc = (cx: number, cy: number, r: number, a: number) => {
  const rad = (a * Math.PI) / 180;
  const x1 = cx + r * Math.cos(-rad), y1 = cy + r * Math.sin(-rad);
  const x2 = cx + r * Math.cos(rad), y2 = cy + r * Math.sin(rad);
  return `M ${f1(x1)} ${f1(y1)} A ${r} ${r} 0 0 1 ${f1(x2)} ${f1(y2)}`;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 760;
  const plate = p.color && p.color !== "none" ? p.color : C.greyLight;
  const button = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const ringing = p.anim === "ring";
  const m = f % CYCLE;
  // press: quick dip of the button in the first 8 frames of each cycle
  const press = ringing && m < 8 ? Math.sin((Math.PI * m) / 8) : 0;
  const btnY = -10 + press * 12;
  const btnShade = shade(button, 0.2);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(ringing ? "none" : (p.anim ?? "none"), f)}>
        {/* wall plate */}
        <rect x={-120} y={-170} width={240} height={340} rx={52} fill={plate} />
        <rect x={-120} y={120} width={240} height={50} rx={25} fill={shade(plate, 0.12)} />
        {/* button bezel and button */}
        <circle cx={0} cy={btnY + 6} r={82} fill={shade(plate, 0.18)} />
        <circle cx={0} cy={btnY} r={68} fill={button} />
        <ellipse cx={0} cy={btnY + 62} rx={50} ry={10} fill={btnShade} opacity={0.6} />
        <ellipse cx={-22} cy={btnY - 26} rx={18} ry={10} fill={C.white} opacity={0.45} transform={`rotate(-20 -22 ${f1(btnY - 26)})`} />
        {/* small brand-free status light */}
        <circle cx={0} cy={-124} r={10} fill={C.white} opacity={0.7} />
        {/* sound arcs to the right, one after another after each press */}
        {ringing &&
          [0, 1, 2].map((i) => {
            const start = 8 + i * 8;
            const on = clamp01((m - start) / 4) * clamp01((46 - m) / 8);
            return (
              <path
                key={i}
                d={arc(0, btnY, 110 + i * 46, 34)}
                fill="none"
                stroke={C.blue}
                strokeWidth={14}
                strokeLinecap="round"
                opacity={Number(on.toFixed(2))}
              />
            );
          })}
      </g>
    </g>
  );
}
