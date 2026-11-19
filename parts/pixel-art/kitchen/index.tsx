import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, gridOf } from "../style/index";
import { TileRect, snap } from "../backdrop/index";

// Kitchen: counters and cupboards, a stove with a steaming pot, a fridge, a sink, a window and tiled walls.

const STEAM = [
  ["..w..w..", ".w..w...", "..w..w..", ".w..w..."],
  [".w..w...", "..w..w..", ".w..w...", "..w..w.."],
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const fy = snap(p.floorY ?? 1480, 12);
  const on = (p.anim ?? "steam") === "steam";
  const fr = on ? Math.floor(p.f / 12) % 2 : 0;
  const rise = on ? (Math.floor(p.f / 8) % 3) * 12 : 0;
  const cup = (x: number, y: number) => <rect key={`${x}`} x={x} y={y} width={48} height={24} fill="#f5f1e8" />;
  return (
    <g>
      <TileRect tile="tiles" x={0} y={0} w={1080} h={fy} cell={12} pal={{ w: "#f5f1e8", g: "#b8c0cc" }} />
      {/* window above the sink */}
      <rect x={60} y={fy - 900} width={216} height={252} fill="#5a4030" />
      <rect x={72} y={fy - 888} width={192} height={228} fill="#8fd0f8" />
      <rect x={164} y={fy - 888} width={12} height={228} fill="#5a4030" />
      {/* wall cupboards */}
      <rect x={300} y={fy - 900} width={384} height={300} fill="#c9874f" />
      <rect x={312} y={fy - 888} width={180} height={276} fill="#a06c44" />
      <rect x={504} y={fy - 888} width={168} height={276} fill="#a06c44" />
      <rect x={480} y={fy - 780} width={12} height={12} fill="#f7d154" />
      <rect x={516} y={fy - 780} width={12} height={12} fill="#f7d154" />
      {/* fridge on the right */}
      <rect x={900} y={fy - 780} width={156} height={780} fill="#d8dbe2" />
      <rect x={900} y={fy - 480} width={156} height={12} fill="#8d93a0" />
      <rect x={912} y={fy - 720} width={12} height={120} fill="#8d93a0" />
      <rect x={912} y={fy - 432} width={12} height={180} fill="#8d93a0" />
      {/* counter run with sink and stove */}
      <rect x={24} y={fy - 300} width={1032} height={24} fill="#e8ecef" />
      <rect x={24} y={fy - 276} width={1032} height={276} fill="#a06c44" />
      <rect x={24} y={fy - 276} width={1032} height={12} fill="#7a4a2b" />
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={48 + i * 204} y={fy - 240} width={180} height={192} fill="#7a4a2b" />)}
      {/* sink */}
      <rect x={60} y={fy - 300} width={156} height={24} fill="#8d93a0" />
      <rect x={120} y={fy - 336} width={36} height={36} fill="#8d93a0" />
      {/* stove with pot and steam */}
      <rect x={456} y={fy - 300} width={168} height={24} fill="#2a2a40" />
      <rect x={480} y={fy - 384} width={120} height={84} fill="#c9523f" />
      <rect x={480} y={fy - 384} width={120} height={12} fill="#8d93a0" />
      <rect x={456} y={fy - 396} width={12} height={12} fill="#3a3a52" />
      <rect x={612} y={fy - 396} width={12} height={12} fill="#3a3a52" />
      <rect x={444} y={fy - 432} width={192} height={36} fill="#5a6170" />
      <rect x={444} y={fy - 432} width={192} height={12} fill="#8d93a0" />
      <g transform={`translate(0 ${-rise})`}>
        <Pixels grid={gridOf(STEAM[fr])} px={18} pal={{ w: "#8d93a0" }} x={504} y={fy - 504} />
      </g>
      {cup(756, fy - 324)}
      {/* floor */}
      <TileRect tile="tiles" x={0} y={fy} w={1080} h={1920 - fy} cell={12} pal={{ w: "#e8ecef", g: "#8d93a0" }} />
      <rect x={0} y={fy} width={1080} height={12} fill="#5a6170" />
    </g>
  );
}
