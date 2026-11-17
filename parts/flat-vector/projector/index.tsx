import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Projector: small box projector on a stand with its lens throwing a light cone. Origin = bottom centre.
// anim "glow": the lens and light cone brighten and dim softly.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.greyDark;
  const anim: string = p.anim ?? "none";
  const glow = anim === "glow";
  const breathe = (Math.sin((f * 2 * Math.PI) / 50) + 1) / 2;
  const beam = glow ? 0.12 + 0.14 * breathe : 0.12;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={12} fill={C.shadow} />
      <g transform={motion(anim === "glow" ? "none" : anim, f)}>
        {/* light cone from the lens to the right */}
        <path d="M 150 -250 L 560 -420 L 560 -40 L 150 -170 Z" fill={C.yellow} opacity={beam} />
        <path d="M 150 -230 L 520 -360 L 520 -110 L 150 -190 Z" fill={C.yellow} opacity={beam + 0.06} />
        {/* stand */}
        <path d="M -20 -90 L -60 0 L 50 0 L 10 -90 Z" fill={C.greyDark} />
        <rect x={-110} y={-20} width={220} height={20} rx={8} fill={C.inkSoft} />
        {/* projector body */}
        <rect x={-150} y={-240} width={300} height={160} rx={30} fill={body} />
        <rect x={-150} y={-100} width={300} height={20} rx={10} fill={shade(body, 0.3)} />
        <path d="M -120 -220 Q -40 -240 60 -222" fill="none" stroke={C.white} strokeWidth={9} strokeLinecap="round" opacity={0.25} />
        {/* lens housing and lens */}
        <rect x={130} y={-220} width={40} height={120} rx={12} fill={shade(body, 0.2)} />
        <ellipse cx={150} cy={-160} rx={26} ry={34} fill={C.inkSoft} />
        <ellipse cx={150} cy={-160} rx={16} ry={22} fill={glow ? C.skyDeep : C.blue} />
        <circle cx={144} cy={-168} r={5} fill={C.white} opacity={0.7} />
        {/* vents and buttons */}
        {[0, 1, 2].map((i) => <rect key={i} x={-120} y={-200 + i * 22} width={100} height={8} rx={4} fill={shade(body, 0.3)} />)}
        <circle cx={-40} cy={-130} r={10} fill={C.green} />
        <rect x={-10} y={-138} width={50} height={16} rx={8} fill={C.greyLight} />
      </g>
    </g>
  );
}
