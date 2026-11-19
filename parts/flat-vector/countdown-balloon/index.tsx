import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Foil number balloon: a bold, puffy numeral drawn as a thick rounded stroke, with a shaded edge, a highlight,
// a knot and a string. Origin = the knot. Digits are drawn as stroke paths in a box about 200 by 280 units.
const f1 = (v: number) => v.toFixed(1);
const DIGITS: string[] = [
  // 0: a ring
  "M -80 0 A 80 130 0 1 0 80 0 A 80 130 0 1 0 -80 0 Z",
  // 1: a flag and a stem
  "M -40 -92 L 14 -128 L 14 128",
  // 2
  "M -80 -70 Q -80 -128 0 -128 Q 80 -128 80 -62 Q 80 -4 -80 120 L 90 120",
  // 3
  "M -70 -106 Q -36 -132 4 -132 Q 76 -132 76 -62 Q 76 -12 2 -12 Q 84 -12 84 58 Q 84 128 2 128 Q -52 128 -76 102",
  // 4
  "M 40 128 L 40 -128 L -92 36 L 92 36",
  // 5
  "M 80 -128 L -62 -128 L -70 -18 Q -20 -40 20 -30 Q 82 -10 82 60 Q 82 128 0 128 Q -50 128 -80 104",
  // 6
  "M 60 -110 Q 0 -140 -55 -60 Q -82 0 -70 50 Q -56 128 0 128 Q 76 128 76 58 Q 76 -12 0 -12 Q -60 -12 -70 40",
  // 7
  "M -90 -128 L 90 -128 L -20 128",
  // 8: two loops, drawn as two rings
  "M 0 -128 A 62 62 0 1 0 0 -4 A 62 62 0 1 0 0 -128 Z M 0 -4 A 72 66 0 1 0 0 128 A 72 66 0 1 0 0 -4 Z",
  // 9: a 6 turned round
  "M -60 110 Q 0 140 55 60 Q 82 0 70 -50 Q 56 -128 0 -128 Q -76 -128 -76 -58 Q -76 12 0 12 Q 60 12 70 -40",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1050;
  const d = Math.max(0, Math.min(9, Math.round(Number(p.digit ?? 0))));
  const gold = p.color && p.color !== "none" ? p.color : C.yellow;
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 10 : 0;
  const tilt = anim === "bob" ? Math.sin((f * 2 * Math.PI) / 60) * 3 : 0;
  const CY = -190; // numeral centre above the knot
  const path = DIGITS[d];
  return (
    <g transform={`translate(${f1(x)} ${f1(y + bob)}) scale(${p.flip ? -s : s} ${s}) rotate(${f1(tilt)})`}>
      {/* string from the knot down to the floor */}
      <path d="M 0 0 C 30 40 -30 80 0 120 S 25 200 0 240" fill="none" stroke={C.greyDark} strokeWidth={4} strokeLinecap="round" />
      <g transform={`translate(0 ${CY})`}>
        {/* shaded back edge, then the foil face, then a highlight stroke */}
        <path d={path} fill="none" stroke={shade(gold, 0.25)} strokeWidth={96} strokeLinecap="round" strokeLinejoin="round" />
        <path d={path} fill="none" stroke={gold} strokeWidth={80} strokeLinecap="round" strokeLinejoin="round" transform="translate(-6 -6)" />
        <path d={path} fill="none" stroke={C.white} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" opacity={0.45} transform="translate(-22 -26)" />
      </g>
      {/* knot */}
      <path d="M -14 -6 L 14 -6 L 0 16 Z" fill={shade(gold, 0.3)} />
    </g>
  );
}
