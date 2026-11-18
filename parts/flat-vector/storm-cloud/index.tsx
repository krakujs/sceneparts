import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
const PUFFS: [number, number, number][] = [[-170, 20, 80], [-70, -50, 110], [62, -70, 118], [172, 15, 84], [0, 20, 96]];
/** Cloud body with a flat band underneath. */
const cloudShape = (fill: string, under: string) => (
  <g>
    {PUFFS.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={fill} />)}
    <rect x={-250} y={52} width={500} height={60} rx={30} fill={under} />
  </g>
);

// Dark heavy storm cloud with rain and a lightning bolt. Origin = centre of the cloud.
// anim "flash": the cloud flashes white and the bolt brightens in quick bursts every 90 frames; rain falls.
const STREAKS = Array.from({ length: 9 }, (_, i) => i);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 500;
  const fill = p.color && p.color !== "none" ? p.color : "#5D6578";
  const under = p.color2 && p.color2 !== "none" ? p.color2 : "#3A4157";
  const anim: string = p.anim ?? "none";
  const flash = anim === "flash";
  const cyc = f % 90;
  const k = flash ? (cyc < 4 ? 1 : cyc < 8 ? 0.35 : cyc >= 10 && cyc < 13 ? 0.7 : 0) : 0;
  const boltOp = flash ? 0.45 + 0.55 * k : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {cloudShape(fill, under)}
      <ellipse cx={0} cy={-40} rx={300} ry={150} fill="#FFFFFF" opacity={(0.3 * k).toFixed(3)} />
      {STREAKS.map((i) => {
        const ph = (i * 41 + (flash ? f * 5 : 0)) % 170;
        const sx = -170 + i * 42 + (i % 2 ? 8 : -8);
        const y0 = 150 + ph;
        return <line key={i} x1={sx} y1={y0} x2={sx - 10} y2={y0 + 56} stroke={C.blue} strokeWidth={11} strokeLinecap="round" opacity={(1 - 0.6 * (ph / 170)).toFixed(3)} />;
      })}
      <g opacity={boltOp.toFixed(3)}>
        <path d="M 18 146 L -34 262 L 10 262 L -44 402" fill="none" stroke={C.yellow} strokeWidth={40} strokeLinejoin="round" strokeLinecap="round" />
        <path d="M 18 146 L -34 262 L 10 262 L -44 402" fill="none" stroke="#FFF6C7" strokeWidth={14} strokeLinejoin="round" strokeLinecap="round" />
      </g>
    </g>
  );
}
