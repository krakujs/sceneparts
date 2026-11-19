import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TileRect, snap } from "../backdrop/index";

// Arcade: a row of generic arcade cabinets with glowing abstract screens, neon strips and a carpet floor. No real games.

const Cabinet = ({ x, y, c, f, on, i }: { x: number; y: number; c: string; f: number; on: boolean; i: number }) => {
  const flick = on ? (Math.floor(f / 10) + i) % 4 : 0;
  return (
    <g>
      <rect x={x} y={y} width={156} height={480} fill="#1b1b2e" />
      <rect x={x + 12} y={y + 12} width={132} height={456} fill={c} />
      <rect x={x + 24} y={y + 24} width={108} height={180} fill="#1b1b2e" />
      <rect x={x + 30} y={y + 30} width={96} height={168} fill="#23305e" />
      {/* abstract screen shapes */}
      <rect x={x + 42 + flick * 6} y={y + 60} width={36} height={36} fill="#f7d154" />
      <rect x={x + 90} y={y + 84} width={24} height={24} fill="#7af0c0" />
      <rect x={x + 54} y={y + 132} width={60} height={12} fill="#ef8fb4" />
      <rect x={x + 42} y={y + 156} width={72} height={12} fill="#5ab4f0" />
      {/* control panel */}
      <rect x={x + 12} y={y + 240} width={132} height={36} fill="#1b1b2e" />
      <rect x={x + 30} y={y + 252} width={24} height={24} fill="#f5f1e8" />
      <rect x={x + 84} y={y + 252} width={24} height={24} fill={flick === 2 ? "#ef6b6b" : "#7a3a3a"} />
      <rect x={x + 12} y={y + 276} width={132} height={12} fill="#f7d154" />
      {/* coin slot and base */}
      <rect x={x + 54} y={y + 324} width={48} height={24} fill="#1b1b2e" />
      <rect x={x + 60} y={y + 330} width={36} height={6} fill="#f7d154" />
      <rect x={x + 12} y={y + 360} width={132} height={108} fill="#1b1b2e" />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const fy = snap(p.floorY ?? 1480, 12);
  const on = (p.anim ?? "neon") === "neon";
  const glow = on ? 0.12 + 0.06 * (Math.floor(p.f / 12) % 2) : 0.15;
  const cols = ["#2e5f8a", "#7a3a7a", "#2e6b45", "#8a4a2a"];
  const top = fy - 600;
  return (
    <g>
      <TileRect tile="wall" x={0} y={0} w={1080} h={fy} cell={12} pal={{ S: "#2a2a40", T: "#1b1b2e" }} />
      {/* neon strips */}
      <rect x={0} y={top - 60} width={1080} height={12} fill="#ef8fb4" opacity={on ? 0.9 : 0.6} />
      <rect x={0} y={top - 36} width={1080} height={6} fill="#5ab4f0" opacity={on ? 0.9 : 0.6} />
      <rect x={0} y={fy - 780} width={12} height={780} fill="#7af0c0" opacity={on ? 0.8 : 0.5} />
      <rect x={1068} y={fy - 780} width={12} height={780} fill="#7af0c0" opacity={on ? 0.8 : 0.5} />
      <circle cx={540} cy={top + 240} r={420} fill="#5ab4f0" opacity={glow} />
      {/* cabinets: left pair and right pair, plus one at the back */}
      <Cabinet x={0} y={top} c={cols[0]} f={p.f} on={on} i={0} />
      <Cabinet x={168} y={top} c={cols[1]} f={p.f} on={on} i={1} />
      <Cabinet x={756} y={top} c={cols[2]} f={p.f} on={on} i={2} />
      <Cabinet x={924} y={top} c={cols[3]} f={p.f} on={on} i={3} />
      {/* carpet floor */}
      <TileRect tile="carpet" x={0} y={fy} w={1080} h={1920 - fy} cell={12} pal={{ r: "#3a2a6a", R: "#2a1e52" }} />
      <rect x={0} y={fy} width={1080} height={12} fill="#1b1b2e" />
    </g>
  );
}
