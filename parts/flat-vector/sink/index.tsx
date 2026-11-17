import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Bathroom basin on a pedestal, with a chrome tap at the back. About 710 px tall at s = 1. No mirror.
// Origin = bottom centre (the base plate rests on y). anim "water" runs the tap: a stream and drops into the basin.
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
  const c = p.color && p.color !== "none" ? p.color : C.white;
  const running = p.anim === "water";
  const drops = Array.from({ length: 3 }, (_, i) => ((f * 2 + i * 33) % 60) / 60);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* pedestal and base plate */}
        <rect x={-80} y={-470} width={160} height={440} rx={20} fill={c} />
        <rect x={36} y={-470} width={44} height={440} rx={16} fill={shade(c, 0.2)} />
        <rect x={-150} y={-40} width={300} height={40} rx={16} fill={shade(c, 0.15)} />
        {/* basin: rim, then the bowl inside it */}
        <rect x={-300} y={-560} width={600} height={110} rx={46} fill={c} />
        <ellipse cx={0} cy={-560} rx={260} ry={40} fill={shade(c, 0.08)} />
        <ellipse cx={0} cy={-560} rx={220} ry={30} fill={shade(c, 0.25)} />
        {/* chrome tap: rising pipe, arching spout pointing down into the basin */}
        <path d="M 0 -566 V -676 Q 0 -704 28 -704 H 90 Q 118 -704 118 -676 V -640" stroke={C.grey} strokeWidth={26} strokeLinecap="round" fill="none" />
        <rect x={-22} y={-566} width={44} height={20} rx={8} fill={C.greyDark} />
        {/* running water: stream from the spout, drops and a splash in the bowl */}
        {running && (
          <g>
            <rect x={112} y={-636} width={12} height={62} rx={6} fill={C.skyDeep} />
            {drops.map((t, i) => (
              <circle key={i} cx={118} cy={-600 + t * 36} r={5} fill={C.skyDeep} opacity={1 - t * 0.5} />
            ))}
            <ellipse cx={118} cy={-556} rx={22 + Math.sin((f * 2 * Math.PI) / 20) * 4} ry={6} fill={C.skyDeep} opacity={0.7} />
          </g>
        )}
      </g>
    </g>
  );
}
