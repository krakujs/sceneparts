import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Cordless power drill standing on its battery pack: pistol grip, chunky body, chuck and bit, no branding.
// Origin = floor under the battery. Hero size: about 480 px wide and 350 px tall at s = 1.
// anim "spin": the flutes of the bit turn; "bob" lifts it gently.
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
  const body = p.color && p.color !== "none" ? p.color : C.yellow;
  const dark = p.color2 && p.color2 !== "none" ? p.color2 : C.inkSoft;
  const anim: string = p.anim ?? "none";
  const shift = anim === "spin" ? (f * 3) % 40 : 0;
  const flutes = [0, 1, 2].map((i) => 166 + ((i * 40 + shift) % 80));
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-65} cy={0} rx={150} ry={12} fill={C.shadow} />
      <g transform={motion(anim === "spin" ? "none" : anim, f)}>
        <rect x={-120} y={-80} width={110} height={80} rx={18} fill={C.greyDark} />
        <circle cx={-65} cy={-40} r={8} fill={C.green} />
        <rect x={-110} y={-276} width={80} height={204} rx={32} fill={dark} />
        <rect x={-56} y={-262} width={22} height={42} rx={10} fill={shade(dark, 0.3)} />
        <rect x={-190} y={-340} width={300} height={80} rx={36} fill={body} />
        <rect x={-170} y={-332} width={150} height={14} rx={7} fill={C.white} opacity={0.3} />
        <rect x={90} y={-352} width={40} height={104} rx={12} fill={shade(body, 0.2)} />
        <rect x={120} y={-342} width={50} height={84} rx={10} fill={C.grey} />
        <rect x={166} y={-330} width={104} height={24} rx={4} fill={C.greyDark} />
        {flutes.map((fx, i) => (
          <rect key={i} x={fx} y={-330} width={10} height={24} fill={shade(C.grey, 0.35)} />
        ))}
        <polygon points="270,-330 290,-318 270,-306" fill={C.greyDark} />
      </g>
    </g>
  );
}
