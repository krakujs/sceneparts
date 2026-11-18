import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Climbing vine on a wooden trellis: two posts with three rails, a green vine winding up the middle with leaves and curling tendrils.
// Origin = centre of the trellis base on the ground. About 560 px wide and 1150 px tall at s = 1. anim sway moves the leaves.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const vineX = (yy: number) => 80 * Math.sin(-yy / 150);
// Vine path from the ground up to y = -1000.
const VINE = Array.from({ length: 64 }, (_, i) => {
  const yy = -i * 16;
  return `${i ? "L" : "M"} ${f1(vineX(yy))} ${f1(yy)}`;
}).join(" ");
// Leaves every 110 px, alternating sides; tendrils on every third leaf.
const LEAVES = Array.from({ length: 9 }, (_, i) => {
  const yy = -90 - i * 110;
  return { x: vineX(yy), y: yy, side: i % 2 ? 1 : -1, tendril: i % 3 === 1 };
});

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const leaf = p.color && p.color !== "none" ? p.color : C.green;
  const wood = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  const rail = (ry: number) => (
    <rect x={-250} y={ry} width={500} height={26} rx={8} fill={shade(wood, 0.15)} />
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={260} ry={16} fill={C.shadow} />
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        {/* trellis behind the vine */}
        {rail(-310)}
        {rail(-650)}
        {rail(-980)}
        <rect x={-250} y={-1100} width={44} height={1100} rx={8} fill={wood} />
        <rect x={206} y={-1100} width={44} height={1100} rx={8} fill={wood} />
        <rect x={-250} y={-1100} width={18} height={1100} rx={6} fill={shade(wood, 0.2)} opacity={0.5} />
        <rect x={206} y={-1100} width={18} height={1100} rx={6} fill={shade(wood, 0.2)} opacity={0.5} />
        {/* vine stalk */}
        <path d={VINE} stroke={shade(leaf, 0.2)} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {LEAVES.map((l, i) => {
          const sw = anim === "sway" ? 6 * Math.sin((f * 2 * Math.PI) / 80 + i) : 0;
          const ang = l.side * (55 + 8 * (i % 2)) + sw;
          return (
            <g key={`l${i}`} transform={`translate(${f1(l.x)} ${f1(l.y)}) rotate(${f1(ang)})`}>
              <path d="M 0 0 C 34 -30 34 -80 0 -110 C -34 -80 -34 -30 0 0 Z" fill={i % 2 ? shade(leaf, 0.12) : leaf} />
              <path d="M 0 0 L 0 -100" stroke={shade(leaf, 0.3)} strokeWidth={4} strokeLinecap="round" />
            </g>
          );
        })}
        {LEAVES.filter((l) => l.tendril).map((l, i) => (
          <path key={`t${i}`} transform={`translate(${f1(l.x + 6)} ${f1(l.y - 6)}) scale(${l.side})`} d="M 0 0 q 10 -24 28 -14 q 12 8 2 18 q -8 4 -10 -6" stroke={leaf} strokeWidth={5} strokeLinecap="round" fill="none" />
        ))}
      </g>
    </g>
  );
}
