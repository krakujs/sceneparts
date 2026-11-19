import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, font } from "../style/index";

// Neon sign: glowing tube shapes on a dark wall plate. shape: heart, arrow, star, lightning or the word OPEN.
// anim "flicker": the tubes stutter like an old neon tube. Prop: origin = centre of the sign; ~580 x 460 px at s = 1.
const SHAPES: Record<string, string> = {
  heart: "M 0 120 C -200 -10 -130 -170 0 -70 C 130 -170 200 -10 0 120 Z",
  arrow: "M -200 -46 L 40 -46 L 40 -120 L 200 0 L 40 120 L 40 46 L -200 46 Z",
  lightning: "M 50 -200 L -90 24 L -6 24 L -54 200 L 96 -34 L 10 -34 Z",
};
const starD = (R: number, r: number) => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? R : r;
    pts.push(`${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)}`);
  }
  return "M " + pts.join(" L ") + " Z";
};
SHAPES.star = starD(200, 84);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { x = 540, y = 900, s = 1, f = 0, flip, shape = "heart", color = "#FF5FA2", anim = "flicker", backing = true } = p as any;
  // Flicker: a short dip every 130 frames, then a brief second stutter.
  const cyc = f % 130;
  const flick = anim !== "flicker" ? 1 : cyc >= 118 && cyc < 124 ? 0.2 : cyc >= 124 && cyc < 127 ? 0.6 : 1;
  const g = flick * (0.95 + 0.05 * Math.sin(f / 5));
  const tube = (d: string) => (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth={64} strokeLinejoin="round" opacity={0.14 * g} />
      <path d={d} fill="none" stroke={color} strokeWidth={30} strokeLinejoin="round" opacity={0.3 * g} />
      <path d={d} fill="none" stroke={color} strokeWidth={13} strokeLinejoin="round" opacity={g} />
      <path d={d} fill="none" stroke={C.white} strokeWidth={4} strokeLinejoin="round" opacity={g} />
    </g>
  );
  const word = (stroke: string, w: number, op: number) => (
    <text x={0} y={80} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={230} fill="none" stroke={stroke} strokeWidth={w} strokeLinejoin="round" opacity={op} textLength={420} lengthAdjust="spacingAndGlyphs">
      OPEN
    </text>
  );
  const drawn =
    shape === "OPEN" ? (
      <g>
        {word(color, 40, 0.14 * g)}
        {word(color, 18, 0.3 * g)}
        {word(color, 8, g)}
        {word(C.white, 3, g)}
      </g>
    ) : (
      tube(SHAPES[shape] ?? SHAPES.heart)
    );
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={330} ry={280} fill={color} opacity={0.06 * g} />
      {backing && (
        <g>
          <rect x={-290} y={-230} width={580} height={460} rx={36} fill="#1B1F2E" stroke="#2E3550" strokeWidth={6} />
          {[[-262, -202], [262, -202], [-262, 202], [262, 202]].map(([bx, by]) => (
            <circle key={`${bx}-${by}`} cx={bx} cy={by} r={8} fill="#3A4157" />
          ))}
        </g>
      )}
      {drawn}
    </g>
  );
}
