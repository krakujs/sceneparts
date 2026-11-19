import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Samurai warrior: lacquered plate armour with lacing, a crescent-crest helmet and a sheathed sword at the hip.
const Lacing = ({ c }: { c: string }) => (
  <g>
    {[-400, -362, -324, -286].map((y) => (
      <path key={y} d={`M -70 ${y} Q 0 ${y + 8} 70 ${y}`} stroke={c} strokeWidth={8} fill="none" strokeLinecap="round" />
    ))}
    <path d="M -70 -440 L 70 -440" stroke={C.ink} strokeWidth={4} opacity={0.5} />
  </g>
);

const Sword = () => (
  <g>
    <path d="M -36 -236 L -150 -40" stroke={C.ink} strokeWidth={28} strokeLinecap="round" />
    <path d="M -36 -236 L -150 -40" stroke="#6B4A2E" strokeWidth={16} strokeLinecap="round" />
    <path d="M -36 -236 L -62 -282" stroke={C.ink} strokeWidth={20} strokeLinecap="round" />
    <path d="M -36 -236 L -62 -282" stroke="#2B2420" strokeWidth={11} strokeLinecap="round" />
    <circle cx={-36} cy={-236} r={15} fill={C.mustard} stroke={C.ink} strokeWidth={5} />
  </g>
);

const Helmet = ({ c }: { c: string }) => (
  <g>
    {/* flared neck guard */}
    <path d="M -70 -560 L -112 -470 Q -40 -488 -20 -500 L -10 -560 Z" fill={c} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -84 -530 L -40 -538 M -98 -500 L -30 -514" stroke={C.mustard} strokeWidth={5} />
    <path d="M -66 -548 Q -72 -644 4 -650 Q 78 -644 72 -548 Z" fill={c} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -80 -550 Q 0 -566 86 -550 L 76 -532 Q 0 -544 -70 -532 Z" fill={c} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    {/* two-horn crescent crest */}
    <path d="M 40 -620 Q 30 -700 -30 -730 Q 10 -690 22 -620 Z" fill={C.mustard} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 40 -620 Q 70 -700 130 -720 Q 80 -680 56 -616 Z" fill={C.mustard} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
    <circle cx={44} cy={-616} r={12} fill={C.mustard} stroke={C.ink} strokeWidth={5} />
    <path d="M -54 -604 Q -40 -626 -12 -622" stroke="#FFFFFF" strokeWidth={5} fill="none" opacity={0.35} strokeLinecap="round" />
  </g>
);

const Plates = ({ c, lace }: { c: string; lace: string }) => (
  <g>
    {/* tiered armour skirt */}
    {[0, 1].map((k) => (
      <path key={k} d={`M ${-82 - k * 10} ${-290 + k * 50} L ${82 + k * 10} ${-290 + k * 50} L ${100 + k * 12} ${-226 + k * 50} L ${-100 - k * 12} ${-226 + k * 50} Z`} fill={c} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    ))}
    {[-60, -20, 20, 60].map((x) => <path key={x} d={`M ${x} -286 L ${x * 1.15} -180`} stroke={lace} strokeWidth={5} opacity={0.9} />)}
  </g>
);

const Shoulder = ({ c, lace }: { c: string; lace: string }) => (
  <g>
    <path d="M -30 -470 L 72 -470 L 82 -360 L -20 -360 Z" fill={c} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    {[-440, -410, -380].map((y) => <path key={y} d={`M -24 ${y} L 78 ${y}`} stroke={lace} strokeWidth={6} />)}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="none" hair="bald" top="uniform" coat={p.coat} shirt={p.lacing} buttons={false}
      lower="trousers" legs="#2C2F3B" boots="#2B2420" skin={p.skin} pose="down" action="idle"
      body={<><Lacing c={p.lacing} /><Plates c={p.coat} lace={p.lacing} /><Sword /></>} front={<><Helmet c={p.coat} /><Shoulder c={p.coat} lace={p.lacing} /></>}
    />
  );
}
