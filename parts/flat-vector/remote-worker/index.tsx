import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Remote worker: sitting at a small desk with a laptop and a teal mug, headphones on, in a casual yellow tee.
// The office chair is drawn behind the person; the desk is drawn in front.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1;
  const x = (p.x ?? 540) + (p.vx ?? 0) * p.f;
  const y = p.y ?? 1560;
  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`}>
      <rect x={-150} y={-770} width={40} height={340} rx={16} fill={C.greyDark} />
      <rect x={-150} y={-470} width={260} height={36} rx={14} fill={C.greyDark} />
      <rect x={-40} y={-440} width={16} height={440} fill={C.grey} />
      <rect x={-100} y={-8} width={136} height={12} rx={6} fill={C.grey} />
      <Person
        x={0}
        y={0}
        s={1}
        f={p.f}
        flip={false}
        pose="sit"
        seat={false}
        top="tshirt"
        topColor={C.yellow}
        bottom="trousers"
        bottomColor={C.navy}
        shoes="sneakers"
        shoesColor={C.white}
        hat="none"
        accessory="headphones"
        hatColor={C.ink}
      />
      <rect x={130} y={-418} width={16} height={418} fill={C.brownDark} />
      <rect x={430} y={-418} width={16} height={418} fill={C.brownDark} />
      <rect x={110} y={-440} width={360} height={22} rx={6} fill={C.brown} />
      <rect x={190} y={-530} width={150} height={96} rx={8} fill={C.greyDark} />
      <rect x={198} y={-522} width={134} height={80} rx={4} fill="#8FD0F2" />
      <rect x={170} y={-438} width={190} height={10} rx={4} fill={C.grey} />
      <rect x={380} y={-488} width={38} height={50} rx={8} fill={C.teal} />
      <path d="M 418 -472 Q 436 -464 418 -446" stroke={C.teal} strokeWidth={8} fill="none" />
    </g>
  );
}
