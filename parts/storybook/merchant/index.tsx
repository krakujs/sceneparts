import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Merchant: fur-trimmed coat and top hat, holding a small balance scale in the front hand and a coin purse
// in the back hand. Preset of storybook/townsfolk; props are drawn in their hand frames (origin = hand).
const INK = C.ink;
const BRASS = "#D9A441";
const FUR = "#EADBBE";

const Scales: React.FC = () => (
  <g>
    <rect x={-6} y={-170} width={12} height={290} rx={4} fill="#8A6A45" stroke={INK} strokeWidth={5} />
    <ellipse cx={0} cy={120} rx={44} ry={13} fill={BRASS} stroke={INK} strokeWidth={5} />
    <circle cx={0} cy={-178} r={9} fill={BRASS} stroke={INK} strokeWidth={4} />
    <line x1={-96} y1={-150} x2={96} y2={-150} stroke={INK} strokeWidth={12} strokeLinecap="round" />
    <line x1={-96} y1={-150} x2={96} y2={-150} stroke={BRASS} strokeWidth={6} strokeLinecap="round" />
    {[-96, 96].map((x) => (
      <g key={x}>
        <line x1={x} y1={-150} x2={x - 36} y2={-70} stroke={INK} strokeWidth={4} />
        <line x1={x} y1={-150} x2={x + 36} y2={-70} stroke={INK} strokeWidth={4} />
        <path d={`M ${x - 56} -70 L ${x + 56} -70 Q ${x + 46} -28 ${x} -26 Q ${x - 46} -28 ${x - 56} -70 Z`} fill={BRASS} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      </g>
    ))}
    <circle cx={-96} cy={-82} r={9} fill="#F2B544" stroke={INK} strokeWidth={3} />
    <circle cx={-86} cy={-88} r={9} fill="#F2B544" stroke={INK} strokeWidth={3} />
  </g>
);

const Purse: React.FC = () => (
  <g>
    <path d="M -36 -14 Q -44 -52 0 -54 Q 44 -52 36 -14 Q 44 26 0 32 Q -44 26 -36 -14 Z" fill="#7E4A2E" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -22 -50 Q 0 -30 22 -50" stroke={BRASS} strokeWidth={6} fill="none" strokeLinecap="round" />
    <circle cx={0} cy={-8} r={7} fill={BRASS} stroke={INK} strokeWidth={3} />
    <path d="M -22 -6 q 6 -8 12 0" stroke="#FFFFFF" strokeWidth={3} fill="none" opacity={0.5} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0;
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * f} y={p.y} s={p.s} f={f} flip={p.flip}
      hat="top" hatColour="#1B1712" hair="short" hairColour={p.hairColour} beard="moustache"
      top="coat" coat={p.coat ?? C.brickDark} shirt={C.cream} lower="trousers" legs={C.navy} belt
      skin={p.skin} pose="forward" backPose="carry" action="idle"
      body={
        <g>
          <path d="M -60 -452 Q 0 -414 62 -452 Q 74 -420 62 -396 Q 0 -370 -62 -396 Q -74 -420 -60 -452 Z" fill={FUR} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          {[-40, -12, 16, 44].map((x) => <circle key={x} cx={x} cy={-420 + (x % 3)} r={3} fill={INK} opacity={0.5} />)}
          {[-80, -60, -40, -20, 0, 20, 40, 60, 80].map((x) => <circle key={x} cx={x} cy={-196} r={11} fill={FUR} stroke={INK} strokeWidth={3} />)}
          <rect x={-92} y={-206} width={184} height={22} rx={10} fill={FUR} stroke={INK} strokeWidth={4} />
          <path d="M -30 -368 Q 0 -340 30 -368" stroke={BRASS} strokeWidth={6} fill="none" strokeLinecap="round" />
        </g>
      }
      held={() => <Scales />}
      backHeld={() => <Purse />}
    />
  );
}
