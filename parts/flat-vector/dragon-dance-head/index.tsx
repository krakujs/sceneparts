import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// A festival dragon dance head, facing right: a big boxy red head with gold trim, a wide open mouth showing a pink
// tongue and white teeth, big round eyes under heavy lids, bushy gold brows, one short horn and white fur along the
// edges. A short draped red cloth body with a gold scale pattern trails behind to the left.
// Origin = bottom centre of the cloth hem (sits on y). About 600 px wide and 560 px tall at s = 1.
// anim "bob": the head nods up and down.
const f1 = (v: number) => v.toFixed(1);

// Mouth: an open wide jaw cut into the front (right) edge of the head.
const yTop = (x: number) => -26 + (170 - x) * 0.28;
const yBot = (x: number) => 124 - (170 - x) * 0.2;
const TEETH_X = [150, 118, 86];

const SCALE_ROWS = [-120, -82, -44];
const SCALES: [number, number][] = [];
SCALE_ROWS.forEach((yy, r) => {
  for (let xx = -300 + (r % 2) * 20; xx <= -160; xx += 40) SCALES.push([xx, yy]);
});

const Eye = ({ x }: { x: number }) => (
  <g>
    <circle cx={x} cy={-54} r={60} fill={C.white} />
    <circle cx={x + 16} cy={-44} r={30} fill={C.ink} />
    <circle cx={x + 26} cy={-56} r={8} fill={C.white} />
    {/* heavy lid covering the top half of the eye */}
    <path d={`M ${x - 64} -56 C ${x - 64} -128 ${x + 64} -128 ${x + 64} -56 Z`} fill={C.redDark} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const red = p.color && p.color !== "none" ? p.color : C.red;
  const gold = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? -Math.abs(Math.sin((f * Math.PI) / 30)) * 12 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-120} cy={0} rx={320} ry={14} fill={C.shadow} />
      {/* draped cloth body trailing to the left */}
      <path d="M -60 -190 L -130 -180 C -240 -170 -330 -110 -400 -40 L -430 -6 Q -400 14 -370 -6 Q -340 -26 -310 -6 Q -280 14 -250 -6 Q -220 -26 -190 -6 Q -160 14 -130 -6 Q -110 -30 -90 -40 Z" fill={red} />
      {SCALES.map(([sx, sy], i) => (
        <g key={i}>
          <path d={`M ${sx - 16} ${sy} A 16 16 0 0 1 ${sx + 16} ${sy} Z`} fill={gold} />
          <path d={`M ${sx - 7} ${sy} A 7 7 0 0 1 ${sx + 7} ${sy} Z`} fill={shade(gold, 0.25)} />
        </g>
      ))}
      <g transform={`translate(40 ${f1(-330 + bob)})`}>
        {/* gold trim behind the head, then the red head */}
        <rect x={-184} y={-164} width={368} height={328} rx={62} fill={gold} />
        <rect x={-170} y={-150} width={340} height={300} rx={50} fill={red} />
        <rect x={-130} y={-120} width={260} height={12} rx={6} fill={gold} />
        {/* white fur along the back and the bottom edge */}
        {[-110, -66, -22, 22, 66, 110].map((yy) => (
          <circle key={yy} cx={-170} cy={yy} r={22} fill={C.white} />
        ))}
        {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={i * 40} cy={150} r={22} fill={C.white} />
        ))}
        {/* one short horn at the back of the crown */}
        <path d="M -120 -150 Q -146 -220 -94 -256 Q -92 -206 -50 -150 Z" fill={gold} />
        <path d="M -108 -160 Q -118 -206 -96 -232 Q -94 -198 -78 -160 Z" fill={shade(gold, 0.2)} />
        {/* eyes under heavy lids, with bushy brows */}
        {[-52, 60].map((ex) => (
          <g key={ex}>
            <Eye x={ex} />
            {[-46, -14, 18, 50].map((dx, k) => (
              <circle key={k} cx={ex + dx} cy={-140 + (k === 0 || k === 3 ? 10 : 0)} r={22} fill={shade(gold, 0.15)} />
            ))}
          </g>
        ))}
        {/* open mouth: dark jaw, pink tongue, white teeth */}
        <path d="M 170 -26 L 70 2 Q 42 50 70 104 L 170 124 Z" fill={C.ink} />
        <path d="M 170 92 Q 120 66 84 98 Q 100 120 170 116 Z" fill={C.pink} />
        {TEETH_X.map((tx) => (
          <path key={`t${tx}`} d={`M ${tx - 9} ${f1(yTop(tx - 9))} L ${tx} ${f1(yTop(tx) + 24)} L ${tx + 9} ${f1(yTop(tx + 9))} Z`} fill={C.white} />
        ))}
        {TEETH_X.map((tx) => (
          <path key={`b${tx}`} d={`M ${tx - 9} ${f1(yBot(tx - 9))} L ${tx} ${f1(yBot(tx) - 24)} L ${tx + 9} ${f1(yBot(tx + 9))} Z`} fill={C.white} />
        ))}
      </g>
    </g>
  );
}
