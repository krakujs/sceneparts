import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

const f1 = (v: number) => v.toFixed(1);
const popS = (f: number, d = 0) => { const t = Math.min(1, Math.max(0, (f - d) / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};
const col = (v: unknown, d: string) => (typeof v === "string" && v && v !== "none" ? v : d);

// Flat, square-ended garden spade standing upright as if pushed into the ground: D-grip on top, wooden shaft,
// steel blade with a foot tread. Origin = ground centre under the blade. Hero size: about 520 px tall at s = 1.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const steel = col(p.color, C.grey), wood = col(p.color2, C.brown);
  const anim: string = p.anim ?? "none";
  const dig = anim === "dig" ? `translate(0 ${f1(Math.max(0, Math.sin((f * 2 * Math.PI) / 45)) * -40)})` : motion(anim, f);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={130} ry={12} fill={C.shadow} />
      <g transform={dig}>
        <path fillRule="evenodd" d="M-62,-530 h124 a26,26 0 0 1 26,26 v38 a26,26 0 0 1 -26,26 h-124 a26,26 0 0 1 -26,-26 v-38 a26,26 0 0 1 26,-26 Z M-40,-510 v34 h80 v-34 Z" fill={wood} />
        <rect x={-16} y={-450} width={32} height={260} rx={10} fill={wood} />
        <rect x={4} y={-450} width={12} height={260} rx={6} fill={shade(wood, 0.2)} />
        <path d="M-22,-236 L22,-236 L46,-186 L-46,-186 Z" fill={shade(steel, 0.2)} />
        <rect x={-86} y={-196} width={172} height={22} rx={8} fill={shade(steel, 0.3)} />
        <path d="M-78,-176 L78,-176 L74,-8 Q0,6 -74,-8 Z" fill={steel} />
        <rect x={-60} y={-160} width={18} height={130} rx={8} fill={C.white} opacity={0.3} />
      </g>
    </g>
  );
}
