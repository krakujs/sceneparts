import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Bamboo: a cluster of tall segmented green canes with dark node bands and leaf sprays at the top.
// Origin = centre of the cluster base on the ground. About 420 px wide and 1300 px tall at s = 1. anim sway rocks the canes.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
// Canes: [base x, height, lean in degrees, width]
const CANES: [number, number, number, number][] = [[-150, 1000, -4, 36], [-80, 1240, 1, 44], [-5, 1300, -2, 48], [70, 1140, 3, 42], [150, 920, -3, 34]];
// Leaf angles (deg) and lengths for a spray
const SPRAY = [-70, -40, -12, 16, 44, 70];
const lance = (len: number, w: number) => `M 0 0 Q ${f1(w)} ${f1(-len * 0.5)} 0 ${f1(-len)} Q ${f1(-w)} ${f1(-len * 0.5)} 0 0 Z`;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const green = p.color && p.color !== "none" ? p.color : C.green;
  const anim: string = p.anim ?? "none";
  const nodeC = shade(green, 0.3);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={220} ry={16} fill={C.shadow} />
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        {CANES.map(([bx, h, lean, w], i) => {
          const sw = anim === "sway" ? 1.5 * Math.sin((f * 2 * Math.PI) / 110 + i * 0.9) : 0;
          const nodes: number[] = [];
          for (let ny = -120; ny > -h + 60; ny -= 120) nodes.push(ny);
          return (
            <g key={i} transform={`translate(${f1(bx)} 0) rotate(${f1(lean + sw)})`}>
              <rect x={-w / 2} y={-h} width={w} height={h} rx={w * 0.2} fill={green} />
              <rect x={w * 0.1} y={-h} width={w * 0.4} height={h} rx={w * 0.15} fill={shade(green, 0.18)} />
              {nodes.map((ny, j) => (
                <rect key={j} x={-w / 2 - 4} y={ny - 7} width={w + 8} height={14} rx={6} fill={nodeC} />
              ))}
              {/* leaf sprays from the top and one mid-cane spray */}
              {SPRAY.map((a, j) => (
                <g key={`t${j}`} transform={`translate(0 ${-h}) rotate(${a})`}>
                  <path d={lance(190 - Math.abs(a) * 0.6, 34)} fill={j % 2 ? shade(green, 0.12) : green} />
                </g>
              ))}
              {[-h * 0.55].map((my, j) => (
                <g key={`m${j}`} transform={`translate(0 ${f1(my)}) rotate(-60)`}>
                  <path d={lance(150, 28)} fill={shade(green, 0.12)} />
                </g>
              ))}
            </g>
          );
        })}
      </g>
    </g>
  );
}
