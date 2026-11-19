import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, gridOf, outlined } from "../style/index";
import { TileRect, snap } from "../backdrop/index";

// Shop interior: item shop with a wooden counter, shelves of potions and goods, and a hanging sign with no words.

const BOTTLE_R = ["..ww..", "..ss..", ".rrrr.", "rrwrrr", "rrrrrr", "rrrrrr", ".rrrr."];
const BOTTLE_B = ["..ww..", "..ss..", ".bbbb.", "bbwbbb", "bbbbbb", "bbbbbb", ".bbbb."];
const BOTTLE_G = ["..ww..", "..ss..", ".gggg.", "ggwggg", "gggggg", "gggggg", ".gggg."];
const SACK = ["..uu..", ".xxxx.", "xxyxxx", "xxxxxx", "xxxxxx", ".xxxx."];
const JAR = ["cccccc", "c....c", "cccccc", "wwwwww", "wwwwww", "wwwwww"];
const PAL_BOT = { s: "#c9b48a", w: "#f5f1e8", u: "#7a4a2b", x: "#c9874f", y: "#f7d154", c: "#cfe7f0", g: "#7ed36b" };

const shelfRow = (y: number, items: React.ReactNode[]) => (
  <g key={y}>
    <rect x={60} y={y + 120} width={960} height={24} fill="#7a4a2b" />
    <rect x={60} y={y + 144} width={960} height={12} fill="#4a2c18" />
    {items}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const fy = snap(p.floorY ?? 1480, 12);
  const sway = (p.anim ?? "sway") === "sway" ? (Math.floor(p.f / 20) % 2 ? 1.2 : -1.2) : 0;
  const bottles = [BOTTLE_R, BOTTLE_B, BOTTLE_G];
  const row = (y: number) => {
    const items: React.ReactNode[] = [];
    for (let i = 0; i < 8; i++) {
      const x = 84 + i * 120;
      const pick = (i + y) % 4;
      if (pick === 3) items.push(<Pixels key={`${y}-${i}`} grid={outlined(gridOf(SACK))} px={12} pal={PAL_BOT} x={x + 12} y={y + 120 - 84} />);
      else if (pick === 2) items.push(<Pixels key={`${y}-${i}`} grid={outlined(gridOf(JAR))} px={12} pal={PAL_BOT} x={x} y={y + 120 - 72} />);
      else items.push(<Pixels key={`${y}-${i}`} grid={outlined(gridOf(bottles[i % 3]))} px={12} pal={PAL_BOT} x={x + 12} y={y + 120 - 84} />);
    }
    return shelfRow(y, items);
  };
  return (
    <g>
      <TileRect tile="bricks2" x={0} y={0} w={1080} h={fy} cell={12} pal={{ o: "#8a5a36", Y: "#6e4528", k: "#2a1c12" }} />
      <rect x={0} y={0} width={1080} height={fy} fill="#1b1b2e" opacity={0.15} />
      {/* shelves */}
      {row(480)}
      {row(720)}
      {row(960)}
      {/* hanging sign (shape only) */}
      <g transform={`rotate(${sway} 540 360)`}>
        <rect x={300} y={96} width={12} height={180} fill="#5a6170" />
        <rect x={768} y={96} width={12} height={180} fill="#5a6170" />
        <rect x={420} y={24} width={240} height={12} fill="#5a6170" />
        <rect x={396} y={276} width={288} height={12} fill="#1b1b2e" />
        <rect x={384} y={288} width={312} height={12} fill="#1b1b2e" />
        <rect x={372} y={300} width={336} height={96} fill="#1b1b2e" />
        <rect x={384} y={300} width={312} height={84} fill="#b07a45" />
        <rect x={396} y={312} width={288} height={12} fill="#7a4a2b" />
        <rect x={396} y={360} width={288} height={12} fill="#7a4a2b" />
        <Pixels grid={outlined(gridOf(BOTTLE_B))} px={12} pal={PAL_BOT} x={516} y={324} />
      </g>
      {/* counter */}
      <rect x={180} y={fy - 240} width={720} height={240} fill="#1b1b2e" />
      <TileRect tile="wood" x={192} y={fy - 228} w={696} h={36} cell={12} />
      <TileRect tile="wood" x={192} y={fy - 180} w={696} h={168} cell={12} pal={{ P: "#7a4a2b", Q: "#4a2c18" }} />
      {/* wooden floor */}
      <TileRect tile="wood" x={0} y={fy} w={1080} h={1920 - fy} cell={12} />
      <rect x={0} y={fy} width={1080} height={12} fill="#1b1b2e" />
    </g>
  );
}
