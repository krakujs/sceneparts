import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Bed, side view: tall headboard on the left, low footboard on the right, mattress, pillow(s) and a blanket
// folded over the front. variant single is narrower than double. Origin = bottom centre.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const frame = p.color && p.color !== "none" ? p.color : C.brown;
  const blanket = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const dk = shade(frame, 0.2);
  const double = p.variant === "double";
  const L = double ? -420 : -330; // left end of the bed (headboard side)
  const R = double ? 420 : 330;   // right end
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={R + 60} ry={16} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* legs */}
        <rect x={L + 20} y={-60} width={34} height={60} rx={10} fill={dk} />
        <rect x={R - 54} y={-60} width={34} height={60} rx={10} fill={dk} />
        {/* headboard, tall, on the left */}
        <rect x={L} y={-560} width={64} height={520} rx={22} fill={frame} />
        <rect x={L + 64} y={-560} width={0} height={0} fill="none" />
        {/* frame base */}
        <rect x={L + 40} y={-200} width={R - L - 40} height={150} rx={22} fill={dk} />
        {/* mattress */}
        <rect x={L + 40} y={-300} width={R - L - 60} height={110} rx={34} fill="#FFFFFF" />
        <rect x={L + 40} y={-300} width={R - L - 60} height={24} rx={12} fill="#FFFFFF" opacity={0.6} />
        {/* pillow(s) */}
        <rect x={L + 80} y={-360} width={double ? 150 : 170} height={70} rx={34} fill="#FFFFFF" />
        {double && <rect x={L + 250} y={-360} width={150} height={70} rx={34} fill="#F4F1EA" />}
        {/* blanket draped over the front */}
        <path d={`M ${L + 200} -300 L ${R - 30} -300 Q ${R} -300 ${R} -270 L ${R} -210 Q ${R} -190 ${R - 20} -190 L ${L + 200} -190 Z`} fill={blanket} />
        <rect x={L + 200} y={-300} width={R - L - 230} height={14} rx={7} fill="#FFFFFF" opacity={0.18} />
        {/* footboard */}
        <rect x={R - 30} y={-270} width={30} height={110} rx={12} fill={frame} />
      </g>
    </g>
  );
}
