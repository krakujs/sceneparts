import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Head scarf (hijab) neatly wrapped around the face opening, draped over the shoulders of a plain,
// faceless light-grey display bust. No face features. Origin = bottom centre of the bust base (it stands
// on y). About 400 px wide and 660 px tall at s = 1.
// color = the scarf, color2 = the brooch and the rim of the face opening.
const f1 = (v: number) => v.toFixed(1);

const Bust = () => (
  <g>
    <rect x={-170} y={-26} width={340} height={26} rx={10} fill={C.grey} />
    <rect x={-62} y={-262} width={124} height={44} fill={shade(C.greyLight, 0.08)} />
    <path d="M -190 -26 L -190 -150 Q -190 -208 -130 -222 L -66 -240 L 66 -240 L 130 -222 Q 190 -208 190 -150 L 190 -26 Z" fill={C.greyLight} />
    <ellipse cx={0} cy={-430} rx={124} ry={150} fill={C.greyLight} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const cloth = p.color && p.color !== "none" ? p.color : C.teal;
  const accent = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const pop = anim === "pop" ? 1 + 0.06 * Math.sin(Math.PI * Math.min(1, f / 20)) : 1;
  // outer scarf silhouette, with the face opening cut out (evenodd)
  const outer = "M -160 -300 C -186 -380 -190 -490 -136 -552 C -90 -604 90 -604 136 -552 C 190 -490 186 -380 160 -300 Q 180 -200 186 -186 Q 0 -120 -186 -186 Q -180 -200 -160 -300 Z";
  const opening = "M -98 -430 A 98 124 0 1 0 98 -430 A 98 124 0 1 0 -98 -430 Z";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`scale(${f1(pop)})`}>
        <Bust />
        <path d={`${outer} ${opening}`} fillRule="evenodd" fill={cloth} />
        {/* soft rim around the face opening */}
        <ellipse cx={0} cy={-430} rx={98} ry={124} fill="none" stroke={shade(cloth, 0.25)} strokeWidth={8} />
        {/* folds where the scarf drapes over the shoulders */}
        <path d="M -110 -262 Q -60 -196 -24 -150" stroke={shade(cloth, 0.22)} strokeWidth={8} fill="none" strokeLinecap="round" />
        <path d="M 110 -262 Q 60 -196 24 -150" stroke={shade(cloth, 0.22)} strokeWidth={8} fill="none" strokeLinecap="round" />
        <path d="M -40 -230 Q 0 -200 40 -230" stroke={shade(cloth, 0.22)} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.7} />
        {/* brooch at the chest */}
        <circle cx={0} cy={-214} r={14} fill={accent} stroke={shade(accent, 0.25)} strokeWidth={4} />
      </g>
    </g>
  );
}
