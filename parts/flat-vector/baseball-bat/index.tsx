import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Baseball bat standing upright, barrel up: a long tapered wooden body that swells into a rounded barrel,
// with a taped handle at the bottom. Origin = bottom centre of the handle; the handle rests on y.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : "#C68558";
  const anim: string = p.anim ?? "none";
  const rot = anim === "swing" ? Math.sin((f * 2 * Math.PI) / 50) * 8 : 0;
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 40) + 1) * 8 : 0;
  const body = "M -26 -120 Q -60 -300 -56 -480 Q -52 -640 -18 -682 Q 0 -694 18 -682 Q 52 -640 56 -480 Q 60 -300 26 -120 Z";
  const right = "M 4 -120 Q 26 -120 26 -120 Q 60 -300 56 -480 Q 52 -640 18 -682 Q 0 -694 4 -682 Z";
  return (
    <g transform={`translate(${f1(x)} ${f1(y + bob)}) scale(${p.flip ? -s : s} ${s}) rotate(${f1(rot)})`}>
      <ellipse cx={0} cy={0} rx={50} ry={6} fill={C.shadow} />
      <path d={body} fill={wood} />
      <path d={right} fill={shade(wood, 0.18)} />
      <path d="M -30 -420 Q -6 -430 14 -420" fill="none" stroke={shade(wood, 0.25)} strokeWidth={5} strokeLinecap="round" />
      <path d="M -40 -560 Q -10 -566 20 -556" fill="none" stroke={shade(wood, 0.25)} strokeWidth={5} strokeLinecap="round" />
      {/* taped handle */}
      <rect x={-22} y={-150} width={44} height={150} rx={14} fill={C.ink} />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={-22} y={-132 + i * 32} width={44} height={8} fill={C.inkSoft} />)}
      <rect x={-22} y={-14} width={44} height={14} rx={6} fill={C.inkSoft} />
    </g>
  );
}
