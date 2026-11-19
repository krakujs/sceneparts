import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TileRect, snap, rnd } from "../backdrop/index";

// House interior: cosy living room with a window, sofa, rug, picture frame, floor lamp, bookshelf and wood floor.

const BOOK = ["#d2403f", "#2f5fb8", "#4caf50", "#f7d154", "#f08a3c", "#ef8fb4", "#7a4bb5", "#5ab4f0", "#f5f1e8"];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const fy = snap(p.floorY ?? 1480, 12);
  const on = (p.anim ?? "glow") === "glow";
  const lampA = on ? 0.2 + 0.07 * (Math.floor(p.f / 12) % 2) : 0.22;
  // bookshelf: 4 shelves, books standing on each shelf
  const shelfX = 36, shelfW = 180, shelfTop = fy - 720;
  const books: React.ReactNode[] = [];
  for (let s = 0; s < 4; s++) {
    const base = shelfTop + (s + 1) * 150 - 12;
    let x = shelfX + 24;
    for (let i = 0; x < shelfX + shelfW - 36; i++) {
      const w = 12 + 12 * Math.floor(rnd(11, s * 30 + i) * 2);
      const h = 84 + 12 * Math.floor(rnd(12, s * 30 + i) * 4);
      books.push(<rect key={`${s}-${i}`} x={x} y={base - h} width={w} height={h} fill={BOOK[Math.floor(rnd(13, s * 30 + i) * BOOK.length)]} />);
      x += w + (rnd(14, s * 30 + i) > 0.8 ? 12 : 0);
    }
  }
  return (
    <g>
      {/* wall and skirting */}
      <TileRect tile="wall" x={0} y={0} w={1080} h={fy} cell={12} pal={{ S: "#e9d3b0", T: "#c9a97e" }} />
      <rect x={0} y={fy - 180} width={1080} height={12} fill="#b5523b" />
      <rect x={0} y={fy - 24} width={1080} height={24} fill="#c9a97e" />
      {/* window with curtains */}
      <rect x={372} y={fy - 900} width={336} height={312} fill="#5a4030" />
      <rect x={384} y={fy - 888} width={312} height={288} fill="#8fd0f8" />
      <rect x={384} y={fy - 888} width={312} height={96} fill="#b8e4fa" />
      <rect x={532} y={fy - 888} width={12} height={288} fill="#5a4030" />
      <rect x={384} y={fy - 744} width={312} height={12} fill="#5a4030" />
      <rect x={336} y={fy - 940} width={48} height={372} fill="#ef8fb4" />
      <rect x={696} y={fy - 940} width={48} height={372} fill="#ef8fb4" />
      <rect x={336} y={fy - 940} width={408} height={12} fill="#c96a94" />
      {/* picture frame */}
      <rect x={780} y={fy - 860} width={132} height={120} fill="#7a4a2b" />
      <rect x={792} y={fy - 848} width={108} height={96} fill="#8fd0f8" />
      <rect x={816} y={fy - 824} width={36} height={36} fill="#f7d154" />
      <rect x={792} y={fy - 788} width={108} height={36} fill="#4caf50" />
      {/* bookshelf */}
      <rect x={shelfX} y={shelfTop} width={shelfW} height={fy - shelfTop} fill="#5a3a22" />
      <rect x={shelfX + 12} y={shelfTop + 12} width={shelfW - 24} height={fy - shelfTop - 12} fill="#3a2514" />
      {[1, 2, 3].map((s) => <rect key={s} x={shelfX + 12} y={shelfTop + s * 150} width={shelfW - 24} height={12} fill="#7a4a2b" />)}
      {books}
      {/* floor lamp with glow */}
      <circle cx={936} cy={fy - 520} r={170} fill="#f7d154" opacity={lampA} />
      <rect x={930} y={fy - 470} width={12} height={430} fill="#5a6170" />
      <rect x={900} y={fy - 40} width={72} height={12} fill="#5a6170" />
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={936 - (60 + i * 12) / 2} y={fy - 560 + i * 12} width={60 + i * 12} height={12} fill="#f7d154" />)}
      {/* rug */}
      <TileRect tile="carpet" x={216} y={fy + 12} w={648} h={120} cell={12} pal={{ r: "#a8452f", R: "#7f3426" }} />
      <rect x={216} y={fy + 12} width={648} height={12} fill="#f7d154" />
      <rect x={216} y={fy + 120} width={648} height={12} fill="#f7d154" />
      {/* sofa */}
      <rect x={300} y={fy - 330} width={480} height={130} fill="#3f8a7a" />
      <rect x={288} y={fy - 240} width={60} height={160} fill="#3f8a7a" />
      <rect x={732} y={fy - 240} width={60} height={160} fill="#3f8a7a" />
      <rect x={300} y={fy - 200} width={480} height={80} fill="#56a596" />
      <rect x={528} y={fy - 200} width={12} height={80} fill="#3f8a7a" />
      <rect x={312} y={fy - 120} width={36} height={24} fill="#3a2514" />
      <rect x={732} y={fy - 120} width={36} height={24} fill="#3a2514" />
      {/* wood floor */}
      <TileRect tile="wood" x={0} y={fy} w={1080} h={1920 - fy} cell={12} />
      <rect x={0} y={fy} width={1080} height={12} fill="#4a2c18" />
    </g>
  );
}
