import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, gridOf, outlined } from "../style/index";
import { TileRect, snap } from "../backdrop/index";

// Blacksmith shop: a forge with glowing coals and bellows, an anvil, a wall rack of hammers and swords, and a stone floor.

const SWORD = ["......wg", ".....wgg", "....wgg.", "yyyyg...", "..uu....", "..uu...."];
const HAMMER = ["ggggg.", "ggggg.", "..uu..", "..uu..", "..uu.."];
const COAL = [["..o.o..", ".oyoyo.", "oyyyyyo", "rooyoor"], ["o..o...", ".oyyo..", "oyyyyo.", "rooyor."]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const fy = snap(p.floorY ?? 1480, 12);
  const on = (p.anim ?? "glow") === "glow";
  const fr = on ? Math.floor(p.f / 6) % 2 : 0;
  const glow = on ? 0.2 + 0.08 * (Math.floor(p.f / 6) % 2) : 0.22;
  const rack = (x: number) => [
    <rect key={`r${x}`} x={x} y={fy - 780} width={336} height={12} fill="#5a3a22" />,
  ];
  return (
    <g>
      <TileRect tile="brick" x={0} y={0} w={1080} h={fy} cell={12} pal={{ B: "#5a3a22", R: "#3a2514", M: "#2a1a0e" }} />
      <rect x={0} y={0} width={1080} height={fy} fill="#1b1b2e" opacity={0.2} />
      {/* wall rack with hammers and swords */}
      {rack(96)}
      {rack(648)}
      {[0, 1, 2, 3].map((i) => <Pixels key={`s${i}`} grid={outlined(gridOf(SWORD))} px={12} x={120 + i * 72} y={fy - 852} />)}
      {[0, 1, 2].map((i) => <Pixels key={`h${i}`} grid={outlined(gridOf(HAMMER))} px={12} x={672 + i * 96} y={fy - 900} />)}
      {/* forge glow */}
      <circle cx={300} cy={fy - 220} r={260} fill="#f08a3c" opacity={glow} />
      {/* forge hearth */}
      <rect x={96} y={fy - 360} width={336} height={360} fill="#5f6574" />
      <rect x={96} y={fy - 360} width={336} height={24} fill="#7d8394" />
      <rect x={132} y={fy - 300} width={264} height={60} fill="#1b1b2e" />
      <Pixels grid={gridOf(COAL[fr])} px={24} pal={{ o: "#f08a3c", y: "#f7d154", r: "#d2403f" }} x={144} y={fy - 300} />
      <rect x={120} y={fy - 240} width={288} height={24} fill="#c9523f" opacity={0.7} />
      {/* bellows */}
      <rect x={456} y={fy - 280} width={132} height={120} fill="#7a4a2b" />
      <rect x={456} y={fy - 280} width={132} height={24} fill="#a06c44" />
      <rect x={588} y={fy - 260} width={48} height={24} fill="#5a3a22" />
      {/* anvil */}
      <rect x={672} y={fy - 240} width={252} height={60} fill="#3d3d5c" />
      <rect x={648} y={fy - 180} width={300} height={24} fill="#5a6170" />
      <rect x={672} y={fy - 156} width={252} height={24} fill="#2a2a40" />
      <rect x={720} y={fy - 300} width={156} height={60} fill="#5a6170" />
      <rect x={720} y={fy - 300} width={156} height={12} fill="#8d93a0" />
      {/* stone floor */}
      <TileRect tile="stone" x={0} y={fy} w={1080} h={1920 - fy} cell={12} pal={{ U: "#6b6f7c", S: "#55596a", T: "#3d4250" }} />
      <rect x={0} y={fy} width={1080} height={12} fill="#2a2a40" />
    </g>
  );
}
