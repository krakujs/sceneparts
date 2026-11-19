import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// 1920s typist: blouse with a bow, skirt and cloche hat, carrying a portable typewriter with a sheet of
// paper in the front hand. Preset of storybook/townsfolk.
const INK = C.ink;
const CREAM = "#F4EAD5";

const Typewriter: React.FC = () => (
  <g>
    <rect x={-80} y={-150} width={160} height={120} rx={4} fill={CREAM} stroke={INK} strokeWidth={5} />
    {[-128, -106, -84].map((y) => (
      <line key={y} x1={-60} y1={y} x2={60} y2={y} stroke={C.sepia} strokeWidth={3} opacity={0.6} />
    ))}
    <rect x={-96} y={-66} width={192} height={18} rx={9} fill="#3D3A44" stroke={INK} strokeWidth={5} />
    <rect x={-124} y={-44} width={248} height={92} rx={12} fill="#2E3F5C" stroke={INK} strokeWidth={6} />
    <rect x={-112} y={-30} width={224} height={6} rx={3} fill="#4A5E80" />
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
      <rect key={i} x={-100 + i * 22} y={-10} width={16} height={14} rx={3} fill={CREAM} stroke={INK} strokeWidth={2.5} />
    ))}
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <rect key={i} x={-90 + i * 24} y={14} width={16} height={12} rx={3} fill={CREAM} stroke={INK} strokeWidth={2.5} />
    ))}
    <rect x={-72} y={34} width={144} height={14} rx={5} fill={C.mustard} stroke={INK} strokeWidth={3} />
  </g>
);

const Cloche: React.FC = () => (
  <g>
    <path d="M -64 -536 Q -70 -644 4 -646 Q 76 -642 70 -536 Q 40 -560 4 -560 Q -34 -560 -64 -536 Z" fill={C.brick} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-66} y={-562} width={140} height={14} rx={5} fill={C.brickDark} stroke={INK} strokeWidth={4} />
    <path d="M -36 -618 Q -14 -636 16 -626" stroke="#FFFFFF" strokeWidth={5} fill="none" opacity={0.35} strokeLinecap="round" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0;
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * f} y={p.y} s={p.s} f={f} flip={p.flip}
      hat="none" front={<Cloche />} hair="short" hairColour={p.hairColour}
      top="shirt" shirt={p.blouse ?? CREAM} lower="skirt" legs={p.skirt ?? C.navy} boots="#2B2420"
      skin={p.skin} pose="carry" backPose="carry" action="idle"
      body={
        <path d="M 0 -424 L -20 -440 L -20 -410 Z M 0 -424 L 20 -440 L 20 -410 Z" fill={C.navy} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      }
      held={() => <Typewriter />}
    />
  );
}
