import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Retractable tape measure lying on the floor, with a length of tape pulled out to the right and a hook at the end.
// Origin = floor centre under the case. Hero size: about 430 px across at s = 1.
// anim "spin": the reel turns as if the tape is being wound.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.red;
  const tape = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const spin = anim === "spin" ? (f * 4) % 360 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={150} cy={0} rx={290} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={60} y={-150} width={330} height={40} rx={6} fill={tape} />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect key={i} x={112 + i * 36} y={-150} width={8} height={i % 2 === 0 ? 24 : 14} fill={C.ink} />
        ))}
        <rect x={380} y={-158} width={30} height={12} rx={5} fill={C.greyDark} />
        <rect x={380} y={-158} width={12} height={58} rx={5} fill={C.greyDark} />
        <circle cx={0} cy={-120} r={120} fill={shade(body, 0.22)} />
        <circle cx={0} cy={-120} r={100} fill={body} />
        <rect x={104} y={-152} width={24} height={44} rx={6} fill={shade(body, 0.45)} />
        <circle cx={0} cy={-120} r={56} fill={C.greyDark} />
        {[0, 120, 240].map((a) => (
          <rect key={a} x={-12} y={-176} width={24} height={60} rx={6} fill={C.greyLight} transform={`rotate(${spin + a} 0 -120)`} />
        ))}
        <circle cx={0} cy={-120} r={20} fill={C.greyLight} />
      </g>
    </g>
  );
}
