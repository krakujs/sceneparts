import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Sunrise: a half sun above a horizon line with warm glow rings and rays. Origin = centre of the horizon at y.
// anim "rise": the sun climbs up from behind the horizon over 90 frames, then holds.
const at = (r: number, deg: number) => { const a = (deg * Math.PI) / 180; return `${(r * Math.cos(a)).toFixed(1)} ${(r * Math.sin(a)).toFixed(1)}`; };
const RAYS = [200, 220, 240, 260, 280, 300, 320, 340];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1150;
  const body = p.color && p.color !== "none" ? p.color : C.yellow;
  const glow = p.color2 && p.color2 !== "none" ? p.color2 : C.orange;
  const anim: string = p.anim ?? "none";
  const t = anim === "rise" ? Math.min(1, f / 90) : 1;
  const rise = 260 * (1 - Math.pow(1 - t, 3));
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <defs>
        <clipPath id="sp-sunrise-clip">
          <rect x={-540} y={-900} width={1080} height={900} />
        </clipPath>
      </defs>
      <g clipPath="url(#sp-sunrise-clip)">
        {[520, 440, 370, 305].map((R, i) => <circle key={i} r={R} fill={glow} opacity={0.12 + i * 0.08} />)}
        <g transform={`translate(0 ${rise.toFixed(1)})`}>
          {RAYS.map((deg, i) => (
            <path key={i} d={`M ${at(250, deg - 5)} L ${at(350, deg)} L ${at(250, deg + 5)} Z`} fill={body} stroke={body} strokeWidth={16} strokeLinejoin="round" />
          ))}
          <circle r={210} fill={body} />
          <circle r={150} fill="#FFF1B3" />
        </g>
      </g>
      <rect x={-540} y={-4} width={1080} height={10} rx={5} fill={glow} />
      <rect x={-540} y={6} width={1080} height={90} fill={glow} opacity={0.2} />
    </g>
  );
}
