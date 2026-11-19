import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Barber surgeon: apron and rolled sleeves, a straight razor in hand and a brass basin, with a striped pole beside him.
const RolledArm = ({ a, skin }: { a: number; skin: string }) => (
  <g transform={`rotate(${a})`}>
    <rect x={-22} y={-110} width={44} height={112} fill={skin} stroke={C.ink} strokeWidth={5} />
    <rect x={-28} y={-122} width={56} height={16} rx={7} fill="#E6E0D0" stroke={C.ink} strokeWidth={4} />
  </g>
);

const Razor = () => (
  <g>
    <rect x={0} y={-12} width={44} height={24} rx={8} fill="#1B1712" stroke={C.ink} strokeWidth={4} />
    <path d="M 0 -6 L -96 -34 L -92 -24 L 0 6 Z" fill="#C9D3DA" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
  </g>
);

const Basin = () => (
  <g transform="translate(40 0)">
    <path d="M -62 -26 L 62 -26 Q 58 34 0 38 Q -58 34 -62 -26 Z" fill={C.mustard} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <ellipse cx={0} cy={-26} rx={62} ry={12} fill="#F5D27A" stroke={C.ink} strokeWidth={5} />
    <path d="M -40 -6 Q -36 14 -22 22" stroke="#FFFFFF" strokeWidth={5} fill="none" opacity={0.5} strokeLinecap="round" />
  </g>
);

const Pole = () => (
  <g>
    <ellipse cx={300} cy={0} rx={62} ry={12} fill="#000" opacity={0.2} />
    <rect x={280} y={-760} width={40} height={760} rx={6} fill={C.cream} stroke={C.ink} strokeWidth={6} />
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => (
      <line key={k} x1={280} y1={-740 + k * 76} x2={320} y2={-706 + k * 76} stroke={C.brick} strokeWidth={14} />
    ))}
    <ellipse cx={300} cy={-762} rx={28} ry={10} fill={C.mustard} stroke={C.ink} strokeWidth={5} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="flat" hatColour="#4A4E5E" hair="short" hairColour={p.hairColour} beard="moustache"
      skin={p.skin} top="waistcoat" coat={p.coat} shirt="#E6E0D0" apron apronColour={C.cream}
      lower="trousers" legs="#4A4E5E" pose="chest" backPose="carry" action="idle"
      held={(a) => <><RolledArm a={a} skin={p.skin} /><Razor /></>}
      backHeld={() => <Basin />} front={<Pole />}
    />
  );
}
