import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Skeleton warrior: a friendly cartoon skeleton seen from the front, in a dented steel helmet, holding a round
// wooden shield (viewer's left) and a short sword (viewer's right). Feet on y = 0, about 1000 px tall at s = 1.
// Bones are separate thin shapes with knobbly joints and gaps between them, not a white blob.
// anim: none | idle (the sword sways gently).
/* eslint-disable @typescript-eslint/no-explicit-any */
const BONE = "#F2EEE3", OUT = "#C9C2B0", EYE = "#2A2620", STEEL = "#9AA3B5", STEEL_D = "#5D6578";
const WOOD = "#8A5A3C", WOOD_D = "#5E3B26", BLADE = "#E9EEF4";
const f1 = (v: number) => v.toFixed(1);

// One bone: a dark outline, the bone stroke, and round knobs at both ends.
const Bone = ({ x1, y1, x2, y2, w }: { x1: number; y1: number; x2: number; y2: number; w: number }) => (
  <g>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={OUT} strokeWidth={w + 8} strokeLinecap="round" />
    <circle cx={x1} cy={y1} r={w * 0.5 + 5} fill={OUT} />
    <circle cx={x2} cy={y2} r={w * 0.5 + 5} fill={OUT} />
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={BONE} strokeWidth={w} strokeLinecap="round" />
    <circle cx={x1} cy={y1} r={w * 0.5 + 1} fill={BONE} />
    <circle cx={x2} cy={y2} r={w * 0.5 + 1} fill={BONE} />
  </g>
);

// A rib: curves from the spine out and down to the side (sx = 1 or -1).
const Rib = ({ y, sx }: { y: number; sx: number }) => (
  <g>
    <path d={`M 0 ${y} Q ${sx * 110} ${y - 16} ${sx * 88} ${y + 48}`} stroke={OUT} strokeWidth={20} fill="none" strokeLinecap="round" />
    <path d={`M 0 ${y} Q ${sx * 110} ${y - 16} ${sx * 88} ${y + 48}`} stroke={BONE} strokeWidth={12} fill="none" strokeLinecap="round" />
  </g>
);

export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip = false } = p as any;
  const sway = p.anim === "idle" ? Math.sin((f * 2 * Math.PI) / 70) * 4 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={170} ry={22} fill={C.shadow} />

      {/* legs: femur, tibia, knobbly ankle and a small foot per side */}
      {[-1, 1].map((sx) => (
        <g key={`leg${sx}`}>
          <Bone x1={sx * 58} y1={-440} x2={sx * 66} y2={-240} w={26} />
          <Bone x1={sx * 66} y1={-240} x2={sx * 62} y2={-60} w={22} />
          <ellipse cx={sx * 74} cy={-18} rx={38} ry={16} fill={BONE} stroke={OUT} strokeWidth={6} />
        </g>
      ))}

      {/* pelvis */}
      <path d="M -96 -492 Q 0 -462 96 -492 Q 112 -440 62 -416 Q 0 -436 -62 -416 Q -112 -440 -96 -492 Z" fill={BONE} stroke={OUT} strokeWidth={6} strokeLinejoin="round" />

      {/* spine: separate vertebrae */}
      {[-470, -504, -538, -572, -606, -640, -674, -708].map((vy) => (
        <rect key={vy} x={-14} y={vy - 11} width={28} height={22} rx={8} fill={BONE} stroke={OUT} strokeWidth={5} />
      ))}

      {/* ribcage: four pairs of separate curved ribs with gaps */}
      {[-650, -612, -574, -536].map((ry) => (
        <g key={ry}>
          <Rib y={ry} sx={1} />
          <Rib y={ry} sx={-1} />
        </g>
      ))}

      {/* collarbones and shoulder joints */}
      <Bone x1={-14} y1={-694} x2={-112} y2={-682} w={14} />
      <Bone x1={14} y1={-694} x2={112} y2={-682} w={14} />

      {/* neck and skull */}
      <rect x={-12} y={-762} width={24} height={34} rx={6} fill={BONE} stroke={OUT} strokeWidth={5} />
      <ellipse cx={0} cy={-858} rx={80} ry={86} fill={BONE} stroke={OUT} strokeWidth={6} />
      <path d="M -52 -790 Q 0 -758 52 -790 Q 50 -748 0 -748 Q -50 -748 -52 -790 Z" fill={BONE} stroke={OUT} strokeWidth={5} strokeLinejoin="round" />
      {[-30, -15, 0, 15, 30].map((tx) => (
        <line key={tx} x1={tx} y1={-786} x2={tx} y2={-768} stroke={EYE} strokeWidth={4} strokeLinecap="round" />
      ))}
      <ellipse cx={-32} cy={-862} rx={22} ry={26} fill={EYE} />
      <ellipse cx={32} cy={-862} rx={22} ry={26} fill={EYE} />
      <circle cx={-27} cy={-870} r={6} fill={C.yellow} />
      <circle cx={37} cy={-870} r={6} fill={C.yellow} />
      <path d="M -11 -818 L 0 -832 L 11 -818 L 0 -800 Z" fill={EYE} />

      {/* steel helmet with a dent and a rim */}
      <path d="M -92 -900 Q -98 -962 0 -968 Q 96 -962 92 -900 Z" fill={STEEL} stroke={STEEL_D} strokeWidth={5} strokeLinejoin="round" />
      <path d="M 30 -950 L 64 -936 L 52 -912 L 28 -922 Z" fill={STEEL_D} opacity={0.55} />
      <rect x={-100} y={-908} width={200} height={16} rx={7} fill={STEEL_D} />

      {/* shoulder-to-elbow and elbow-to-wrist bones: shield arm (viewer left) */}
      <g>
        <Bone x1={-112} y1={-682} x2={-150} y2={-540} w={22} />
        <Bone x1={-150} y1={-540} x2={-122} y2={-446} w={18} />
      </g>
      {/* sword arm (viewer right) */}
      <g>
        <Bone x1={112} y1={-682} x2={152} y2={-540} w={22} />
        <Bone x1={152} y1={-540} x2={150} y2={-440} w={18} />
      </g>

      {/* round wooden shield held by the left hand */}
      <g>
        <circle cx={-172} cy={-448} r={100} fill={WOOD} stroke={WOOD_D} strokeWidth={14} />
        <path d="M -272 -478 L -72 -478 M -272 -448 L -72 -448 M -272 -418 L -72 -418" stroke={WOOD_D} strokeWidth={6} opacity={0.55} />
        <circle cx={-172} cy={-448} r={22} fill="#C9CED8" stroke={STEEL_D} strokeWidth={5} />
      </g>
      <circle cx={-122} cy={-446} r={16} fill={BONE} stroke={OUT} strokeWidth={5} />

      {/* short sword in the right hand, tilted up and to the right */}
      <g transform={`translate(150 -440) rotate(${f1(9 + sway)})`}>
        <path d="M -9 -6 L 9 -6 L 9 -270 L 0 -292 L -9 -270 Z" fill={BLADE} stroke={STEEL_D} strokeWidth={3} strokeLinejoin="round" />
        <rect x={-30} y={-12} width={60} height={12} rx={4} fill={C.yellowDark} />
        <rect x={-6} y={-46} width={12} height={36} rx={4} fill={WOOD} />
        <circle cx={0} cy={-50} r={8} fill={C.yellowDark} />
      </g>
      <circle cx={150} cy={-440} r={16} fill={BONE} stroke={OUT} strokeWidth={5} />
    </g>
  );
}
