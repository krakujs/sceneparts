import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wall electrical fuse box with its door open to the left: a grid of breaker switches (some on, some off) and a warning triangle. No text.
// Origin = bottom centre (the floor line). Room scale: at s = 1 about 600 px wide and 820 px tall. Use s about 0.5 for a hallway or basement scene.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  return "";
};
const ROWS = [0, 1, 2];
const COLS = [0, 1, 2, 3, 4];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const box = p.color && p.color !== "none" ? p.color : C.greyLight;
  const door = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const anim: string = p.anim ?? "none";
  const warn = anim === "flicker" && Math.floor(f / 15) % 2 === 1 ? 0.35 : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={20} cy={0} rx={330} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* box and inner back plate */}
        <rect x={-250} y={-820} width={500} height={820} rx={18} fill={box} />
        <rect x={-225} y={-795} width={450} height={770} rx={10} fill={shade(box, 0.15)} />
        {/* breaker grid: white switches with a handle up (on) or down (off) */}
        {ROWS.map((r) => COLS.map((c) => {
          const bx = -200 + c * 88, by = -770 + r * 120;
          const on = ((r * 5 + c) * 7) % 3 !== 0;
          return (
            <g key={`${r}-${c}`}>
              <rect x={bx} y={by} width={72} height={96} rx={8} fill={C.white} />
              <rect x={bx + 14} y={by + 8} width={44} height={8} rx={4} fill={C.greyLight} />
              <rect x={bx + 26} y={on ? by + 22 : by + 52} width={20} height={34} rx={6} fill={on ? C.green : C.greyDark} />
            </g>
          );
        }))}
        {/* warning triangle, no text */}
        <g transform="translate(0 -260)" opacity={warn}>
          <polygon points="0,-95 90,70 -90,70" fill={C.yellow} stroke={C.yellow} strokeWidth={26} strokeLinejoin="round" />
          <rect x={-9} y={-40} width={18} height={60} rx={9} fill={C.ink} />
          <circle cx={0} cy={38} r={10} fill={C.ink} />
        </g>
        {/* door, hinged on the left and swung open toward the viewer */}
        <polygon points="-250,-820 -330,-800 -330,-20 -250,0" fill={door} />
        <rect x={-318} y={-780} width={14} height={740} rx={6} fill={C.white} opacity={0.25} />
      </g>
    </g>
  );
}
