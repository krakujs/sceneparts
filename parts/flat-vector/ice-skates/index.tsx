import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// A pair of ice skates in side view, toes to the right, one behind the other offset to the right. Each has a laced
// boot, a coloured cuff, a metal frame and a long steel blade whose bottom rests on y.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x0 = p.x ?? 540, y = p.y ?? 1560;
  const boot = p.color && p.color !== "none" ? p.color : C.white;
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 40) + 1) * 8 : 0;
  const glide = anim === "glide" ? Math.sin((f * 2 * Math.PI) / 80) * 30 : 0;
  const steel = C.greyLight;
  const skate = (dx: number, dy: number) => (
    <g transform={`translate(${f1(dx)} ${f1(dy)})`}>
      {/* steel frame and blade */}
      <rect x={-96} y={-38} width={20} height={26} fill={C.greyDark} />
      <rect x={70} y={-38} width={20} height={26} fill={C.greyDark} />
      <rect x={-110} y={-14} width={246} height={14} rx={7} fill={steel} />
      <path d="M 136 -14 Q 154 -14 148 -40 L 136 -40 Z" fill={steel} />
      <rect x={-110} y={-6} width={246} height={6} rx={3} fill={shade(steel, 0.25)} />
      {/* boot */}
      <path d="M -96 -330 L -40 -330 Q -30 -250 -20 -200 Q 40 -140 72 -100 L 124 -70 Q 144 -56 134 -40 L 124 -34 L -92 -34 Q -102 -120 -100 -200 Z" fill={boot} />
      <path d="M -40 -330 Q -30 -250 -20 -200 Q 40 -140 72 -100 L 124 -70 Q 144 -56 134 -40 L 124 -34 L 60 -34 Q 90 -80 40 -140 Q 0 -190 -40 -330 Z" fill={shade(boot, 0.12)} />
      {/* cuff trim and laces */}
      <path d="M -102 -330 L -36 -330 L -38 -304 L -100 -304 Z" fill={trim} />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={-70} y1={-290 + i * 26} x2={-18} y2={-278 + i * 26} stroke={C.greyDark} strokeWidth={6} strokeLinecap="round" />
      ))}
      <rect x={-100} y={-34} width={200} height={10} fill={shade(boot, 0.25)} opacity={0.5} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x0 + glide)} ${f1(y + bob)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={60} cy={0} rx={250} ry={12} fill={C.shadow} />
      {skate(-120, -4)}
      {skate(110, -4)}
    </g>
  );
}
