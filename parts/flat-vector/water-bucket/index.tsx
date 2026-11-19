import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Metal pail full of water standing on the floor, wire bail handle over the top. Hero scale: about 330 px wide, 460 px tall at s = 1.
// Origin = floor centre under the pail. anim "slosh": the water rocks in the pail; "splash": drops leap out of the surface.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const metal = p.color && p.color !== "none" ? p.color : C.grey;
  const water = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const anim: string = p.anim ?? "none";
  const tilt = anim === "slosh" ? Math.sin((f * 2 * Math.PI) / 50) * 5 : 0;
  const drops = [0, 1, 2, 3].map((i) => {
    const u = anim === "splash" ? (f / 40 + i / 4) % 1 : 0.5;
    return { x: (i - 1.5) * 64, y: -322 - 140 * 4 * u * (1 - u) };
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <path d="M -150 -336 Q -150 -462 0 -462 Q 150 -462 150 -336" fill="none" stroke={shade(metal, 0.1)} strokeWidth={14} strokeLinecap="round" />
        <path d="M -150 -330 L 150 -330 L 124 -20 Q 120 0 100 0 L -100 0 Q -120 0 -124 -20 Z" fill={metal} />
        <path d="M 60 -322 L 140 -322 L 118 -24 Q 116 0 100 0 L 40 0 Z" fill={shade(metal, 0.15)} />
        <rect x={-100} y={-300} width={22} height={260} rx={11} fill={C.white} opacity={0.25} />
        <rect x={-160} y={-346} width={320} height={26} rx={12} fill={shade(metal, 0.25)} />
        <rect x={-164} y={-352} width={22} height={24} rx={6} fill={shade(metal, 0.2)} />
        <rect x={142} y={-352} width={22} height={24} rx={6} fill={shade(metal, 0.2)} />
        <g transform={`rotate(${f1(tilt)} 0 -322)`}>
          <ellipse cx={0} cy={-322} rx={146} ry={28} fill={water} />
          <path d="M -90 -330 Q -40 -346 20 -338" fill="none" stroke={C.white} strokeWidth={9} strokeLinecap="round" opacity={0.4} />
        </g>
        {anim === "splash" && drops.map((d, i) => (
          <circle key={i} cx={Number(f1(d.x))} cy={Number(f1(d.y))} r={11} fill={water} />
        ))}
      </g>
    </g>
  );
}
