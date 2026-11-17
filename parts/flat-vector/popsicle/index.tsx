import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Popsicle: an ice lolly on a wooden stick, two-tone, with an optional bite taken out of the top right.
// Origin = resting point (bottom of the stick); faces the viewer, honours flip, s and anim.
const f1 = (v: number) => v.toFixed(1);
const LOLLY = "M -78 -160 L -78 -262 C -78 -300 -45 -318 0 -318 C 45 -318 78 -300 78 -262 L 78 -160 Q 78 -150 68 -150 L -68 -150 Q -78 -150 -78 -160 Z";
// same lolly with a bite taken out of the top right
const LOLLY_BITE = "M -78 -160 L -78 -262 C -78 -300 -45 -318 0 -318 C 20 -318 36 -315 50 -308 A 24 24 0 0 0 78 -272 L 78 -160 Q 78 -150 68 -150 L -68 -150 Q -78 -150 -78 -160 Z";

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c1 = p.color && p.color !== "none" ? p.color : "#FF6F91";
  const c2 = p.color2 && p.color2 !== "none" ? p.color2 : C.teal;
  const bite = !!p.bite;
  const shape = bite ? LOLLY_BITE : LOLLY;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={62} ry={10} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* wooden stick standing on its end */}
        <rect x={-9} y={-160} width={18} height={160} rx={9} fill="#E7C48F" />
        <rect x={2} y={-160} width={6} height={160} rx={3} fill="#C9A06A" opacity={0.6} />
        <g>
          <path d={shape} fill={c1} />
          {/* bottom colour: the lower lolly with a wavy join */}
          <path d="M -78 -224 Q -40 -244 0 -224 T 78 -224 L 78 -160 Q 78 -150 68 -150 L -68 -150 Q -78 -150 -78 -160 Z" fill={c2} />
          <ellipse cx={-42} cy={-258} rx={8} ry={30} fill="#FFFFFF" opacity={0.5} />
        </g>
      </g>
    </g>
  );
}
