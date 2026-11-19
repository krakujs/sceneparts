import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Gong farmer: medieval night-soil worker with a shovel, a wooden bucket, a kerchief over the nose and a lantern.
const Shovel = () => (
  <g>
    <rect x={-6} y={-240} width={12} height={520} rx={5} fill="#8D5A3B" stroke={C.ink} strokeWidth={5} />
    <rect x={-22} y={-252} width={44} height={16} rx={8} fill="#6B4A2E" stroke={C.ink} strokeWidth={4} />
    <path d="M -46 236 L 46 236 L 40 316 Q 0 340 -40 316 Z" fill="#9AA3AD" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -24 262 L -16 296" stroke="#FFFFFF" strokeWidth={4} opacity={0.5} strokeLinecap="round" />
  </g>
);

const Bucket = () => (
  <g transform="translate(250 0)">
    <path d="M -62 -150 Q 0 -236 62 -150" fill="none" stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
    <path d="M -60 -150 L 60 -150 L 48 -10 Q 0 6 -48 -10 Z" fill="#B98B52" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -58 -122 L 56 -122 M -54 -70 L 52 -70" stroke={C.ink} strokeWidth={6} />
    <path d="M -30 -146 L -26 -14 M 14 -146 L 12 -14" stroke="#6B4A2E" strokeWidth={3} opacity={0.6} />
    <path d="M -46 -134 L -40 -90" stroke="#FFFFFF" strokeWidth={5} opacity={0.4} strokeLinecap="round" />
  </g>
);

const Lantern = () => (
  <g>
    <line x1={-74} y1={-262} x2={-74} y2={-236} stroke={C.ink} strokeWidth={4} />
    <circle cx={-74} cy={-212} r={44} fill={C.glow} opacity={0.3} />
    <rect x={-94} y={-236} width={40} height={52} rx={6} fill="#B98B52" stroke={C.ink} strokeWidth={5} />
    <rect x={-86} y={-226} width={24} height={34} rx={3} fill="#FCEBB6" stroke={C.ink} strokeWidth={3} />
    <path d="M -80 -236 Q -74 -252 -68 -236" stroke={C.ink} strokeWidth={4} fill="none" />
  </g>
);

const Kerchief = () => (
  <g>
    <path d="M -50 -488 Q 4 -470 62 -490 L 62 -456 Q 4 -444 -50 -466 Z" fill={C.brick} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -50 -478 L -74 -460 L -60 -448 Z" fill={C.brick} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="kerchief" hatColour="#8A6A45" hair="short" hairColour="#4A3324" top="tunic" coat={p.coat}
      lower="breeches" legs="#5A4A3A" skin={p.skin} pose="carry" action="idle"
      held={() => <Shovel />} body={<Lantern />} front={<><Bucket /><Kerchief /></>}
    />
  );
}
