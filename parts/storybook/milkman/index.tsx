import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Milkman: white coat and cap, carrying a wire crate of glass milk bottles in the front hand.
// Preset of storybook/townsfolk. Crate is drawn in the hand frame (origin = handle grip).
const INK = C.ink;
const GLASS = "#D7E3E2";
const WIRE = "#9AA4AE";

const Crate: React.FC = () => (
  <g>
    <path d="M -74 -6 Q 0 -96 74 -6" fill="none" stroke={INK} strokeWidth={14} strokeLinecap="round" />
    <path d="M -74 -6 Q 0 -96 74 -6" fill="none" stroke={WIRE} strokeWidth={6} strokeLinecap="round" />
    {[-66, -22, 22, 66].map((x) => (
      <g key={x}>
        <rect x={x - 16} y={0} width={32} height={92} rx={10} fill={GLASS} stroke={INK} strokeWidth={4} />
        <rect x={x - 12} y={22} width={24} height={64} rx={6} fill="#FFFFFF" opacity={0.85} />
        <rect x={x - 7} y={-14} width={14} height={18} fill={GLASS} stroke={INK} strokeWidth={3} />
        <rect x={x - 10} y={-24} width={20} height={10} rx={2} fill={C.cream} stroke={INK} strokeWidth={3} />
        <path d={`M ${x - 9} 8 L ${x - 9} 30`} stroke="#FFFFFF" strokeWidth={4} strokeLinecap="round" opacity={0.8} />
      </g>
    ))}
    <rect x={-112} y={-8} width={224} height={122} rx={6} fill="none" stroke={INK} strokeWidth={6} />
    {[-44, 0, 44].map((x) => <line key={x} x1={x} y1={-8} x2={x} y2={114} stroke={WIRE} strokeWidth={4} />)}
    <line x1={-112} y1={50} x2={112} y2={50} stroke={WIRE} strokeWidth={4} />
    <rect x={-120} y={108} width={240} height={14} rx={4} fill={C.sepia} stroke={INK} strokeWidth={5} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0;
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * f} y={p.y} s={p.s} f={f} flip={p.flip}
      hat="cap" hatColour={p.coat ?? "#F4EAD5"} hair="short" hairColour={p.hairColour} beard="moustache"
      top="coat" coat={p.coat ?? "#F4EAD5"} lower="trousers" legs="#2E3F5C" boots="#2B2420"
      skin={p.skin} pose="carry" backPose="down" action={p.walk ? "walk" : "idle"}
      held={() => <Crate />}
    />
  );
}
