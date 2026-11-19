import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Old hourglass: two glass bulbs in a wooden frame with four turned posts. Sand drains from the top bulb to the
// bottom one in a loop with a thin falling stream. Stands on (x, y), bottom centre, about 520 px tall at s = 1.
export const Hourglass: React.FC<{ x: number; y: number; s?: number; f?: number; flip?: boolean; sand?: string; wood?: string; flow?: boolean }> = ({ x, y, s = 1, f = 0, flip = false, sand = C.mustard, wood = "#8A6A45", flow = true }) => {
  const o = { stroke: C.ink, strokeWidth: 7, strokeLinejoin: "round" as const };
  const cycle = 200;
  const t = (f % cycle) / cycle;
  const topBulb = "M -110 -480 L 110 -480 Q 110 -320 12 -262 L -12 -262 Q -110 -320 -110 -480 Z";
  const botBulb = "M -12 -238 L 12 -238 Q 110 -180 110 -80 L -110 -80 Q -110 -180 -12 -238 Z";
  const topLevel = -262 - (1 - t) * 200;
  const botLevel = -80 - t * 150;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={4} rx={190} ry={14} fill="#000" opacity={0.2} />
      <defs>
        <clipPath id="hourglass-old-top">
          <path d={topBulb} />
        </clipPath>
        <clipPath id="hourglass-old-bot">
          <path d={botBulb} />
        </clipPath>
      </defs>
      <path d={topBulb} fill="#CFE3E0" opacity={0.45} />
      <path d={botBulb} fill="#CFE3E0" opacity={0.45} />
      <g clipPath="url(#hourglass-old-top)">
        <rect x={-130} y={topLevel} width={260} height={260} fill={sand} />
      </g>
      <g clipPath="url(#hourglass-old-bot)">
        <rect x={-130} y={botLevel} width={260} height={200} fill={sand} />
      </g>
      {flow && t > 0.02 && t < 0.98 ? (
        <line x1={0} y1={-252} x2={0} y2={botLevel} stroke={sand} strokeWidth={7} strokeLinecap="round" strokeDasharray="10 6" strokeDashoffset={-f * 3} />
      ) : null}
      <path d={topBulb} fill="none" {...o} />
      <path d={botBulb} fill="none" {...o} />
      <path d="M -92 -440 Q -92 -360 -40 -300" stroke="#FFFFFF" strokeWidth={8} fill="none" opacity={0.5} strokeLinecap="round" />
      {[-128, 128].map((px) => (
        <g key={px}>
          <line x1={px} y1={-480} x2={px} y2={-40} stroke={C.ink} strokeWidth={28} strokeLinecap="round" />
          <line x1={px} y1={-480} x2={px} y2={-40} stroke={wood} strokeWidth={14} strokeLinecap="round" />
        </g>
      ))}
      <rect x={-150} y={-520} width={300} height={40} rx={8} fill={wood} {...o} />
      <rect x={-150} y={-40} width={300} height={40} rx={8} fill={wood} {...o} />
      <rect x={-132} y={-512} width={264} height={8} rx={4} fill="#A97C50" opacity={0.7} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Hourglass x={p.x} y={p.y} s={p.s} f={p.f} flip={p.flip} sand={p.sand} wood={p.wood} flow={p.flow} />;
}
