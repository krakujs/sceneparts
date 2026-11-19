import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Baseball glove, seen from the front with the fingers up: a leather mitt with a thumb on the left, a pocket
// with laced webbing across it and a wrist cuff at the bottom. Origin = bottom centre; the cuff rests on y.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const leather = p.color && p.color !== "none" ? p.color : C.brown;
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 40) + 1) * 8 : 0;
  const rot = anim === "wobble" ? Math.sin((f * 2 * Math.PI) / 40) * 2 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y + bob)}) scale(${p.flip ? -s : s} ${s}) rotate(${f1(rot)})`}>
      <ellipse cx={0} cy={4} rx={190} ry={12} fill={C.shadow} />
      {/* thumb on the left */}
      <path d="M -140 -230 Q -250 -220 -250 -120 Q -246 -62 -150 -60 Z" fill={shade(leather, 0.16)} />
      {/* main body: fingers up, palm down */}
      <path d="M -150 -40 Q -172 -300 -120 -420 Q -60 -480 0 -480 Q 60 -480 120 -420 Q 172 -300 150 -40 Q 120 10 0 10 Q -120 10 -150 -40 Z" fill={leather} />
      <path d="M 40 -460 Q 120 -420 150 -300 Q 166 -180 150 -40 Q 120 10 0 10 Q 60 -40 80 -180 Q 96 -320 40 -460 Z" fill={shade(leather, 0.16)} />
      {/* finger separations */}
      <path d="M -40 -470 Q -36 -330 -30 -250" fill="none" stroke={shade(leather, 0.3)} strokeWidth={8} strokeLinecap="round" />
      <path d="M 30 -475 Q 34 -330 40 -250" fill="none" stroke={shade(leather, 0.3)} strokeWidth={8} strokeLinecap="round" />
      {/* pocket with lacing */}
      <ellipse cx={0} cy={-200} rx={112} ry={120} fill={C.sand} />
      <path d="M -92 -330 L 92 -150 M 92 -330 L -92 -150 M -80 -250 L 80 -250 M -70 -190 L 70 -190 M 0 -340 L 0 -150" fill="none" stroke={C.brownDark} strokeWidth={9} strokeLinecap="round" />
      <path d="M -112 -200 Q 0 -150 112 -200" fill="none" stroke={shade(C.sand, 0.25)} strokeWidth={6} />
      {/* wrist cuff */}
      <rect x={-150} y={-40} width={300} height={50} rx={20} fill={C.brownDark} />
    </g>
  );
}
