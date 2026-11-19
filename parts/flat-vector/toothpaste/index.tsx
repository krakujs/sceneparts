import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Squeezed toothpaste tube lying on its side: a tapered body pinched a little in the middle, a flat crimped end
// on the left, a cap on the right and an optional blob of paste at the cap (paste = true, the default). No text.
// Origin = bottom centre; hero size. anim "squeeze" pulses the tube as if being squeezed.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "squeeze") { const k = (1 + Math.sin((f * 2 * Math.PI) / 50)) / 2; return `scale(${f1(1 + 0.03 * k)} ${f1(1 - 0.05 * k)})`; }
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.blue;
  const cap = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const paste = p.paste !== false;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={290} ry={12} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* paste blob at the cap opening, drawn before the cap so the cap sits in front */}
        {paste && (
          <g>
            <ellipse cx={240} cy={-94} rx={22} ry={20} fill={C.white} />
            <ellipse cx={262} cy={-90} rx={13} ry={12} fill={C.white} />
            <ellipse cx={240} cy={-78} rx={22} ry={6} fill={shade(C.white, 0.15)} />
          </g>
        )}
        {/* tapered body, pinched slightly in the middle */}
        <path d="M -200 -182 Q -40 -140 110 -142 Q 120 -140 120 -130 L 120 -60 Q 120 -50 110 -48 Q -40 -36 -200 -10 Z" fill={c} />
        <path d="M -180 -166 Q -40 -134 100 -134" stroke={C.white} strokeWidth={8} strokeLinecap="round" fill="none" opacity={0.3} />
        {/* flat crimped end on the left, with seam lines */}
        <rect x={-262} y={-188} width={70} height={180} rx={12} fill={shade(c, 0.2)} />
        {[-248, -234, -220].map((sx) => (
          <path key={sx} d={`M ${sx} -170 L ${sx} -20`} stroke={shade(c, 0.4)} strokeWidth={4} strokeLinecap="round" fill="none" />
        ))}
        {/* neck and cap on the right */}
        <rect x={110} y={-118} width={42} height={48} rx={8} fill={shade(c, 0.2)} />
        <rect x={146} y={-136} width={74} height={84} rx={16} fill={cap} />
        <rect x={194} y={-136} width={26} height={84} rx={12} fill={shade(cap, 0.15)} />
        {[160, 172, 184].map((rx) => (
          <path key={rx} d={`M ${rx} -128 L ${rx} -60`} stroke={shade(cap, 0.12)} strokeWidth={4} strokeLinecap="round" fill="none" />
        ))}
      </g>
    </g>
  );
}
