import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tablet: slate on a small trapezoid stand, generic UI cards. Origin = bottom centre (stand rests on y).
// anim "tap": a touch ripple expands and fades on the screen.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.inkSoft;
  const scr = p.screen && p.screen !== "none" ? p.screen : C.sky;
  const anim: string = p.anim ?? "none";
  const tap = anim === "tap";
  const t = (f % 50) / 50;
  const rippleR = 6 + t * 56;
  const rippleO = tap ? 0.45 * (1 - t) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-190} y={-590} width={380} height={560} rx={40} fill={body} />
        <rect x={-170} y={-570} width={340} height={500} rx={18} fill={scr} />
        <circle cx={0} cy={-580} r={4} fill={shade(body, 0.4)} />
        <circle cx={0} cy={-50} r={8} fill={shade(body, 0.4)} />
        {/* cards */}
        <rect x={-150} y={-550} width={146} height={220} rx={18} fill={C.white} />
        {[-130, -100, -70, -40].map((bx, i) => (
          <rect key={i} x={bx} y={-340 - [40, 70, 55, 90][i]} width={18} height={[40, 70, 55, 90][i]} rx={4} fill={C.blue} />
        ))}
        <rect x={4} y={-550} width={146} height={220} rx={18} fill={C.white} />
        <circle cx={77} cy={-440} r={42} fill="none" stroke={C.teal} strokeWidth={16} />
        <circle cx={77} cy={-440} r={18} fill={C.orange} />
        <rect x={-150} y={-316} width={300} height={110} rx={18} fill={C.white} />
        <rect x={-134} y={-296} width={120} height={12} rx={6} fill={C.greyDark} opacity={0.6} />
        <rect x={-134} y={-270} width={268} height={14} rx={7} fill={C.greyLight} />
        <rect x={-134} y={-270} width={170} height={14} rx={7} fill={C.green} />
        <circle cx={-118} cy={-180} r={16} fill={C.pink} />
        <rect x={-94} y={-190} width={180} height={12} rx={6} fill={C.greyDark} opacity={0.5} />
        <rect x={-94} y={-170} width={120} height={10} rx={5} fill={C.greyLight} />
        <circle cx={-118} cy={-128} r={16} fill={C.yellow} />
        <rect x={-94} y={-138} width={180} height={12} rx={6} fill={C.greyDark} opacity={0.5} />
        <rect x={-94} y={-118} width={120} height={10} rx={5} fill={C.greyLight} />
        {tap && <circle cx={100} cy={-420} r={rippleR} fill={C.blue} opacity={rippleO} />}
        {/* stand */}
        <path d="M -120 0 L -90 -30 L 90 -30 L 120 0 Z" fill={shade(body, 0.25)} />
      </g>
    </g>
  );
}
