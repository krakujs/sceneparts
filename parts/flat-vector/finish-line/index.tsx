import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Finish line: two tall posts on the floor with a tape across the top, and a chequered banner hanging
// between them. anim "flutter" ripples the banner: each column is lifted and dropped out of phase with
// its neighbours. Origin = floor centre. Room-scale: about 880 px wide and 680 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const POST_X = 430, TOP = -660, BAN_W = 820, COLS = 20, COL_W = BAN_W / COLS, ROW_H = 46;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const light = p.color && p.color !== "none" ? p.color : C.white;
  const dark = p.color2 && p.color2 !== "none" ? p.color2 : C.ink;
  const anim: string = p.anim ?? "flutter";
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const pop = anim === "pop" ? 1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI) : 1;
  const wave = (i: number) => (anim === "flutter" ? 9 * Math.sin((f * 2 * Math.PI) / 24 - i * 0.45) : 0);
  const bannerTop = TOP + 40; // the banner hangs just under the tape
  const cells: React.ReactNode[] = [];
  for (let i = 0; i < COLS; i++) {
    const dy = wave(i) * (i / COLS + 0.3); // stronger towards the free (right) end
    for (let j = 0; j < 2; j++) {
      const isDark = (i + j) % 2 === 1;
      cells.push(
        <rect key={`${i}-${j}`} x={-BAN_W / 2 + i * COL_W} y={bannerTop + j * ROW_H + dy} width={COL_W + 0.5} height={ROW_H + 0.5}
          fill={isDark ? dark : light} />,
      );
    }
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s}) scale(${f1(pop)})`}>
      <ellipse cx={0} cy={0} rx={480} ry={14} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)})`}>
        {/* posts with feet */}
        <rect x={-POST_X - 14} y={-24} width={60} height={24} rx={8} fill={C.greyDark} />
        <rect x={POST_X - 46} y={-24} width={60} height={24} rx={8} fill={C.greyDark} />
        <rect x={-POST_X - 12} y={TOP} width={24} height={-TOP} fill={C.greyDark} />
        <rect x={POST_X - 12} y={TOP} width={24} height={-TOP} fill={C.greyDark} />
        <circle cx={-POST_X} cy={TOP} r={16} fill={C.ink} />
        <circle cx={POST_X} cy={TOP} r={16} fill={C.ink} />
        {/* tape across the top: red and white stripes */}
        <g transform={`translate(0 ${TOP + 8})`}>
          <rect x={-POST_X} y={-10} width={POST_X * 2} height={22} fill={C.red} />
          {Array.from({ length: 16 }).map((_, k) => (
            <rect key={k} x={-POST_X + k * (POST_X * 2 / 16)} y={-10} width={POST_X * 2 / 32} height={22} fill={C.white} />
          ))}
          <rect x={-POST_X} y={10} width={POST_X * 2} height={4} fill={shade(C.red, 0.2)} />
        </g>
        {/* chequered banner */}
        {cells}
        {/* banner edge shade */}
        <rect x={-BAN_W / 2} y={bannerTop + 2 * ROW_H} width={BAN_W} height={6} fill={shade(light, 0.2)} opacity={0.4} />
      </g>
    </g>
  );
}
