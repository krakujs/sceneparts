import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Towel. variant "folded": a neat stack of three folded towels; "hanging": one towel draped over a freestanding rail.
// Origin = bottom centre; hero size.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.teal;
  const hanging = p.variant === "hanging";
  const folded = (
    <g>
      {[
        { y0: -92, w: 360, col: c },
        { y0: -176, w: 340, col: shade(c, -0.1) },
        { y0: -260, w: 320, col: c },
      ].map((t, i) => (
        <g key={i}>
          <rect x={-t.w / 2} y={t.y0} width={t.w} height={84} rx={18} fill={t.col} />
          <rect x={-t.w / 2} y={t.y0 + 70} width={t.w} height={14} rx={7} fill={shade(t.col, 0.2)} />
        </g>
      ))}
    </g>
  );
  const draped = (
    <g>
      {/* two upright feet and the rail */}
      <rect x={-196} y={-30} width={392} height={30} rx={15} fill={C.inkSoft} />
      <rect x={-198} y={-600} width={20} height={580} rx={8} fill={C.greyDark} />
      <rect x={178} y={-600} width={20} height={580} rx={8} fill={C.greyDark} />
      {/* towel hangs down from the rail, slightly off-centre */}
      <rect x={-112} y={-600} width={224} height={340} rx={18} fill={c} />
      <rect x={-112} y={-300} width={224} height={40} rx={12} fill={shade(c, 0.2)} />
      <rect x={-96} y={-560} width={36} height={300} rx={10} fill={C.white} opacity={0.18} />
      <rect x={-200} y={-620} width={400} height={24} rx={12} fill={C.greyLight} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={hanging ? 210 : 190} ry={12} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>{hanging ? draped : folded}</g>
    </g>
  );
}
