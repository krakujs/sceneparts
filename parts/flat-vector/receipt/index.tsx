import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Long thermal shop receipt with zigzag torn edges, grey item lines and a dark total bar. No real text.
// Origin = bottom centre (the torn bottom edge rests on y). About 340 px wide and 820 px tall at s = 1.
// anim "print": the receipt slides up into place from below.
const f1 = (v: number) => v.toFixed(1);

const W = 340, H = 820, TEETH = 14;
// Zigzag edge along the top (y = top) or bottom (y = bottom), built from left to right.
const zig = (top: number, bottom: number, from: "top" | "bottom") => {
  const pts: string[] = [];
  for (let i = 0; i <= TEETH; i++) {
    const px = -W / 2 + (W * i) / TEETH;
    const py = i % 2 === 0 ? top : bottom;
    pts.push(`${f1(px)} ${f1(from === "top" ? py : py)}`);
  }
  return pts;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const paper = p.color && p.color !== "none" ? p.color : C.white;
  const anim: string = p.anim ?? "none";
  // print: slides up 150 px over the first 40 frames and then rests.
  const e = Math.min(1, f / 40);
  const dy = anim === "print" ? 150 * (1 - (1 - e) * (1 - e)) : 0;
  const top = -H, bot = 0;
  // Torn edges: the top zigzag points down into the paper, the bottom zigzag points up.
  const topPts = zig(top + 18, top, "top");
  const botPts = zig(bot, bot - 18, "bottom");
  const body = `M ${topPts.join(" L ")} L ${[...botPts].reverse().join(" L ")} Z`;
  // item lines: short grey bars, deterministic widths, then a double rule and a dark total bar
  const lines: React.ReactNode[] = [];
  for (let i = 0; i < 9; i++) {
    const w = 200 + ((i * 37) % 90);
    lines.push(<rect key={`a${i}`} x={-W / 2 + 34} y={-H + 110 + i * 42} width={w * 0.5} height={14} rx={7} fill={C.greyLight} />);
    lines.push(<rect key={`b${i}`} x={W / 2 - 34 - 60} y={-H + 110 + i * 42} width={60} height={14} rx={7} fill={C.greyLight} />);
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={14} fill={C.shadow} />
      <g transform={`translate(0 ${f1(dy)})`}>
        <path d={body} fill={paper} />
        {/* shade down the right edge */}
        <rect x={W / 2 - 22} y={top + 20} width={22} height={H - 40} fill={shade(paper, 0.06)} />
        {/* header bar and item lines */}
        <rect x={-W / 2 + 34} y={top + 60} width={W - 68} height={22} rx={11} fill={C.greyDark} opacity={0.55} />
        {lines}
        {/* double rule above the total */}
        <rect x={-W / 2 + 34} y={-250} width={W - 68} height={6} rx={3} fill={C.grey} />
        <rect x={-W / 2 + 34} y={-234} width={W - 68} height={6} rx={3} fill={C.grey} />
        {/* total line: a dark bar with a light block */}
        <rect x={-W / 2 + 34} y={-196} width={W - 68} height={40} rx={10} fill={C.greyDark} />
        <rect x={W / 2 - 34 - 110} y={-188} width={110} height={24} rx={8} fill={C.yellow} />
        {/* barcode-like stripes near the bottom */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
          <rect key={i} x={-W / 2 + 40 + i * 22} y={-120} width={i % 3 === 0 ? 10 : 5} height={70} fill={C.inkSoft} opacity={0.7} />
        ))}
      </g>
    </g>
  );
}
