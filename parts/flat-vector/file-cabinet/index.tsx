import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Three-drawer metal filing cabinet, floor item (1 m is about 560 px; this is about 1.3 m tall).
// anim "open": the top drawer slides out toward the viewer over 40 frames, showing files inside.
// Origin = bottom centre (the feet stand on y).
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

const DRAWER_TOPS = [-700, -472, -244];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const metal = p.color && p.color !== "none" ? p.color : C.grey;
  const anim: string = p.anim ?? "none";
  const t = anim === "open" ? Math.min(1, f / 40) : 0;
  const e = 1 - (1 - t) ** 3;
  const slide = e * 50;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* feet */}
        <rect x={-130} y={-22} width={44} height={22} rx={6} fill={C.greyDark} />
        <rect x={86} y={-22} width={44} height={22} rx={6} fill={C.greyDark} />
        {/* cabinet body and top plate */}
        <rect x={-145} y={-722} width={290} height={708} rx={12} fill={metal} />
        <rect x={-150} y={-730} width={300} height={22} rx={8} fill={shade(metal, 0.2)} />
        {/* drawer recesses (show when the top drawer slides out) */}
        {DRAWER_TOPS.map((top, i) => (
          <rect key={`r${i}`} x={-128} y={top} width={256} height={212} rx={8} fill={shade(metal, 0.5)} />
        ))}
        {/* files inside the top drawer, rising above it */}
        <g transform={`translate(0 ${f1(slide)}) translate(0 -594) scale(${f1(1 + 0.02 * e)}) translate(0 594)`}>
          <rect x={-100} y={-760} width={96} height={80} rx={6} fill={C.white} />
          <rect x={-20} y={-748} width={96} height={68} rx={6} fill={C.paper} />
          <rect x={-88} y={-742} width={70} height={8} rx={4} fill={C.grey} />
          <rect x={-8} y={-734} width={70} height={8} rx={4} fill={C.grey} />
          <rect x={-128} y={-700} width={256} height={212} rx={8} fill={C.greyLight} />
          <rect x={-128} y={-504} width={256} height={16} rx={8} fill={shade(C.greyLight, 0.12)} />
          <rect x={-46} y={-670} width={92} height={14} rx={7} fill={C.greyDark} />
          <rect x={-60} y={-632} width={120} height={40} rx={6} fill={C.white} />
        </g>
        {/* middle and bottom drawers */}
        {[1, 2].map((i) => {
          const top = DRAWER_TOPS[i];
          return (
            <g key={i}>
              <rect x={-128} y={top} width={256} height={212} rx={8} fill={C.greyLight} />
              <rect x={-128} y={top + 196} width={256} height={16} rx={8} fill={shade(C.greyLight, 0.12)} />
              <rect x={-46} y={top + 30} width={92} height={14} rx={7} fill={C.greyDark} />
              <rect x={-60} y={top + 62} width={120} height={40} rx={6} fill={C.white} />
            </g>
          );
        })}
      </g>
    </g>
  );
}
