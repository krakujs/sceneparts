import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Elevator operator: pillbox cap, uniform with brass buttons, hand on a brass lever of a small control panel.
const Panel: React.FC<{ f: number }> = ({ f }) => {
  const lever = Math.sin(f / 20) * 6;
  return (
    <g>
      <rect x={-40} y={-60} width={80} height={120} rx={8} fill={C.stoneDark} stroke={C.ink} strokeWidth={6} />
      <rect x={-26} y={-44} width={52} height={28} rx={4} fill={C.teal} stroke={C.ink} strokeWidth={4} />
      <circle cx={-14} cy={10} r={7} fill={C.brick} stroke={C.ink} strokeWidth={3} />
      <circle cx={8} cy={10} r={7} fill={C.mustard} stroke={C.ink} strokeWidth={3} />
      <line x1={0} y1={40} x2={0} y2={60} stroke={C.ink} strokeWidth={6} />
      <g transform={`rotate(${lever} 0 40)`}>
        <rect x={-6} y={-20} width={12} height={62} rx={5} fill="#B98B52" stroke={C.ink} strokeWidth={4} />
        <circle cx={0} cy={-26} r={12} fill="#D9A95A" stroke={C.ink} strokeWidth={4} />
      </g>
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="peaked" hatColour={p.uniform ?? C.navy} hair="short" hairColour={p.hairColour ?? "#2C2F3B"} beard="moustache"
      top="uniform" coat={p.uniform ?? C.navy} shirt={C.cream} belt
      skin={p.skin ?? "#E8B990"} lower="trousers" legs={C.stoneDark} boots="#2B2420"
      pose="forward" backPose="down" action="idle"
      held={() => <Panel f={p.f} />}
    />
  );
}
