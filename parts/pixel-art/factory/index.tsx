import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TileRect, snap } from "../backdrop/index";

// Factory: metal walls with pipes and gears, machines with blinking lights and a conveyor belt carrying boxes along the floor.

const Pipe = ({ x, y, w, h }: { x: number; y: number; w: number; h: number }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill="#8d93a0" />
    <rect x={x} y={y} width={w} height={12} fill="#b8bec9" />
    <rect x={x} y={y + h - 12} width={w} height={12} fill="#5f6574" />
  </g>
);

// Gear: ring with teeth, drawn as stacked rects (cell 24). Alternate teeth frame via `t`.
const Gear = ({ x, y, t }: { x: number; y: number; t: number }) => {
  const teeth = t ? [[1, 0], [-1, 0], [0, 1], [0, -1]] : [[1, 1], [-1, -1], [1, -1], [-1, 1]];
  return (
    <g>
      <rect x={x + 24} y={y + 24} width={144} height={144} fill="#8d93a0" />
      <rect x={x + 48} y={y + 48} width={96} height={96} fill="#5a6170" />
      <rect x={x + 72} y={y + 72} width={48} height={48} fill="#b8bec9" />
      {teeth.map(([dx, dy], i) => (
        <rect key={i} x={x + 72 + dx * 72 - 12} y={y + 72 + dy * 72 - 12} width={24} height={24} fill="#8d93a0" />
      ))}
    </g>
  );
};

const Machine = ({ x, y, w, h, on, f, i }: { x: number; y: number; w: number; h: number; on: boolean; f: number; i: number }) => {
  const lit = on ? (Math.floor(f / 10) + i) % 3 : i % 3;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#5a6170" />
      <rect x={x + 12} y={y + 12} width={w - 24} height={h - 24} fill="#3a404e" />
      <rect x={x + 24} y={y + 24} width={w - 48} height={36} fill="#1b1b2e" />
      <rect x={x + 36} y={y + 36} width={24} height={12} fill={lit === 0 ? "#ef6b6b" : "#7a3a3a"} />
      <rect x={x + 72} y={y + 36} width={24} height={12} fill={lit === 1 ? "#f7d154" : "#7a6a2a"} />
      <rect x={x + 108} y={y + 36} width={24} height={12} fill={lit === 2 ? "#4caf50" : "#2e6b45"} />
      <rect x={x + 24} y={y + h - 24} width={w - 48} height={12} fill="#f7d154" />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const fy = snap(p.floorY ?? 1480, 12);
  const on = (p.anim ?? "belt") === "belt";
  const beltY = fy - 180;
  const speed = on ? 5 : 0;
  const boxes = [0, 1, 2, 3, 4].map((i) => {
    const raw = (i * 280 + p.f * speed) % 1280;
    return { x: raw - 100, i };
  });
  const gearT = on ? Math.floor(p.f / 12) % 2 : 0;
  return (
    <g>
      <TileRect tile="metal" x={0} y={0} w={1080} h={fy} cell={12} pal={{ g: "#5a6170", d: "#3a404e" }} />
      {/* pipes */}
      <Pipe x={0} y={96} w={1080} h={36} />
      <Pipe x={0} y={204} w={1080} h={24} />
      <Pipe x={48} y={0} w={36} h={fy} />
      <Pipe x={996} y={0} w={36} h={fy} />
      {/* gears */}
      <Gear x={120} y={420} t={gearT} />
      <Gear x={860} y={540} t={1 - gearT} />
      {/* machines */}
      <Machine x={840} y={fy - 420} w={216} h={240} on={on} f={p.f} i={0} />
      <Machine x={0} y={fy - 600} w={192} h={360} on={on} f={p.f} i={1} />
      {/* conveyor belt */}
      <rect x={0} y={beltY - 24} width={1080} height={96} fill="#2a2a40" />
      <rect x={0} y={beltY - 24} width={1080} height={12} fill="#5a6170" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <circle key={i} cx={i * 120 + 24} cy={beltY + 24} r={12} fill="#5a6170" />
      ))}
      {boxes.map(({ x, i }) => (
        <g key={i}>
          <rect x={x} y={beltY - 60} width={96} height={72} fill="#c9874f" />
          <rect x={x + 36} y={beltY - 60} width={24} height={72} fill="#f7d154" />
          <rect x={x} y={beltY - 60} width={96} height={12} fill="#a06c44" />
        </g>
      ))}
      {/* metal floor */}
      <TileRect tile="metal" x={0} y={fy} w={1080} h={1920 - fy} cell={12} pal={{ g: "#6b7384", d: "#4a5160" }} />
      <rect x={0} y={fy} width={1080} height={12} fill="#2a2a40" />
    </g>
  );
}
