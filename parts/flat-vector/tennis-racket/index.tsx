import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tennis racket standing upright: a large oval head with a string grid, a short throat and a grip at the bottom.
// Origin = bottom centre of the grip; the grip rests on y. Hero size about 300 px wide at s = 1.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const frame = p.color && p.color !== "none" ? p.color : C.blue;
  const anim: string = p.anim ?? "none";
  const rot = anim === "swing" ? Math.sin((f * 2 * Math.PI) / 50) * 8 : 0;
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 40) + 1) * 8 : 0;
  const hy = -560, rx = 124, ry = 170, n = 9;
  const strand = C.greyDark;
  const grid: React.ReactNode[] = [];
  for (let i = 1; i < n; i++) {
    const gx = -rx + (2 * rx * i) / n;
    const h = ry * Math.sqrt(1 - (gx / rx) ** 2);
    grid.push(<line key={`v${i}`} x1={f1(gx)} y1={f1(hy - h)} x2={f1(gx)} y2={f1(hy + h)} stroke={strand} strokeWidth={3} />);
  }
  for (let j = 1; j < n + 3; j++) {
    const gy = hy - ry + (2 * ry * j) / (n + 3);
    const w = rx * Math.sqrt(1 - ((gy - hy) / ry) ** 2);
    grid.push(<line key={`h${j}`} x1={f1(-w)} y1={f1(gy)} x2={f1(w)} y2={f1(gy)} stroke={strand} strokeWidth={3} />);
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y + bob)}) scale(${p.flip ? -s : s} ${s}) rotate(${f1(rot)})`}>
      <ellipse cx={0} cy={0} rx={70} ry={9} fill={C.shadow} />
      {/* grip */}
      <rect x={-26} y={-230} width={52} height={230} rx={18} fill={C.ink} />
      {[0, 1, 2].map((i) => <rect key={i} x={-26} y={-200 + i * 50} width={52} height={10} fill={C.inkSoft} />)}
      {/* throat: two shafts splitting into the head */}
      <path d="M -10 -232 L -54 -400 L -40 -404 L -6 -240 Z" fill={frame} />
      <path d="M 10 -232 L 54 -400 L 40 -404 L 6 -240 Z" fill={shade(frame, 0.16)} />
      {/* head: frame ring, then the string bed */}
      <ellipse cx={0} cy={hy} rx={rx + 18} ry={ry + 18} fill={frame} />
      <ellipse cx={0} cy={hy} rx={rx + 18} ry={ry + 18} fill="none" stroke={shade(frame, 0.16)} strokeWidth={0} />
      <ellipse cx={0} cy={hy + 6} rx={rx + 6} ry={ry + 10} fill={shade(frame, 0.16)} />
      <ellipse cx={0} cy={hy} rx={rx} ry={ry} fill={C.paper} />
      {grid}
    </g>
  );
}
