import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TileRect, Tint, asTime, snap, rnd } from "../backdrop/index";
import { PixSky } from "../backdrop/index";

// Stadium: pixel-art sports stadium. Tiered stands of coloured crowd dots that bob from p.f, floodlight towers
// with glowing lamps, and a striped green pitch with white touch-lines, a halfway line and a centre circle.

const COLS = ["#d2403f", "#2f5fb8", "#f7d154", "#f5f1e8", "#ef8fb4", "#f08a3c", "#4caf50", "#5ab4f0", "#7a4bb5"];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const gy = snap(p.groundY ?? 1600, 12);
  const seed = p.seed ?? 17;
  const animOn = (p.anim ?? "crowd") !== "none";
  const f = animOn ? p.f ?? 0 : 0;
  const pitchTop = 900;
  const cx = 540, cy = 1400, R = 12;
  const ring: React.ReactNode[] = [];
  for (let r = -R; r <= R; r++)
    for (let c = -R; c <= R; c++) {
      const d = Math.hypot(c, r);
      if (d >= R - 0.6 && d <= R + 0.4) ring.push(<rect key={`c${r}-${c}`} x={cx + c * 12} y={cy + r * 12} width={12} height={12} fill="#f5f1e8" />);
    }
  const crowd: React.ReactNode[] = [];
  for (let r = 0; r < 7; r++)
    for (let c = 0; c < 45; c++) {
      if (rnd(seed, r * 97 + c) < 0.15) continue;
      const wave = animOn ? Math.round(Math.sin((f + c * 7 + r * 25) / 12)) * 12 : 0;
      crowd.push(<rect key={`d${r}-${c}`} x={c * 24 + 4} y={snap(440 + r * 60 + wave)} width={12} height={12} fill={COLS[Math.floor(rnd(seed, c * 17 + r * 3) * COLS.length)]} />);
    }
  const lights = [40, 980].map((x, i) => (
    <g key={"light" + i}>
      <rect x={x} y={120} width={12} height={380} fill="#5a6170" />
      <rect x={x - 36} y={80} width={84} height={48} fill="#23305e" />
      <rect x={x - 24} y={92} width={60} height={24} fill="#f5f1e8" />
      <circle cx={x + 18} cy={104} r={200} fill="#fff6dc" opacity={animOn ? 0.12 + 0.05 * (Math.floor((f + i * 7) / 9) % 2) : 0.15} />
    </g>
  ));
  return (
    <g>
      <PixSky time={time} to={420} f={f} clouds={2} seed={seed} drift={animOn} />
      <rect x={0} y={420} width={1080} height={480} fill="#3a3f52" />
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={"row" + i} x={0} y={420 + i * 60} width={1080} height={6} fill="#23305e" opacity={0.5} />
      ))}
      {crowd}
      {lights}
      <TileRect tile="lawn" x={0} y={pitchTop} w={1080} h={1920 - pitchTop} f={f} />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={"st" + i} x={0} y={pitchTop + i * 240} width={1080} height={120} fill="#f5f1e8" opacity={0.06} />
      ))}
      <rect x={60} y={940} width={960} height={12} fill="#f5f1e8" />
      <rect x={60} y={1868} width={960} height={12} fill="#f5f1e8" />
      <rect x={60} y={940} width={12} height={940} fill="#f5f1e8" />
      <rect x={1008} y={940} width={12} height={940} fill="#f5f1e8" />
      <rect x={60} y={1404} width={960} height={12} fill="#f5f1e8" />
      <rect x={300} y={940} width={480} height={12} fill="#f5f1e8" />
      <rect x={300} y={940} width={12} height={228} fill="#f5f1e8" />
      <rect x={768} y={940} width={12} height={228} fill="#f5f1e8" />
      <rect x={300} y={1680} width={480} height={12} fill="#f5f1e8" />
      <rect x={300} y={1680} width={12} height={200} fill="#f5f1e8" />
      <rect x={768} y={1680} width={12} height={200} fill="#f5f1e8" />
      {ring}
      <Tint time={time} y={0} />
    </g>
  );
}
