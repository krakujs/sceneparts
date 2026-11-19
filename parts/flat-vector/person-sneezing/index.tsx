import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Person sneezing: head rocks back then forward on a loop (p.f), tissue in the front hand, spray puff lines.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const cyc = p.f % 96;
  const phase = cyc < 60 ? cyc / 60 : 1 - (cyc - 60) / 36;
  const lean = -4 + Math.sin(Math.min(1, Math.max(0, phase)) * Math.PI) * 0 + phase * -6;
  const burst = cyc > 62 && cyc < 90;
  const sp = Math.max(0, (cyc - 62) / 28);
  return (
    <g transform={`rotate(${p.flip ? -lean : lean} ${p.x + (p.vx ?? 0) * p.f} ${p.y ?? 1560})`}>
      <Person
        {...p}
        x={p.x + (p.vx ?? 0) * p.f}
        f={p.f}
        flip={!!p.flip}
        pose="stand"
        expression="open"
        skin="brown"
        hair="spiky"
        hairColor="black"
        top="tshirt"
        topColor={C.green}
        bottom="shorts"
        bottomColor={C.navy}
        shoes="sneakers"
        shoesColor={C.white}
        held={(h) => (
          <g transform={`translate(${h.x} ${h.y})`}>
            <path d="M -30 -6 L 40 -6 L 36 -90 L -26 -90 Z" fill={C.white} />
            <path d="M -26 -90 L -14 -104 L -2 -90 L 10 -104 L 22 -90 L 36 -104 L 40 -6" fill={C.white} />
            <rect x={-30} y={-6} width={70} height={10} rx={4} fill={C.greyLight} />
          </g>
        )}
        topper={() => (
          <g opacity={burst ? 1 : 0}>
            {[-20, 0, 20].map((a) => {
              const r = (a * Math.PI) / 180;
              const x1 = 100 + Math.cos(r) * (20 + sp * 30);
              const y1 = 40 + Math.sin(r) * (20 + sp * 30);
              return <path key={a} d={`M ${x1} ${y1} L ${x1 + 40 + sp * 40} ${y1 + Math.sin(r) * 30}`} stroke={C.skyDeep} strokeWidth={9} strokeLinecap="round" />;
            })}
          </g>
        )}
      />
    </g>
  );
}
