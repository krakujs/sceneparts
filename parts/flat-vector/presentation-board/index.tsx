import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flip chart: a paper pad on a tripod easel. The top sheet hinges at its top edge and folds up
// to show the sheet underneath. Boxes and arrows only, no words.
// Origin = floor centre under the easel. 1 m ~ 560 px: the board is about 0.9 m tall, the easel about 1.6 m.
const f1 = (v: number) => v.toFixed(1);

// Easel and board frame. The same code is in the pie, bar and line chart boards so they match.
// Board: x -250..250, y -880..-400. Screen: x -226..226, y -856..-424.
const Easel = ({ children }: { children: React.ReactNode }) => (
  <g>
    <ellipse cx={0} cy={0} rx={300} ry={14} fill={C.shadow} />
    <path d="M -24 -380 L -262 -4" stroke={shade(C.brown, 0.2)} strokeWidth={22} strokeLinecap="round" fill="none" />
    <path d="M 24 -380 L 262 -4" stroke={C.brown} strokeWidth={22} strokeLinecap="round" fill="none" />
    <path d="M 0 -380 L 0 -40" stroke={shade(C.brown, 0.2)} strokeWidth={20} strokeLinecap="round" fill="none" />
    <rect x={-250} y={-880} width={500} height={480} rx={22} fill={C.navy} />
    <rect x={-226} y={-856} width={452} height={432} rx={8} fill={C.white} />
    {children}
    <rect x={-150} y={-398} width={300} height={22} rx={9} fill={C.brownDark} />
  </g>
);

const Box = ({ x, y, c }: { x: number; y: number; c: string }) => (
  <g>
    <rect x={x} y={y} width={96} height={72} rx={14} fill={c} />
    <rect x={x} y={y + 60} width={96} height={12} rx={6} fill={shade(c, 0.2)} />
  </g>
);

// Arrow from (x1, y1) to (x2, y2): a rounded shaft with a triangular head.
const Arrow = ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const ang = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  return (
    <g transform={`translate(${f1(x1)} ${f1(y1)}) rotate(${f1(ang)})`}>
      <rect x={0} y={-7} width={len - 24} height={14} rx={7} fill={C.ink} />
      <path d={`M ${f1(len - 30)} -22 L ${f1(len)} 0 L ${f1(len - 30)} 22 Z`} fill={C.ink} />
    </g>
  );
};

// Top sheet (page A) and the sheet under it (page B). Both are drawn in screen coordinates.
const PageA = () => (
  <g>
    <rect x={-226} y={-856} width={452} height={432} fill={C.white} />
    <Box x={-210} y={-800} c={C.teal} />
    <Box x={-60} y={-800} c={C.blue} />
    <Box x={90} y={-800} c={C.yellow} />
    <Arrow x1={-110} y1={-764} x2={-66} y2={-764} />
    <Arrow x1={40} y1={-764} x2={84} y2={-764} />
    <Arrow x1={-12} y1={-722} x2={-12} y2={-616} />
    <Box x={-60} y={-610} c={C.orange} />
    <Arrow x1={40} y1={-574} x2={84} y2={-574} />
    <Box x={90} y={-610} c={C.green} />
  </g>
);
const PageB = () => (
  <g>
    <rect x={-226} y={-856} width={452} height={432} fill={C.white} />
    <Box x={-190} y={-760} c={C.purple} />
    <Arrow x1={-86} y1={-724} x2={-40} y2={-724} />
    <Box x={-30} y={-760} c={C.pink} />
    <Arrow x1={72} y1={-724} x2={118} y2={-724} />
    <Box x={126} y={-760} c={C.skyDeep} />
    <Arrow x1={174} y1={-690} x2={174} y2={-620} />
    <Box x={126} y={-610} c={C.lime} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const anim: string = p.anim ?? "none";
  // flip: every 160 frames the top sheet folds up over its hinge (frames 60..100), then rests.
  const u = anim === "flip" ? Math.min(1, Math.max(0, ((f % 160) - 60) / 40)) : 0;
  const e = u * u * (3 - 2 * u);
  const sy = 1 - e;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <Easel>
        <PageB />
        {sy > 0.01 && (
          <g transform={`translate(0 -856) scale(1 ${f1(sy)}) translate(0 856)`}>
            <PageA />
          </g>
        )}
      </Easel>
    </g>
  );
}
