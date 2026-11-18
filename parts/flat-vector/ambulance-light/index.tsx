import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Emergency beacon: a dome light split into a red half and a blue half on a short base.
// Origin = bottom centre (stands on y). anim "flash": the lit side alternates every 15 frames,
// with a glow and a fan of rays on that side; the other side is dimmed.
const f1 = (v: number) => v.toFixed(1);
const ray = (a: number, r0: number, r1: number) => {
  const r = (a * Math.PI) / 180;
  return { x1: f1(Math.cos(r) * r0), y1: f1(-120 + Math.sin(r) * r0), x2: f1(Math.cos(r) * r1), y2: f1(-120 + Math.sin(r) * r1) };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const red = p.color && p.color !== "none" ? p.color : C.red;
  const blue = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const anim: string = p.anim ?? "none";
  const flash = anim === "flash";
  const redOn = !flash || Math.floor(f / 15) % 2 === 0;
  const blueOn = !flash || !redOn;
  const pulse = 0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 15);
  const glowRed = flash ? (redOn ? 0.12 + 0.1 * pulse : 0) : 0.08;
  const glowBlue = flash ? (blueOn ? 0.12 + 0.1 * pulse : 0) : 0.08;
  const rc = redOn ? red : shade(red, 0.45);
  const bc = blueOn ? blue : shade(blue, 0.45);
  const leftRays = [165, 200, 235].map((a) => ray(a, 190, 245));
  const rightRays = [-55, -20, 15].map((a) => ray(a, 190, 245));
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={14} fill={C.shadow} />
      {/* glows, one per side */}
      <circle cx={-80} cy={-130} r={170} fill={red} opacity={glowRed.toFixed(3)} />
      <circle cx={80} cy={-130} r={170} fill={blue} opacity={glowBlue.toFixed(3)} />
      {/* short base */}
      <rect x={-120} y={-60} width={240} height={60} rx={12} fill={C.navy} />
      <rect x={-160} y={-84} width={320} height={28} rx={10} fill={C.inkSoft} />
      {/* dome, two halves */}
      <path d="M -140 -80 A 140 140 0 0 1 0 -220 L 0 -80 Z" fill={rc} />
      <path d="M 0 -220 A 140 140 0 0 1 140 -80 L 0 -80 Z" fill={bc} />
      {/* rim */}
      <rect x={-150} y={-96} width={300} height={18} rx={9} fill={C.ink} opacity={0.5} />
      {/* lens highlight */}
      <ellipse cx={-60} cy={-170} rx={30} ry={14} transform="rotate(-35 -60 -170)" fill={C.white} opacity={0.5} />
      {/* rays on the lit side(s) */}
      {(redOn ? leftRays : []).map((r, i) => (
        <line key={`l${i}`} {...r} stroke={red} strokeWidth={14} strokeLinecap="round" />
      ))}
      {(blueOn ? rightRays : []).map((r, i) => (
        <line key={`r${i}`} {...r} stroke={blue} strokeWidth={14} strokeLinecap="round" />
      ))}
    </g>
  );
}
