import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Low potter's wheel from the front: a wide splash pan (about 600 px) with water in it, a short sturdy
// base, a foot pedal on a cable at the right, a flat round wheel head on a shaft, and a wide-bellied
// wet clay pot sitting on the head. Origin = bottom centre of the plinth. About 450 px tall at s = 1.
// anim "spin": the head and pot turn; highlight streaks slide across the pot and the head.
const f1 = (v: number) => v.toFixed(1);
const HEAD_Y = -225; // centre of the wheel head's top face
const HEAD_RX = 130, HEAD_RY = 26;
const POT_RIM_Y = -436; // mouth of the pot

// The pot outline: a wide belly, a narrow neck and an open rim.
const POT_D =
  "M -70 -218 C -118 -232 -124 -300 -118 -325 C -112 -370 -84 -398 -58 -410 L -56 -432 L 56 -432 L 58 -410 " +
  "C 84 -398 112 -370 118 -325 C 124 -300 118 -232 70 -218 Z";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const clay = p.clay && p.clay !== "none" ? p.clay : "#C0703F";
  const body = p.color && p.color !== "none" ? p.color : C.brownDark;
  const anim: string = p.anim ?? "none";
  const turn = anim === "spin" ? ((f * 4) * Math.PI) / 180 : 0; // 4 degrees a frame, 90 frames a turn
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const rock = anim === "wobble" ? Math.sin((f * 2 * Math.PI) / 40) * 1.5 : 0;
  // A highlight on a turning cylinder slides across its front: x = R sin(angle), brightest when facing us.
  const potStreaks = [0, 1, 2].map((i) => {
    const a = turn + (i * 2 * Math.PI) / 3;
    return { x: 80 * Math.sin(a), op: 0.12 + 0.4 * ((Math.cos(a) + 1) / 2) };
  });
  const headStreaks = [0, 1].map((i) => {
    const a = turn + i * Math.PI;
    return { x: 92 * Math.sin(a), op: 0.1 + 0.4 * ((Math.cos(a) + 1) / 2) };
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={330} ry={18} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)}) rotate(${f1(rock)} 0 0)`}>
        {/* foot pedal on the floor, joined to the base by a cable */}
        <path d="M 236 -30 C 232 -92 186 -104 132 -118" fill="none" stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
        <rect x={200} y={-30} width={130} height={30} rx={14} fill={C.greyDark} />
        <rect x={204} y={-30} width={122} height={8} rx={4} fill={C.grey} />

        {/* plinth and short sturdy base */}
        <rect x={-170} y={-30} width={340} height={30} rx={12} fill={shade(body, 0.3)} />
        <rect x={-130} y={-150} width={260} height={124} rx={16} fill={body} />
        <rect x={-96} y={-126} width={192} height={64} rx={12} fill={shade(body, 0.2)} />

        {/* splash pan: a wide shallow basin with water in it */}
        <path d="M -300 -172 Q -296 -134 -250 -132 L 250 -132 Q 296 -134 300 -172 Z" fill={C.grey} />
        <ellipse cx={0} cy={-172} rx={300} ry={40} fill={C.greyLight} />
        <ellipse cx={0} cy={-172} rx={274} ry={30} fill={C.skyDeep} />
        <path d="M -200 -184 Q -110 -196 -40 -190" fill="none" stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" opacity={0.5} />

        {/* shaft from the base up through the water */}
        <rect x={-22} y={-200} width={44} height={56} fill={C.greyDark} />

        {/* wheel head: a flat round disc */}
        <rect x={-HEAD_RX} y={HEAD_Y} width={2 * HEAD_RX} height={20} fill={shade(C.greyDark, 0.2)} />
        <ellipse cx={0} cy={HEAD_Y + 20} rx={HEAD_RX} ry={HEAD_RY} fill={shade(C.greyDark, 0.25)} />
        <ellipse cx={0} cy={HEAD_Y} rx={HEAD_RX} ry={HEAD_RY} fill={C.greyDark} />
        {headStreaks.map((h, i) => (
          <ellipse key={i} cx={f1(h.x) as any} cy={HEAD_Y} rx={14} ry={6} fill="#FFFFFF" opacity={f1(h.op) as any} />
        ))}
        <ellipse cx={0} cy={HEAD_Y} rx={22} ry={5} fill={shade(C.greyDark, 0.3)} />

        {/* clay pot, sitting on the head; its highlight streaks turn with the wheel */}
        <path d={POT_D} fill={clay} />
        {/* throwing rings */}
        {[
          { yy: -262, hw: 96 }, { yy: -300, hw: 118 }, { yy: -352, hw: 112 }, { yy: -390, hw: 88 },
        ].map((r, i) => (
          <path key={i} d={`M ${-r.hw} ${r.yy} Q 0 ${r.yy + 16} ${r.hw} ${r.yy}`} fill="none" stroke={shade(clay, 0.25)} strokeWidth={5} strokeLinecap="round" opacity={0.6} />
        ))}
        {potStreaks.map((h, i) => (
          <path key={i} d={`M ${f1(h.x)} -384 Q ${f1(h.x * 1.08)} -330 ${f1(h.x)} -272`} fill="none" stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" opacity={f1(h.op) as any} />
        ))}
        {/* open rim */}
        <ellipse cx={0} cy={POT_RIM_Y} rx={56} ry={10} fill={shade(clay, 0.2)} />
        <ellipse cx={0} cy={POT_RIM_Y} rx={44} ry={6.5} fill={shade(clay, 0.5)} />
      </g>
    </g>
  );
}
