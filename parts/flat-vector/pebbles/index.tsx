import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Low scatter of small smooth stones in varied greys. Origin = centre of the base line. About 540 px wide and 130 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const col = (v: any, d: string) => (v && v !== "none" ? v : d);

// [centre x, half width, half height, tone]: tone 0 = colour, 1 = colour2, 2 = darker shade
const STONES: [number, number, number, number][] = [
  [-215, 46, 34, 0], [-150, 30, 22, 1], [-98, 56, 40, 2], [-22, 38, 27, 1],
  [30, 64, 44, 0], [112, 40, 28, 2], [172, 30, 22, 0], [226, 46, 32, 1],
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const a = col(p.color, C.grey);
  const b = col(p.color2, C.greyLight);
  const tones = [a, b, shade(a, 0.28)];
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={4} rx={270} ry={14} fill={C.shadow} />
        {STONES.map(([cx, rx, ry, t], i) => (
          <g key={i}>
            <ellipse cx={cx} cy={-ry} rx={rx} ry={ry} fill={tones[t]} />
            <ellipse cx={cx - rx * 0.3} cy={-ry - ry * 0.45} rx={rx * 0.35} ry={ry * 0.22} fill={C.white} opacity={0.35} />
          </g>
        ))}
      </g>
    </g>
  );
}
