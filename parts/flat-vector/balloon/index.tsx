import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Single balloon: round body with a shaded side, a glossy highlight, a knot and a curly string.
// Origin = the knot. The body rises about 480 px above the knot; the string hangs below it.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1000;
  const col = p.color && p.color !== "none" ? p.color : C.red;
  const anim: string = p.anim ?? "none";
  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 12)})`;
  else if (anim === "float") tr = `translate(${f1(Math.sin((f * 2 * Math.PI) / 150) * 14)} ${f1(-(Math.sin((f * 2 * Math.PI) / 150) + 1) * 18)}) rotate(${f1(Math.sin((f * 2 * Math.PI) / 150) * 3)})`;
  // the knot and the balloon body centre
  const BY = -300, RX = 150, RY = 180;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* string: curls from the knot down and to the side, drawn first so the body covers its top */}
      <path d="M 0 -90 C 40 -40 -40 10 0 60 S 30 150 -10 200 S 20 260 0 300" fill="none" stroke={C.greyDark} strokeWidth={4} strokeLinecap="round" />
      <g transform={tr}>
        {/* body: a shaded back ellipse with the main colour shifted left, so a crescent of shade shows on the right */}
        <ellipse cx={0} cy={BY} rx={RX} ry={RY} fill={shade(col, 0.22)} />
        <ellipse cx={-14} cy={BY - 4} rx={RX - 10} ry={RY - 8} fill={col} />
        {/* glossy highlight */}
        <ellipse cx={-70} cy={BY - 70} rx={20} ry={50} transform={`rotate(20 -70 ${BY - 70})`} fill={C.white} opacity={0.55} />
        <circle cx={-40} cy={BY - 120} r={9} fill={C.white} opacity={0.45} />
        {/* knot */}
        <path d={`M -16 ${BY + RY - 6} L 16 ${BY + RY - 6} L 0 ${BY + RY + 26} Z`} fill={shade(col, 0.3)} />
      </g>
    </g>
  );
}
