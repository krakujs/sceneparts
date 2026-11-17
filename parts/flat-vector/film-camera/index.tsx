import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Vintage rangefinder-style film camera from the front: leatherette body, silver top plate with two
// viewfinder windows, a shutter dial, a hot shoe and a wind lever that winds the film on.
// Origin = bottom centre. anim "wind" swings the lever over and back.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.brownDark;
  const plate = C.greyLight;
  const anim: string = p.anim ?? "none";
  const winding = anim === "wind" ? -35 * (0.5 - 0.5 * Math.cos((f * 2 * Math.PI) / 60)) : 0;
  const lens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={240} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-214} y={-270} width={12} height={12} rx={6} fill={C.greyDark} />
        <rect x={-210} y={-300} width={420} height={300} rx={26} fill={body} />
        <rect x={-210} y={-14} width={420} height={14} rx={6} fill={shade(body, 0.3)} />
        {/* strap lugs */}
        <circle cx={-214} cy={-260} r={8} fill={C.greyDark} />
        <circle cx={214} cy={-260} r={8} fill={C.greyDark} />
        {/* top plate with viewfinder humps */}
        <rect x={-190} y={-362} width={70} height={30} rx={10} fill={plate} />
        <rect x={120} y={-362} width={70} height={30} rx={10} fill={plate} />
        <rect x={-224} y={-340} width={448} height={48} rx={14} fill={plate} />
        <rect x={-224} y={-300} width={448} height={8} fill={shade(plate, 0.15)} />
        <rect x={-160} y={-354} width={50} height={20} rx={5} fill={C.ink} />
        <rect x={130} y={-354} width={50} height={20} rx={5} fill={C.ink} />
        <rect x={-30} y={-356} width={60} height={14} rx={4} fill={C.greyDark} />
        {/* shutter speed dial */}
        <circle cx={-120} cy={-316} r={26} fill={C.greyDark} />
        <circle cx={-120} cy={-316} r={17} fill={plate} />
        <rect x={-122} y={-330} width={4} height={14} rx={2} fill={C.ink} />
        {/* wind lever on the right of the top plate */}
        <g transform={`translate(170 -318) rotate(${f1(winding)})`}>
          <rect x={-6} y={-8} width={66} height={16} rx={8} fill={C.ink} />
          <circle cx={62} cy={0} r={14} fill={C.ink} />
        </g>
        <circle cx={170} cy={-318} r={12} fill={C.greyDark} />
        {/* lens housing */}
        <circle cx={0} cy={-150} r={112} fill={C.greyDark} />
        <circle cx={0} cy={-150} r={96} fill={C.ink} />
        {lens.map((i) => {
          const a = (i * 30 * Math.PI) / 180;
          return <rect key={i} x={Math.cos(a) * 104 - 3} y={-150 + Math.sin(a) * 104 - 3} width={6} height={6} rx={2} fill={C.grey} />;
        })}
        <circle cx={0} cy={-150} r={70} fill={C.greyDark} />
        <circle cx={0} cy={-150} r={56} fill={C.navy} />
        <circle cx={0} cy={-150} r={28} fill={C.blue} opacity={0.7} />
        <circle cx={-18} cy={-170} r={14} fill={C.white} opacity={0.55} />
        {/* film window under the lens */}
        <rect x={-70} y={-62} width={140} height={34} rx={8} fill={C.ink} />
        <rect x={-58} y={-54} width={116} height={18} rx={4} fill={C.greyDark} opacity={0.6} />
      </g>
    </g>
  );
}
