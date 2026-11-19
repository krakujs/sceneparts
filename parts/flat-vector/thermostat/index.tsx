import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Round wall-style thermostat on a short foot: a ring dial with a setpoint arc and a dark display face.
// Origin = bottom centre (foot on y). About 400 px wide and 500 px tall at s = 1.
// anim "glow": the display and the halo around the dial glow softly.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const CY = -300;
// Point on the dial at angle a (degrees, SVG orientation: 90 = bottom, 270 = top).
const polar = (a: number, r: number) => [r * Math.cos((a * Math.PI) / 180), CY + r * Math.sin((a * Math.PI) / 180)];
const arc = (a0: number, a1: number, r: number) => {
  const [x0, y0] = polar(a0, r), [x1, y1] = polar(a1, r);
  return `M ${f1(x0)} ${f1(y0)} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${f1(x1)} ${f1(y1)}`;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.white;
  const level = Math.min(1, Math.max(0, p.level ?? 0.6));
  const anim: string = p.anim ?? "none";
  const glowing = anim === "glow";
  const breathe = (Math.sin((f * 2 * Math.PI) / 50) + 1) / 2;
  const endA = 135 + 270 * level;
  const [dx, dy] = polar(endA, 178);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-36} y={-110} width={72} height={110} rx={18} fill={shade(body, 0.2)} />
        <rect x={-120} y={-16} width={240} height={16} rx={8} fill={shade(body, 0.3)} />
        {glowing && <circle cx={0} cy={CY} r={226} fill={C.orange} opacity={0.1 + 0.18 * breathe} />}
        <circle cx={0} cy={CY} r={200} fill={body} />
        <path d={arc(135, 405, 178)} fill="none" stroke={C.greyLight} strokeWidth={26} strokeLinecap="round" />
        <path d={arc(135, endA, 178)} fill="none" stroke={C.orange} strokeWidth={26} strokeLinecap="round" />
        <circle cx={dx} cy={dy} r={18} fill={C.white} stroke={C.orange} strokeWidth={6} />
        <circle cx={0} cy={CY} r={148} fill={C.ink} />
        <rect x={-10} y={CY - 96} width={20} height={70} rx={10} fill={C.white} opacity={glowing ? 0.5 + 0.5 * breathe : 0.8} />
        <circle cx={0} cy={CY - 22} r={18} fill={C.orange} />
        <rect x={-90} y={CY + 26} width={180} height={22} rx={11} fill={C.greyDark} />
        <rect x={-90} y={CY + 26} width={180 * level} height={22} rx={11} fill={C.orange} />
        {[-40, 0, 40].map((mx, i) => (
          <circle key={mx} cx={mx} cy={CY + 92} r={7} fill={i === 1 ? C.teal : C.greyDark} />
        ))}
      </g>
    </g>
  );
}
