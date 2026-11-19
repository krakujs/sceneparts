import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Bus station: a long canopy over several bays, with a departures board with blank lines and a small kiosk.
// Origin = floor centre. About 1000 px wide and 620 px tall at s = 1.
// anim "lights": the board's lamp and the canopy lamps glow in turn.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const roof = p.color && p.color !== "none" ? p.color : C.blue;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const lamp = (i: number) => (anim === "lights" ? 0.3 + 0.7 * (0.5 + 0.5 * Math.sin((f - i * 12) / 6)) : 0.95);
  const posts = [-460, -230, 0, 230, 460];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={500} ry={22} fill={C.shadow} />
      {/* bay floor */}
      <rect x={-500} y={-30} width={1000} height={30} rx={6} fill={C.grey} />
      {/* long canopy */}
      <rect x={-500} y={-420} width={1000} height={34} rx={8} fill={roof} />
      <rect x={-500} y={-392} width={1000} height={12} rx={4} fill={shade(roof, 0.25)} />
      {posts.map((px) => (
        <rect key={px} x={px - 10} y={-390} width={20} height={360} fill={frame} />
      ))}
      {/* back wall with glass panels */}
      <rect x={-470} y={-380} width={940} height={350} fill={C.greyLight} opacity={0.4} />
      {[-440, -210, 20, 250].map((gx) => (
        <rect key={gx} x={gx} y={-360} width={190} height={300} rx={6} fill={C.skyDeep} />
      ))}
      {/* departures board with blank lines */}
      <rect x={-130} y={-340} width={260} height={150} rx={10} fill={C.ink} />
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <rect x={-110} y={-318 + k * 32} width={150} height={12} rx={4} fill={C.skyDeep} opacity={0.5} />
          <rect x={60} y={-318 + k * 32} width={50} height={12} rx={4} fill={C.yellow} opacity={0.6} />
        </g>
      ))}
      <circle cx={100} cy={-210} r={5} fill={C.yellow} opacity={lamp(0)} />
      {/* bus bays marked on the floor */}
      {[-380, -120, 140, 400].map((bx) => (
        <rect key={bx} x={bx} y={-22} width={6} height={22} fill={C.white} />
      ))}
      {/* bench under the canopy */}
      <rect x={-300} y={-120} width={160} height={14} rx={5} fill={C.brown} />
      <rect x={-290} y={-106} width={10} height={20} fill={frame} />
      <rect x={-150} y={-106} width={10} height={20} fill={frame} />
      {/* kiosk */}
      <rect x={300} y={-220} width={150} height={190} rx={8} fill={C.white} />
      <rect x={316} y={-200} width={118} height={80} rx={6} fill={C.skyDeep} />
      <rect x={300} y={-240} width={150} height={24} rx={6} fill={C.yellow} />
      {/* lamp row on the canopy */}
      {[-400, -180, 40, 260, 460].map((lx, i) => (
        <circle key={lx} cx={lx} cy={-388} r={8} fill={C.yellow} opacity={lamp(i + 1)} />
      ))}
    </g>
  );
}
