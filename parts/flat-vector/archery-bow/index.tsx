import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Recurve archery bow standing upright, facing right: a riser in the middle, two curved limbs whose tips
// curl back, a string between the tips and an arrow nocked on the string, pointing right. anim "draw"
// pulls the string and nock back toward the archer and releases again. Origin = ground centre under the
// lower tip. About 760 px tall and 300 px wide at s = 1.
const f1 = (v: number) => v.toFixed(1);
const TOP = { x: -20, y: -760 }, BOT = { x: -20, y: 0 };
const ARROW_Y = -380, ARROW_TIP = 200;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : C.brown;
  const stringC = p.color2 && p.color2 !== "none" ? p.color2 : C.inkSoft;
  const anim: string = p.anim ?? "none";
  const pull = anim === "draw" ? 0.5 - 0.5 * Math.cos((f * 2 * Math.PI) / 60) : 0;
  const nockX = -20 - 90 * pull;
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const pop = anim === "pop" ? 1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s}) scale(${f1(pop)})`}>
      <ellipse cx={0} cy={0} rx={150} ry={10} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)})`}>
        {/* limbs: curved strokes, the tips curl back toward the string */}
        <path d="M -14 -400 Q 130 -560 -20 -760" stroke={wood} strokeWidth={26} strokeLinecap="round" fill="none" />
        <path d="M -14 -400 Q 130 -560 -20 -760" stroke={shade(wood, 0.2)} strokeWidth={8} strokeLinecap="round" fill="none" transform="translate(10 0)" opacity={0.6} />
        <path d="M -14 -360 Q 130 -200 -20 0" stroke={wood} strokeWidth={26} strokeLinecap="round" fill="none" />
        <path d="M -14 -360 Q 130 -200 -20 0" stroke={shade(wood, 0.2)} strokeWidth={8} strokeLinecap="round" fill="none" transform="translate(10 0)" opacity={0.6} />
        {/* riser (the grip) */}
        <rect x={-30} y={-470} width={40} height={180} rx={14} fill={shade(wood, 0.25)} />
        <rect x={-30} y={-470} width={14} height={180} rx={6} fill={C.inkSoft} opacity={0.5} />
        {/* string: from the top tip, through the nock, to the bottom tip */}
        <path d={`M ${TOP.x} ${TOP.y} L ${f1(nockX)} ${ARROW_Y} L ${BOT.x} ${BOT.y}`} stroke={stringC} strokeWidth={5} fill="none" strokeLinejoin="round" />
        {/* arrow: shaft from the nock to the head, fletching at the nock */}
        <line x1={nockX} y1={ARROW_Y} x2={ARROW_TIP} y2={ARROW_Y} stroke={C.orange} strokeWidth={9} strokeLinecap="round" />
        <path d={`M ${ARROW_TIP} ${ARROW_Y} L ${ARROW_TIP - 26} ${ARROW_Y - 14} L ${ARROW_TIP - 26} ${ARROW_Y + 14} Z`} fill={C.greyDark} />
        <path d={`M ${f1(nockX)} ${ARROW_Y} L ${f1(nockX - 40)} ${ARROW_Y - 22} L ${f1(nockX - 30)} ${ARROW_Y} L ${f1(nockX - 40)} ${ARROW_Y + 22} Z`} fill={C.red} />
      </g>
    </g>
  );
}
