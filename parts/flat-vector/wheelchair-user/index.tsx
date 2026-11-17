import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Wheelchair user: a seated adult (Person pose sit, seat off) in a side-view wheelchair drawn in body space via over.
// Big wheel with spokes that turn with the distance travelled (vx * f); small front caster and footrest.
const R = 170; // big wheel radius
const CX = -20, CY = -388.6; // big wheel axle, body space; the ground is at y = -218.6 for a seated adult
const FRAME = C.greyDark, TYRE = C.inkSoft;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const travel = (p.flip ? -1 : 1) * (p.vx ?? 0) * p.f; // distance rolled forward, body space
  const spin = (travel / R) * (180 / Math.PI);
  const chair = () => (
    <g>
      {/* backrest, push handle, seat cushion */}
      <rect x={-106} y={-640} width={14} height={244} rx={7} fill={FRAME} />
      <rect x={-124} y={-648} width={40} height={14} rx={7} fill={FRAME} />
      <rect x={-96} y={-436} width={262} height={30} rx={15} fill={C.blue} />
      {/* frame, front caster fork and footrest */}
      <path d="M -96 -404 L 150 -404 L 150 -262 M 150 -404 L 300 -404 L 300 -238" stroke={FRAME} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x={226} y={-242} width={112} height={11} rx={5} fill={FRAME} />
      <circle cx={150} cy={-254.6} r={36} fill={C.ink} />
      <circle cx={150} cy={-254.6} r={12} fill={C.grey} />
      {/* big wheel */}
      <circle cx={CX} cy={CY} r={R} fill="none" stroke={TYRE} strokeWidth={22} />
      <circle cx={CX} cy={CY} r={R - 26} fill="none" stroke={C.grey} strokeWidth={6} />
      <g transform={`rotate(${spin} ${CX} ${CY})`}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const a = (i * Math.PI) / 4;
          return <line key={i} x1={CX} y1={CY} x2={CX + Math.cos(a) * (R - 28)} y2={CY + Math.sin(a) * (R - 28)} stroke={C.greyLight} strokeWidth={5} strokeLinecap="round" />;
        })}
      </g>
      <circle cx={CX} cy={CY} r={14} fill={FRAME} />
    </g>
  );
  return <Person {...p} x={p.x + (p.vx ?? 0) * p.f} f={p.f} flip={!!p.flip} age="adult" pose="sit" seat={false} over={chair} />;
}
