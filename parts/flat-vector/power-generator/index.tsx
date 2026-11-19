import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Portable petrol generator on wheels: framed engine housing, fuel tank, exhaust, a fan, sockets and a dial.
// Origin = bottom centre (the floor line). Room scale: at s = 1 about 520 px wide and 530 px tall. Use s about 0.6–0.8 for a yard or site scene.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 4)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.orange;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const fan = anim === "spin" ? `rotate(${f1((f * 8) % 360)} -120 -270)` : "";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={300} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* wheels and chassis */}
        <circle cx={-170} cy={-50} r={48} fill={C.ink} />
        <circle cx={170} cy={-50} r={48} fill={C.ink} />
        <circle cx={-170} cy={-50} r={18} fill={C.greyLight} />
        <circle cx={170} cy={-50} r={18} fill={C.greyLight} />
        <rect x={-250} y={-90} width={500} height={40} rx={10} fill={frame} />
        {/* exhaust and fuel tank behind the housing */}
        <rect x={-204} y={-530} width={52} height={18} rx={6} fill={frame} />
        <rect x={-196} y={-520} width={36} height={100} fill={frame} />
        <rect x={-150} y={-480} width={260} height={56} rx={24} fill={frame} />
        {/* engine housing with frame */}
        <rect x={-240} y={-430} width={480} height={340} rx={26} fill={body} />
        <rect x={-240} y={-120} width={480} height={30} fill={shade(body, 0.25)} />
        <rect x={-258} y={-438} width={516} height={356} rx={30} fill="none" stroke={frame} strokeWidth={18} />
        {/* fan grille */}
        <circle cx={-120} cy={-270} r={95} fill={C.ink} />
        <g transform={fan}>
          <rect x={-130} y={-340} width={20} height={140} rx={8} fill={C.greyDark} />
          <rect x={-190} y={-280} width={140} height={20} rx={8} fill={C.greyDark} />
        </g>
        <circle cx={-120} cy={-270} r={18} fill={C.greyLight} />
        {/* control panel with sockets and dial */}
        <rect x={20} y={-400} width={200} height={280} rx={16} fill={shade(body, 0.25)} />
        {[-370, -270].map((oy) => (
          <g key={oy}>
            <rect x={40} y={oy} width={76} height={76} rx={12} fill={C.ink} />
            <circle cx={66} cy={oy + 30} r={8} fill={C.greyLight} />
            <circle cx={90} cy={oy + 30} r={8} fill={C.greyLight} />
            <circle cx={78} cy={oy + 52} r={8} fill={C.greyLight} />
          </g>
        ))}
        <circle cx={170} cy={-330} r={36} fill={C.white} />
        <line x1={170} y1={-330} x2={188} y2={-350} stroke={C.red} strokeWidth={6} strokeLinecap="round" />
        <circle cx={170} cy={-230} r={16} fill={C.green} />
      </g>
    </g>
  );
}
