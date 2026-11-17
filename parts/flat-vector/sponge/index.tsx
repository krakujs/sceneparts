import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Kitchen sponge: yellow sponge body with a green scrub pad on top, pores and suds. Origin = bottom centre; hero size.
// anim "bubbles" makes the suds rise and fade; "squish" squashes the sponge gently.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const PORES: [number, number][] = [[-120, -120], [-60, -84], [10, -130], [70, -96], [120, -140], [-100, -40], [-20, -50], [50, -30], [110, -64], [-140, -70]];
const SUDS = [
  { x: -200, y: -240, r: 18, o: 0 }, { x: -130, y: -270, r: 12, o: 25 }, { x: -40, y: -290, r: 22, o: 12 },
  { x: 40, y: -262, r: 14, o: 40 }, { x: 140, y: -286, r: 20, o: 6 }, { x: 200, y: -236, r: 12, o: 33 },
];
const motion = (anim: string, f: number) => {
  if (anim === "squish") { const k = Math.sin((f * 2 * Math.PI) / 40); return `scale(${f1(1 + 0.03 * k)} ${f1(1 - 0.04 * k)})`; }
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.yellow;
  const pad = p.color2 && p.color2 !== "none" ? p.color2 : C.green;
  const rising = p.anim === "bubbles";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={12} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* sponge body with a darker right side and pores */}
        <rect x={-170} y={-190} width={340} height={190} rx={46} fill={c} />
        <path d="M 110 -190 H 124 A 46 46 0 0 1 170 -144 V -46 A 46 46 0 0 1 124 0 H 110 Z" fill={shade(c, 0.2)} />
        {PORES.map(([px, py], i) => <circle key={i} cx={px} cy={py} r={i % 3 ? 8 : 11} fill={shade(c, 0.28)} />)}
        {/* scrub pad on top: green with a grid of short scrubbing ridges */}
        <rect x={-176} y={-222} width={352} height={62} rx={20} fill={pad} />
        <rect x={-176} y={-214} width={352} height={10} rx={5} fill={C.white} opacity={0.2} />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <g key={i}>
            <rect x={-150 + i * 48} y={-200} width={24} height={12} rx={6} fill={shade(pad, 0.3)} />
            <rect x={-126 + i * 48} y={-180} width={24} height={12} rx={6} fill={shade(pad, 0.3)} />
          </g>
        ))}
        {/* suds */}
        {SUDS.map((b, i) => {
          const t = rising ? (((f * 1.2) + b.o) % 70) / 70 : 0;
          return <circle key={i} cx={b.x} cy={b.y - t * 70} r={b.r} fill={C.white} opacity={rising ? 0.9 * (1 - t) : 0.9} />;
        })}
      </g>
    </g>
  );
}
