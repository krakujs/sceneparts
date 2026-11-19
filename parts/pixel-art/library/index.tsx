import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TileRect, snap, rnd } from "../backdrop/index";

// Library: tall bookshelves full of coloured book spines, a ladder, a reading table and a desk lamp.

const SPINES = ["#d2403f", "#2f5fb8", "#4caf50", "#f7d154", "#f08a3c", "#ef8fb4", "#7a4bb5", "#5ab4f0", "#f5f1e8", "#7a4a2b"];

// A tall bookcase with shelves, books on each shelf. seed varies the spines.
const Bookcase = ({ x, y, w, h, seed }: { x: number; y: number; w: number; h: number; seed: number }) => {
  const shelves = Math.floor(h / 144);
  const out: React.ReactNode[] = [];
  out.push(<rect key="frame" x={x} y={y} width={w} height={h} fill="#5a3a22" />);
  out.push(<rect key="back" x={x + 12} y={y + 12} width={w - 24} height={h - 12} fill="#2a1a0e" />);
  for (let s = 0; s < shelves; s++) {
    const base = y + (s + 1) * 144 - 12;
    out.push(<rect key={"sh" + s} x={x + 12} y={base} width={w - 24} height={12} fill="#7a4a2b" />);
    let bx = x + 24;
    for (let i = 0; bx < x + w - 36; i++) {
      const bw = 12 + 12 * Math.floor(rnd(seed, s * 40 + i) * 2);
      const bh = 84 + 12 * Math.floor(rnd(seed + 1, s * 40 + i) * 4);
      if (rnd(seed + 2, s * 40 + i) > 0.92) { bx += 24; continue; }
      out.push(<rect key={`${s}-${i}`} x={bx} y={base - bh} width={bw} height={bh} fill={SPINES[Math.floor(rnd(seed + 3, s * 40 + i) * SPINES.length)]} />);
      bx += bw + (rnd(seed + 4, s * 40 + i) > 0.85 ? 12 : 0);
    }
  }
  return <g>{out}</g>;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const fy = snap(p.floorY ?? 1480, 12);
  const on = (p.anim ?? "flicker") === "flicker";
  const glow = on ? 0.2 + 0.07 * (Math.floor(p.f / 12) % 2) : 0.22;
  const top = 96;
  return (
    <g>
      <TileRect tile="wood" x={0} y={0} w={1080} h={fy} cell={12} pal={{ P: "#6b4a2e", Q: "#4a3018" }} />
      <rect x={0} y={0} width={1080} height={fy} fill="#1b1b2e" opacity={0.2} />
      {/* bookcases on both sides and a tall one at the back */}
      <Bookcase x={0} y={top} w={216} h={fy - top} seed={3} />
      <Bookcase x={864} y={top} w={216} h={fy - top} seed={9} />
      <Bookcase x={300} y={top} w={480} h={fy - 600 - top} seed={17} />
      {/* ladder leaning on the right case */}
      <rect x={900} y={fy - 780} width={12} height={560} fill="#c9874f" />
      <rect x={960} y={fy - 780} width={12} height={560} fill="#c9874f" />
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={900} y={fy - 700 + i * 120} width={72} height={12} fill="#c9874f" />)}
      {/* reading table */}
      <rect x={260} y={fy - 200} width={560} height={24} fill="#a06c44" />
      <rect x={268} y={fy - 176} width={544} height={12} fill="#7a4a2b" />
      <rect x={284} y={fy - 164} width={24} height={164} fill="#7a4a2b" />
      <rect x={772} y={fy - 164} width={24} height={164} fill="#7a4a2b" />
      {/* open book and stacked books on the table */}
      <rect x={380} y={fy - 224} width={132} height={24} fill="#f5f1e8" />
      <rect x={512} y={fy - 224} width={132} height={24} fill="#f5f1e8" />
      <rect x={380} y={fy - 224} width={264} height={12} fill="#d8dbe2" />
      <rect x={300} y={fy - 248} width={72} height={24} fill="#2f5fb8" />
      <rect x={300} y={fy - 272} width={60} height={24} fill="#d2403f" />
      {/* desk lamp */}
      <circle cx={720} cy={fy - 320} r={170} fill="#f7d154" opacity={glow} />
      <rect x={732} y={fy - 260} width={48} height={60} fill="#5a6170" />
      <rect x={700} y={fy - 336} width={96} height={24} fill="#f7d154" />
      <rect x={700} y={fy - 336} width={96} height={12} fill="#d2a23a" />
      {/* wooden floor */}
      <TileRect tile="wood" x={0} y={fy} w={1080} h={1920 - fy} cell={12} pal={{ P: "#7a4a2b", Q: "#4a2c18" }} />
      <rect x={0} y={fy} width={1080} height={12} fill="#2a1a0e" />
    </g>
  );
}
