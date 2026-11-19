import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, gridOf, outlined } from "../style/index";
import { TileRect, snap } from "../backdrop/index";

// Science lab: benches with bubbling flasks, shelves of jars, a monitor and racks of test tubes.

const FLASK = ["..ww..", "..ww..", ".wcw..", "wcccw.", "wcccccw", "wcccccw", ".wwwww."];
const TUBE = ["g", "g", "g", "g"];

const Bubbles = ({ x, y, f, on }: { x: number; y: number; f: number; on: boolean }) => (
  <g>
    {[0, 1, 2].map((i) => {
      const up = on ? (Math.floor(f / 8) + i * 4) % 12 : i * 4;
      return <rect key={i} x={x + (i % 2) * 12} y={y - 24 - up * 12} width={12} height={12} fill="#f5f1e8" opacity={0.85} />;
    })}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const fy = snap(p.floorY ?? 1480, 12);
  const on = (p.anim ?? "bubble") === "bubble";
  const blink = on ? Math.floor(p.f / 14) % 2 : 0;
  const shelf = (y: number) => (
    <g key={y}>
      <rect x={60} y={y} width={960} height={24} fill="#8d93a0" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => <rect key={i} x={96 + i * 120} y={y - 84} width={48} height={84} fill={["#c9874f", "#7ed36b", "#f7d154", "#a8b0bd"][i % 4]} opacity={0.8} />)}
    </g>
  );
  return (
    <g>
      <TileRect tile="tiles" x={0} y={0} w={1080} h={fy} cell={12} pal={{ w: "#e8ecef", g: "#9aa3b0" }} />
      {shelf(420)}
      {shelf(660)}
      {/* monitor on the back-right */}
      <rect x={780} y={fy - 780} width={216} height={144} fill="#2a2a40" />
      <rect x={792} y={fy - 768} width={192} height={120} fill="#3a7a6a" />
      <rect x={816} y={fy - 740} width={144} height={12} fill="#b8e4c8" />
      <rect x={816} y={fy - 716} width={96} height={12} fill="#b8e4c8" />
      <rect x={876} y={fy - 636} width={36} height={36} fill="#5a6170" />
      <rect x={840} y={fy - 600} width={108} height={12} fill="#5a6170" />
      {/* bench with flasks, left */}
      <rect x={24} y={fy - 300} width={456} height={24} fill="#c9b48a" />
      <rect x={24} y={fy - 276} width={456} height={276} fill="#8a6038" />
      <rect x={48} y={fy - 240} width={48} height={12} fill="#5a3a22" />
      <Pixels grid={outlined(gridOf(FLASK))} px={24} x={96} y={fy - 336} />
      <Bubbles x={120} y={fy - 336} f={p.f} on={on} />
      <Pixels grid={outlined(gridOf(FLASK))} px={24} x={264} y={fy - 336} />
      <Bubbles x={288} y={fy - 336} f={p.f} on={on} />
      {/* beaker racks on the bench */}
      {[0, 1, 2, 3].map((i) => <rect key={i} x={360 + i * 36} y={fy - 384} width={12} height={84} fill="#d8ecf5" />)}
      <rect x={348} y={fy - 300} width={168} height={12} fill="#5a6170" />
      {/* right bench with a glowing indicator */}
      <rect x={600} y={fy - 300} width={456} height={24} fill="#c9b48a" />
      <rect x={600} y={fy - 276} width={456} height={276} fill="#8a6038" />
      <rect x={936} y={fy - 336} width={24} height={24} fill={blink ? "#ef6b6b" : "#7a3a3a"} />
      <rect x={864} y={fy - 348} width={48} height={36} fill="#d8ecf5" />
      <rect x={864} y={fy - 312} width={48} height={12} fill="#5a6170" />
      {/* floor */}
      <TileRect tile="tiles" x={0} y={fy} w={1080} h={1920 - fy} cell={12} pal={{ w: "#dfe6ea", g: "#8d9aa6" }} />
      <rect x={0} y={fy} width={1080} height={12} fill="#5a6170" />
    </g>
  );
}
