import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Ceramic vase with a bunch of simple flowers. Origin = centre of the vase base on the table or floor.
// anim "sway" rocks the bouquet gently from the vase mouth.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const flower = (cx: number, cy: number, r: number, c: string) => (
  <g transform={`translate(${f1(cx)} ${f1(cy)})`}>
    {[0, 72, 144, 216, 288].map((a) => (
      <circle key={a} cx={0} cy={-r * 0.62} r={r * 0.5} fill={c} transform={`rotate(${a})`} />
    ))}
    <circle cx={0} cy={0} r={r * 0.36} fill={C.yellow} />
  </g>
);
/** A small leaf rooted at (0,0) pointing up. */
const leaf = (len: number, w: number, c: string) => (
  <path d={`M 0 0 C ${f1(-w)} ${f1(-len * 0.3)} ${f1(-w * 0.8)} ${f1(-len * 0.8)} 0 ${f1(-len)} C ${f1(w * 0.8)} ${f1(-len * 0.8)} ${f1(w)} ${f1(-len * 0.3)} 0 0 Z`} fill={c} />
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const vase = p.color && p.color !== "none" ? p.color : C.blue;
  const anim: string = p.anim ?? "none";
  const sway = anim === "sway" ? 3 * Math.sin((f * 2 * Math.PI) / 90) : 0;
  const stems: [number, number, number, number, number, string][] = [
    // [head x, head y, control x, control y, head radius, colour]
    [-96, -470, -40, -410, 26, C.pink],
    [-22, -540, -12, -440, 28, C.yellow],
    [58, -500, 22, -420, 26, C.purple],
    [124, -430, 84, -390, 24, C.orange],
  ];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={130} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`rotate(${f1(sway)} 0 -340)`}>
          {stems.map(([hx, hy, cx, cy], i) => (
            <path key={`s${i}`} d={`M 0 -340 Q ${cx} ${cy} ${hx} ${hy}`} fill="none" stroke={C.green} strokeWidth={9} strokeLinecap="round" />
          ))}
          <g transform="translate(-58 -400) rotate(-50)">{leaf(90, 30, C.green)}</g>
          <g transform="translate(60 -420) rotate(46)">{leaf(90, 30, shade(C.green, -0.1))}</g>
          {stems.map(([hx, hy, , , r, c], i) => (
            <g key={`h${i}`}>{flower(hx, hy, r, c)}</g>
          ))}
        </g>
        <path d="M -44 -330 L -44 -292 C -120 -262 -140 -190 -120 -110 C -110 -50 -80 -10 0 -10 C 80 -10 110 -50 120 -110 C 140 -190 120 -262 44 -292 L 44 -330 Z" fill={vase} />
        <path d="M 40 -292 C 120 -262 140 -190 120 -110 C 110 -50 80 -10 0 -10 C 60 -10 90 -40 100 -90 C 110 -170 100 -240 40 -292 Z" fill={shade(vase, 0.2)} />
        <ellipse cx={-70} cy={-170} rx={12} ry={48} fill={C.white} opacity={0.35} transform="rotate(12 -70 -170)" />
        <rect x={-52} y={-342} width={104} height={16} rx={7} fill={vase} />
        <ellipse cx={0} cy={-334} rx={44} ry={9} fill={shade(vase, 0.45)} />
      </g>
    </g>
  );
}
