import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Welding helmet seen from the front, standing on the floor: dark shell, large visor window, side knobs and chin vents.
// Origin = floor centre under the bottom of the shell. Hero size: about 380 px wide and 380 px tall at s = 1.
// anim "flash": the visor flashes bright, as when an arc strikes.
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
  const shell = p.color && p.color !== "none" ? p.color : "#2B2F3A";
  const lens = p.color2 && p.color2 !== "none" ? p.color2 : C.lime;
  const anim: string = p.anim ?? "none";
  const flashOn = anim === "flash" && Math.floor(f / 6) % 2 === 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-170} y={-340} width={340} height={340} rx={70} fill={shell} />
        <rect x={-190} y={-380} width={380} height={60} rx={26} fill={shade(shell, 0.2)} />
        <rect x={-200} y={-232} width={30} height={70} rx={10} fill={C.greyDark} />
        <rect x={170} y={-232} width={30} height={70} rx={10} fill={C.greyDark} />
        <rect x={-130} y={-300} width={260} height={140} rx={24} fill={shade(shell, 0.35)} />
        <rect x={-120} y={-290} width={240} height={120} rx={20} fill={flashOn ? C.white : lens} />
        <polygon points="-96,-280 -72,-280 -110,-190 -118,-190" fill={C.white} opacity={0.4} />
        <polygon points="-56,-280 -40,-280 -78,-190 -92,-190" fill={C.white} opacity={0.25} />
        <rect x={-90} y={-60} width={180} height={14} rx={7} fill={shade(shell, 0.4)} />
        <rect x={-70} y={-34} width={140} height={12} rx={6} fill={shade(shell, 0.4)} />
      </g>
    </g>
  );
}
