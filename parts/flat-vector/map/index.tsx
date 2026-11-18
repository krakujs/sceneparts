import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// A partly unfolded paper map standing on its edge, with fold panels, generic land and water,
// a dashed route and a red pin. Origin = bottom centre (the sheet rests on y). About 760 px wide and 720 px tall at s = 1.
// anim "route": the dashed route draws in over the first 60 frames.
const f1 = (v: number) => v.toFixed(1);
const LAND_A = "M -260 -600 L -150 -640 L -60 -610 L -40 -520 L -100 -470 L -200 -490 L -250 -540 Z";
const LAND_B = "M 40 -420 L 140 -440 L 200 -380 L 180 -300 L 100 -280 L 50 -320 Z";
const LAND_C = "M -220 -300 L -120 -320 L -90 -240 L -160 -190 L -230 -230 Z";
const SEA = "M -300 -120 Q -200 -170 -60 -130 Q 0 -110 40 -170 L 40 -20 L -300 -20 Z";
// The dashed route is built from two quadratic curves and sampled, so the reveal can cut it by length without clip paths.
type Pt = [number, number];
const quad = (a: Pt, c: Pt, b: Pt, t: number): Pt => [
  (1 - t) ** 2 * a[0] + 2 * (1 - t) * t * c[0] + t * t * b[0],
  (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * c[1] + t * t * b[1],
];
const SEGS: [Pt, Pt, Pt][] = [[[-180, -120], [-60, -200], [0, -330]], [[0, -330], [60, -430], [150, -500]]];
const ROUTE_PTS: Pt[] = [];
SEGS.forEach(([a, c, b], k) => {
  for (let i = k ? 1 : 0; i <= 120; i++) ROUTE_PTS.push(quad(a, c, b, i / 120));
});
const CUM: number[] = [0];
for (let i = 1; i < ROUTE_PTS.length; i++) {
  CUM.push(CUM[i - 1] + Math.hypot(ROUTE_PTS[i][0] - ROUTE_PTS[i - 1][0], ROUTE_PTS[i][1] - ROUTE_PTS[i - 1][1]));
}
const ROUTE_LEN = CUM[CUM.length - 1];
// Dashes of 26 px with 20 px gaps, drawn only up to the given length along the route.
const dashes = (limit: number) => {
  let d = "";
  for (let s0 = 0; s0 < limit; s0 += 46) {
    const s1 = Math.min(s0 + 26, limit);
    let first = true;
    for (let i = 0; i < ROUTE_PTS.length; i++) {
      if (CUM[i] >= s0 && CUM[i] <= s1) {
        d += `${first ? "M" : "L"} ${f1(ROUTE_PTS[i][0])} ${f1(ROUTE_PTS[i][1])} `;
        first = false;
      }
    }
  }
  return d;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const paper = p.color && p.color !== "none" ? p.color : C.paper;
  const route = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const anim: string = p.anim ?? "none";
  const reveal = anim === "route" ? Math.min(1, f / 60) : 1;
  const water = C.skyDeep, land = "#B9DC8C";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={260} ry={14} fill={C.shadow} />
      {/* folded panels behind the sheet */}
      <path d="M -300 -720 L -372 -690 L -372 -40 L -300 -20 Z" fill={shade(paper, 0.12)} />
      <path d="M 300 -720 L 372 -690 L 372 -40 L 300 -20 Z" fill={shade(paper, 0.12)} />
      {/* main sheet */}
      <rect x={-300} y={-720} width={600} height={700} rx={12} fill={paper} />
      <path d={LAND_A} fill={land} />
      <path d={LAND_B} fill={land} />
      <path d={LAND_C} fill={land} />
      <path d={SEA} fill={water} />
      <ellipse cx={150} cy={-150} rx={50} ry={28} fill={water} />
      <path d="M 40 -170 Q 80 -260 60 -330 Q 40 -380 -10 -440" stroke={water} strokeWidth={14} strokeLinecap="round" fill="none" />
      {/* fold creases */}
      <path d="M -100 -720 L -100 -20 M 100 -720 L 100 -20 M -300 -360 L 300 -360" stroke={shade(paper, 0.12)} strokeWidth={4} fill="none" />
      {/* dashed route, drawn in along its length */}
      <path d={dashes(ROUTE_LEN * reveal)} stroke={C.blue} strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* red pin, enlarged so it reads at phone size */}
      <g transform="translate(150 -520) scale(1.4) translate(-150 520)">
        <path d="M 124 -520 A 26 26 0 1 1 176 -520 Q 176 -500 150 -478 Q 124 -500 124 -520 Z" fill={route} />
        <circle cx={150} cy={-520} r={9} fill={C.white} />
      </g>
    </g>
  );
}
