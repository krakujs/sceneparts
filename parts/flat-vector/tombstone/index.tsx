import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade, font } from "../style/index";

// Rounded headstone: an arched grey stone with a crack down the front, grass tufts at the base and an optional
// "RIP" carved in the face. There are no names or dates. Origin = floor centre. About 330 px wide and 480 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const STONE = "M -160 0 L -160 -340 Q -160 -470 0 -470 Q 160 -470 160 -340 L 160 0 Z";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 1560;
  const stone = p.color && p.color !== "none" ? p.color : C.grey;
  const ins: string = p.inscription ?? "RIP";
  const tuft = (tx: number, h: number) => (
    <path key={tx} d={`M ${tx} 0 Q ${f1(tx - 8)} ${f1(-h * 0.6)} ${f1(tx - 16)} ${f1(-h)} Q ${f1(tx)} ${f1(-h * 0.6)} ${f1(tx + 4)} 0 Z`} fill={C.green} />
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={200} ry={16} fill={C.shadow} />
      {/* grass mound behind the base */}
      <path d="M -200 0 Q -190 -40 0 -44 Q 190 -40 200 0 Z" fill={C.green} />
      {/* stone with shaded right side */}
      <path d={STONE} fill={stone} />
      <path d="M 60 -460 Q 150 -440 160 -340 L 160 0 L 60 0 Z" fill={shade(stone, 0.2)} opacity={0.6} />
      {/* base plinth */}
      <rect x={-180} y={-30} width={360} height={30} rx={8} fill={shade(stone, 0.12)} />
      {/* crack */}
      <path d="M 20 -380 L -6 -340 L 18 -310 L -4 -270 L 14 -236" fill="none" stroke={shade(stone, 0.4)} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />
      {/* carved RIP */}
      {ins === "RIP" && (
        <g>
          <rect x={-80} y={-300} width={160} height={6} rx={3} fill={shade(stone, 0.3)} opacity={0.8} />
          <text x={0} y={-240} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={58} fill={shade(stone, 0.35)}>RIP</text>
        </g>
      )}
      {/* grass tufts */}
      {[-150, -110, 120, 150].map((tx, i) => tuft(tx, 40 + (i % 2) * 14))}
    </g>
  );
}
