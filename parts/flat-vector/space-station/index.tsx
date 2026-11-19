import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { lit, asTime, Stars, mix } from "../backdrop/index";

// Space station interior (flat-vector background): curved white module walls, a round port showing an
// Earth-like planet, lit control panels and handrails. The stage in the middle of the floor stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const wall = p.wall ?? "#E9EEF5", accent = p.accent ?? C.blue;
  const L = (c: string) => lit(c, time, true);
  const W = L(wall), dark = time === "night";
  const floorY = 1380;
  const planet = L("#3D7FD6"), land = L(C.green);
  const sweep = Math.sin(f / 60) * (drift ? 6 : 0);
  return (
    <g>
      {/* back wall, slightly curved by a big ellipse ring */}
      <rect x={0} y={0} width={1080} height={floorY} fill={W} />
      <ellipse cx={540} cy={-200} rx={900} ry={520} fill={shade(W, 0.04)} />
      <ellipse cx={540} cy={-200} rx={720} ry={400} fill={W} />
      <rect x={0} y={floorY - 150} width={1080} height={150} fill={shade(W, 0.06)} />
      {/* ribs of the curved module */}
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={i * 240 - 20} y={0} width={24} height={floorY} fill={shade(W, 0.1)} />)}
      {/* round port with a planet */}
      <circle cx={540} cy={430} r={250} fill={shade(W, 0.25)} />
      <circle cx={540} cy={430} r={222} fill={L("#0F1634")} />
      {dark && <Stars f={f} count={24} seed={5} maxY={600} />}
      <clipPath id="sp-port"><circle cx={540} cy={430} r={222} /></clipPath>
      <g clipPath="url(#sp-port)">
        <g transform={`translate(${sweep} 0)`}>
        <circle cx={540 - sweep} cy={520} r={200} fill={planet} />
        <path d="M 360 470 Q 420 420 470 470 Q 430 510 370 520 Z" fill={land} />
        <path d="M 560 560 Q 630 520 700 560 Q 660 600 580 590 Z" fill={land} />
        <path d="M 460 620 Q 520 600 560 640 Q 500 660 460 620 Z" fill={land} />
        </g>
      </g>
      <rect x={300} y={228} width={480} height={20} rx={10} fill={shade(W, 0.25)} />
      {/* wall panels with lights */}
      {[[60, 900], [820, 900]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width={200} height={260} rx={14} fill={shade(W, 0.14)} />
          {[0, 1, 2, 3].map((r) => (
            <g key={r}>
              <rect x={x + 22} y={y + 26 + r * 56} width={100} height={18} rx={6} fill={L(accent)} />
              <circle cx={x + 162} cy={y + 35 + r * 56} r={9} fill={(Math.floor(f / 14) + r + i) % 3 === 0 ? "#7CFFB0" : L(C.green)} />
            </g>
          ))}
        </g>
      ))}
      {/* control console at the back-left */}
      <rect x={60} y={1170} width={260} height={24} rx={8} fill={shade(W, 0.2)} />
      <rect x={80} y={1194} width={220} height={120} rx={10} fill={L(C.greyDark)} />
      <rect x={100} y={1214} width={80} height={44} rx={6} fill="#7CD0FF" opacity={0.85} />
      {[0, 1, 2, 3].map((i) => <circle key={i} cx={210 + i * 30} cy={1236} r={8} fill={(Math.floor(f / 10) + i) % 2 ? C.yellow : C.red} />)}
      {/* handrails along the walls */}
      {[1040, 1100].map((y, i) => <rect key={i} x={0} y={y + i * 30} width={1080} height={12} rx={6} fill={shade(W, 0.3)} />)}
      {[40, 1020].map((x) => <rect key={x} x={x} y={900} width={20} height={400} rx={10} fill={shade(W, 0.3)} />)}
      {/* floor with light strips */}
      <rect x={0} y={floorY} width={1080} height={1920 - floorY} fill={L("#C9D3E0")} />
      <rect x={0} y={floorY} width={1080} height={12} fill={shade(L("#C9D3E0"), 0.15)} />
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={i * 200 + 60} y={floorY + 40} width={110} height={10} rx={5} fill={L("#8FE3FF")} opacity={0.7} />)}
      <rect x={0} y={floorY + 140} width={1080} height={8} fill={mix(L("#C9D3E0"), "#FFFFFF", 0.3)} opacity={0.6} />
      {/* ceiling light bar */}
      <rect x={300} y={0} width={480} height={18} rx={9} fill={dark ? "#FFF6D8" : "#FFFFFF"} />
    </g>
  );
}
