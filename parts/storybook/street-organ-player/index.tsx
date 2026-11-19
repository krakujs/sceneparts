import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Street organ player: barrel organ on a strap, crank turning in the front hand, tiny music notes drifting up.
const Organ: React.FC = () => (
  <g>
    <rect x={-96} y={-360} width={170} height={150} rx={10} fill="#7A3E2A" stroke={C.ink} strokeWidth={6} />
    <rect x={-80} y={-344} width={138} height={24} fill={C.mustard} stroke={C.ink} strokeWidth={4} />
    <path d="M -80 -300 L 58 -300 M -80 -262 L 58 -262" stroke={C.ink} strokeWidth={4} opacity={0.5} />
    <circle cx={-60} cy={-230} r={10} fill={C.cream} stroke={C.ink} strokeWidth={4} />
    <circle cx={-20} cy={-230} r={10} fill={C.cream} stroke={C.ink} strokeWidth={4} />
    <circle cx={20} cy={-230} r={10} fill={C.cream} stroke={C.ink} strokeWidth={4} />
    <path d="M -96 -330 L -106 -210" stroke="#4A3324" strokeWidth={8} />
  </g>
);

const Crank: React.FC<{ f: number }> = ({ f }) => {
  const a = f * 7;
  const r = (a * Math.PI) / 180;
  return (
    <g>
      <circle cx={0} cy={0} r={26} fill="none" stroke={C.ink} strokeWidth={6} />
      <line x1={0} y1={0} x2={Math.cos(r) * 26} y2={Math.sin(r) * 26} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      <circle cx={Math.cos(r) * 26} cy={Math.sin(r) * 26} r={6} fill={C.mustard} stroke={C.ink} strokeWidth={3} />
    </g>
  );
};

const Notes: React.FC<{ f: number }> = ({ f }) => (
  <g>
    {[0, 1, 2].map((i) => {
      const t = (f * 2 + i * 40) % 120;
      const op = 1 - t / 120;
      return (
        <g key={i} transform={`translate(${130 + i * 36} ${-380 - t})`} opacity={op}>
          <ellipse cx={0} cy={0} rx={10} ry={8} fill={C.ink} />
          <line x1={9} y1={0} x2={9} y2={-34} stroke={C.ink} strokeWidth={3} />
        </g>
      );
    })}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="flat" hatColour={p.hatColour ?? "#4A3B2E"} hair="short" beard="stubble" skin={p.skin} hairColour={p.hairColour}
      top="waistcoat" coat={p.coat ?? C.sepia} shirt={C.cream} lower="trousers" legs="#3D3A44"
      pose="forward" backPose="down" action="work"
      front={<Organ />}
      held={() => <g transform="translate(0 -8)"><Crank f={p.f} /></g>}
      behind={<Notes f={p.f} />}
    />
  );
}
