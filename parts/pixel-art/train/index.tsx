import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Far, TileRect, PixTree, Tile, snap } from "../backdrop/index";
import { TP } from "../backdrop/index";

// Train: pixel-art train carriage interior. Panelled walls, a lit ceiling, two windows showing scenery scrolling
// past (from p.f), red seats along both sides and a patterned carpet floor from floorY down. Indoor scene.

const WIN = [
  { x: 60, y: 360, w: 440, h: 440 },
  { x: 580, y: 360, w: 440, h: 440 },
];

/** Scenery strip: sky, hills, tree line and grass; drawn at x = 0 and wrapped so the window can scroll. */
const scenery = (key: string, off: number) => (
  <g key={key} transform={`translate(${off} 0)`}>
    <rect x={0} y={360} width={1080} height={300} fill="#7cc6f2" />
    <Far kind="hills" base={640} time="day" seed={4} maxH={160} />
    <Far kind="trees" base={700} time="day" seed={5} maxH={110} />
    <TileRect tile="grass" x={0} y={700} w={1080} h={160} />
    <Tile tile="cloud" x={160 + 60} y={420} cell={12} />
    <Tile tile="cloud" x={700} y={470} cell={12} />
  </g>
);

const seat = (key: string, x: number, floorY: number, w: number) => (
  <g key={key}>
    <rect x={x} y={floorY - 420} width={w} height={320} fill={TP.k} />
    <rect x={x + 12} y={floorY - 408} width={w - 24} height={296} fill={TP.R} />
    <rect x={x + 24} y={floorY - 396} width={w - 48} height={48} fill={TP.B} />
    <rect x={x} y={floorY - 120} width={w} height={132} fill={TP.k} />
    <rect x={x + 12} y={floorY - 108} width={w - 24} height={108} fill={TP.B} />
    <rect x={x + 12} y={floorY - 60} width={w - 24} height={12} fill={TP.R} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const fy = snap(p.floorY ?? 1480, 12);
  const scroll = (p.anim ?? "scroll") !== "none";
  const s = scroll ? ((p.f ?? 0) * 6) % 1080 : 0;
  return (
    <g>
      <TileRect tile="wall" x={0} y={0} w={1080} h={fy} pal={{ S: "#c9b48f", T: "#9c8560" }} />
      <rect x={0} y={0} width={1080} height={120} fill="#c9c3b7" />
      {[120, 480, 840].map((x) => (
        <g key={"light" + x}>
          <rect x={x} y={40} width={120} height={24} fill="#fff6dc" />
          <circle cx={x + 60} cy={60} r={120} fill="#fff6dc" opacity={0.12} />
        </g>
      ))}
      {WIN.map((w, i) => (
        <g key={"win" + i}>
          <rect x={w.x - 24} y={w.y - 24} width={w.w + 48} height={w.h + 48} fill={TP.d} />
          <defs>
            <clipPath id={`train-win-${i}`}>
              <rect x={w.x} y={w.y} width={w.w} height={w.h} />
            </clipPath>
          </defs>
          <g clipPath={`url(#train-win-${i})`}>
            <g transform={`translate(${w.x - s} 0)`}>
              {scenery("a" + i, -1080)}
              {scenery("b" + i, 0)}
              {scenery("c" + i, 1080)}
            </g>
          </g>
          <rect x={w.x + w.w / 2 - 6} y={w.y} width={12} height={w.h} fill={TP.d} />
        </g>
      ))}
      <rect x={0} y={fy - 480} width={1080} height={24} fill="#8a7f72" />
      {seat("sl", 0, fy, 160)}
      {seat("sr", 920, fy, 160)}
      <TileRect tile="carpet" x={0} y={fy} w={1080} h={1920 - fy} pal={{ r: "#3a3f6e", R: "#262a4e" }} />
      <rect x={0} y={fy} width={1080} height={12} fill={TP.k} />
    </g>
  );
}
