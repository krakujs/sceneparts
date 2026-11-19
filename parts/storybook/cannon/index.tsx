import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Black iron cannon on a wooden carriage with two big wheels, iron cannonballs by the wheel. When fire is on, the
// barrel kicks back and a puff of smoke rolls out of the muzzle. Stands on (x, y), about 600 px wide at s = 1.
export const Cannon: React.FC<{ x: number; y: number; s?: number; f?: number; flip?: boolean; fire?: boolean; iron?: string; wood?: string }> = ({ x, y, s = 1, f = 0, flip = false, fire = false, iron = "#2A2D36", wood = "#8A6A45" }) => {
  const o = { stroke: C.ink, strokeWidth: 7, strokeLinejoin: "round" as const };
  const cycle = 90;
  const ph = (f % cycle) / cycle;
  const recoil = fire ? -Math.max(0, 1 - ph * 6) * 16 : 0;
  const topY = (xx: number) => -312 + ((xx + 200) / 420) * -18;
  const botY = (xx: number) => -250 + ((xx + 200) / 420) * -20;
  const wheel = (wx: number) => (
    <g>
      <circle cx={wx} cy={-140} r={140} fill={wood} {...o} />
      <circle cx={wx} cy={-140} r={122} fill="none" stroke="#6A4E30" strokeWidth={8} />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        return <line key={i} x1={wx} y1={-140} x2={wx + Math.cos(a) * 124} y2={-140 + Math.sin(a) * 124} stroke="#6A4E30" strokeWidth={8} />;
      })}
      <circle cx={wx} cy={-140} r={18} fill={iron} {...o} strokeWidth={5} />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={40} cy={4} rx={380} ry={18} fill="#000" opacity={0.2} />
      {wheel(-170)}
      {wheel(120)}
      <rect x={-260} y={-250} width={420} height={36} rx={6} fill={wood} {...o} />
      <g transform={`translate(${recoil} 0)`}>
        <path d="M -200 -312 L 220 -330 L 220 -270 L -200 -250 Z" fill={iron} {...o} />
        <path d="M -190 -305 L 210 -322" stroke="#5A5F6E" strokeWidth={6} opacity={0.7} strokeLinecap="round" />
        <circle cx={-200} cy={-281} r={40} fill={iron} {...o} />
        <rect x={-250} y={-292} width={14} height={20} rx={3} fill={iron} stroke={C.ink} strokeWidth={4} />
        {[-120, 40].map((rx) => (
          <rect key={rx} x={rx} y={topY(rx) - 6} width={20} height={botY(rx) - topY(rx) + 12} rx={4} fill="#3A3F4E" stroke={C.ink} strokeWidth={5} />
        ))}
        <rect x={214} y={-342} width={26} height={88} rx={4} fill="#3A3F4E" {...o} strokeWidth={6} />
      </g>
      {fire
        ? (() => {
            const flash = ph < 0.08;
            return (
              <g>
                {flash ? <circle cx={250} cy={-300} r={56} fill={C.glow} opacity={(1 - ph / 0.08) * 0.9} /> : null}
                {[0, 1, 2, 3].map((i) => {
                  const q = (ph + i * 0.25) % 1;
                  return <circle key={i} cx={246 + q * 170} cy={-304 - q * 110} r={20 + q * 70} fill="#E8E0D2" stroke={C.ink} strokeWidth={4} opacity={(1 - q) * 0.85} />;
                })}
              </g>
            );
          })()
        : null}
      {[
        [290, -26],
        [332, -26],
        [311, -66],
      ].map(([bx, by], i) => (
        <circle key={i} cx={bx} cy={by} r={24} fill={iron} {...o} strokeWidth={5} />
      ))}
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Cannon x={p.x} y={p.y} s={p.s} f={p.f} flip={p.flip} fire={p.fire} iron={p.iron} wood={p.wood} />;
}
