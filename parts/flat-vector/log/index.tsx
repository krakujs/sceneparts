import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Fallen log: one long mossy log lying on the ground, its cut ring end showing on the right. Origin = bottom centre on the ground.
// About 850 px wide and 190 px tall at s = 1. Use this for a single fallen trunk, not a stack of logs (see flat-vector/logs).
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };

// Moss patches on the top of the log: [x, y, rx, ry]
const MOSS: [number, number, number, number][] = [[-330, -166, 90, 24], [-110, -176, 120, 26], [130, -166, 110, 24], [300, -150, 60, 18]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wood = p.color && p.color !== "none" ? p.color : C.sand;
  const bark = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const moss = p.color3 && p.color3 !== "none" ? p.color3 : C.green;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={430} ry={18} fill={C.shadow} />
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        {/* body of the log */}
        <rect x={-420} y={-170} width={790} height={170} rx={70} fill={bark} />
        <rect x={-380} y={-70} width={710} height={40} rx={20} fill={shade(bark, 0.25)} opacity={0.5} />
        {[-330, -200, -60, 80, 220].map((gx, i) => (
          <path key={i} d={`M ${gx} -140 Q ${gx + 8} -100 ${gx - 4} -60`} stroke={shade(bark, 0.25)} strokeWidth={8} strokeLinecap="round" fill="none" />
        ))}
        {/* moss on top, with a drip on each patch */}
        {MOSS.map(([mx, my, rx, ry], i) => (
          <g key={`m${i}`}>
            <ellipse cx={mx} cy={my} rx={rx} ry={ry} fill={moss} />
            <ellipse cx={f1(mx + rx * 0.3) as any} cy={f1(my + ry * 0.8) as any} rx={8} ry={14} fill={shade(moss, 0.2)} />
          </g>
        ))}
        {/* cut ring end */}
        <ellipse cx={370} cy={-85} rx={52} ry={88} fill={wood} />
        <ellipse cx={370} cy={-85} rx={36} ry={62} fill="none" stroke={shade(wood, 0.25)} strokeWidth={6} />
        <ellipse cx={370} cy={-85} rx={18} ry={30} fill="none" stroke={shade(wood, 0.25)} strokeWidth={6} />
        <circle cx={370} cy={-85} r={6} fill={shade(wood, 0.3)} />
      </g>
    </g>
  );
}
