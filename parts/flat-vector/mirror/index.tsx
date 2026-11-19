import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Oval wall mirror with a thick frame and a light reflection streak. Wall item: centred on (x, y).
// anim "shine": a soft glint slides across the glass.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 760;
  const frame = p.color && p.color !== "none" ? p.color : C.brown;
  const anim: string = p.anim ?? "none";
  const t = ((f % 90) / 90);
  const glint = anim === "shine" ? Math.sin(Math.PI * t) * 0.7 : 0;
  const move = anim === "shine" ? -130 + 260 * t : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={8} cy={10} rx={240} ry={320} fill={shade(frame, 0.25)} />
        <ellipse cx={0} cy={0} rx={240} ry={320} fill={frame} />
        <ellipse cx={0} cy={0} rx={200} ry={280} fill={C.sky} />
        <path d="M -198 30 C -190 150 -110 275 0 280 C 110 275 190 150 198 30 Z" fill={C.skyDeep} opacity={0.45} />
        <ellipse cx={-70} cy={-120} rx={90} ry={70} fill={C.white} opacity={0.35} />
        <g transform={`translate(${f1(move)} 0)`} opacity={glint}>
          <rect x={-150} y={-190} width={44} height={300} rx={22} fill={C.white} transform="rotate(24 -128 -40)" />
          <rect x={-100} y={-170} width={16} height={230} rx={8} fill={C.white} transform="rotate(24 -92 -55)" />
        </g>
        {anim !== "shine" && (
          <g>
            <rect x={-150} y={-190} width={44} height={300} rx={22} fill={C.white} opacity={0.45} transform="rotate(24 -128 -40)" />
            <rect x={-100} y={-170} width={16} height={230} rx={8} fill={C.white} opacity={0.3} transform="rotate(24 -92 -55)" />
          </g>
        )}
      </g>
    </g>
  );
}
