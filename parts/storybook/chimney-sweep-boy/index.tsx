import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Chimney sweep boy: sooty child in a flat cap, with a round brush on a pole and a bundle of rods on the back.
const Brush: React.FC<{ f: number }> = ({ f }) => {
  const wob = Math.sin(f / 4) * 3;
  return (
    <g transform={`rotate(${wob} 0 0)`}>
      <rect x={-5} y={-400} width={10} height={430} rx={5} fill="#B98B52" stroke={C.ink} strokeWidth={4} />
      <ellipse cx={0} cy={-420} rx={34} ry={40} fill="#2C2F3B" stroke={C.ink} strokeWidth={5} />
      <path d="M -20 -440 Q 0 -400 20 -440" fill="none" stroke="#5C5F6E" strokeWidth={4} />
    </g>
  );
};

const Rods: React.FC = () => (
  <g>
    {[-14, -4, 6, 16].map((dx, i) => (
      <rect key={i} x={-40 + dx * 0.5} y={-300 - i * 4} width={10} height={320} rx={4} fill="#8A6A45" stroke={C.ink} strokeWidth={4} transform={`rotate(${-8 + i * 3} ${dx} -180)`} />
    ))}
    <path d="M -50 -200 Q 0 -190 50 -200" stroke={C.ink} strokeWidth={6} fill="none" />
  </g>
);

const Soot: React.FC = () => (
  <g fill="#1B1712" opacity={0.75}>
    <ellipse cx={-30} cy={-520} rx={9} ry={6} />
    <ellipse cx={34} cy={-490} rx={7} ry={5} />
    <ellipse cx={-16} cy={-470} rx={6} ry={4} />
    <ellipse cx={20} cy={-540} rx={5} ry={4} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="cap" hatColour={C.stoneDark} hair="short" hairColour="#1B1712" beard="none"
      top="shirt" shirt="#E9E2D2" coat={C.stone} lower="shorts" legs="#7A6A55" boots="#2B2420"
      skin={p.skin ?? "#8D5A3B"} age="child"
      pose="up" backPose="carry" action={p.walk ? "walk" : "work"}
      held={() => <Brush f={p.f} />}
      backHeld={() => <Rods />}
      front={<Soot />}
    />
  );
}
