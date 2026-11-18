import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Card price tag on a string, with a pointed end, a punched hole and a "%" mark (no digits, no text).
// Origin = the pivot where the string hangs from (x, y is the top of the string, not the bottom).
// About 380 px wide and 400 px tall (string included) at s = 1.
// anim "swing": the tag swings gently from its pivot.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 700;
  const card = p.color && p.color !== "none" ? p.color : C.red;
  const anim: string = p.anim ?? "none";
  const ang = anim === "swing" ? Math.sin((f * 2 * Math.PI) / 60) * 12 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${f1(ang)})`}>
        {/* string from the pivot to the hole */}
        <path d="M 0 0 Q 0 120 -130 222" stroke={C.inkSoft} strokeWidth={8} strokeLinecap="round" fill="none" />
        {/* tag: a card with a pointed left end */}
        <path d="M -190 262 L -100 130 L 170 130 Q 190 130 190 150 L 190 380 Q 190 400 170 400 L -100 400 Z" fill={card} />
        {/* right edge shade and the punched hole */}
        <path d="M 150 130 L 170 130 Q 190 130 190 150 L 190 380 Q 190 400 170 400 L 150 400 Z" fill={shade(card, 0.15)} />
        <circle cx={-130} cy={262} r={26} fill={C.white} />
        <circle cx={-130} cy={262} r={26} fill={C.greyLight} opacity={0.6} />
        <circle cx={-130} cy={262} r={18} fill={C.white} />
        {/* % mark: two rings and a slash */}
        <circle cx={28} cy={232} r={28} fill="none" stroke={C.white} strokeWidth={14} />
        <circle cx={108} cy={318} r={28} fill="none" stroke={C.white} strokeWidth={14} />
        <path d="M 124 214 L 30 336" stroke={C.white} strokeWidth={16} strokeLinecap="round" />
      </g>
    </g>
  );
}
