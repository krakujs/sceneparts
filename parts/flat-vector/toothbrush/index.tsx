import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Toothbrush standing upright: coloured handle, white bristle head, optional mint toothpaste blob (paste = true).
// Origin = bottom of the handle; hero size. anim "brush" rocks the brush from its base, as if brushing.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "brush") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 24) * 6)})`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.blue;
  const paste = p.paste === true;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={90} ry={10} fill={C.shadow} />
      <g transform={`${motion(p.anim ?? "none", f)} translate(0 0)`}>
        {/* handle with a darker right edge */}
        <rect x={-28} y={-300} width={56} height={300} rx={26} fill={c} />
        <rect x={12} y={-290} width={12} height={280} rx={6} fill={shade(c, 0.2)} />
        {/* neck and colour band under the bristles */}
        <rect x={-22} y={-362} width={44} height={70} rx={8} fill={shade(c, 0.2)} />
        {/* bristle head: white block with fine strands */}
        <rect x={-46} y={-450} width={92} height={96} rx={22} fill={C.white} />
        {[-28, -14, 0, 14, 28].map((bx) => (
          <path key={bx} d={`M ${bx} -440 L ${bx} -368`} stroke={C.skyDeep} strokeWidth={4} strokeLinecap="round" fill="none" />
        ))}
        <rect x={-46} y={-372} width={92} height={18} rx={7} fill={c} />
        {paste && (
          <g>
            <ellipse cx={0} cy={-470} rx={50} ry={34} fill={C.sky} />
            <ellipse cx={-14} cy={-484} rx={22} ry={14} fill={C.white} opacity={0.8} />
            <ellipse cx={18} cy={-456} rx={14} ry={8} fill={shade(C.sky, 0.15)} />
          </g>
        )}
      </g>
    </g>
  );
}
