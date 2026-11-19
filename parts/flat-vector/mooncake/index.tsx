import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// One whole round mooncake seen from a three-quarter top view: a fluted (scalloped) golden-brown rim, a flat top with
// an embossed flower in a darker brown, and a small highlight. No wedge is cut. Optional small plate underneath.
// Origin = bottom centre (the cake's lowest edge, or the plate's front edge, rests on y). About 510 px wide at s = 1.
const f1 = (v: number) => v.toFixed(1);
const R = 230, N = 14, BUMP = 34, SQ = 0.78, SIDE = 56;

const P = (a: number, rad: number) => `${f1(rad * Math.cos(a))} ${f1(rad * Math.sin(a))}`;

// Scalloped outline: N outward bulges between vertices on radius R (unit-circle coordinates).
const OUTLINE = (() => {
  let d = "";
  for (let i = 0; i < N; i++) {
    const a0 = (2 * Math.PI * i) / N, a1 = (2 * Math.PI * (i + 1)) / N, am = (a0 + a1) / 2;
    d += i === 0 ? `M ${P(a0, R)} ` : "";
    d += `Q ${P(am, R + 2 * BUMP)} ${P(a1, R)} `;
  }
  return d + "Z";
})();

// Flower: eight petals around a centre, in unit-circle coordinates.
const PETALS = Array.from({ length: 8 }, (_, k) => k * 45);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 1560;
  const cake = p.color && p.color !== "none" ? p.color : "#D99A4E";
  const plateCol = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const plate = p.plate !== false;
  // vertical position of the cake's top face centre, so the cake's lowest edge sits on the plate (or on y)
  const yc = plate ? -340 : -260;
  const petal = shade(cake, 0.3);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${s})`}>
      {plate ? (
        <g>
          <ellipse cx={0} cy={-80} rx={330} ry={80} fill={plateCol} />
          <ellipse cx={0} cy={-88} rx={286} ry={62} fill={C.greyLight} />
        </g>
      ) : (
        <ellipse cx={0} cy={0} rx={260} ry={16} fill={C.shadow} />
      )}
      {/* the side of the cake: the outline stacked down the height of the cake, in a shade */}
      {Array.from({ length: 10 }, (_, k) => (
        <path key={k} d={OUTLINE} transform={`translate(0 ${f1(yc + (SIDE * k) / 9)}) scale(1 ${SQ})`} fill={shade(cake, 0.3)} />
      ))}
      {/* top face: scalloped rim, then the flat top */}
      <g transform={`translate(0 ${f1(yc)}) scale(1 ${SQ})`}>
        <path d={OUTLINE} fill={shade(cake, 0.1)} />
        {/* fluting: a groove at each scallop vertex */}
        {Array.from({ length: N }, (_, k) => {
          const a = (2 * Math.PI * k) / N;
          return <line key={k} x1={f1(0.84 * R * Math.cos(a))} y1={f1(0.84 * R * Math.sin(a))} x2={f1(R * Math.cos(a))} y2={f1(R * Math.sin(a))} stroke={shade(cake, 0.32)} strokeWidth={5} strokeLinecap="round" />;
        })}
        <circle cx={0} cy={0} r={0.84 * R} fill={cake} />
        {/* embossed flower */}
        {PETALS.map((deg) => (
          <ellipse key={deg} cx={0} cy={-62} rx={24} ry={56} transform={`rotate(${deg})`} fill={petal} />
        ))}
        <circle cx={0} cy={0} r={30} fill={shade(cake, 0.4)} />
        {/* a little highlight */}
        <ellipse cx={-100} cy={-120} rx={70} ry={24} transform="rotate(-30 -100 -120)" fill={C.white} opacity={0.28} />
      </g>
    </g>
  );
}
