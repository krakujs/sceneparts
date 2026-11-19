import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Crystal ball on an ornate stand: a glass orb with swirling mist inside, on a gold-trimmed pedestal.
// Origin = bottom centre of the stand. About 360 px wide and 480 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const ORB = { cx: 0, cy: -270, r: 170 };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1.2, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const glow = p.color && p.color !== "none" ? p.color : C.skyDeep;
  const anim: string = p.anim ?? "swirl";
  const a = anim === "swirl" ? (f * 2 * Math.PI) / 120 : 0;
  const pulse = anim === "swirl" ? 0.8 + 0.2 * Math.sin((f * 2 * Math.PI) / 60) : 0.9;
  // three mist swirls, each an ellipse rotated around the orb centre
  const swirl = (k: number, col: string, op: number) => {
    const ang = (a * 180) / Math.PI + k * 120;
    return (
      <g transform={`translate(${ORB.cx} ${ORB.cy}) rotate(${f1(ang)})`} opacity={op}>
        <ellipse cx={0} cy={0} rx={ORB.r * 0.8} ry={ORB.r * 0.28} fill={col} />
      </g>
    );
  };
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={170} ry={16} fill={C.shadow} />
      {/* ornate stand: base, stem with knob, cup */}
      <path d="M -150 -30 Q -150 -60 -110 -66 L 110 -66 Q 150 -60 150 -30 L 150 0 L -150 0 Z" fill={C.yellowDark} />
      <rect x={-140} y={-40} width={280} height={14} rx={6} fill={C.yellow} />
      <path d="M -40 -66 Q -60 -110 -80 -120 L 80 -120 Q 60 -110 40 -66 Z" fill={C.yellowDark} />
      <ellipse cx={0} cy={-120} rx={92} ry={18} fill={C.yellow} />
      <circle cx={0} cy={-80} r={18} fill={C.yellow} />
      <circle cx={0} cy={-80} r={8} fill={C.purple} />
      {/* orb body */}
      <circle cx={ORB.cx} cy={ORB.cy} r={ORB.r} fill={shade(glow, 0.35)} />
      <circle cx={ORB.cx} cy={ORB.cy} r={ORB.r - 14} fill={glow} opacity={pulse * 0.55} />
      <clipPath id="crystal-ball-orb"><circle cx={ORB.cx} cy={ORB.cy} r={ORB.r - 10} /></clipPath>
      <g clipPath="url(#crystal-ball-orb)">
        {swirl(0, C.white, 0.5 * pulse)}
        {swirl(1, C.purple, 0.35 * pulse)}
        {swirl(2, C.white, 0.3 * pulse)}
      </g>
      {/* glass highlight */}
      <path d="M -110 -330 Q -80 -390 -20 -400 Q -70 -360 -90 -310 Z" fill={C.white} opacity={0.75} />
      <circle cx={ORB.cx} cy={ORB.cy} r={ORB.r} fill="none" stroke={C.white} strokeWidth={0} />
    </g>
  );
}
