import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Sunset: a half orange-red sun sinking at a horizon, with purple and orange glow bands and reflection stripes.
// Origin = centre of the horizon at y. anim "set": the sun sinks slowly over 150 frames, then holds.
const RAYS = [200, 220, 240, 260, 280, 300, 320, 340];
const at = (r: number, deg: number) => { const a = (deg * Math.PI) / 180; return `${(r * Math.cos(a)).toFixed(1)} ${(r * Math.sin(a)).toFixed(1)}`; };
const GLOW_BANDS: [number, number, string, number][] = [[-560, 120, C.purple, 0.22], [-430, 110, C.pink, 0.28], [-300, 100, C.orange, 0.3], [-180, 80, "#FFB36B", 0.35]];
const REFLECT: [number, number, string][] = [[16, 380, C.orange], [44, 300, "#FF6F4A"], [70, 230, C.pink], [94, 160, C.orange], [116, 100, C.yellow]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1150;
  const body = p.color && p.color !== "none" ? p.color : "#FF6F4A";
  const glow = p.color2 && p.color2 !== "none" ? p.color2 : C.orange;
  const anim: string = p.anim ?? "none";
  const t = anim === "set" ? Math.min(1, f / 150) : 0;
  const sink = 110 * t * t * (3 - 2 * t);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {GLOW_BANDS.map(([by, h, c, o], i) => <rect key={i} x={-540} y={by} width={1080} height={h} rx={40} fill={c} opacity={o} />)}
      <defs>
        <clipPath id="sp-sunset-clip">
          <rect x={-540} y={-900} width={1080} height={900} />
        </clipPath>
      </defs>
      <g clipPath="url(#sp-sunset-clip)">
        {[520, 430, 350].map((R, i) => <circle key={i} r={R} fill={glow} opacity={0.12 + i * 0.07} />)}
        <g transform={`translate(0 ${sink.toFixed(1)})`}>
          {RAYS.map((deg, i) => (
            <path key={i} d={`M ${at(250, deg - 5)} L ${at(340, deg)} L ${at(250, deg + 5)} Z`} fill={body} stroke={body} strokeWidth={16} strokeLinejoin="round" />
          ))}
          <circle r={210} fill={body} />
          <circle r={150} fill="#FFB48A" />
        </g>
      </g>
      <rect x={-540} y={-4} width={1080} height={10} rx={5} fill={C.purpleDark} opacity={0.6} />
      {REFLECT.map(([ry, rw, c], i) => <rect key={i} x={-rw / 2} y={ry} width={rw} height={12} rx={6} fill={c} opacity={0.75} />)}
    </g>
  );
}
