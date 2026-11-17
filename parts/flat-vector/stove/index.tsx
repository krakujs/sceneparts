import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Freestanding cooker: four burners on a dark top, a control strip with knobs, an oven door with a window
// and a storage drawer below. anim "flame" lights blue flames on the burners. Origin = bottom centre.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.2)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const BURNERS = [-126, -42, 42, 126];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.greyLight;
  const dk = shade(c, 0.15);
  const flame = (p.anim ?? "none") === "flame";

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* body and side shade */}
        <rect x={-180} y={-500} width={360} height={480} rx={14} fill={c} />
        <rect x={150} y={-500} width={30} height={480} rx={12} fill={dk} />
        {/* feet */}
        <rect x={-170} y={-22} width={44} height={22} rx={6} fill={C.greyDark} />
        <rect x={126} y={-22} width={44} height={22} rx={6} fill={C.greyDark} />

        {/* cooktop */}
        <rect x={-186} y={-540} width={372} height={42} rx={12} fill={C.inkSoft} />
        {BURNERS.map((bx, i) => (
          <g key={bx}>
            {flame && (
              <g transform={`translate(${bx} -534) scale(1 ${f1(0.85 + 0.25 * Math.sin((f * 2 * Math.PI) / 14 + i * 1.7))})`}>
                <path d="M -15 0 Q -20 -28 0 -50 Q 20 -28 15 0 Z" fill={C.blue} />
                <path d="M -7 0 Q -9 -14 0 -26 Q 9 -14 7 0 Z" fill={C.skyDeep} />
              </g>
            )}
            <ellipse cx={bx} cy={-520} rx={34} ry={11} fill={C.greyDark} />
            <ellipse cx={bx} cy={-520} rx={22} ry={7} fill={C.ink} />
          </g>
        ))}

        {/* control strip with four knobs */}
        <rect x={-180} y={-498} width={360} height={44} rx={8} fill={dk} />
        {BURNERS.map((bx) => (
          <g key={`k${bx}`}>
            <circle cx={bx} cy={-476} r={16} fill={C.greyDark} />
            <rect x={bx - 2} y={-487} width={4} height={10} rx={2} fill={C.white} />
          </g>
        ))}

        {/* oven door with window and handle */}
        <rect x={-150} y={-440} width={300} height={260} rx={14} fill={dk} />
        <rect x={-130} y={-424} width={260} height={12} rx={6} fill={C.greyDark} />
        <rect x={-120} y={-400} width={240} height={170} rx={12} fill={C.navy} />
        <rect x={-100} y={-386} width={56} height={140} rx={8} fill={C.white} opacity={0.15} />
        <rect x={-30} y={-386} width={20} height={140} rx={8} fill={C.white} opacity={0.08} />

        {/* storage drawer */}
        <rect x={-150} y={-160} width={300} height={130} rx={12} fill={dk} />
        <rect x={-110} y={-118} width={220} height={12} rx={6} fill={C.greyDark} />
      </g>
    </g>
  );
}
