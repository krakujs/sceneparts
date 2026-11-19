import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Double bass standing on its endpin, seen from the front: a two-lobed body with f-holes and a bridge,
// a long fingerboard and a scroll at the top. A bow leans against it on the right.
// Origin = bottom centre (endpin on y). About 1010 px tall at s = 1.
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
  const wood = p.color && p.color !== "none" ? p.color : C.brown;
  const anim: string = p.anim ?? "none";
  const dark = C.ink;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={260} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* endpin */}
        <line x1={0} y1={0} x2={0} y2={-110} stroke={C.greyDark} strokeWidth={10} strokeLinecap="round" />
        {/* bow, leaning on the right */}
        <path d="M 250 -10 Q 340 -500 290 -960" fill="none" stroke={C.brownDark} strokeWidth={12} strokeLinecap="round" />
        <line x1={250} y1={-10} x2={290} y2={-950} stroke={C.greyLight} strokeWidth={3} />
        {/* body: bottom bout, waist and upper bout */}
        <ellipse cx={0} cy={-230} rx={232} ry={140} fill={wood} />
        <rect x={-120} y={-440} width={240} height={180} rx={60} fill={wood} />
        <ellipse cx={0} cy={-580} rx={190} ry={150} fill={wood} />
        <ellipse cx={-70} cy={-260} rx={160} ry={120} fill={shade(wood, 0.08)} opacity={0.5} />
        <ellipse cx={-96} cy={-630} rx={80} ry={70} fill={shade(wood, 0.1)} opacity={0.4} />
        {/* f-holes */}
        <path d="M -100 -260 Q -120 -300 -100 -340 M -100 -260 Q -82 -300 -100 -340" fill="none" stroke={dark} strokeWidth={9} strokeLinecap="round" opacity={0.8} />
        <path d="M 100 -260 Q 120 -300 100 -340 M 100 -260 Q 82 -300 100 -340" fill="none" stroke={dark} strokeWidth={9} strokeLinecap="round" opacity={0.8} />
        {/* bridge and strings */}
        <rect x={-90} y={-470} width={180} height={18} rx={6} fill={C.sand} />
        <rect x={-90} y={-470} width={180} height={6} rx={3} fill={C.white} opacity={0.7} />
        {[-38, -19, 0, 19].map((sx, i) => (
          <line key={i} x1={sx} y1={-452} x2={sx * 1.2} y2={-930} stroke={C.greyLight} strokeWidth={2.4} />
        ))}
        {/* neck, fingerboard and scroll */}
        <rect x={-26} y={-740} width={52} height={230} rx={10} fill={shade(wood, 0.15)} />
        <rect x={-22} y={-960} width={44} height={230} rx={8} fill={dark} />
        <rect x={-20} y={-960} width={6} height={230} rx={3} fill={C.white} opacity={0.12} />
        <rect x={-40} y={-1000} width={80} height={46} rx={14} fill={shade(wood, 0.15)} />
        {[-22, 22].map((px, i) => (
          <circle key={i} cx={px} cy={-980} r={10} fill={C.ink} />
        ))}
        {/* tuning pegs on the side */}
        <circle cx={-34} cy={-960} r={8} fill={C.greyLight} />
        <circle cx={34} cy={-960} r={8} fill={C.greyLight} />
      </g>
    </g>
  );
}
