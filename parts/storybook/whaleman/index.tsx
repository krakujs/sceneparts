import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Whaleman: oilskin and knit cap, holding an upright harpoon with a coil of rope over the hip.
const Harpoon = () => (
  <g>
    <rect x={-6} y={-470} width={12} height={560} rx={4} fill="#8D5A3B" stroke={C.ink} strokeWidth={4} />
    <path d="M -14 -472 L 0 -566 L 14 -472 Z" fill="#C9D3DA" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -14 -490 L -36 -504 L -14 -508 Z" fill="#C9D3DA" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
    <path d="M 14 -490 L 36 -504 L 14 -508 Z" fill="#C9D3DA" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
    <path d="M -8 -420 L -8 -300" stroke="#FFFFFF" strokeWidth={3} opacity={0.4} />
  </g>
);

const Coil = () => (
  <g>
    {[-296, -278, -260].map((y) => (
      <ellipse key={y} cx={-30} cy={y} rx={46} ry={22} fill="#D9C49C" stroke={C.ink} strokeWidth={5} />
    ))}
    <ellipse cx={-30} cy={-260} rx={18} ry={9} fill="none" stroke={C.ink} strokeWidth={4} />
  </g>
);

const KnitCap = ({ c }: { c: string }) => (
  <g>
    <path d="M -62 -552 Q -66 -640 4 -642 Q 72 -640 68 -552 Z" fill={c} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-64} y={-566} width={134} height={30} rx={10} fill={C.cream} stroke={C.ink} strokeWidth={6} />
    {[-40, -18, 4, 26, 48].map((x) => (
      <line key={x} x1={x} y1={-560} x2={x} y2={-540} stroke={C.ink} strokeWidth={3} opacity={0.5} />
    ))}
    <path d="M -40 -612 Q -20 -630 6 -616" stroke="#FFFFFF" strokeWidth={5} fill="none" opacity={0.5} strokeLinecap="round" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="none" hair="bald" beard="full" hairColour={p.hairColour}
      skin={p.skin} top="coat" coat={p.coat} buttons={false} lower="trousers" legs="#2C2F3B"
      pose="carry" action="idle"
      held={() => <Harpoon />} body={<Coil />} front={<KnitCap c={p.capColour} />}
    />
  );
}
