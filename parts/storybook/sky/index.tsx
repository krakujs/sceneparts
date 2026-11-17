import React from "react";
import { interpolate, random, type PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Full-frame storybook sky: gradient + optional twinkling stars, a glowing moon and drifting fog.
export const SKIES = ["night", "dawn", "day", "paper", "modern", "dark"] as const;
const LIN: Record<string, [string, string][]> = {
  night: [["0", "#0B1122"], ["0.55", C.navy], ["1", C.dusk]],
  dawn: [["0", C.dusk], ["0.45", "#8C6A8E"], ["0.8", C.dawn], ["1", C.glow]],
  day: [["0", "#8EC3D6"], ["0.7", "#CFE3DA"], ["1", C.cream]],
  modern: [["0", C.modernA], ["1", C.modernB]],
};
const RAD: Record<string, [string, string][]> = {
  paper: [["0", C.cream], ["0.6", C.paper], ["1", C.paperDark]],
  dark: [["0", "#2A2238"], ["1", "#0C0A12"]],
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const sky: string = p.sky;
  const night = sky === "night";
  const id = `sb-sky-${sky}`;
  const stops = (LIN[sky] ?? RAD[sky] ?? LIN.night).map(([o, c]) => <stop key={o} offset={o} stopColor={c} />);
  const moonY = (p.moonY ?? 700) + interpolate(p.f, [0, 300], [10, -10]);
  return (
    <g>
      <defs>
        {RAD[sky] ? <radialGradient id={id} cx="0.5" cy="0.4" r="0.75">{stops}</radialGradient> : <linearGradient id={id} x1="0" y1="0" x2={sky === "modern" ? "0.35" : "0"} y2="1">{stops}</linearGradient>}
        <radialGradient id="sb-moon-glow"><stop offset="0" stopColor={C.glow} stopOpacity={0.55} /><stop offset="1" stopColor={C.glow} stopOpacity={0} /></radialGradient>
        <filter id="sb-fog" x="-30%" y="-100%" width="160%" height="300%"><feGaussianBlur stdDeviation={60} /></filter>
      </defs>
      <rect x={-200} y={-200} width={1480} height={2320} fill={`url(#${id})`} />
      {(p.stars ?? night) ? Array.from({ length: 70 }).map((_, i) => {
        const tw = 0.45 + 0.55 * Math.abs(Math.sin(p.f / (14 + random(`st${i}`) * 30) + i));
        return <circle key={i} cx={random(`sx${i}`) * 1080} cy={random(`sy${i}`) * 1000} r={1 + random(`sr${i}`) * 2.6} fill={C.cream} opacity={tw} />;
      }) : null}
      {(p.moon ?? night) ? (
        <g>
          <circle cx={p.moonX ?? 860} cy={moonY} r={260} fill="url(#sb-moon-glow)" />
          <circle cx={p.moonX ?? 860} cy={moonY} r={95} fill="#FFF3D1" />
          <circle cx={(p.moonX ?? 860) - 30} cy={moonY - 20} r={14} fill="#EADDB8" />
          <circle cx={(p.moonX ?? 860) + 28} cy={moonY + 30} r={20} fill="#EADDB8" />
        </g>
      ) : null}
      {(p.fog ?? night) ? [0, 1, 2].map((i) => (
        <ellipse key={i} cx={550 + Math.sin(p.f / (90 + i * 30) + i) * 160} cy={1270 + i * 170} rx={950} ry={120} fill="rgb(220,225,240)" opacity={0.3 * (1 - i * 0.25)} filter="url(#sb-fog)" />
      )) : null}
    </g>
  );
}
