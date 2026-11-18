import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Savanna vignette: golden grass, a flat-topped acacia tree and low distant hills. Origin = centre of the ground line.
// About 1000 px wide and 380 px tall at s = 1. anim sway moves the grass tufts gently.
const f1 = (v: number) => v.toFixed(1);
const GOLD = "#E8B84A", GOLD_DK = "#C98F2E", HILL = "#A9B9D8", LEAF = "#5E8A3A", LEAF_DK = "#466D2A", TRUNK = "#6B4A2E";
const TUFTS = [-480, -420, -350, -290, -220, -150, -90, -20, 40, 120, 200, 260, 330, 400, 470];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const grass = p.color && p.color !== "none" ? p.color : GOLD;
  const leaf = p.color2 && p.color2 !== "none" ? p.color2 : LEAF;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={500} ry={18} fill={C.shadow} />
      {/* distant low hills */}
      <path d="M -520 -60 L -520 -170 C -460 -230 -360 -240 -300 -190 C -220 -250 -110 -270 -40 -200 C 20 -240 120 -250 180 -190 C 240 -240 340 -230 400 -180 C 450 -200 500 -190 520 -160 L 520 -60 Z" fill={HILL} />
      {/* golden grass ground */}
      <path d="M -520 -60 C -300 -110 300 -110 520 -60 L 520 0 L -520 0 Z" fill={grass} />
      {/* acacia tree: thin leaning trunk and a wide flat crown */}
      <path d="M 22 0 Q 36 -150 26 -300 L 62 -300 Q 52 -150 70 0 Z" fill={TRUNK} />
      <path d="M -170 -318 C -180 -360 -110 -378 0 -378 C 110 -378 180 -360 170 -318 C 160 -296 120 -292 80 -296 L -90 -296 C -130 -292 -162 -296 -170 -318 Z" fill={leaf} />
      <ellipse cx={0} cy={-300} rx={150} ry={14} fill={LEAF_DK} />
      {/* grass tufts */}
      {TUFTS.map((tx, i) => {
        const a = anim === "sway" ? 4 * Math.sin((f * 2 * Math.PI) / 80 + i * 0.8) : 0;
        return (
          <g key={i} transform={`rotate(${f1(a)} ${tx} -40)`}>
            <path d={`M ${tx - 14} -40 Q ${tx - 6} -70 ${tx - 2} -50 Q ${tx + 4} -84 ${tx + 8} -46 Q ${tx + 16} -66 ${tx + 18} -40 Z`} fill={GOLD_DK} />
          </g>
        );
      })}
    </g>
  );
}
