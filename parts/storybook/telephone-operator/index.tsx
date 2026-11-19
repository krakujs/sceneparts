import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// 1920s telephone operator: headset on her head, holding a black candlestick telephone in the front hand.
// Preset of storybook/townsfolk. With ringing on, the receiver judders with p.f.
const INK = C.ink;
const BLACK = "#2B2B33";

const Phone: React.FC<{ f: number; ringing: boolean }> = ({ f, ringing }) => {
  const shake = ringing ? Math.sin(f * 1.8) * 4 : 0;
  return (
    <g>
      <ellipse cx={0} cy={124} rx={50} ry={14} fill={BLACK} stroke={INK} strokeWidth={5} />
      <rect x={-12} y={-20} width={24} height={140} rx={6} fill={BLACK} stroke={INK} strokeWidth={5} />
      <path d="M -44 -116 Q -102 -118 -92 -60" stroke={INK} strokeWidth={40} fill="none" strokeLinecap="round" transform={`translate(${shake} 0)`} />
      <path d="M -44 -116 Q -102 -118 -92 -60" stroke={BLACK} strokeWidth={28} fill="none" strokeLinecap="round" transform={`translate(${shake} 0)`} />
      <ellipse cx={0} cy={-102} rx={30} ry={34} fill={BLACK} stroke={INK} strokeWidth={5} />
      <path d="M -14 -122 Q -8 -108 -10 -92" stroke="#FFFFFF" strokeWidth={4} fill="none" opacity={0.4} strokeLinecap="round" />
      <path d="M -30 -20 Q -20 -20 -20 10" stroke="#FFFFFF" strokeWidth={3} fill="none" opacity={0.3} />
    </g>
  );
};

const Headset: React.FC = () => (
  <g>
    <path d="M -40 -548 Q -44 -614 6 -614 Q 58 -612 54 -548" fill="none" stroke={INK} strokeWidth={10} strokeLinecap="round" />
    <path d="M -40 -548 Q -44 -614 6 -614 Q 58 -612 54 -548" fill="none" stroke="#3D3A44" strokeWidth={5} strokeLinecap="round" />
    <rect x={-56} y={-546} width={28} height={44} rx={10} fill="#3D3A44" stroke={INK} strokeWidth={5} />
    <path d="M -40 -504 Q -20 -462 30 -464" fill="none" stroke={INK} strokeWidth={8} strokeLinecap="round" />
    <path d="M -40 -504 Q -20 -462 30 -464" fill="none" stroke="#3D3A44" strokeWidth={4} strokeLinecap="round" />
    <circle cx={40} cy={-464} r={10} fill="#3D3A44" stroke={INK} strokeWidth={4} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0;
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * f} y={p.y} s={p.s} f={f} flip={p.flip}
      hat="none" front={<Headset />} hair="bun" hairColour={p.hairColour}
      top="shirt" shirt={p.blouse ?? C.cream} lower="skirt" legs={p.skirt ?? "#2E7D7A"} boots="#2B2420"
      belt skin={p.skin} pose="forward" backPose="down" action="idle"
      held={() => <Phone f={f} ringing={!!p.ringing} />}
    />
  );
}
