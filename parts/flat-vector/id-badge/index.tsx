import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// ID badge on a lanyard: a plastic card holder with a generic person silhouette and grey lines (no text or logo).
// anim "swing": the badge swings gently from the top of the lanyard. Origin = bottom centre of the card.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

const PIVOT = -900;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const band = p.color && p.color !== "none" ? p.color : C.blue;
  const strap = p.color2 && p.color2 !== "none" ? p.color2 : shade(C.blue, 0.1);
  const anim: string = p.anim ?? "none";
  const swing = anim === "swing" ? Math.sin((f * 2 * Math.PI) / 80) * 9 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={10} fill={C.shadow} />
      <g transform={`${motion(anim, f)} rotate(${f1(swing)} 0 ${PIVOT})`}>
        {/* lanyard: a loop strap whose two sides meet at a clip above the card */}
        <path d="M -16 -404 L -120 -900 L -60 -900 L 16 -404 Z" fill={shade(strap, 0.2)} />
        <path d="M 16 -404 L 120 -900 L 60 -900 L -16 -404 Z" fill={strap} />
        <path d="M 30 -470 L 104 -860 L 88 -860 L 22 -470 Z" fill={C.white} opacity={0.2} />
        <rect x={-22} y={-416} width={44} height={30} rx={8} fill={C.grey} />
        {/* card holder */}
        <rect x={-150} y={-400} width={300} height={400} rx={18} fill={shade(C.white, 0.12)} />
        <rect x={-146} y={-396} width={292} height={392} rx={16} fill={C.white} />
        <rect x={-150} y={-400} width={300} height={84} rx={18} fill={band} />
        <rect x={-150} y={-340} width={300} height={28} fill={band} />
        <rect x={-34} y={-386} width={68} height={16} rx={8} fill={shade(band, 0.35)} />
        {/* generic silhouette avatar */}
        <circle cx={0} cy={-268} r={52} fill={C.grey} />
        <path d="M -100 -120 Q -100 -200 0 -200 Q 100 -200 100 -120 Z" fill={C.grey} />
        {/* grey lines */}
        <rect x={-90} y={-92} width={180} height={16} rx={8} fill={C.greyDark} />
        <rect x={-60} y={-62} width={120} height={12} rx={6} fill={C.greyLight} />
      </g>
    </g>
  );
}
