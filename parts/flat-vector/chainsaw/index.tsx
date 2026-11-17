import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Chainsaw lying on the floor: orange body with a black rear handle and a guide bar with chain. Tool only.
// Origin = floor centre. Hero size: about 480 px long at s = 1. anim "chain": the chain teeth run round the bar.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number, d = 0) => { const t = Math.min(1, Math.max(0, (f - d) / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};
const buzz = (f: number) => `translate(${f1(Math.sin((f * Math.PI) / 2) * 2)} ${f1(Math.cos((f * 2 * Math.PI) / 3))})`;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.orange;
  const bar = p.color2 && p.color2 !== "none" ? p.color2 : C.grey;
  const anim: string = p.anim ?? "none";
  const shift = anim === "chain" ? (f * 3) % 26 : 0;
  const teeth = Array.from({ length: 9 }, (_, i) => 30 + ((i * 26 + shift) % 234));
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-20} cy={0} rx={250} ry={12} fill={C.shadow} />
      <g transform={anim === "buzz" ? buzz(f) : motion(anim === "pop" ? "pop" : "none", f)}>
        <rect x={-190} y={-170} width={150} height={20} rx={10} fill={C.ink} />
        <rect x={-180} y={-152} width={16} height={26} fill={C.ink} />
        <rect x={-60} y={-152} width={16} height={26} fill={C.ink} />
        <rect x={16} y={-100} width={254} height={56} rx={28} fill={C.inkSoft} />
        <rect x={24} y={-84} width={240} height={24} rx={10} fill={bar} />
        <circle cx={264} cy={-72} r={12} fill={bar} />
        {teeth.map((tx, i) => (
          <g key={i}>
            <rect x={tx} y={-108} width={12} height={12} rx={3} fill={C.inkSoft} />
            <rect x={tx} y={-44} width={12} height={12} rx={3} fill={C.inkSoft} />
          </g>
        ))}
        <rect x={-190} y={-130} width={220} height={130} rx={38} fill={body} />
        <rect x={-150} y={-40} width={140} height={12} rx={6} fill={shade(body, 0.25)} />
        <circle cx={-120} cy={-70} r={30} fill={shade(body, 0.3)} />
      </g>
    </g>
  );
}
