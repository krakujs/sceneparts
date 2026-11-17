import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Hex bolt standing on its head, with a hex nut threaded on the shaft. Origin = floor under the bolt head.
// Hero size: about 440 px tall and 170 px wide at s = 1. anim "turn": the nut winds up and down the thread.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number, d = 0) => { const t = Math.min(1, Math.max(0, (f - d) / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};

const hexFaces = (w: number, top: number, h: number, c: string) => (
  <g>
    <rect x={-w / 2} y={top} width={w / 4} height={h} fill={shade(c, 0.25)} />
    <rect x={-w / 4} y={top} width={w / 2} height={h} fill={c} />
    <rect x={w / 4} y={top} width={w / 4} height={h} fill={shade(c, 0.4)} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const steel = p.color && p.color !== "none" ? p.color : C.grey;
  const anim: string = p.anim ?? "none";
  const nutDy = anim === "turn" ? -(0.5 - 0.5 * Math.cos((f * 2 * Math.PI) / 120)) * 70 : 0;
  const threads = Array.from({ length: 13 }, (_, j) => -100 - j * 28);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={110} ry={12} fill={C.shadow} />
      <g transform={motion(anim === "turn" ? "none" : anim, f)}>
        {hexFaces(170, -90, 90, steel)}
        <rect x={-26} y={-440} width={52} height={352} fill={shade(steel, 0.1)} />
        {threads.map((ty, j) => (
          <polygon key={j} points={`-26,${ty} 26,${ty - 14} 26,${ty - 6} -26,${ty + 8}`} fill={shade(steel, 0.3)} />
        ))}
        <g transform={`translate(0 ${f1(nutDy)})`}>
          {hexFaces(170, -340, 78, C.greyDark)}
        </g>
        <rect x={-85} y={-90} width={170} height={4} fill={shade(steel, 0.4)} />
      </g>
    </g>
  );
}
