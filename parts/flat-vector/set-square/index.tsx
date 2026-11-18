import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Clear 45-45-90 set square standing on its long edge: a tinted triangle with a triangular cut-out
// (evenodd hole), edge ticks along the base and the upright leg, and a thin lip on the hypotenuse.
// Origin = bottom centre of the base (sits on y). About 360 x 360 px at s = 1.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

// Outer triangle: right angle at (-180, 0), legs to (180, 0) and (-180, -360).
const OUTER = "M -180 0 L 180 0 L -180 -360 Z";
// Inner cut-out triangle, kept well inside the outer one.
const INNER = "M -120 -60 L 80 -60 L -120 -240 Z";

const ticks: React.ReactNode[] = [];
// Base ticks, every 20 px; longer every 100 px.
for (let i = 0; i <= 18; i++) {
  const xx = -180 + i * 20;
  const len = i % 5 === 0 ? 22 : 12;
  ticks.push(<line key={`b${i}`} x1={f1(xx)} y1={-4} x2={f1(xx)} y2={f1(-4 - len)} stroke={C.inkSoft} strokeWidth={i % 5 === 0 ? 3 : 2} />);
}
// Upright leg ticks.
for (let i = 1; i <= 17; i++) {
  const yy = -i * 20;
  const len = i % 5 === 0 ? 22 : 12;
  ticks.push(<line key={`l${i}`} x1={-176} y1={f1(yy)} x2={f1(-176 + len)} y2={f1(yy)} stroke={C.inkSoft} strokeWidth={i % 5 === 0 ? 3 : 2} />);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const tint = p.color && p.color !== "none" ? p.color : "#8EC5E8";
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* thickness edge */}
        <path d={OUTER} transform="translate(0 8)" fill={shade(tint, 0.3)} />
        {/* plastic with a real cut-out (evenodd) */}
        <path d={`${OUTER} ${INNER}`} fill={tint} opacity={0.72} fillRule="evenodd" />
        {/* inner edge of the cut-out */}
        <path d={INNER} fill="none" stroke={shade(tint, 0.35)} strokeWidth={6} strokeLinejoin="round" />
        {/* hypotenuse lip */}
        <path d="M 180 0 L -180 -360" stroke={shade(tint, 0.35)} strokeWidth={8} strokeLinecap="round" />
        {/* glare */}
        <path d="M -150 -40 L -150 -150" stroke={C.white} strokeWidth={12} strokeLinecap="round" opacity={0.5} />
        {ticks}
      </g>
    </g>
  );
}
