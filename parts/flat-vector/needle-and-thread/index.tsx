import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Big sewing needle with a loop of thread through the eye; optional wooden spool. Hero scale.
// Origin = floor centre under the needle. anim "wiggle" swings the loose thread round the eye.
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
  const thread = p.color && p.color !== "none" ? p.color : C.red;
  const steel = p.color2 && p.color2 !== "none" ? p.color2 : C.grey;
  const anim: string = p.anim ?? "none";
  const wiggle = anim === "wiggle" ? Math.sin((f * 2 * Math.PI) / 50) * 14 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {p.spool === true && (
          <g>
            <rect x={178} y={-112} width={44} height={100} rx={6} fill={thread} />
            {[-100, -82, -64, -46, -28].map((sy) => (
              <rect key={sy} x={178} y={sy} width={44} height={8} fill={shade(thread, 0.3)} />
            ))}
            <rect x={164} y={-134} width={16} height={134} rx={6} fill={C.brown} />
            <rect x={222} y={-134} width={16} height={134} rx={6} fill={C.brown} />
          </g>
        )}
        {/* needle: blunt eye end on the left, sharp point on the right */}
        <rect x={-200} y={-28} width={300} height={24} rx={12} fill={steel} />
        <polygon points="92,-28 140,-16 92,-4" fill={steel} />
        <rect x={-194} y={-25} width={286} height={6} rx={3} fill={C.white} opacity={0.5} />
        <ellipse cx={-172} cy={-16} rx={12} ry={9} fill={C.inkSoft} />
        {/* loose thread: from the eye, looping up and back down to the floor */}
        <g transform={`rotate(${f1(wiggle)} -172 -15)`}>
          <path
            d="M-172,-15 C-205,-62 -252,-152 -318,-132 C-368,-117 -352,-42 -300,-46 C-262,-50 -252,-12 -292,-6"
            fill="none" stroke={thread} strokeWidth={11} strokeLinecap="round" strokeLinejoin="round"
          />
        </g>
      </g>
    </g>
  );
}
