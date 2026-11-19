import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import Ox from "../ox/index";

// Indian-style wooden bullock cart: two big spoked wheels, a wooden bed under a curved canopy on bamboo hoops,
// and a long tongue in front. With animal = true a flat-vector ox stands at the tongue end, pulling the cart.
// Origin = floor centre of the whole group; the wheels and hooves stand on y. About 1000 px wide and 620 px tall at s = 1.
// anim "drive": the spokes turn, the cart bounces and the ox walks.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const OFFSET = -282; // centres the whole group on x

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const wood = p.color && p.color !== "none" ? p.color : C.brown;
  const canopy = p.color2 && p.color2 !== "none" ? p.color2 : C.orange;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 5 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -3 : 0;
  const withOx = p.animal !== false;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={OFFSET} cy={0} rx={520} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(${OFFSET} ${f1(bounce)})`}>
          {/* canopy on bamboo hoops, posts */}
          <path d="M -200 -300 C -210 -500 -120 -612 0 -612 C 120 -612 210 -500 200 -300 Z" fill={canopy} />
          <path d="M -130 -300 C -150 -470 -60 -600 0 -612" fill="none" stroke={C.brownDark} strokeWidth={10} strokeLinecap="round" />
          <path d="M 130 -300 C 150 -470 60 -600 0 -612" fill="none" stroke={C.brownDark} strokeWidth={10} strokeLinecap="round" />
          <rect x={-180} y={-340} width={14} height={60} fill={C.brownDark} />
          <rect x={166} y={-340} width={14} height={60} fill={C.brownDark} />
          {/* wooden bed and tongue */}
          <rect x={-190} y={-300} width={380} height={60} rx={8} fill={wood} />
          <rect x={-190} y={-282} width={380} height={10} fill={shade(wood, 0.25)} />
          <rect x={180} y={-262} width={120} height={22} rx={11} fill={C.brownDark} />
          {/* big spoked wheel, drawn in front of the bed */}
          <circle cx={0} cy={-210} r={200} fill="none" stroke={C.brownDark} strokeWidth={18} />
          <g transform={`rotate(${f1(spin)} 0 -210)`}>
            {Array.from({ length: 12 }, (_, k) => (
              <rect key={k} x={-6} y={-410} width={12} height={400} rx={4} fill={shade(wood, 0.15)} transform={`rotate(${k * 15} 0 -210)`} />
            ))}
          </g>
          <circle cx={0} cy={-210} r={26} fill={C.brownDark} />
          <circle cx={0} cy={-210} r={10} fill={C.yellow} />
          {/* the ox at the end of the tongue (drawn last, in front) */}
          {withOx && (
            <g transform="translate(489 0) scale(0.9)">
              <Ox f={f} d={p.d} t={p.t} style={p.style} render={p.render} x={0} y={0} s={1} pose={driving ? "walk" : "stand"} />
            </g>
          )}
        </g>
      </g>
    </g>
  );
}
