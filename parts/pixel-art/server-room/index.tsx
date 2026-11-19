import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TileRect, snap } from "../backdrop/index";

// Server room: rows of server racks with blinking LEDs, cable trays, a cold blue light and a metal floor.

const Rack = ({ x, y, w, h, f, on, seed }: { x: number; y: number; w: number; h: number; f: number; on: boolean; seed: number }) => {
  const units = Math.floor((h - 48) / 60);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#1b2236" />
      <rect x={x + 12} y={y + 12} width={w - 24} height={h - 24} fill="#27324a" />
      {Array.from({ length: units }).map((_, u) => {
        const uy = y + 24 + u * 60;
        const phase = (u * 7 + seed) % 5;
        const led = on ? (Math.floor(f / 6) + phase) % 3 : phase % 2;
        return (
          <g key={u}>
            <rect x={x + 24} y={uy} width={w - 48} height={48} fill="#3a4a66" />
            <rect x={x + 24} y={uy + 42} width={w - 48} height={6} fill="#1b2236" />
            <rect x={x + 36} y={uy + 12} width={12} height={12} fill={led === 0 ? "#4fd0ff" : "#1f4a66"} />
            <rect x={x + 56} y={uy + 12} width={12} height={12} fill={led === 1 ? "#4fd0ff" : "#1f4a66"} />
            <rect x={x + 76} y={uy + 12} width={12} height={12} fill={led === 2 ? "#7af0c0" : "#1f5a4a"} />
            <rect x={x + w - 84} y={uy + 12} width={48} height={24} fill="#1b2236" />
          </g>
        );
      })}
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const fy = snap(p.floorY ?? 1480, 12);
  const on = (p.anim ?? "blink") === "blink";
  const f = on ? p.f : 0;
  return (
    <g>
      <TileRect tile="metal" x={0} y={0} w={1080} h={fy} cell={12} pal={{ g: "#3a4a66", d: "#27324a" }} />
      <rect x={0} y={0} width={1080} height={fy} fill="#0b1630" opacity={0.35} />
      {/* back row of small racks above the stage */}
      <Rack x={324} y={fy - 900} w={432} h={180} f={f} on={on} seed={3} />
      {/* side racks */}
      <Rack x={0} y={fy - 900} w={240} h={900} f={f} on={on} seed={1} />
      <Rack x={840} y={fy - 900} w={240} h={900} f={f} on={on} seed={4} />
      {/* cold light from the top */}
      <rect x={300} y={0} width={480} height={24} fill="#4fd0ff" opacity={0.25} />
      {/* cable trays along the floor */}
      <rect x={0} y={fy + 24} width={1080} height={24} fill="#3a4a66" />
      <rect x={0} y={fy + 48} width={1080} height={12} fill="#1b2236" />
      {["#ef6b6b", "#4fd0ff", "#f7d154", "#7af0c0"].map((c, i) => (
        <rect key={i} x={120 + i * 180} y={fy + 24} width={12} height={36} fill={c} />
      ))}
      {/* metal floor */}
      <TileRect tile="metal" x={0} y={fy} w={1080} h={1920 - fy} cell={12} pal={{ g: "#4a5a78", d: "#2d3a52" }} />
      <rect x={0} y={fy} width={1080} height={12} fill="#1b2236" />
    </g>
  );
}
