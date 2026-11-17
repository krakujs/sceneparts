import React from "react";
import { interpolate, spring, Easing, type PartProps } from "@sceneparts/core";

// Looming god silhouette, drawn in code (original design, never a copy of film/game versions).
export type GodForm = "humanoid" | "lion" | "winged" | "serpent" | "spider" | "beast";
export type Palette = { sky: string; accent: string; god: string; glow: string };

export const God: React.FC<{
  form?: GodForm;
  wings?: number;
  palette: Palette;
  eyesAt?: number;   // seconds until the eyes open
  fill?: number;     // share of frame height the god occupies (0.7–0.95)
  breathe?: boolean;
  rage?: number;     // 0–1, adds glow + shake
  frame: number;
  durationInFrames: number;
  fps?: number;
}> = ({ form = "humanoid", wings = 0, palette, eyesAt = 0.3, fill = 0.85, breathe = true, rage = 0, frame, durationInFrames, fps = 30 }) => {
  const loom = interpolate(frame, [0, durationInFrames], [0.94, 1.05], { extrapolateRight: "clamp" });
  const breath = breathe ? 1 + 0.012 * Math.sin(frame / 9) : 1;
  const eyes = spring({ frame: frame - Math.round(eyesAt * fps), fps, config: { damping: 18, stiffness: 90 } });
  const shake = rage > 0.6 ? Math.sin(frame * 1.7) * 6 * rage : 0;
  const glow = 10 + 40 * rage;
  const H = 1920 * fill;
  const wingSpread = interpolate(frame, [0, 20], [0.6, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  const g = palette.god, a = palette.glow;
  const rim = { stroke: a, strokeWidth: 6, strokeOpacity: 0.55 + 0.4 * rage } as const;

  const head = (() => {
    switch (form) {
      case "lion":
        return (
          <g>
            {Array.from({ length: 18 }).map((_, i) => {
              const ang = (i / 18) * Math.PI * 2;
              return <path key={i} d={`M540 300 L${540 + Math.cos(ang) * 230} ${300 + Math.sin(ang) * 230} L${540 + Math.cos(ang + 0.2) * 150} ${300 + Math.sin(ang + 0.2) * 150} Z`} fill={g} {...rim} />;
            })}
            <ellipse cx={540} cy={310} rx={150} ry={165} fill={g} {...rim} />
            <path d="M470 400 Q540 450 610 400" stroke={a} strokeWidth={8} fill="none" opacity={0.7} />
          </g>
        );
      case "serpent":
        return (
          <g>
            <path d="M540 180 C700 160 760 260 700 340 L540 420 L380 340 C320 260 380 160 540 180 Z" fill={g} {...rim} />
            {[0, 1, 2].map((i) => <path key={i} d={`M${430 + i * 110} 190 l20 -90 l20 90 Z`} fill={g} {...rim} />)}
          </g>
        );
      case "spider":
        return <ellipse cx={540} cy={300} rx={130} ry={150} fill={g} {...rim} />;
      case "beast":
        return (
          <g>
            <path d="M380 200 Q540 80 700 200 L720 420 Q540 500 360 420 Z" fill={g} {...rim} />
            {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${420 + i * 50} 420 l18 50 l18 -50`} fill="#f4f1e8" />)}
          </g>
        );
      default:
        return <ellipse cx={540} cy={300} rx={135} ry={160} fill={g} {...rim} />;
    }
  })();

  const body = (() => {
    if (form === "serpent")
      return <path d="M540 420 C900 600 120 800 540 1000 C960 1200 120 1400 540 1600 C820 1720 900 1800 1080 1900 L0 1920 Z" fill={g} {...rim} />;
    if (form === "spider")
      return (
        <g>
          <ellipse cx={540} cy={760} rx={260} ry={340} fill={g} {...rim} />
          {[-1, 1].flatMap((side) => [0, 1, 2, 3].map((i) => (
            <path key={`${side}${i}`} d={`M${540 + side * 200} ${600 + i * 90} Q${540 + side * 520} ${380 + i * 120} ${540 + side * 600} ${1300 + i * 120}`}
              stroke={g} strokeWidth={34} fill="none" strokeLinecap="round" />
          )))}
        </g>
      );
    return (
      <g>
        <path d="M300 470 Q540 400 780 470 L900 1900 L180 1900 Z" fill={g} {...rim} />
        <path d="M300 500 Q120 900 160 1300" stroke={g} strokeWidth={110} strokeLinecap="round" fill="none" />
        <path d="M780 500 Q960 900 920 1300" stroke={g} strokeWidth={110} strokeLinecap="round" fill="none" />
      </g>
    );
  })();

  const wingPaths = wings === 0 ? null : (
    <g opacity={0.95}>
      {(wings === 4 ? [0, 1] : [0]).flatMap((tier) => [-1, 1].map((side) => (
        <path key={`${tier}${side}`} fill={g} {...rim}
          d={`M540 ${560 + tier * 260} Q${540 + side * 700 * wingSpread} ${200 + tier * 300} ${540 + side * 560 * wingSpread} ${980 + tier * 260} Q${540 + side * 300} ${820 + tier * 240} 540 ${700 + tier * 260} Z`} />
      )))}
    </g>
  );

  const eyeY = form === "serpent" ? 300 : form === "beast" ? 290 : 300;
  const scale = (loom * breath * H) / 1920;
  return (
    <g>
      <defs>
        <radialGradient id="god-sky" cx="0.5" cy="0.3" r="0.9"><stop offset="0" stopColor={palette.sky} /><stop offset="0.95" stopColor="#000" /></radialGradient>
        <filter id="god-glow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation={glow / 2} floodColor={a} floodOpacity={0.9} /></filter>
      </defs>
      <rect x={-200} y={-200} width={1480} height={2320} fill="url(#god-sky)" />
      <g transform={`translate(${540 + shake} 1920) scale(${scale}) translate(-540 -1920)`} filter="url(#god-glow)">
        {wingPaths}
        {body}
        {head}
        {[-1, 1].map((s) => (
          <g key={s}>
            <ellipse cx={540 + s * 58} cy={eyeY} rx={34} ry={Math.max(1, 20 * eyes)} fill={a} />
            <ellipse cx={540 + s * 58} cy={eyeY} rx={70} ry={Math.max(1, 40 * eyes)} fill={a} opacity={0.25 * eyes} />
          </g>
        ))}
      </g>
    </g>
  );
};

/** Giant looming god silhouette filling the frame; eyes open at eyesAt seconds; rage adds glow and shake. */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const palette = { sky: p.sky, accent: p.glow, god: p.color, glow: p.glow };
  return <God form={p.form} wings={p.wings} palette={palette} eyesAt={p.eyesAt} fill={p.fill} breathe={p.breathe} rage={p.rage} frame={p.f} durationInFrames={p.d} />;
}
