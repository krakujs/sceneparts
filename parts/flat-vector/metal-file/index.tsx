import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Metal file lying on the floor: tapered steel body with bold crosshatched teeth and a wooden handle at the back.
// Origin = floor centre. Hero size: about 460 px long at s = 1. anim "rub": the file slides back and forth.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number, d = 0) => { const t = Math.min(1, Math.max(0, (f - d) / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const steel = p.color && p.color !== "none" ? p.color : C.grey;
  const wood = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  const rubX = anim === "rub" ? f1(Math.sin((f * 2 * Math.PI) / 40) * 18) : "0";
  const top = (x0: number) => -56 + ((x0 + 120) * 20) / 340;
  const bot = (x0: number) => -4 - ((x0 + 120) * 20) / 340;
  const setA = Array.from({ length: 13 }, (_, i) => -110 + i * 26);
  const setB = Array.from({ length: 13 }, (_, i) => -97 + i * 26);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-10} cy={0} rx={235} ry={12} fill={C.shadow} />
      <g transform={motion(anim === "rub" ? "none" : anim, f)}>
        <g transform={`translate(${rubX} 0)`}>
          <rect x={-230} y={-62} width={120} height={64} rx={30} fill={wood} />
          <rect x={-124} y={-38} width={12} height={16} fill={shade(steel, 0.2)} />
          <polygon points="-120,-56 220,-36 230,-30 220,-24 -120,-4" fill={steel} />
          {setA.map((x0) => (
            <polygon key={`a${x0}`} points={`${x0},${f1(top(x0))} ${x0 + 8},${f1(top(x0 + 8))} ${x0 + 22},${f1(bot(x0 + 22))} ${x0 + 14},${f1(bot(x0 + 14))}`} fill={shade(steel, 0.3)} />
          ))}
          {setB.map((x0) => (
            <polygon key={`b${x0}`} points={`${x0 + 14},${f1(top(x0 + 14))} ${x0 + 22},${f1(top(x0 + 22))} ${x0 + 8},${f1(bot(x0 + 8))} ${x0},${f1(bot(x0))}`} fill={shade(steel, 0.45)} opacity={0.5} />
          ))}
        </g>
      </g>
    </g>
  );
}
