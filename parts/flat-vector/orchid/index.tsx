/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Potted orchid: an arching stem with several five-petal blooms and broad leaves at the base. Origin = bottom centre of the pot.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const bloom = (c: string, lip: string) => (
  <g>
    {[0, 1, 2, 3, 4].map((i) => (
      <ellipse key={i} cx={0} cy={-26} rx={17} ry={27} fill={c} transform={`rotate(${i * 72})`} />
    ))}
    <circle r={11} fill={lip} />
    <circle r={5} fill={C.yellow} />
  </g>
);

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const bl = p.color && p.color !== "none" ? p.color : C.purple;
  const potC = p.color2 && p.color2 !== "none" ? p.color2 : "#C9704E";
  const anim: string = p.anim ?? "none";
  const pop = anim === "pop" ? easeOutBack(f / 20) : 1;
  const sw = anim === "sway" ? 2.5 * Math.sin((f * 2 * Math.PI) / 110) : 0;
  const flowers: [number, number, string][] = [[120, -520, bl], [215, -450, shade(bl, -0.1)], [240, -360, bl], [195, -280, shade(bl, -0.1)], [280, -430, C.white]];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={16} fill={C.shadow} />
      <path d="M -150 -20 L -120 -200 Q -118 -214 -100 -214 H 100 Q 118 -214 120 -200 L 150 -20 Q 150 0 130 0 H -130 Q -150 0 -150 -20 Z" fill={potC} />
      <path d="M 40 -200 L 120 -200 L 150 -20 Q 150 0 130 0 H 60 Z" fill={shade(potC, 0.2)} />
      <rect x={-118} y={-236} width={236} height={28} rx={12} fill={shade(potC, 0.1)} />
      <g transform={`rotate(${f1(sw)})`}>
        <path d="M 0 -230 C -40 -330 -10 -450 80 -520 C 150 -560 230 -500 240 -360" stroke={C.green} strokeWidth={12} fill="none" strokeLinecap="round" />
        <path d="M -10 -230 Q -90 -260 -60 -340 Q -20 -270 -10 -230 Z" fill={C.green} />
        <g transform="translate(-6 -240)">
          <path d="M 0 0 C -120 -20 -220 -90 -200 -180 C -120 -120 -40 -70 0 0 Z" fill={C.green} />
          <path d="M 0 0 C 110 -10 180 -80 170 -160 C 100 -110 40 -60 0 0 Z" fill={shade(C.green, 0.15)} />
        </g>
        <g transform="translate(0 0)">
          {flowers.map(([fx, fy, c], i) => (
            <g key={i} transform={`translate(${fx} ${fy}) scale(${f1(pop * 1.6)}) rotate(${i * 25})`}>
              {bloom(c, C.pink)}
            </g>
          ))}
        </g>
      </g>
    </g>
  );
}
