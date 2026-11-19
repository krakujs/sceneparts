import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Cup set: three matching empty cups on white saucers in a row (a tea set without a teapot).
// Origin = bottom centre (resting point). Honours flip, s and anim.
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

const SAUCER = C.white;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.teal;
  const dk = shade(c, 0.2);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {[-150, 0, 150].map((cx, i) => (
          <g key={i} transform={`translate(${cx} -18)`}>
            {/* saucer: edge, top, and the well */}
            <ellipse cx={0} cy={-2} rx={72} ry={16} fill={shade(SAUCER, 0.15)} />
            <ellipse cx={0} cy={-10} rx={72} ry={16} fill={SAUCER} />
            <ellipse cx={0} cy={-10} rx={46} ry={10} fill={shade(SAUCER, 0.07)} />
            {/* handle, behind the cup */}
            <path d="M 44 -96 Q 84 -96 84 -68 Q 84 -42 42 -40" fill="none" stroke={dk} strokeWidth={14} strokeLinecap="round" />
            {/* cup body */}
            <path d="M -54 -112 L -46 -32 Q -44 -10 -20 -10 L 20 -10 Q 44 -10 46 -32 L 54 -112 Z" fill={c} />
            <path d="M 22 -108 L 54 -108 L 46 -32 Q 44 -10 20 -10 L 12 -10 Q 36 -16 38 -40 Z" fill={dk} />
            {/* rim and inside */}
            <ellipse cx={0} cy={-112} rx={54} ry={13} fill={shade(c, -0.15)} />
            <ellipse cx={0} cy={-112} rx={44} ry={9} fill={shade(c, 0.45)} />
          </g>
        ))}
      </g>
    </g>
  );
}
