import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { lit, asTime, rnd, Stars } from "../backdrop/index";

// Moon surface (flat-vector background): grey cratered ground, black starry sky and a blue planet on the
// horizon. The stage in the middle of the ground stays clear for characters.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const seed = p.seed ?? 6;
  const regolith = lit(p.ground ?? "#A7AEBB", time);
  const sky = time === "day" || time === "morning" ? "#0B0E1C" : "#05070F";
  const horizon = 1180;
  const earthX = 760, earthY = 1080;
  const bob = drift ? Math.sin(f / 180) * 4 : 0;
  return (
    <g>
      <rect x={0} y={0} width={1080} height={1920} fill={sky} />
      <Stars f={f} count={110} seed={seed} maxY={horizon - 40} />
      {/* blue planet on the horizon */}
      <g transform={`translate(0 ${bob})`}>
        <circle cx={earthX} cy={earthY} r={150} fill="#2D5FD0" opacity={0.25} />
        <circle cx={earthX} cy={earthY} r={112} fill={C.blue} />
        <path transform="translate(0 300)" d="M 680 720 Q 720 690 760 720 Q 740 760 700 750 Z" fill={C.green} />
        <path transform="translate(0 300)" d="M 780 780 Q 830 760 850 800 Q 810 830 780 780 Z" fill={C.green} />
        <path d="M 640 800 Q 670 790 690 820 Q 660 840 640 800 Z" fill="#FFFFFF" opacity={0.8} />
        <path d="M 720 690 Q 780 650 850 690 Q 790 668 720 690 Z" fill="#FFFFFF" opacity={0.7} />
        <circle cx={earthX} cy={earthY} r={112} fill="none" stroke="none" />
      </g>
      {/* distant grey crater ridge */}
      <path d={`M -20 1920 L -20 ${horizon} Q 150 ${horizon - 60} 300 ${horizon - 20} Q 480 ${horizon - 90} 640 ${horizon - 30} Q 860 ${horizon - 80} 1100 ${horizon - 10} L 1100 1920 Z`} fill={shade(regolith, 0.3)} />
      {/* ground */}
      <path d={`M -20 1920 L -20 1260 Q 300 1220 540 1250 Q 800 1280 1100 1230 L 1100 1920 Z`} fill={regolith} />
      {/* craters: dark floor, lit rim */}
      {[[170, 1420, 120], [880, 1380, 90], [820, 1690, 150], [110, 1760, 80], [560, 1560, 46]].map(([x, y, r], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y + r * 0.08} rx={r * 1.06} ry={r * 0.36} fill="#FFFFFF" opacity={0.35} />
          <ellipse cx={x} cy={y} rx={r} ry={r * 0.34} fill={shade(regolith, 0.32)} />
          <ellipse cx={x + r * 0.05} cy={y + r * 0.06} rx={r * 0.8} ry={r * 0.22} fill={shade(regolith, 0.42)} />
        </g>
      ))}
      {/* boulders */}
      {[[60, 1560, 60], [1010, 1500, 50], [960, 1820, 90]].map(([x, y, r], i) => (
        <path key={i} d={`M ${x - r} ${y} Q ${x - r * 0.5} ${y - r * 1.2} ${x} ${y - r} Q ${x + r * 0.7} ${y - r * 1.1} ${x + r} ${y} Z`} fill={shade(regolith, 0.18 + rnd(seed, i) * 0.1)} />
      ))}
      {/* footprint-like dust specks */}
      {new Array(12).fill(0).map((_, i) => {
        const x = rnd(seed, 40 + i) * 1080, y = 1300 + rnd(seed, 70 + i) * 600;
        if (x > 230 && x < 850 && y > 1300 && y < 1750) return null;
        return <circle key={i} cx={f1(x)} cy={f1(y)} r={f1(3 + rnd(seed, 100 + i) * 4)} fill={shade(regolith, 0.12)} />;
      })}
    </g>
  );
}

const f1 = (v: number) => (Math.round(v * 10) / 10).toString();
