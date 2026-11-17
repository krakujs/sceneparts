import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import Horse from "../horse/index";

// Two-wheeled farm cart with a hay bed and shafts in front. With animal = true a flat-vector horse stands in the
// shafts, pulling the cart. Origin = floor centre of the whole group; the wheel and the hooves stand on y.
// About 980 px wide and 420 px tall at s = 1 (horse scaled to 0.65 to fit). anim "drive": wheel turns, cart bounces, horse walks.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const OFFSET = -288; // centres the whole group on x

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const paint = p.color && p.color !== "none" ? p.color : C.red;
  const wheelCol = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 6 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -3 : 0;
  const withHorse = p.animal !== false;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={OFFSET} cy={0} rx={520} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(${OFFSET} ${f1(bounce)})`}>
          {/* hay bed, shafts */}
          <path d="M -170 -340 Q -120 -392 -60 -352 Q -10 -404 50 -356 Q 110 -398 160 -344 L 160 -340 Z" fill={C.sand} />
          <rect x={-200} y={-340} width={400} height={110} rx={8} fill={paint} />
          <rect x={-208} y={-352} width={416} height={24} rx={8} fill={shade(paint, 0.2)} />
          <rect x={-180} y={-300} width={360} height={12} rx={6} fill={shade(paint, 0.25)} />
          <rect x={190} y={-236} width={140} height={22} rx={11} fill={C.brownDark} />
          {/* the wheel */}
          <circle cx={0} cy={-170} r={170} fill={wheelCol} />
          <circle cx={0} cy={-170} r={146} fill={shade(wheelCol, 0.12)} />
          <g transform={`rotate(${f1(spin)} 0 -170)`}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
              <rect key={k} x={-7} y={-316} width={14} height={292} rx={5} fill={shade(wheelCol, 0.3)} transform={`rotate(${k * 22.5} 0 -170)`} />
            ))}
          </g>
          <circle cx={0} cy={-170} r={22} fill={C.ink} />
          {/* the horse in the shafts (drawn last, in front) */}
          {withHorse && (
            <g transform="translate(502 0) scale(0.65)">
              <Horse f={f} d={p.d} t={p.t} style={p.style} render={p.render} x={0} y={0} s={1} pose={driving ? "walk" : "stand"} />
            </g>
          )}
        </g>
      </g>
    </g>
  );
}
