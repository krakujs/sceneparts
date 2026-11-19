import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Ice cream seller: striped apron and boater, pushing a small cart with a striped canopy.
// Preset of storybook/townsfolk. The cart is drawn in front of him, its handle held in the front hand.
const INK = C.ink;
const CREAM = "#F4EAD5";
const WOOD = "#8A6A45";

// Apron outline: top edge at y=-330 (x ±58), hem at y=-120 (x ±72).
const ax = (y: number, sign: number) => sign * (58 + ((y + 330) * 14) / 210);

const Apron: React.FC<{ stripe: string }> = ({ stripe }) => (
  <g>
    <path d={`M ${ax(-330, -1)} -330 L ${ax(-330, 1)} -330 L ${ax(-120, 1)} -120 L ${ax(-120, -1)} -120 Z`} fill={CREAM} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    {[-300, -256, -212, -168, -124].map((y) => (
      <path key={y} d={`M ${ax(y, -1)} ${y} L ${ax(y, 1)} ${y} L ${ax(y + 16, 1)} ${y + 16} L ${ax(y + 16, -1)} ${y + 16} Z`} fill={stripe} />
    ))}
    <path d="M -34 -440 L -58 -330 M 34 -440 L 58 -330" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>
);

const Cart: React.FC = () => {
  const stripes = [0, 1, 2, 3, 4, 5];
  const w = 230 / stripes.length;
  return (
    <g>
      <rect x={176} y={-196} width={150} height={118} rx={6} fill={C.teal} stroke={INK} strokeWidth={6} />
      <rect x={176} y={-196} width={150} height={16} rx={4} fill={C.mustard} stroke={INK} strokeWidth={4} />
      <path d="M 188 -150 Q 250 -124 314 -150" stroke="#FFFFFF" strokeWidth={5} fill="none" opacity={0.3} strokeLinecap="round" />
      {[0, 1].map((k) => (
        <circle key={k} cx={210 + k * 80} cy={-160} r={14} fill="#F7C6D6" stroke={INK} strokeWidth={4} />
      ))}
      <line x1={180} y1={-196} x2={180} y2={-330} stroke={WOOD} strokeWidth={8} strokeLinecap="round" />
      <line x1={322} y1={-196} x2={322} y2={-330} stroke={WOOD} strokeWidth={8} strokeLinecap="round" />
      {stripes.map((i) => (
        <g key={i}>
          <rect x={166 + i * w} y={-350} width={w} height={40} fill={i % 2 ? CREAM : C.brick} stroke={INK} strokeWidth={4} />
          <circle cx={166 + i * w + w / 2} cy={-310} r={w / 2} fill={i % 2 ? CREAM : C.brick} stroke={INK} strokeWidth={4} />
        </g>
      ))}
      <circle cx={210} cy={-34} r={30} fill={C.ink} stroke={INK} strokeWidth={5} />
      <circle cx={210} cy={-34} r={10} fill={C.stone} />
      <circle cx={298} cy={-34} r={30} fill={C.ink} stroke={INK} strokeWidth={5} />
      <circle cx={298} cy={-34} r={10} fill={C.stone} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0;
  const stripe = p.stripe ?? C.brick;
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * f} y={p.y} s={p.s} f={f} flip={p.flip}
      hat="straw" hatColour={stripe} hair="short" hairColour={p.hairColour} beard="none"
      top="shirt" shirt={CREAM} lower="trousers" legs="#2E3F5C" boots="#2B2420"
      skin={p.skin} pose="carry" backPose="down" action={p.walk ? "walk" : "idle"}
      body={<Apron stripe={stripe} />}
      held={() => <line x1={0} y1={0} x2={44} y2={-4} stroke={WOOD} strokeWidth={12} strokeLinecap="round" />}
      front={p.cart !== false ? <Cart /> : null}
    />
  );
}
