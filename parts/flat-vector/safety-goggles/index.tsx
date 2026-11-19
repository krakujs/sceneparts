import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Clear-lens safety goggles seen from the front, with a wide strap running behind the frame.
// Origin = floor centre under the bottom of the frame. Hero size: about 600 px wide at s = 1 including the strap; frame about 400 px wide.
// anim "shine": a glint sweeps across the left lens.
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
  const frame = p.color && p.color !== "none" ? p.color : C.blue;
  const strap = p.color2 && p.color2 !== "none" ? p.color2 : C.inkSoft;
  const anim: string = p.anim ?? "none";
  const gx = -160 + ((f * 2) % 120);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={290} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-300} y={-120} width={600} height={26} rx={13} fill={strap} />
        <rect x={-220} y={-130} width={40} height={90} rx={20} fill={shade(frame, 0.2)} />
        <rect x={180} y={-130} width={40} height={90} rx={20} fill={shade(frame, 0.2)} />
        <rect x={-200} y={-170} width={400} height={170} rx={70} fill={frame} />
        <rect x={-170} y={-150} width={150} height={110} rx={40} fill={C.skyDeep} opacity={0.7} />
        <rect x={20} y={-150} width={150} height={110} rx={40} fill={C.skyDeep} opacity={0.7} />
        <rect x={-150} y={-140} width={24} height={90} rx={10} fill={C.white} opacity={0.45} />
        <rect x={40} y={-140} width={24} height={90} rx={10} fill={C.white} opacity={0.45} />
        {anim === "shine" && <rect x={gx} y={-140} width={14} height={90} rx={7} fill={C.white} opacity={0.6} />}
        <rect x={-30} y={-140} width={60} height={40} rx={14} fill={shade(frame, 0.1)} />
        <rect x={-60} y={-162} width={120} height={12} rx={6} fill={shade(frame, 0.3)} />
      </g>
    </g>
  );
}
