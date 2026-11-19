import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Waterfall pouring over a natural rock ledge into a pool, with angular sand-brown rock on both sides,
// splash foam, ripples and a little moss. Origin = centre of the pool's front edge.
// About 1000 px wide and 720 px tall at s = 1.
/* eslint-disable @typescript-eslint/no-explicit-any */
const f1 = (v: number) => v.toFixed(1);
const col = (v: any, d: string) => (v && v !== "none" ? v : d);
const poly = (pts: number[][]) => `M ${pts.map(([a, b]) => `${a} ${b}`).join(" L ")} Z`;

// Left and right rock masses, meeting the ledge lip at the top centre.
const LEFT = [[-520, -190], [-470, -330], [-430, -420], [-350, -480], [-300, -520], [-220, -585], [-150, -615], [-96, -660], [-50, -706], [-40, -714], [-40, -560], [-80, -300], [-90, -190]];
const RIGHT = [[40, -688], [70, -640], [140, -600], [210, -545], [270, -520], [340, -470], [400, -410], [450, -340], [490, -270], [520, -200], [520, -170], [60, -170], [60, -300], [40, -520]];
// Facets: sand on the lit upper planes, shade on the shadow planes.
const LEFT_SAND = [[-520, -190], [-470, -330], [-430, -420], [-350, -480], [-300, -420], [-380, -300], [-400, -200]];
const LEFT_SAND2 = [[-300, -520], [-220, -585], [-150, -615], [-190, -520], [-260, -470]];
const LEFT_SHADE = [[-220, -390], [-170, -320], [-120, -330], [-150, -250], [-96, -190], [-160, -190]];
const RIGHT_SAND = [[140, -600], [210, -545], [270, -520], [240, -460], [170, -500]];
const RIGHT_SHADE = [[270, -520], [340, -470], [400, -410], [450, -340], [490, -270], [520, -200], [440, -260], [360, -380], [300, -430]];
// Dark recess behind the falling water.
const BACKWALL = [[-44, -708], [42, -692], [78, -190], [-84, -190]];
// The falling sheet of water, wider at the bottom.
const FALL = [[-42, -704], [40, -692], [84, -196], [-80, -196]];
const STREAKS: [number, number, number][] = [[-22, 40, 0], [-6, 60, 1], [12, 46, 2], [24, 34, 3], [-40, 26, 4]];
// Mossy bushes on the rock lips.
const BUSHES: [number, number, number, number][] = [[-160, -628, 34, 0], [-108, -658, 40, 1], [-64, -700, 26, 0], [150, -598, 30, 1], [194, -618, 36, 0], [246, -570, 26, 1]];

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const water = col(p.color, "#8EC5E8");
  const foam = col(p.color2, C.white);
  const anim: string = p.anim ?? "none";
  const flow = anim === "flow";
  const rock = C.brown;
  const rockLit = C.sand;
  const rockDark = shade(C.brown, 0.25);
  const fall = shade(water, -0.3);
  const pool = shade(water, 0.12);
  // ripple rings spread out from the splash point in flow mode
  const rings = [0, 1, 2].map((k) => {
    const ph = flow ? ((f + k * 20) % 60) / 60 : 0.35 + k * 0.2;
    return { rx: 70 + 150 * ph, op: 0.75 * (1 - ph) };
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* rock behind the water */}
      <path d={poly(LEFT)} fill={rock} />
      <path d={poly(RIGHT)} fill={rock} />
      <path d={poly(LEFT_SAND)} fill={rockLit} />
      <path d={poly(LEFT_SAND2)} fill={rockLit} />
      <path d={poly(LEFT_SHADE)} fill={rockDark} />
      <path d={poly(RIGHT_SAND)} fill={rockLit} />
      <path d={poly(RIGHT_SHADE)} fill={rockDark} />
      <path d={poly(BACKWALL)} fill={rockDark} />
      {/* moss */}
      {BUSHES.map(([bx, by, r, v], i) => (
        <g key={i}>
          <circle cx={bx} cy={by} r={r} fill={v ? C.green : C.greenDark} />
          <circle cx={bx + r * 0.5} cy={by - r * 0.3} r={r * 0.7} fill={v ? C.green : C.green} />
        </g>
      ))}
      {/* falling water */}
      <path d={poly(FALL)} fill={fall} />
      <path d={poly([[-42, -704], [-10, -700], [-18, -200], [-80, -196]])} fill={water} opacity={0.5} />
      {STREAKS.map(([sx, len, k], i) => (
        <path key={i} d={`M ${sx} ${-700 + 10 * k} L ${sx + (i % 2 ? 3 : -3)} ${-700 + 10 * k + 480}`} stroke={foam} strokeWidth={6} strokeLinecap="round" fill="none" opacity={0.85}
          strokeDasharray={`${len * 4} ${120 + k * 18}`} strokeDashoffset={flow ? -f * (6 + k) : 0} />
      ))}
      {/* pool */}
      <path d="M -520 -176 L 520 -176 L 520 -60 Q 260 0 0 0 Q -260 0 -520 -60 Z" fill={pool} />
      {/* ripples and splash at the foot of the fall */}
      {rings.map((r, i) => (
        <ellipse key={i} cx={0} cy={-180} rx={r.rx} ry={r.rx * 0.2} fill="none" stroke={foam} strokeWidth={5} opacity={r.op} />
      ))}
      <ellipse cx={0} cy={-184} rx={112} ry={24} fill={foam} opacity={0.9} />
      <ellipse cx={-70} cy={-180} rx={30} ry={11} fill={foam} opacity={0.8} />
      <ellipse cx={72} cy={-182} rx={28} ry={10} fill={foam} opacity={0.8} />
      {/* spray drops */}
      {[[-96, -212], [-40, -232], [52, -226], [100, -206]].map(([dx, dy], i) => {
        const lift = flow ? Math.abs(Math.sin(f / 10 + i * 1.3)) * 18 : 0;
        return <circle key={i} cx={dx} cy={dy - lift} r={7} fill={foam} />;
      })}
      {/* boulders at the pool edges, in front */}
      <path d={poly([[-520, -120], [-456, -178], [-402, -150], [-420, -64], [-520, -22]])} fill={rock} />
      <path d={poly([[-520, -120], [-456, -178], [-470, -120], [-520, -92]])} fill={rockLit} />
      <path d={poly([[520, -110], [462, -170], [414, -140], [430, -60], [520, -24]])} fill={rock} />
      <path d={poly([[462, -170], [414, -140], [440, -128], [480, -150]])} fill={rockDark} />
    </g>
  );
}
