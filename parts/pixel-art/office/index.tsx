import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TileRect, PixTree, snap } from "../backdrop/index";

// Office: two desks with computers, office chairs, a big window with a city view, a potted plant and a carpet floor.

const Monitor = ({ x, y }: { x: number; y: number }) => (
  <g>
    <rect x={x} y={y} width={156} height={108} fill="#2a2a40" />
    <rect x={x + 12} y={y + 12} width={132} height={84} fill="#4fa3e8" />
    <rect x={x + 24} y={y + 30} width={84} height={12} fill="#f5f1e8" />
    <rect x={x + 24} y={y + 54} width={60} height={12} fill="#b8e4fa" />
    <rect x={x + 66} y={y + 108} width={24} height={24} fill="#5a6170" />
    <rect x={x + 36} y={y + 132} width={84} height={12} fill="#5a6170" />
  </g>
);
const Chair = ({ x, y }: { x: number; y: number }) => (
  <g>
    <rect x={x + 12} y={y} width={36} height={120} fill="#2a2a40" />
    <rect x={x} y={y + 120} width={60} height={24} fill="#2a2a40" />
    <rect x={x + 24} y={y + 144} width={12} height={60} fill="#5a6170" />
    <rect x={x - 12} y={y + 204} width={84} height={12} fill="#5a6170" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const fy = snap(p.floorY ?? 1480, 12);
  const on = (p.anim ?? "blink") === "blink";
  const lit = (i: number) => (on ? (Math.floor(p.f / 14) + i) % 3 !== 0 : i % 2 === 0);
  // city skyline inside the window
  const bl: { x: number; w: number; h: number; c: string }[] = [
    { x: 204, w: 96, h: 180, c: "#5a6fa0" }, { x: 300, w: 72, h: 300, c: "#3d5488" },
    { x: 372, w: 120, h: 132, c: "#6a80b4" }, { x: 492, w: 84, h: 240, c: "#3d5488" },
    { x: 576, w: 108, h: 156, c: "#5a6fa0" }, { x: 684, w: 72, h: 276, c: "#3d5488" },
    { x: 756, w: 96, h: 192, c: "#6a80b4" }, { x: 852, w: 36, h: 120, c: "#5a6fa0" },
  ];
  const winBottom = fy - 600;
  return (
    <g>
      <TileRect tile="wall" x={0} y={0} w={1080} h={fy} cell={12} pal={{ S: "#dfe4ec", T: "#b8c0cc" }} />
      {/* window with city view */}
      <rect x={180} y={fy - 912} width={732} height={324} fill="#5a6170" />
      <rect x={192} y={fy - 900} width={708} height={300} fill="#7cc6f2" />
      {bl.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={winBottom - b.h} width={b.w} height={b.h} fill={b.c} />
          {Array.from({ length: Math.floor(b.h / 48) }).map((_, r) =>
            Array.from({ length: Math.floor(b.w / 24) - 1 }).map((__, c) =>
              lit(i * 7 + r * 3 + c) ? <rect key={`${r}-${c}`} x={b.x + 12 + c * 24} y={winBottom - b.h + 12 + r * 48} width={12} height={12} fill="#f7d154" /> : null,
            ),
          )}
        </g>
      ))}
      <rect x={180} y={winBottom} width={732} height={12} fill="#5a6170" />
      <rect x={522} y={fy - 900} width={12} height={300} fill="#5a6170" />
      {/* desks */}
      <rect x={24} y={fy - 400} width={276} height={24} fill="#a8703f" />
      <rect x={36} y={fy - 376} width={24} height={376} fill="#7a4a2b" />
      <rect x={264} y={fy - 376} width={24} height={376} fill="#7a4a2b" />
      <Monitor x={84} y={fy - 532} />
      <rect x={120} y={fy - 400} width={84} height={12} fill="#5a6170" />
      <rect x={120} y={fy - 388} width={84} height={6} fill="#d8dbe2" />
      <rect x={780} y={fy - 400} width={276} height={24} fill="#a8703f" />
      <rect x={792} y={fy - 376} width={24} height={376} fill="#7a4a2b" />
      <rect x={1020} y={fy - 376} width={24} height={376} fill="#7a4a2b" />
      <Monitor x={840} y={fy - 532} />
      <rect x={876} y={fy - 400} width={84} height={12} fill="#5a6170" />
      <rect x={876} y={fy - 388} width={84} height={6} fill="#d8dbe2" />
      {/* chairs */}
      <Chair x={228} y={fy - 300} />
      <Chair x={816} y={fy - 300} />
      {/* plant */}
      <rect x={972} y={fy - 108} width={60} height={108} fill="#c9523f" />
      <PixTree x={1002} y={fy - 108} cell={12} kind="round" />
      {/* carpet floor */}
      <TileRect tile="carpet" x={0} y={fy} w={1080} h={1920 - fy} cell={12} pal={{ r: "#3a4a6a", R: "#2e3b56" }} />
      <rect x={0} y={fy} width={1080} height={12} fill="#2e3b56" />
    </g>
  );
}
