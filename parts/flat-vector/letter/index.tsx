import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Single handwritten-look letter sheet: grey wavy lines stand in for writing (no words), a slight curl at the
// bottom corner. anim "float": the sheet drifts up and down with a small tilt. Origin = bottom centre.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

// A wavy handwriting-style line of length len starting at (x0, y).
const wave = (x0: number, y: number, len: number) => {
  let d = `M ${x0} ${y} q 14 -10 28 0`;
  for (let x = 28; x < len; x += 28) d += " t 28 0";
  return d;
};

const LINES: Array<[number, number]> = [[-510, 320], [-460, 300], [-410, 320], [-360, 270], [-310, 320], [-260, 300], [-210, 230]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const sheet = p.color && p.color !== "none" ? p.color : C.white;
  const ink = p.color2 && p.color2 !== "none" ? p.color2 : C.grey;
  const anim: string = p.anim ?? "none";
  const a = (Math.sin((f * 2 * Math.PI) / 90));
  const float = anim === "float" ? `translate(0 ${f1(a * 10)}) rotate(${f1((Math.sin((f * 2 * Math.PI) / 90 + 1)) * 2)})` : motion(anim, f);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={12} fill={C.shadow} />
      <g transform={float}>
        <rect x={-190} y={-600} width={380} height={600} rx={10} fill={sheet} />
        {/* corner fold and the curl along the bottom */}
        <path d="M 190 -110 L 110 0 L 190 0 Z" fill={shade(sheet, 0.15)} />
        <path d="M -190 -22 Q 0 -44 190 -22" stroke={shade(sheet, 0.15)} strokeWidth={8} fill="none" strokeLinecap="round" />
        {/* handwriting-style lines */}
        {LINES.map(([ly, len], i) => (
          <path key={i} d={wave(-170, ly, len)} stroke={ink} strokeWidth={8} strokeLinecap="round" fill="none" />
        ))}
      </g>
    </g>
  );
}
