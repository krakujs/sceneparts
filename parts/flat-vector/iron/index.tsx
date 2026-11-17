import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Clothes iron, side view: a grey soleplate with a turned-up nose, a rounded body and a handle over the top.
// steam = true adds rising steam puffs from the nose. anim "press" nudges it forward as if ironing.
// Origin = bottom centre (the sole rests on y), hero size.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.blue;
  const dk = shade(c, 0.22);
  const steam = p.steam === true;
  const pressX = p.anim === "press" ? Math.max(0, Math.sin((f * 2 * Math.PI) / 50)) * 14 : 0;

  const puffs = [0, 1, 2].map((i) => {
    const t = ((f * 2 + i * 30) % 90) / 90;
    return { cx: 120 + i * 22 - t * 10, cy: -190 - t * 130, r: 16 + t * 20, o: (1 - t) * 0.9 };
  });

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={185} ry={10} fill={C.shadow} />
      <g transform={`translate(${f1(pressX)} 0)`}>
        <g transform={motion(p.anim === "press" ? "none" : (p.anim ?? "none"), f)}>
          {steam && (
            <g>
              {puffs.map((pf, i) => (
                <circle key={i} cx={f1(pf.cx)} cy={f1(pf.cy)} r={f1(pf.r)} fill={C.white} opacity={f1(pf.o)} />
              ))}
            </g>
          )}
          {/* handle */}
          <path d="M -120 -150 C -130 -214 10 -220 16 -150" fill="none" stroke={dk} strokeWidth={22} strokeLinecap="round" />
          {/* body: flat top sloping down to the nose */}
          <path d="M -160 -14 L -160 -116 Q -160 -140 -136 -140 L 30 -140 L 176 -40 L 176 -14 Z" fill={c} />
          <path d="M -160 -44 L 176 -44 L 176 -14 L -160 -14 Z" fill={dk} />
          {/* thermostat dial */}
          <circle cx={-20} cy={-96} r={16} fill={C.white} />
          <rect x={-22} y={-106} width={4} height={12} rx={2} fill={C.ink} />
          {/* soleplate */}
          <path d="M -172 -14 L 120 -14 Q 178 -14 178 -2 L 178 0 L -172 0 Z" fill={C.greyDark} />
          <rect x={-150} y={-10} width={260} height={4} rx={2} fill={C.greyLight} opacity={0.6} />
        </g>
      </g>
    </g>
  );
}
