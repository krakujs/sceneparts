import React from "react";
import { interpolate, random, type PartProps } from "@sceneparts/core";
import { C, bodyFont, typeFont } from "../style/index";

// Shared effects for the SceneParts World scene (sky, waves, rain, snow/ash, flames).
const INK = C.ink;
const SKIES: Record<string, [string, string, string]> = {
  night: ["#0B1226", "#1B2A4D", "#2E3B66"],
  day: ["#6FAEE0", "#A9D3F0", "#E7F1F6"],
  dusk: ["#2B2350", "#B5546A", "#F2A65A"],
  storm: ["#141923", "#2E3646", "#4A5364"],
  snow: ["#9FB1C3", "#C9D5E0", "#EEF2F5"],
  ash: ["#231D1B", "#4E3F37", "#7E644F"],
  space: ["#02030A", "#070B1E", "#0D1433"],
  murk: ["#06202F", "#0B4058", "#16677F"],
};

export const Sky: React.FC<{ sky: string; f: number }> = ({ sky, f }) => {
  const [a, b, c] = SKIES[sky] ?? SKIES.night;
  const stars = sky === "night" || sky === "space";
  return (
    <>
      <defs>
        <linearGradient id={`sky-${sky}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="0.55" stopColor={b} />
          <stop offset="1" stopColor={c} />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={1080} height={1920} fill={`url(#sky-${sky})`} />
      {stars &&
        new Array(70).fill(0).map((_, i) => (
          <circle key={i} cx={random(`sx${i}`) * 1080} cy={random(`sy${i}`) * 1300} r={1 + random(`sr${i}`) * 2.4} fill="#FFF" opacity={0.3 + 0.5 * Math.abs(Math.sin(f / 20 + i))} />
        ))}
    </>
  );
};

export const Waves: React.FC<{ y: number; f: number; color?: string; amp?: number; seed?: string }> = ({ y, f, color = "#0B1830", amp = 14, seed = "w" }) => {
  const pts: string[] = [];
  for (let x = -40; x <= 1120; x += 40) pts.push(`${x} ${(y + Math.sin(x / 70 + f / 9 + random(seed) * 6) * amp).toFixed(1)}`);
  return <path d={`M -40 1920 L ${pts.join(" L ")} L 1120 1920 Z`} fill={color} stroke={INK} strokeWidth={5} />;
};

// weather / overlays
export const Rain: React.FC<{ f: number; n?: number }> = ({ f, n = 70 }) => (
  <g opacity={0.55}>
    {new Array(n).fill(0).map((_, i) => {
      const x = (random(`rx${i}`) * 1300 + f * 6) % 1300 - 150;
      const y = (random(`ry${i}`) * 1920 + f * 38) % 1920;
      return <path key={i} d={`M ${x} ${y} l -14 44`} stroke="#C9D8E8" strokeWidth={4} strokeLinecap="round" />;
    })}
  </g>
);
export const Flakes: React.FC<{ f: number; n?: number; color?: string; speed?: number }> = ({ f, n = 80, color = "#FFFFFF", speed = 4 }) => (
  <g>
    {new Array(n).fill(0).map((_, i) => {
      const x = (random(`fx${i}`) * 1080 + Math.sin(f / 15 + i) * 30 + 1080) % 1080;
      const y = (random(`fy${i}`) * 1920 + f * speed * (0.6 + random(`fs${i}`))) % 1920;
      return <circle key={i} cx={x} cy={y} r={4 + random(`fr${i}`) * 6} fill={color} opacity={0.8} />;
    })}
  </g>
);
export const Flames: React.FC<{ f: number; y?: number; level?: number; x0?: number; x1?: number }> = ({ f, y = 1500, level = 1, x0 = -40, x1 = 1120 }) => {
  const tongues = [];
  for (let x = x0; x <= x1; x += 70) {
    const h = (160 + random(`fl${x}`) * 260) * level * (0.8 + 0.25 * Math.sin(f / 3 + x));
    tongues.push(
      <g key={x}>
        <path d={`M ${x - 55} ${y} Q ${x - 30} ${y - h * 0.6} ${x + Math.sin(f / 4 + x) * 18} ${y - h} Q ${x + 30} ${y - h * 0.55} ${x + 55} ${y} Z`} fill="#E5383B" opacity={0.9} />
        <path d={`M ${x - 32} ${y} Q ${x - 14} ${y - h * 0.45} ${x + Math.sin(f / 3 + x) * 10} ${y - h * 0.7} Q ${x + 18} ${y - h * 0.4} ${x + 32} ${y} Z`} fill="#F2B544" />
      </g>,
    );
  }
  return (
    <g>
      <rect x={-40} y={y - 20} width={1200} height={1920 - y + 20} fill="#7E2E22" />
      {tongues}
    </g>
  );
};


/** Full-frame sky for world scenes: night, day, dusk, storm, snow, ash, space or murk (underwater). */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <g>
      <Sky sky={p.sky} f={p.f} />
      {p.sky === "storm" && p.flash !== false && p.f % 47 < 3 ? <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={0.3} /> : null}
    </g>
  );
}
