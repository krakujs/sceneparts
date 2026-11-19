import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, gridOf } from "../style/index";
import { TileRect, rnd, snap } from "../backdrop/index";

// Fire level: volcano stage (reference for lava levels). A red sky, a dark volcano with a glowing crater, a lava
// pool in the middle of the rock ground, fire jets that flicker over the lava and embers rising from it.

const SKY: Record<string, string[]> = {
  day: ["#5a0f12", "#8a1d17", "#b8311c", "#dc5a1e", "#f08a3c"],
  dusk: ["#2a0808", "#4a1010", "#6e1a14", "#8a2a18", "#a84020"],
  night: ["#120404", "#1d0707", "#2a0c0c", "#3a1410", "#4a1d14"],
};
const SMOKE = ["..wwww..", ".wwwwwww", "wwwwwwww", "gggggggg"];
const FLAME = [
  ["..y..", ".yoy.", ".oyo.", "oryro", "ryyyr", ".rrr."],
  [".y...", "..yo.", ".oyoy", "oyryo", "ryyyr", ".rrr."],
];
const SMOKE_PAL = { w: "#4a2a2e", g: "#2e1a1e" };
const FIRE_PAL = { y: "#f7d154", o: "#f08a3c", r: "#d2403f" };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = (["day", "dusk", "night"].includes(p.time) ? p.time : "day") as string;
  const gy = snap(p.groundY ?? 1600, 12);
  const on = (p.anim ?? "flow") === "flow";
  const band = snap(gy / 5, 12);
  const flame = on ? Math.floor(p.f / 6) % 2 : 0;
  const glow = on ? 0.2 + 0.08 * (Math.floor(p.f / 10) % 2) : 0.24;
  const peakY = gy - 840;
  const rows = Array.from({ length: 35 }, (_, r) => r);
  const jets = [{ x: 420, y: gy - 252 }, { x: 600, y: gy - 252 }];
  return (
    <g>
      {SKY[time].map((c, i) => (
        <rect key={i} x={0} y={i * band} width={1080} height={i === 4 ? 1920 : band + 1} fill={c} />
      ))}
      {[[120, 240], [700, 300]].map(([x, y], i) => (
        <Pixels key={i} grid={gridOf(SMOKE)} px={24} pal={SMOKE_PAL} x={x} y={y} />
      ))}
      <circle cx={540} cy={peakY} r={260} fill="#ff6a2a" opacity={glow} />
      {rows.map((r) => {
        const hw = Math.max(24, 420 - r * 12);
        const y = gy - (r + 1) * 24;
        return (
          <g key={r}>
            <rect x={540 - hw} y={y} width={hw * 2} height={24} fill="#3b2a2e" />
            <rect x={540 - hw} y={y} width={24} height={24} fill="#5a4048" />
          </g>
        );
      })}
      <rect x={456} y={peakY - 24} width={168} height={48} fill="#f08a3c" />
      <rect x={480} y={peakY - 24} width={120} height={24} fill="#ffd23f" />
      <TileRect tile="rock" x={0} y={gy} w={360} h={1920 - gy} cell={12} />
      <TileRect tile="rock" x={720} y={gy} w={360} h={1920 - gy} cell={12} />
      <TileRect tile="rock" x={312} y={gy - 144} w={48} h={1920 - gy + 144} cell={12} />
      <TileRect tile="rock" x={720} y={gy - 144} w={48} h={1920 - gy + 144} cell={12} />
      <TileRect tile="lava" x={360} y={gy - 144} w={360} h={1920 - gy + 144} cell={12} f={on ? p.f : 0} />
      <TileRect tile="rock" x={72} y={1296} w={288} h={96} cell={12} />
      <TileRect tile="rock" x={720} y={1056} w={288} h={96} cell={12} />
      {jets.map((j, i) => (
        <Pixels key={i} grid={gridOf(FLAME[on ? (flame + i) % 2 : 0])} px={18} pal={FIRE_PAL} x={j.x} y={j.y} />
      ))}
      {Array.from({ length: 30 }).map((_, i) => {
        const x = snap(360 + rnd(13, i) * 340);
        const base = rnd(14, i) * 800;
        const y = gy - 150 - ((base + (on ? p.f * (1.5 + (i % 3) * 0.5) : 0)) % 800);
        return <rect key={"e" + i} x={x} y={snap(y)} width={i % 3 ? 6 : 12} height={i % 3 ? 6 : 12} fill={i % 2 ? "#f7d154" : "#f08a3c"} opacity={0.6 + (i % 4) * 0.1} />;
      })}
    </g>
  );
}
