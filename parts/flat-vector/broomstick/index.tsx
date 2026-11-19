import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Witch's broom lying on a diagonal: a long handle, wrapped binding and a bundle of twigs at the lower left.
// Origin = bottom centre of the bundle's lowest point. About 640 px long at s = 1. Drawn at the default flip (bristles left).
const f1 = (v: number) => v.toFixed(1);
const ANG = -18; // degrees, handle rises to the right

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1.2, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : "#C9A46A";
  const anim: string = p.anim ?? "hover";
  const bob = anim === "hover" ? -(Math.sin((f * 2 * Math.PI) / 80) + 1) * 14 : 0;
  const tilt = anim === "hover" ? Math.sin((f * 2 * Math.PI) / 80) * 2 : 0;
  // twigs: a fan of thin strokes at the bundle end (x -260 .. -120)
  const twigs = Array.from({ length: 9 }, (_, i) => {
    const t = i / 8;
    const yEnd = -70 + t * 80;
    return <path key={i} d={`M -120 -40 Q -200 ${f1(yEnd - 10)} -280 ${f1(yEnd + 10)}`} fill="none" stroke={i % 2 ? shade(wood, 0.25) : shade(wood, 0.1)} strokeWidth={14} strokeLinecap="round" />;
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y + bob)}) scale(${p.flip ? -s : s} ${s}) rotate(${f1(ANG + tilt)})`}>
      <ellipse cx={0} cy={0} rx={300} ry={14} fill={C.shadow} transform={`translate(0 ${f1(-bob)})`} />
      {/* handle */}
      <rect x={-130} y={-40} width={480} height={22} rx={11} fill={wood} />
      <rect x={-130} y={-40} width={480} height={7} rx={3} fill={C.white} opacity={0.25} />
      {/* twigs bundle */}
      <g>{twigs}</g>
      {/* binding wraps */}
      <rect x={-130} y={-62} width={22} height={70} rx={6} fill={C.brown} />
      <rect x={-96} y={-56} width={14} height={58} rx={5} fill={C.brownDark} />
      <rect x={-130} y={-30} width={22} height={0} fill="none" />
      {/* cap at the handle end */}
      <circle cx={350} cy={-29} r={14} fill={shade(wood, 0.2)} />
    </g>
  );
}
