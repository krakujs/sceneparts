import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, gridOf } from "../style/index";
import { TileRect, snap } from "../backdrop/index";

// Pipes level: indoor industrial room (reference for machinery levels). Riveted metal wall, big teal pipes with steel
// flanges and elbows, two valves with steam that puffs upward, and a metal floor grating from floorY down.

const TEAL = "#2f8f8a", TEAL_HI = "#6cc4b8", TEAL_LO = "#1d5c59";
const STEEL = "#7d878e", STEEL_HI = "#aab4ba", STEEL_LO = "#3b4449";
const VALVE = ["..kkkk..", ".kyyyyk.", "kyykkyyk", "kyk..kyk", "kyykkyyk", ".kyyyyk.", "..kkkk.."];
const STEAM = ["..www..", ".wwwww.", "wwwwwww", "wwwwwww", ".wwwww."];
const WALL = { g: "#4f6a6e", d: "#2a3a3e" };
const FLOOR = { g: "#6b767c", d: "#3b4449" };

const HPipe: React.FC<{ x1: number; x2: number; y: number; t?: number; flanges?: number[] }> = ({ x1, x2, y, t = 72, flanges = [] }) => (
  <g>
    <rect x={x1} y={y} width={x2 - x1} height={t} fill={TEAL} />
    <rect x={x1} y={y + 12} width={x2 - x1} height={12} fill={TEAL_HI} />
    <rect x={x1} y={y + t - 12} width={x2 - x1} height={12} fill={TEAL_LO} />
    {flanges.map((fx) => (
      <g key={fx}>
        <rect x={fx} y={y - 12} width={24} height={t + 24} fill={STEEL} />
        <rect x={fx} y={y - 12} width={24} height={12} fill={STEEL_HI} />
      </g>
    ))}
  </g>
);
const VPipe: React.FC<{ x: number; y1: number; y2: number; t?: number; flanges?: number[] }> = ({ x, y1, y2, t = 72, flanges = [] }) => (
  <g>
    <rect x={x} y={y1} width={t} height={y2 - y1} fill={TEAL} />
    <rect x={x + 12} y={y1} width={12} height={y2 - y1} fill={TEAL_HI} />
    <rect x={x + t - 12} y={y1} width={12} height={y2 - y1} fill={TEAL_LO} />
    {flanges.map((fy) => (
      <g key={fy}>
        <rect x={x - 12} y={fy} width={t + 24} height={24} fill={STEEL} />
        <rect x={x - 12} y={fy} width={t + 24} height={12} fill={STEEL_HI} />
      </g>
    ))}
  </g>
);
const Elbow: React.FC<{ x: number; y: number; t?: number }> = ({ x, y, t = 72 }) => (
  <g>
    <rect x={x - 12} y={y - 12} width={t + 24} height={t + 24} fill={STEEL} />
    <rect x={x - 12} y={y - 12} width={t + 24} height={12} fill={STEEL_HI} />
    <rect x={x + t} y={y + 12} width={12} height={t - 12} fill={STEEL_LO} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const fy = snap(p.floorY ?? 1480, 12);
  const on = (p.anim ?? "steam") === "steam";
  const valves = [{ x: 300, y: 492 }, { x: 780, y: 492 }];
  return (
    <g>
      <TileRect tile="metal" x={0} y={0} w={1080} h={fy} cell={12} pal={WALL} />
      <rect x={0} y={0} width={1080} height={fy} fill="#0d1030" opacity={0.2} />
      <HPipe x1={0} x2={1080} y={216} flanges={[240, 600, 960]} />
      <Elbow x={96} y={216} />
      <VPipe x={96} y1={288} y2={fy} flanges={[660, 1200]} />
      <Elbow x={948} y={216} />
      <VPipe x={948} y1={288} y2={fy} flanges={[660, 1200]} />
      <HPipe x1={168} x2={300} y={528} flanges={[204]} />
      <HPipe x1={336} x2={744} y={528} flanges={[540]} />
      <HPipe x1={816} x2={948} y={528} flanges={[852]} />
      {valves.map((v, i) => (
        <g key={i}>
          <rect x={v.x - 18} y={v.y - 12} width={36} height={12} fill={STEEL} />
          <Pixels grid={gridOf(VALVE)} px={12} pal={{ y: "#d2403f", k: "#1b1b2e" }} x={v.x - 48} y={v.y - 48} />
          {on && [0, 1, 2].map((k) => {
            const rise = (p.f * 2 + k * 70 + i * 35) % 230;
            return <Pixels key={k} grid={gridOf(STEAM)} px={18} pal={{ w: "#e6ecef" }} opacity={0.9 - rise / 300} x={v.x - 45} y={v.y - 72 - rise} />;
          })}
        </g>
      ))}
      <TileRect tile="metal" x={0} y={fy} w={1080} h={1920 - fy} cell={12} pal={FLOOR} />
      <rect x={0} y={fy} width={1080} height={12} fill={STEEL_HI} />
      <rect x={0} y={fy + 12} width={1080} height={12} fill={STEEL_LO} />
    </g>
  );
}
