import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Cast-iron clothes mangle: two iron end plates, wooden rollers, a big crank wheel that turns and a wet sheet
// dripping onto the boards. Stands on (x, y), bottom centre, about 430 px tall and 800 px wide at s = 1.
export const Mangle: React.FC<{ x: number; y: number; s?: number; f?: number; flip?: boolean; iron?: string; wood?: string; sheet?: string; turn?: boolean }> = ({ x, y, s = 1, f = 0, flip = false, iron = C.stone, wood = "#B88A58", sheet = C.cream, turn = true }) => {
  const o = { stroke: C.ink, strokeWidth: 7, strokeLinejoin: "round" as const };
  const a = turn ? f * 2 : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={60} cy={4} rx={430} ry={18} fill="#000" opacity={0.2} />
      <rect x={-330} y={-24} width={680} height={24} rx={6} fill={C.stoneDark} {...o} />
      {/* end plates */}
      <rect x={-300} y={-400} width={60} height={378} rx={14} fill={iron} {...o} />
      <rect x={240} y={-400} width={60} height={378} rx={14} fill={iron} {...o} />
      <path d="M -292 -370 Q -292 -390 -270 -392" stroke="#FFFFFF" strokeWidth={6} fill="none" opacity={0.3} strokeLinecap="round" />
      {/* crank axle and wheel */}
      <rect x={296} y={-332} width={64} height={24} fill={iron} {...o} />
      <g transform={`rotate(${a} 360 -320)`}>
        <circle cx={360} cy={-320} r={104} fill="none" stroke={C.ink} strokeWidth={22} />
        <circle cx={360} cy={-320} r={104} fill="none" stroke={iron} strokeWidth={14} />
        {[0, 90, 180, 270].map((d) => (
          <line key={d} x1={360} y1={-320} x2={360 + Math.cos((d * Math.PI) / 180) * 96} y2={-320 + Math.sin((d * Math.PI) / 180) * 96} stroke={C.ink} strokeWidth={12} />
        ))}
        <circle cx={360} cy={-320} r={28} fill={C.mustard} {...o} />
        <circle cx={360 + 66} cy={-320} r={14} fill={C.mustard} {...o} />
      </g>
      <circle cx={360} cy={-320} r={10} fill={C.ink} />
      {/* rollers */}
      <rect x={-270} y={-336} width={540} height={46} rx={23} fill={wood} {...o} />
      <rect x={-270} y={-286} width={540} height={48} rx={24} fill="#A97C50" {...o} />
      <path d="M -200 -320 L 200 -320" stroke="#6A4E30" strokeWidth={3} opacity={0.5} />
      {/* wet sheet */}
      <path d="M -200 -284 L 180 -284 L 200 -170 Q 190 -110 210 -34 Q 120 -12 60 -36 Q -20 -10 -90 -32 Q -150 -10 -200 -36 Q -216 -160 -200 -284 Z" fill={sheet} {...o} />
      <path d="M -120 -250 Q -110 -180 -130 -110 M 40 -250 Q 50 -170 30 -100" stroke="#B9A886" strokeWidth={4} fill="none" opacity={0.7} />
      {/* drips */}
      {[-150, -10, 120].map((dx, i) => {
        const ph = ((f * 1.5 + i * 37) % 60) / 60;
        return (
          <g key={i}>
            <ellipse cx={dx} cy={-6} rx={36} ry={5} fill={C.teal} opacity={0.35} />
            <ellipse cx={dx} cy={-30 + ph * 26} rx={4} ry={7} fill={C.teal} stroke={C.ink} strokeWidth={2} opacity={1 - ph * 0.6} />
          </g>
        );
      })}
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Mangle x={p.x} y={p.y} s={p.s} f={p.f} flip={p.flip} iron={p.iron} wood={p.wood} sheet={p.sheet} turn={p.turn} />;
}
