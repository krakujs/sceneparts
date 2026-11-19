import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { lit, mix, rnd, asTime } from "../backdrop/index";

// Concert stage: lighting truss with moving coloured beams, a big back screen, speakers at the sides and a crowd silhouette in front.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time);
  const beams = [p.beam1 ?? C.pink, p.beam2 ?? C.teal, p.beam3 ?? C.yellow];
  const sweep = (i: number) => (drift ? Math.sin(f / 26 + i * 2.1) * 260 : (i - 1) * 180);
  const floorY = 1180;
  return (
    <g>
      <rect x={0} y={0} width={1080} height={1920} fill={L(C.navy)} />
      {/* back screen with abstract shapes */}
      <rect x={200} y={300} width={680} height={420} rx={12} fill={L(C.purpleDark)} />
      <circle cx={540} cy={510} r={150} fill={L(C.purple)} opacity={0.6} />
      <path d="M 200 720 Q 360 560 540 660 T 880 600 L 880 720 L 200 720 Z" fill={L(C.blueDark)} />
      {/* moving beams from the truss */}
      {beams.map((c, i) => {
        const x0 = 200 + i * 340, tx = 540 + sweep(i);
        return <path key={i} d={`M ${x0 - 30} 150 L ${x0 + 30} 150 L ${tx + 260} ${floorY} L ${tx - 260} ${floorY} Z`} fill={L(c)} opacity={0.22} />;
      })}
      {/* lighting truss with fixtures */}
      <rect x={120} y={130} width={840} height={26} rx={13} fill={L(C.greyDark)} />
      {[0, 1, 2].map((i) => <rect key={i} x={200 + i * 340 - 26} y={156} width={52} height={36} rx={8} fill={L(C.inkSoft)} />)}
      {beams.map((c, i) => <circle key={i} cx={200 + i * 340} cy={180} r={9} fill={L(c)} />)}
      {/* stage platform */}
      <rect x={0} y={floorY} width={1080} height={70} fill={L(C.greyDark)} />
      <rect x={0} y={floorY} width={1080} height={12} fill={L(C.grey)} />
      {/* speaker stacks at the sides */}
      {[{ x: 40 }, { x: 900 }].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={floorY - 300} width={140} height={300} rx={10} fill={L(C.ink)} />
          <circle cx={s.x + 70} cy={floorY - 230} r={44} fill={L(C.inkSoft)} />
          <circle cx={s.x + 70} cy={floorY - 230} r={20} fill={L(C.greyDark)} />
          <circle cx={s.x + 70} cy={floorY - 90} r={34} fill={L(C.inkSoft)} />
          <circle cx={s.x + 70} cy={floorY - 90} r={14} fill={L(C.greyDark)} />
        </g>
      ))}
      {/* crowd silhouettes along the bottom edge, in front of the stage */}
      {new Array(16).fill(0).map((_, i) => {
        const x = -20 + i * 70 + rnd(4, i) * 30, hy = 1760 + rnd(4, i + 30) * 40, r = 34 + rnd(4, i + 60) * 8;
        const bob = drift ? Math.sin(f / 14 + i) * 4 : 0;
        const body = L(C.purpleDark);
        return (
          <g key={i} transform={`translate(0 ${bob})`}>
            <rect x={x - 40} y={hy + r} width={80} height={200} rx={30} fill={body} />
            <circle cx={x} cy={hy} r={r} fill={body} />
          </g>
        );
      })}
    </g>
  );
}
