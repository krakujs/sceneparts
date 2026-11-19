import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector wrapped candy: a big twist-wrapped sweet with crimped ends, plus two smaller ones beside it.
// Origin = resting point (bottom centre), honours flip and s. Hero size ~430 px wide at s = 1.

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Candy(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = p.x ?? 540, y = p.y ?? 1560;
  const anim = p.anim ?? "none";
  const col = p.color ?? "#F27BA6";
  const other1 = "#FFC83D", other2 = "#3D6FE0";

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // one wrapped sweet, drawn around (0,0) = its centre, horizontal, with crimped tails to left and right
  const sweet = (c: string, k: number) => {
    const body = { rx: 100, ry: 78 };
    const tail = (sign: number) => {
      const t = sign;
      const crimp = [0, 1, 2, 3, 4].map((i) => {
        const yy = -40 + i * 20;
        return `L ${f1(t * (140 + (i % 2) * 10))} ${f1(yy)}`;
      }).join(" ");
      return (
        <g>
          <path d={`M ${f1(t * 60)} -40 Q ${f1(t * 130)} -60 ${f1(t * 176)} -62 ${crimp} L ${f1(t * 176)} 62 Q ${f1(t * 130)} 60 ${f1(t * 60)} 40 Z`} fill={shade(c, 0.1)} />
          {[0, 1, 2, 3].map((i) => <line key={i} x1={f1(t * 120)} y1={f1(-30 + i * 20)} x2={f1(t * 190)} y2={f1(-30 + i * 22)} stroke={shade(c, 0.28)} strokeWidth={4} strokeLinecap="round" />)}
        </g>
      );
    };
    return (
      <g transform={`scale(${k})`}>
        {tail(-1)}
        {tail(1)}
        <ellipse cx={0} cy={0} rx={body.rx} ry={body.ry} fill={c} />
        {/* twist stripes on the body */}
        {[-60, -20, 20, 60].map((sx, i) => (
          <path key={i} d={`M ${sx - 16} -${body.ry - 8} Q ${sx + 14} 0 ${sx - 16} ${body.ry - 8}`} stroke={shade(c, 0.2)} strokeWidth={9} fill="none" strokeLinecap="round" opacity={0.7} />
        ))}
        <ellipse cx={-34} cy={-34} rx={22} ry={12} fill="#FFFFFF" opacity={0.4} transform="rotate(-20 -34 -34)" />
      </g>
    );
  };

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={300} ry={20} fill={C.shadow} />
      <g transform={tr}>
        <g transform="translate(-200 -36) rotate(-14)">{sweet(other1, 0.5)}</g>
        <g transform="translate(200 -40) rotate(12)">{sweet(other2, 0.52)}</g>
        <g transform="translate(0 -92)">{sweet(col, 1)}</g>
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Candy {...p} />;
}
