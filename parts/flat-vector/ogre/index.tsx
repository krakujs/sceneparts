import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Ogre: a big, broad, friendly brute about 1100 px tall at s = 1, seen from the front. A pear-shaped body with a
// big belly, a small head with tusks from the lower jaw and small ears, thick arms hanging to the knees with big
// hands, short thick legs, a rough tunic with a rope belt, and a wooden club in the right hand.
// Feet on y = 0. anim: none | idle (the belly breathes).
/* eslint-disable @typescript-eslint/no-explicit-any */
const TUNIC = "#8A5A3C", TUNIC_D = "#5E3B26", ROPE = "#E9D3A9", TUSK = "#F6EFD8", INK = C.ink, WOOD = "#A87A4F", BOOT = "#3A2A20";
const f1 = (v: number) => v.toFixed(1);

export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip = false } = p as any;
  const skin: string = p.skin && p.skin !== "none" ? p.skin : "#7A9A5C";
  const skinD = shade(skin, 0.18);
  const skinDD = shade(skin, 0.4);
  const breath = p.anim === "idle" ? 1 + Math.sin((f * 2 * Math.PI) / 80) * 0.012 : 1;

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={8} rx={380} ry={30} fill={C.shadow} />

      {/* short thick legs with big boots */}
      {[-1, 1].map((sx) => (
        <g key={`leg${sx}`}>
          <path d={`M ${sx * 120} -340 L ${sx * 128} -70`} stroke={skin} strokeWidth={130} strokeLinecap="round" />
          <ellipse cx={sx * 140} cy={-30} rx={92} ry={38} fill={BOOT} />
        </g>
      ))}

      {/* body: pear shape, breathing scales the belly from its hem */}
      <g transform={`translate(0 -330) scale(1 ${f1(breath)}) translate(0 330)`}>
        {/* tunic */}
        <path d="M -176 -900 Q -270 -884 -306 -744 Q -350 -600 -306 -462 Q -250 -330 0 -330 Q 250 -330 306 -462 Q 350 -600 306 -744 Q 270 -884 176 -900 Q 0 -932 -176 -900 Z" fill={TUNIC} />
        {/* belly highlight and tunic fold */}
        <ellipse cx={0} cy={-560} rx={190} ry={150} fill={TUNIC_D} opacity={0.22} />
        <path d="M -40 -880 Q 0 -840 40 -880" stroke={TUNIC_D} strokeWidth={8} fill="none" strokeLinecap="round" />
        {/* rope belt with a knot */}
        <path d="M -330 -560 Q 0 -530 330 -560 L 330 -530 Q 0 -500 -330 -530 Z" fill={ROPE} />
        <path d="M -330 -560 Q 0 -530 330 -560" stroke={shade(ROPE, 0.2)} strokeWidth={5} fill="none" />
        <circle cx={-26} cy={-512} r={20} fill={ROPE} stroke={shade(ROPE, 0.2)} strokeWidth={5} />
        <circle cx={0} cy={-470} r={0} fill="none" />
        <circle cx={0} cy={-620} r={9} fill={shade(TUNIC, 0.35)} />
      </g>

      {/* neck and small head */}
      <rect x={-52} y={-930} width={104} height={44} fill={skinD} />
      <ellipse cx={0} cy={-1000} rx={112} ry={100} fill={skin} />
      {/* ears */}
      <ellipse cx={-116} cy={-996} rx={26} ry={44} fill={skin} />
      <ellipse cx={116} cy={-996} rx={26} ry={44} fill={skin} />
      <ellipse cx={-116} cy={-996} rx={12} ry={24} fill={skinD} />
      <ellipse cx={116} cy={-996} rx={12} ry={24} fill={skinD} />
      {/* heavy brow */}
      <path d="M -100 -1040 Q -56 -1020 -12 -1036" stroke={skinDD} strokeWidth={18} fill="none" strokeLinecap="round" />
      <path d="M 100 -1040 Q 56 -1020 12 -1036" stroke={skinDD} strokeWidth={18} fill="none" strokeLinecap="round" />
      {/* small friendly eyes */}
      <circle cx={-46} cy={-1002} r={14} fill={C.white} />
      <circle cx={46} cy={-1002} r={14} fill={C.white} />
      <circle cx={-43} cy={-1000} r={8} fill={INK} />
      <circle cx={49} cy={-1000} r={8} fill={INK} />
      {/* wide flat nose */}
      <ellipse cx={0} cy={-962} rx={34} ry={22} fill={skinD} />
      <circle cx={-12} cy={-958} r={4} fill={skinDD} />
      <circle cx={12} cy={-958} r={4} fill={skinDD} />
      {/* big grin with tusks growing up from the lower jaw */}
      <path d="M -76 -936 Q 0 -884 76 -936 Q 0 -910 -76 -936 Z" fill={INK} />
      <path d="M -64 -932 Q -62 -962 -50 -976 Q -44 -950 -34 -932 Z" fill={TUSK} stroke={shade(TUSK, 0.2)} strokeWidth={3} strokeLinejoin="round" />
      <path d="M 64 -932 Q 62 -962 50 -976 Q 44 -950 34 -932 Z" fill={TUSK} stroke={shade(TUSK, 0.2)} strokeWidth={3} strokeLinejoin="round" />

      {/* thick arms hanging to the knees, with big hands */}
      {[-1, 1].map((sx) => (
        <g key={`arm${sx}`}>
          <path d={`M ${sx * 236} -840 L ${sx * 306} -236`} stroke={skin} strokeWidth={112} strokeLinecap="round" />
          <circle cx={sx * 306} cy={-200} r={72} fill={skin} />
          <path d={`M ${sx * 280} -234 L ${sx * 320} -234 M ${sx * 282} -212 L ${sx * 326} -212`} stroke={skinD} strokeWidth={6} strokeLinecap="round" />
        </g>
      ))}

      {/* wooden club held in the right hand (viewer's right) */}
      <g transform="translate(306 -206) rotate(18)">
        <rect x={-18} y={-480} width={36} height={480} rx={16} fill={WOOD} stroke={TUNIC_D} strokeWidth={4} />
        <ellipse cx={0} cy={-520} rx={66} ry={94} fill={TUNIC} stroke={TUNIC_D} strokeWidth={5} />
        <circle cx={-30} cy={-548} r={9} fill={TUNIC_D} />
        <circle cx={28} cy={-492} r={8} fill={TUNIC_D} />
        <circle cx={-6} cy={-466} r={7} fill={TUNIC_D} />
      </g>
    </g>
  );
}
