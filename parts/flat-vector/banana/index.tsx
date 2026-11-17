/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Flat vector banana: one fat crescent banana, or a bunch of up to three joined at a shared brown stem (top left).
// Origin = resting point (bottom centre), honours flip. A bunch of three is about 420 px wide at s = 1.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 5)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(f / 20))})`;
  return "";
};
const rad = (a: number) => (a * Math.PI) / 180;

// Local banana: tips at (-150,-170) (shared stem end, top left) and (150,-170); belly touches y = 0.
// Body is fat: 75 px thick in the middle. The darker band is the lower ridge.
const PIVOT = [-150, -170];
const BODY = "M -150 -170 Q 0 170 150 -170 Q 0 20 -150 -170 Z";
const RIDGE = "M -150 -170 Q 0 170 150 -170 Q 0 80 -150 -170 Z";
const K = 1.3; // overall size: a bunch of three is about 420 px wide

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const anim: string = p.anim ?? "none";
  const n = Math.max(1, Math.min(3, Math.round(p.count ?? 3)));
  const angs = n === 1 ? [0] : n === 2 ? [-7, 7] : [-12, 0, 12];
  // lowest belly point after fanning about the shared stem end
  const low = Math.max(...angs.map((a) => -170 + 150 * Math.sin(rad(a)) + 170 * Math.cos(rad(a))));
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={n === 1 ? 170 : 215} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f) || undefined}>
        <g transform={`translate(0 ${f1(-low * K)}) scale(${K})`}>
          {angs.map((a, i) => (
            <g key={i} transform={`rotate(${f1(a)} ${PIVOT[0]} ${PIVOT[1]})`}>
              <path d={BODY} fill={C.yellow} />
              <path d={RIDGE} fill={C.yellowDark} />
              <path d="M -70 -66 Q 0 -60 70 -66" stroke="#FFFFFF" strokeWidth={9} strokeLinecap="round" fill="none" opacity={0.5} />
              <ellipse cx={148} cy={-168} rx={12} ry={9} fill={C.brownDark} transform="rotate(-70 148 -168)" />
            </g>
          ))}
          <path d="M -150 -170 Q -164 -188 -182 -206" stroke={C.brown} strokeWidth={16} strokeLinecap="round" fill="none" />
          <ellipse cx={-151} cy={-170} rx={12} ry={10} fill={C.brownDark} />
        </g>
      </g>
    </g>
  );
}
