import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Badminton racket standing upright: a long, slim tapered shaft, a small oval string head and a grip at the bottom.
// Origin = bottom centre of the grip; the grip rests on y. Hero size about 180 px wide at s = 1.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const frame = p.color && p.color !== "none" ? p.color : C.pink;
  const anim: string = p.anim ?? "none";
  const rot = anim === "swing" ? Math.sin((f * 2 * Math.PI) / 50) * 8 : 0;
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 40) + 1) * 8 : 0;
  const hy = -540, rx = 62, ry = 84, n = 7;
  const strand = C.greyDark;
  const grid: React.ReactNode[] = [];
  for (let i = 1; i < n; i++) {
    const gx = -rx + (2 * rx * i) / n;
    const h = ry * Math.sqrt(1 - (gx / rx) ** 2);
    grid.push(<line key={`v${i}`} x1={f1(gx)} y1={f1(hy - h)} x2={f1(gx)} y2={f1(hy + h)} stroke={strand} strokeWidth={2.5} />);
  }
  for (let j = 1; j < n + 2; j++) {
    const gy = hy - ry + (2 * ry * j) / (n + 2);
    const w = rx * Math.sqrt(1 - ((gy - hy) / ry) ** 2);
    grid.push(<line key={`h${j}`} x1={f1(-w)} y1={f1(gy)} x2={f1(w)} y2={f1(gy)} stroke={strand} strokeWidth={2.5} />);
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y + bob)}) scale(${p.flip ? -s : s} ${s}) rotate(${f1(rot)})`}>
      <ellipse cx={0} cy={0} rx={50} ry={6} fill={C.shadow} />
      {/* grip */}
      <rect x={-17} y={-130} width={34} height={130} rx={14} fill={C.ink} />
      {[0, 1].map((i) => <rect key={i} x={-17} y={-100 + i * 40} width={34} height={8} fill={C.inkSoft} />)}
      {/* slim tapered shaft */}
      <path d="M -9 -135 L 9 -135 L 6 -440 L -6 -440 Z" fill={frame} />
      <path d="M 2 -135 L 9 -135 L 6 -440 L 2 -440 Z" fill={shade(frame, 0.16)} />
      {/* small oval head */}
      <ellipse cx={0} cy={hy} rx={rx + 10} ry={ry + 10} fill={frame} />
      <ellipse cx={0} cy={hy + 4} rx={rx + 4} ry={ry + 6} fill={shade(frame, 0.16)} />
      <ellipse cx={0} cy={hy} rx={rx} ry={ry} fill={C.paper} />
      {grid}
    </g>
  );
}
