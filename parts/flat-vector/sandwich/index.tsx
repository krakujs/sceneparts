import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector sandwich: a triangle-cut half standing on its long cut edge, seen from the cut side,
// so the stacked layers show clearly. A second half sits behind it. Both touch the ground.
// Origin = resting point (bottom centre). Local units are px at s = 1 (about 420 px wide).

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Sandwich(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const anim = p.anim ?? "none";
  const x = p.x ?? 540, y = p.y ?? 1560;
  const bread = p.breadColor ?? "#E9B872";
  const showLettuce = p.lettuce ?? true;

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 4)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // one half, cut face: x -190..190, layers bottom to top, all within y 0..-236
  const W = 190;
  const layers: { y0: number; y1: number; col: string }[] = [
    { y0: 0, y1: -46, col: bread },           // bottom slice
    { y0: -46, y1: -92, col: "#F2A3A0" },     // ham
    { y0: -92, y1: -112, col: C.green },      // lettuce band
    { y0: -112, y1: -150, col: C.red },       // tomato
    { y0: -150, y1: -170, col: "#FFD25A" },   // cheese
    { y0: -170, y1: -236, col: bread },       // top slice
  ];
  const half = (dx: number, col: (c: string) => string, showFront: boolean) => {
    const c = col;
    return (
      <g transform={`translate(${f1(dx)} 0)`}>
        {/* bread crust edge along the bottom and top */}
        <rect x={-W} y={-10} width={2 * W} height={10} rx={4} fill={shade(bread, 0.3)} />
        {layers.map((L, i) => {
          const isBread = L.col === bread;
          return (
            <g key={i}>
              <rect x={-W} y={L.y1} width={2 * W} height={L.y0 - L.y1} fill={c(L.col)} />
              {isBread && <rect x={-W} y={L.y1} width={2 * W} height={L.y0 - L.y1} fill="#FFFFFF" opacity={0.12} />}
            </g>
          );
        })}
        {/* ham fibres and tomato slices */}
        {showFront && [-150, -60, 30, 120].map((hx, i) => (
          <ellipse key={"h" + i} cx={hx} cy={-70} rx={22} ry={11} fill="#E9807C" opacity={0.6} />
        ))}
        {showFront && [-140, -40, 60, 150].map((tx, i) => (
          <ellipse key={"t" + i} cx={tx} cy={-131} rx={24} ry={12} fill="#F26A5A" opacity={0.7} />
        ))}
        {/* wavy lettuce sticking out of the right edge */}
        {showLettuce && showFront && [-96, -56, -16, 24, 64, 104].map((lx, i) => (
          <ellipse key={"l" + i} cx={lx} cy={-101} rx={22} ry={11} fill={i % 2 ? C.greenDark : C.green} />
        ))}
        {showLettuce && showFront && [W - 4, W + 2, W - 2].map((ex, i) => (
          <ellipse key={"e" + i} cx={ex + 10} cy={-102 - i * 4} rx={14} ry={9} fill={C.green} />
        ))}
        {/* golden crust edge on the bottom slice and top slice */}
        <rect x={-W} y={-46} width={2 * W} height={6} fill={shade(bread, 0.22)} opacity={0.6} />
        <rect x={-W} y={-236} width={2 * W} height={10} rx={5} fill={shade(bread, 0.22)} />
        {/* cheese edge */}
        <rect x={-W} y={-170} width={2 * W} height={4} fill="#FFE9A0" />
      </g>
    );
  };
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={16} fill={C.shadow} />
      <g transform={tr}>
        {half(70, (c) => shade(c, 0.18), false)}
        {half(-20, (c) => c, true)}
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Sandwich {...p} />;
}
