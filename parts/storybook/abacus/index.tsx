import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Wooden abacus: a framed board of nine wire rods with coloured beads, a central divider and beads that slide
// along the rods. Stands on (x, y), bottom centre, about 400 px tall and 460 px wide at s = 1.
export const Abacus: React.FC<{ x: number; y: number; s?: number; f?: number; flip?: boolean; frame?: string; slide?: boolean }> = ({ x, y, s = 1, f = 0, flip = false, frame = "#8A6A45", slide = true }) => {
  const o = { stroke: C.ink, strokeWidth: 7, strokeLinejoin: "round" as const };
  const colours = [C.brick, C.mustard, C.teal, C.dawn, C.cream, C.dusk, C.brickDark, C.glow, C.sepia];
  const bead = (bx: number, by: number, col: string, key: string) => (
    <g key={key}>
      <ellipse cx={bx} cy={by} rx={17} ry={14} fill={col} stroke={C.ink} strokeWidth={4} />
      <ellipse cx={bx - 5} cy={by - 5} rx={4} ry={2.5} fill="#FFFFFF" opacity={0.6} />
    </g>
  );
  const rows = Array.from({ length: 9 }, (_, i) => -350 + i * 36);
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={4} rx={250} ry={14} fill="#000" opacity={0.2} />
      <rect x={-200} y={-14} width={50} height={14} rx={4} fill={frame} {...o} strokeWidth={5} />
      <rect x={150} y={-14} width={50} height={14} rx={4} fill={frame} {...o} strokeWidth={5} />
      <rect x={-230} y={-400} width={460} height={388} rx={14} fill={frame} {...o} />
      <rect x={-200} y={-370} width={400} height={340} rx={6} fill="#B88A58" stroke={C.ink} strokeWidth={4} />
      {rows.map((ry, i) => (
        <g key={i}>
          <line x1={-190} y1={ry} x2={190} y2={ry} stroke="#4A4E5E" strokeWidth={5} strokeLinecap="round" />
          {i % 2 === 0 ? [0, 1, 2].map((k) => bead(-40 - k * 40, ry, colours[i], `l${i}-${k}`)) : null}
          {[0, 1, 2].map((k) => bead(40 + k * 40, ry, colours[i], `r${i}-${k}`))}
          {slide && i % 2 === 1
            ? (() => {
                const sl = (1 + Math.sin(f / 22 + i)) / 2;
                return bead(-180 + sl * 150, ry, colours[i], `s${i}`);
              })()
            : null}
        </g>
      ))}
      <rect x={-6} y={-370} width={12} height={340} fill={frame} stroke={C.ink} strokeWidth={4} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Abacus x={p.x} y={p.y} s={p.s} f={p.f} flip={p.flip} frame={p.frame} slide={p.slide} />;
}
