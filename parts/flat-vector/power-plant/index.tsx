import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Thermal power plant: a tall chimney, a boiler hall with louvres, and steam rising from the top.
// Origin = base on the ground. About 900 px wide and 1420 px tall at s = 1.
// anim "lights": steam puffs drift up from the chimney top and fade.
const f1 = (v: number) => v.toFixed(1);
const puff = (f: number, k: number) => {
  const t = ((f + k * 22) % 66) / 66;
  return { y: -t * 300, r: 30 + t * 80, o: (1 - t) * 0.9, dx: Math.sin(t * 3 + k) * 36 };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.greyLight;
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const louvres = [0, 1, 2, 3, 4, 5, 6];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={460} ry={24} fill={C.shadow} />
      {/* steam (behind the chimney top) */}
      {anim === "lights" && [0, 1, 2, 3].map((k) => {
        const q = puff(f, k);
        return <circle key={k} cx={f1(230 + q.dx)} cy={f1(-1360 + q.y)} r={f1(q.r)} fill={C.white} opacity={f1(q.o)} />;
      })}
      {/* tall chimney */}
      <rect x={180} y={-1340} width={100} height={1340} rx={8} fill={wall} />
      <rect x={180} y={-1340} width={100} height={60} fill={C.red} opacity={0.85} />
      <rect x={180} y={-1200} width={100} height={36} fill={C.white} opacity={0.6} />
      <rect x={172} y={-1360} width={116} height={24} rx={6} fill={shade(wall, 0.2)} />
      <rect x={180} y={-1340} width={100} height={22} rx={6} fill={shade(wall, 0.15)} />
      {/* access ladder on the chimney */}
      <rect x={228} y={-1300} width={6} height={1290} fill={C.greyDark} opacity={0.6} />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => (
        <rect key={k} x={222} y={-1280 + k * 120} width={18} height={6} rx={3} fill={C.greyDark} />
      ))}
      {/* boiler hall */}
      <rect x={-400} y={-520} width={600} height={520} rx={10} fill={wall} />
      <path d="M -420 -520 L -400 -560 L 220 -560 L 200 -520 Z" fill={roof} />
      <rect x={-420} y={-530} width={640} height={16} rx={6} fill={shade(roof, 0.2)} />
      {/* louvred vents on the hall */}
      {[-360, -210, -60].map((vx) => (
        <g key={vx}>
          <rect x={vx} y={-470} width={120} height={170} rx={6} fill={C.greyDark} />
          {louvres.map((k) => (
            <rect key={k} x={vx + 6} y={-460 + k * 22} width={108} height={8} rx={3} fill={shade(C.greyDark, 0.3)} />
          ))}
        </g>
      ))}
      {/* control-room windows */}
      {[-360, -210, -60].map((wx) => (
        <rect key={`w${wx}`} x={wx} y={-260} width={120} height={60} rx={6} fill={C.skyDeep} />
      ))}
      <rect x={-360} y={-260} width={28} height={60} rx={4} fill={C.white} opacity={0.45} />
      <rect x={-420} y={-40} width={600} height={40} rx={6} fill={C.greyDark} />
      {/* main door */}
      <rect x={-20} y={-220} width={80} height={180} rx={6} fill={C.greyDark} />
      {/* pipework to the chimney */}
      <rect x={180} y={-420} width={40} height={14} rx={6} fill={C.yellowDark} />
      <rect x={180} y={-300} width={40} height={14} rx={6} fill={C.yellowDark} />
      <rect x={180} y={-300} width={14} height={300} rx={6} fill={C.yellowDark} />
      {/* ground strip */}
      <rect x={-460} y={-8} width={920} height={16} rx={6} fill={C.grey} opacity={0.5} />
    </g>
  );
}
