import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Flower seller: shawl and bonnet, a basket of colourful posies on one arm, offering one posy with the other hand.
const Posy: React.FC<{ x?: number; y?: number; c: string; r?: number }> = ({ x = 0, y = 0, c, r = 22 }) => (
  <g transform={`translate(${x} ${y})`}>
    {[0, 72, 144, 216, 288].map((a) => (
      <circle key={a} cx={Math.cos((a * Math.PI) / 180) * r * 0.6} cy={Math.sin((a * Math.PI) / 180) * r * 0.6} r={r * 0.5} fill={c} stroke={C.ink} strokeWidth={3} />
    ))}
    <circle r={r * 0.4} fill={C.mustard} stroke={C.ink} strokeWidth={3} />
  </g>
);

const Basket: React.FC = () => (
  <g transform="translate(0 -30)">
    <path d="M -70 -30 L 70 -30 L 54 30 L -54 30 Z" fill="#B98B52" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -70 -30 Q 0 -110 70 -30" fill="none" stroke={C.ink} strokeWidth={7} />
    <Posy x={-40} y={-44} c={C.brick} />
    <Posy x={0} y={-56} c={C.mustard} />
    <Posy x={40} y={-44} c="#B56FA0" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="bonnet" hatColour={p.hatColour ?? C.cream} hair="bun" hairColour={p.hairColour ?? "#4A3324"} beard="none"
      skin={p.skin} top="dress" coat={p.coat ?? C.brick} shirt={C.cream} lower="long" legs={C.brick}
      scarf={C.mustard} apron apronColour={C.cream} pose="forward" backPose="down" action={p.walk ? "walk" : "idle"}
      body={<path d="M -62 -440 Q 0 -400 62 -440 L 60 -330 Q 0 -300 -60 -330 Z" fill={C.paper} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />}
      backHeld={() => <Basket />}
      held={() => <g transform="translate(0 -10)"><Posy c={C.brick} r={34} /><path d="M 0 22 L 0 120" stroke="#3E7A4A" strokeWidth={6} strokeLinecap="round" /></g>}
    />
  );
}
