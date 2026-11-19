import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Recurve bow standing upright, string on the right side, one arrow nocked and pointing right.
// Origin = bottom tip of the bow. About 260 px wide and 620 px tall at s = 1 (arrow tip reaches about 300 px to the right).
// anim "draw": every 90 frames the string is pulled back to the arrow's nock and released, the arrow snapping forward.
const f1 = (v: number) => v.toFixed(1);
const BOW_TOP = { x: 40, y: -600 }, BOW_BOT = { x: 40, y: -20 };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1.2, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : "#A8703F";
  const anim: string = p.anim ?? "draw";
  // draw phase 0 (relaxed) .. 1 (fully drawn) then release
  const ph = anim === "draw" ? (f % 90) / 90 : 0;
  const pull = ph < 0.7 ? ph / 0.7 : Math.max(0, 1 - (ph - 0.7) / 0.1);
  const nockX = 40 - pull * 110;
  const arrowX = anim === "draw" && ph >= 0.7 ? 40 - pull * 110 + (ph - 0.7) * 400 * 0 : nockX;
  const arrowShift = anim === "draw" && ph >= 0.7 ? (ph - 0.7) * 1200 : 0;
  const string = `M ${f1(BOW_TOP.x)} ${BOW_TOP.y} L ${f1(nockX)} -310 L ${f1(BOW_BOT.x)} ${BOW_BOT.y}`;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={130} ry={14} fill={C.shadow} />
      {/* bow limbs: recurved tips */}
      <path d="M 40 -600 Q 120 -560 110 -380 Q 100 -310 60 -310 L 40 -310 Q 80 -320 84 -380 Q 90 -520 40 -600 Z" fill={wood} />
      <path d="M 40 -20 Q 120 -60 110 -240 Q 100 -310 60 -310 L 40 -310 Q 80 -300 84 -240 Q 90 -100 40 -20 Z" fill={wood} />
      <path d="M 40 -600 Q -20 -540 -20 -310 Q -20 -80 40 -20 L 60 -20 Q 0 -90 0 -310 Q 0 -540 60 -600 Z" fill={shade(wood, 0.15)} />
      {/* grip wrap */}
      <rect x={24} y={-340} width={36} height={60} rx={8} fill={C.brownDark} />
      {/* string */}
      <path d={string} fill="none" stroke={C.white} strokeWidth={4} strokeLinejoin="round" />
      {/* arrow */}
      <g transform={`translate(${f1(arrowX + arrowShift)} 0)`}>
        <rect x={nockX - 40} y={-316} width={260} height={10} rx={5} fill={C.brownDark} />
        <path d={`M ${f1(nockX + 220)} -322 L ${f1(nockX + 260)} -321 L ${f1(nockX + 220)} -310 Z`} fill={C.greyDark} />
        <path d={`M ${f1(nockX - 40)} -330 L ${f1(nockX - 14)} -321 L ${f1(nockX - 40)} -312 Z`} fill={C.red} />
      </g>
    </g>
  );
}
