import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Office printer: body with a paper tray and a page coming out of the front. Origin = bottom centre.
// anim "print": a page slides out of the front slot and stops, then the cycle restarts.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.blue;
  const anim: string = p.anim ?? "none";
  const cyc = (f % 120) / 60;
  const out = anim === "print" ? Math.min(1, cyc) : 0.6;
  const pageH = 300 * out;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={300} ry={12} fill={C.shadow} />
      <g transform={motion(anim === "print" ? "none" : anim, f)}>
        {/* output page sliding out of the front slot */}
        <rect x={-170} y={-130 - pageH} width={340} height={pageH + 30} rx={6} fill={C.white} />
        <rect x={-170} y={-130 - pageH} width={340} height={8} rx={4} fill={shade(C.white, 0.08)} />
        {pageH > 40 && [0, 1, 2, 3].map((i) => (
          <rect key={i} x={-130} y={-110 - pageH + i * 36} width={i === 3 ? 180 : 260} height={10} rx={5} fill={C.greyLight} />
        ))}
        {/* paper tray behind the body */}
        <rect x={-210} y={-250} width={420} height={40} rx={10} fill={C.white} />
        <rect x={-210} y={-212} width={420} height={10} rx={4} fill={shade(C.greyLight, 0.1)} />
        {/* body */}
        <rect x={-260} y={-230} width={520} height={190} rx={34} fill={body} />
        <rect x={-260} y={-70} width={520} height={30} rx={14} fill={shade(body, 0.25)} />
        <path d="M -220 -200 Q -100 -222 60 -200" fill="none" stroke={C.white} strokeWidth={9} strokeLinecap="round" opacity={0.3} />
        {/* front slot */}
        <rect x={-170} y={-130} width={340} height={14} rx={7} fill={C.ink} />
        {/* control panel */}
        <rect x={120} y={-200} width={110} height={44} rx={10} fill={C.ink} />
        <circle cx={142} cy={-178} r={9} fill={C.green} />
        <rect x={160} y={-184} width={48} height={12} rx={6} fill={C.greyDark} />
        <circle cx={184} cy={-120} r={12} fill={C.orange} />
      </g>
    </g>
  );
}
