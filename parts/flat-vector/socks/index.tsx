import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// A pair of crew socks laid as an L: the leg stands up on the left and the foot lies to the right, toe at the end.
// Ribbed cuff, coloured heel and toe, and two stripes. Origin = bottom centre (the sole rests on y).
// About 480 px wide and 470 px tall at s = 1.
// anim "wiggle": the pair sways a little; "bob": the pair bounces.
const f1 = (v: number) => v.toFixed(1);

const Sock = ({ c, acc }: { c: string; acc: string }) => (
  <g>
    {/* leg and foot in one L-shaped piece */}
    <path d="M -120 -470 L -20 -470 L -20 -150 L 110 -150 Q 200 -150 214 -80 Q 222 -10 180 0 L -90 0 Q -120 0 -120 -30 Z" fill={c} />
    {/* two stripes */}
    <rect x={-120} y={-336} width={100} height={14} fill={C.white} />
    <rect x={-120} y={-308} width={100} height={14} fill={C.white} />
    {/* coloured heel and toe */}
    <path d="M -120 -60 Q -120 0 -90 0 L -20 0 L -20 -50 Q -60 -60 -120 -60 Z" fill={acc} />
    <path d="M 165 -150 Q 200 -150 214 -80 Q 222 -10 180 0 L 150 0 Q 176 -50 165 -150 Z" fill={acc} />
    {/* ribbed cuff */}
    <rect x={-120} y={-470} width={100} height={84} rx={10} fill={acc} />
    {[-110, -94, -78, -62, -46, -30].map((rx) => (
      <line key={rx} x1={rx} y1={-466} x2={rx} y2={-390} stroke={shade(acc, 0.3)} strokeWidth={5} strokeLinecap="round" />
    ))}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.purple;
  const acc = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const sway = anim === "wiggle" ? Math.sin((f * 2 * Math.PI) / 60) * 3 : 0;
  const bob = anim === "bob" ? -Math.abs(Math.sin((f * Math.PI) / 30)) * 10 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={12} fill={C.shadow} />
      <g transform={`translate(${f1(-50)} ${f1(bob)}) rotate(${f1(sway)} -70 0)`}>
        <g transform="translate(100 -22)">
          <Sock c={shade(body, 0.22)} acc={shade(acc, 0.15)} />
        </g>
        <Sock c={body} acc={acc} />
      </g>
    </g>
  );
}
