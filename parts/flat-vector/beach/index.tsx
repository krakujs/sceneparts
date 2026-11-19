import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Beach vignette: a sea band with a foamy wave edge over a strip of sand, with a fan shell and a spiral shell. Origin = centre of the sand line. About 1000 px wide and 420 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const col = (v: any, d: string) => (v && v !== "none" ? v : d);
const FOAM = Array.from({ length: 17 }, (_, i) => ({ x: -480 + i * 60, r: i % 2 ? 16 : 20 }));

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const sea = col(p.color, "#4AA3D9");
  const sand = col(p.color2, C.sand);
  const anim: string = p.anim ?? "none";
  const drift = anim === "flow" ? Math.sin((f / 60) * Math.PI * 2) * 10 : 0;
  const fan = (cx: number, cy: number) => (
    <g>
      <path d={`M ${cx - 34} ${cy} A 34 34 0 0 1 ${cx + 34} ${cy} Z`} fill={C.pink} />
      {[30, 60, 90, 120, 150].map((a) => {
        const r = (a * Math.PI) / 180;
        return <path key={a} d={`M ${cx} ${cy} L ${f1(cx + 32 * Math.cos(r))} ${f1(cy - 32 * Math.sin(r))}`} stroke={C.white} strokeWidth={3} opacity={0.7} />;
      })}
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        {/* sea band */}
        <rect x={-500} y={-420} width={1000} height={330} fill={sea} />
        <rect x={-500} y={-200} width={1000} height={110} fill={shade(sea, 0.12)} />
        <path d="M -460 -340 q 30 -14 60 0 q 30 14 60 0 M -120 -300 q 30 -14 60 0 q 30 14 60 0 M 200 -360 q 30 -14 60 0 q 30 14 60 0 M 330 -250 q 30 -14 60 0 q 30 14 60 0"
          stroke={C.white} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.55} transform={`translate(${f1(drift)} 0)`} />
        {/* sand strip with a wavy top edge */}
        <path d="M -500 0 L -500 -110 Q -460 -128 -420 -112 T -340 -110 T -260 -112 T -180 -110 T -100 -112 T -20 -110 T 60 -112 T 140 -110 T 220 -112 T 300 -110 T 380 -112 T 460 -110 Q 480 -112 500 -120 L 500 0 Z" fill={sand} />
        {/* foam along the edge */}
        <g transform={`translate(${f1(drift)} 0)`}>
          {FOAM.map((q, i) => <circle key={i} cx={q.x} cy={-112} r={q.r} fill={C.white} />)}
        </g>
        {/* shells */}
        {fan(-260, -30)}
        <circle cx={230} cy={-34} r={24} fill="#F4B183" />
        <path d="M 230 -34 m -12 0 a 12 12 0 1 1 12 12" stroke={C.brownDark} strokeWidth={4} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}
