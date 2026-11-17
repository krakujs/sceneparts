import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Two interlocking cogs of different sizes on a shared base. The big gear has 14 teeth, the small one 8; they mesh at
// the pitch circles. anim spin turns them in opposite directions with matching tooth speeds (small turns 1.75 times faster).
// Origin = bottom centre (the floor line). Hero scale: at s = 1 about 540 px wide and 430 px tall. Use s about 0.3–0.4 next to a person.
const f1 = (v: number) => v.toFixed(1);
// toothed outline centred on (0,0): n teeth, tip radius ro, root radius rr, half-widths of tip and root in radians
const toothPath = (n: number, ro: number, rr: number, tip: number, root: number) => {
  let d = "";
  for (let i = 0; i < n; i++) {
    const a = (i * 2 * Math.PI) / n;
    const pts: [number, number][] = [[a - root, rr], [a - tip, ro], [a + tip, ro], [a + root, rr]];
    pts.forEach(([t, r], k) => {
      d += `${k === 0 && i === 0 ? "M" : "L"}${f1(r * Math.sin(t))},${f1(-r * Math.cos(t))}`;
    });
  }
  return `${d}Z`;
};
// big: pitch radius 182, 14 teeth; small: pitch radius 104, 8 teeth. Same tooth pitch (about 82 px) so they mesh.
const BIG = toothPath(14, 200, 164, 0.07, 0.12);
const SMALL = toothPath(8, 122, 86, 0.12, 0.2);
const BIG_X = -143, SMALL_X = 143, AXLE_Y = -230;
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const big = p.color && p.color !== "none" ? p.color : C.blue;
  const small = p.color2 && p.color2 !== "none" ? p.color2 : C.orange;
  const anim: string = p.anim ?? "none";
  const turnBig = anim === "spin" ? (f * 2) % 360 : 0;
  const turnSmall = anim === "spin" ? (-f * 3.5) % 360 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={290} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* base plate and axles */}
        <rect x={-270} y={-30} width={540} height={30} rx={10} fill={C.greyDark} />
        <rect x={BIG_X - 14} y={AXLE_Y} width={28} height={200} fill={C.greyDark} />
        <rect x={SMALL_X - 14} y={AXLE_Y} width={28} height={200} fill={C.greyDark} />
        {/* big gear */}
        <g transform={`translate(${BIG_X} ${AXLE_Y}) rotate(${f1(turnBig)})`}>
          <path d={BIG} fill={big} />
          <circle cx={0} cy={0} r={92} fill={shade(big, 0.14)} />
          <circle cx={0} cy={0} r={30} fill={C.ink} />
        </g>
        {/* small gear, drawn over the big one */}
        <g transform={`translate(${SMALL_X} ${AXLE_Y}) rotate(${f1(turnSmall)})`}>
          <path d={SMALL} fill={small} />
          <circle cx={0} cy={0} r={56} fill={shade(small, 0.14)} />
          <circle cx={0} cy={0} r={22} fill={C.ink} />
        </g>
      </g>
    </g>
  );
}
