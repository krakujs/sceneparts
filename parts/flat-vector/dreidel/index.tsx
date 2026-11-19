import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Dreidel: a four-sided spinning top standing on its point, with a handle on top.
// Each side carries a plain geometric symbol (triangle, circle, square, diamond), no lettering.
// Origin = the tip (it stands on y). About 240 px wide and 380 px tall at s = 1.
// anim "spin": the top turns on its axis (the faces turn past the viewer). anim "wobble": it rocks side to side.
const f1 = (v: number) => v.toFixed(1);
const HS = 120; // half-width of the square body
const TOP = -235, BOT = -110;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const colA = p.color && p.color !== "none" ? p.color : C.blue;
  const colB = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const theta = anim === "spin" ? f * 0.22 : 0.5;
  const rock = anim === "wobble" ? Math.sin((f * 2 * Math.PI) / 50) * 5 : 0;
  const symbols = [
    <path key="t" d="M 0 -34 L 32 24 L -32 24 Z" fill={C.white} />,
    <circle key="c" cx={0} cy={-6} r={28} fill={C.white} />,
    <rect key="q" x={-26} y={-26} width={52} height={52} rx={6} fill={C.white} />,
    <path key="d" d="M 0 -38 L 30 -4 L 0 30 L -30 -4 Z" fill={C.white} />,
  ];
  const faces = [0, 1, 2, 3].map((i) => {
    const phi = theta + (i * Math.PI) / 2;
    const cs = Math.cos(phi), sn = Math.sin(phi);
    return { i, cs, xc: HS * sn, half: HS * Math.abs(cs) };
  }).filter((fc) => fc.cs > 0.02).sort((a, b) => a.cs - b.cs);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={130} ry={12} fill={C.shadow} />
      <g transform={`rotate(${f1(rock)} 0 0)`}>
        {/* handle and knob */}
        <rect x={-12} y={-342} width={24} height={116} rx={12} fill={C.greyDark} />
        <circle cx={0} cy={-352} r={24} fill={colB} />
        {/* tapered lower body */}
        <path d={`M 0 0 C -30 -40 ${-HS} -70 ${-HS} ${BOT} L ${HS} ${BOT} C ${HS} -70 30 -40 0 0 Z`} fill={shade(colA, 0.25)} />
        {/* visible faces */}
        {faces.map((fc) => {
          const x1 = fc.xc - fc.half, x2 = fc.xc + fc.half;
          const col = fc.i % 2 ? colB : colA;
          const sym = symbols[fc.i];
          return (
            <g key={fc.i}>
              <path d={`M ${f1(x1)} ${TOP} L ${f1(x2)} ${TOP} L ${f1(x2)} ${BOT} L ${f1(x1)} ${BOT} Z`} fill={col} />
              <g transform={`translate(${f1(fc.xc)} -172) scale(${f1(fc.cs)} 1)`}>{sym}</g>
            </g>
          );
        })}
        {/* top cap */}
        <ellipse cx={0} cy={TOP} rx={HS} ry={24} fill={shade(colB, 0.1)} />
      </g>
    </g>
  );
}
