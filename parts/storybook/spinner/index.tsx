import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Spinner: woman with a distaff under one arm, twisting thread onto a drop spindle that spins below.
const Distaff: React.FC = () => (
  <g transform="rotate(-18 0 0)">
    <rect x={-7} y={-400} width={14} height={470} rx={6} fill="#B98B52" stroke={C.ink} strokeWidth={5} />
    <path d="M -2 -400 Q -40 -440 -30 -470 Q 0 -450 4 -400 Z" fill={C.cream} stroke={C.ink} strokeWidth={4} />
  </g>
);

const Spindle: React.FC<{ f: number }> = ({ f }) => {
  const sx = Math.cos(f / 1.6);
  const sway = Math.sin(f / 9) * 6;
  return (
    <g>
      <path d={`M 0 -120 Q ${sway} -60 0 0`} stroke={C.cream} strokeWidth={3} fill="none" />
      <g transform={`translate(${sway * 0.5} 0)`}>
        <rect x={-4} y={-30} width={8} height={130} rx={3} fill="#8A6A45" stroke={C.ink} strokeWidth={4} />
        <g transform={`translate(0 42) scale(${sx < 0 ? -1 : 1}, 1)`}>
          <ellipse cx={0} cy={0} rx={Math.max(Math.abs(sx) * 34, 4)} ry={12} fill={C.mustard} stroke={C.ink} strokeWidth={4} />
        </g>
      </g>
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="kerchief" hatColour={p.hatColour ?? C.brick} hair="bun" hairColour={p.hairColour ?? "#4A3324"} beard="none"
      skin={p.skin} top="dress" coat={p.coat ?? C.sepia} shirt={C.cream} lower="long" legs={C.sepia}
      apron apronColour={C.paper} pose="forward" backPose="down" action={p.walk ? "walk" : "idle"}
      backHeld={() => <Distaff />}
      held={() => <g transform="translate(0 -10)"><Spindle f={p.f} /></g>}
    />
  );
}
