import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Potion flask: round glass bottom, short neck, wooden-brown cork. Liquid fills the bulb.
// Origin = bottom centre. About 260 px wide and 480 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
// Bubbles: start x, phase offset. Each rises from the liquid level in a 80-frame loop.
const BUBBLES = [
  { x: -60, r: 12, ph: 0 }, { x: 30, r: 16, ph: 25 }, { x: -10, r: 9, ph: 50 }, { x: 70, r: 10, ph: 60 },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1.2, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const liquid = p.color && p.color !== "none" ? p.color : C.green;
  const anim: string = p.anim ?? "bubble";
  // flask outline: round bulb (r 150, centre y -170) with a neck up to y -400
  const bulb = "M -40 -390 L -40 -330 Q -150 -300 -150 -170 A 150 150 0 0 0 150 -170 Q 150 -300 40 -330 L 40 -390 Z";
  const liquidPath = "M -137 -160 Q -137 -40 0 -20 Q 137 -40 137 -160 Q 60 -140 0 -150 Q -60 -140 -137 -160 Z";
  const bubbleY = (b: { ph: number }) => -60 - (((f + b.ph) % 80) / 80) * 180;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={160} ry={14} fill={C.shadow} />
      {/* glass */}
      <path d={bulb} fill={C.white} opacity={0.35} />
      {/* liquid inside the bulb, clipped to the bulb */}
      <clipPath id="potion-bottle-bulb"><path d={bulb} /></clipPath>
      <g clipPath="url(#potion-bottle-bulb)">
        <path d={liquidPath} fill={liquid} />
        <rect x={-150} y={-20} width={300} height={40} fill={shade(liquid, 0.2)} opacity={0.4} />
        {anim === "bubble" && BUBBLES.map((b, i) => (
          <circle key={i} cx={b.x} cy={f1(bubbleY(b))} r={b.r} fill={C.white} opacity={0.6} />
        ))}
      </g>
      {/* glass outline highlight */}
      <path d="M -110 -220 Q -120 -170 -110 -130" fill="none" stroke={C.white} strokeWidth={14} strokeLinecap="round" opacity={0.7} />
      {/* neck and cork */}
      <rect x={-46} y={-420} width={92} height={36} rx={8} fill={C.brown} />
      <rect x={-46} y={-420} width={92} height={10} rx={4} fill={shade(C.brown, 0.2)} />
      <rect x={-40} y={-390} width={80} height={14} fill={C.white} opacity={0.35} />
    </g>
  );
}
