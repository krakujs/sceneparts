import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Coiled garden hose on the floor with a spray nozzle on the end. Hero scale: about 560 px wide at s = 1.
// Origin = floor under the coil. spray = true shows water from the nozzle; anim "spray" moves the drops.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const hose = p.color && p.color !== "none" ? p.color : C.green;
  const nozzle = p.color2 && p.color2 !== "none" ? p.color2 : C.orange;
  const anim: string = p.anim ?? "none";
  const spray = p.spray !== false;
  const drops = [0, 1, 2, 3, 4].map((i) => {
    const u = anim === "spray" ? (f / 50 + i / 5) % 1 : 0.15 + i * 0.18;
    return { x: 420 + 150 * u, y: -214 - 150 * u + 190 * u * u, o: 1 - u * 0.5 };
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={20} cy={0} rx={190} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={-30} rx={150} ry={40} fill="none" stroke={shade(hose, 0.2)} strokeWidth={30} />
        <ellipse cx={0} cy={-62} rx={150} ry={40} fill="none" stroke={hose} strokeWidth={30} />
        <ellipse cx={0} cy={-94} rx={150} ry={40} fill="none" stroke={shade(hose, 0.2)} strokeWidth={30} />
        <path d="M 140 -62 C 230 -58 200 -200 250 -212" fill="none" stroke={hose} strokeWidth={26} strokeLinecap="round" />
        <rect x={236} y={-236} width={100} height={52} rx={16} fill={nozzle} />
        <rect x={270} y={-190} width={26} height={26} rx={8} fill={shade(nozzle, 0.25)} />
        <rect x={326} y={-226} width={70} height={26} rx={10} fill={C.greyDark} />
        <rect x={390} y={-234} width={30} height={42} rx={8} fill={C.greyDark} />
        {spray && drops.map((d, i) => (
          <circle key={i} cx={Number(f1(d.x))} cy={Number(f1(d.y))} r={9} fill={C.skyDeep} opacity={Number(f1(d.o))} />
        ))}
      </g>
    </g>
  );
}
