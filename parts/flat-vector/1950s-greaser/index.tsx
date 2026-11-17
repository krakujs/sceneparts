import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person, poseAt } from "../person/index";
import type { Pose } from "../person/index";
import { C, hairColour } from "../style/index";

// 1950s greaser preset: quiffed hair, black leather jacket over a white t-shirt, rolled jeans and a comb in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
const HIP = -470, TH = 235, SH = 215;
const rad = (d: number) => (d * Math.PI) / 180;
const pt = (x: number, y: number, a: number, l: number): [number, number] => [x + Math.sin(rad(a)) * l, y + Math.cos(rad(a)) * l];
// Shin of the back (hipX -24) or front (26) leg in body space, matching the generator's legs.
const shin = (hipX: number, l: [number, number]) => {
  const k = pt(hipX, HIP, l[0], TH);
  const a = l[0] - l[1];
  return { k, a, an: pt(k[0], k[1], a, SH) };
};

export default function Part(p: PartProps<any>) {
  const P = poseAt((p.pose ?? "stand") as Pose, p.f);
  const legs = [shin(-24, P.bl), shin(26, P.fl)];
  const hc = hairColour(p.hairColor ?? "black");
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      age="adult"
      top="blazer"
      topColor={C.ink}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.blueDark}
      shoes="boots"
      shoesColor={C.ink}
      hat="none"
      over={() => (
        <g>
          <g transform={`rotate(${-P.lean} 0 ${HIP})`}>
            {legs.map((L, i) => {
              const s = pt(L.k[0], L.k[1], L.a, SH * 0.78);
              return <path key={i} d={`M ${s[0]} ${s[1]} L ${L.an[0]} ${L.an[1]}`} stroke={C.skyDeep} strokeWidth={80} strokeLinecap="butt" />;
            })}
          </g>
          <path d="M -22 -812 L 52 -812 L 50 -470 L -20 -470 Z" fill={C.white} />
        </g>
      )}
      topper={() => (
        <g transform="translate(0 -100) scale(1.3) translate(0 100)">
          <path d="M -44 -62 Q -40 -150 26 -152 Q 92 -150 96 -92 Q 62 -122 22 -116 Q -8 -106 -44 -62 Z" fill={hc} />
          <path d="M -26 -92 Q -8 -132 30 -128 Q 0 -110 -26 -92 Z" fill={hc} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-70) scale(1.6)`}>
          <rect x={-40} y={-9} width={80} height={18} rx={4} fill={C.grey} />
          {[-34, -22, -10, 2, 14, 26, 38].map((x) => (
            <path key={x} d={`M ${x} -6 L ${x} 14`} stroke={C.greyDark} strokeWidth={4} strokeLinecap="round" />
          ))}
        </g>
      )}
    />
  );
}
