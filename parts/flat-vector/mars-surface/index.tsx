import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { lit, asTime, rnd, mix, Hills } from "../backdrop/index";

// Mars surface (flat-vector background): red desert, rocks, craters, distant dusty hills, pale salmon sky
// and a small sun. The stage in the middle of the ground stays clear for characters.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const seed = p.seed ?? 4;
  const sky = p.sky ?? "#F2B8A2";
  const top = time === "night" ? "#2A1B3D" : time === "dusk" ? mix(sky, "#5A2E5C", 0.55) : mix(sky, "#FFFFFF", 0.1);
  const mid = time === "night" ? "#4A2D4E" : time === "dusk" ? mix(sky, "#C55A6A", 0.5) : sky;
  const low = time === "night" ? "#7A4A55" : time === "dusk" ? "#FFA27A" : mix(sky, "#FFE2C4", 0.5);
  const ground = lit(p.ground ?? "#C65A3A", time);
  const dune = lit(shade(p.ground ?? "#C65A3A", 0.1), time);
  const sunX = 780 + (drift ? Math.sin(f / 200) * 8 : 0);
  const horizon = 1180;
  const bands = [top, mid, low];
  return (
    <g>
      <rect x={0} y={0} width={1080} height={1920} fill={low} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const t = i / 6;
        const col = t < 0.5 ? mix(bands[0], bands[1], t * 2) : mix(bands[1], bands[2], (t - 0.5) * 2);
        return <rect key={i} x={0} y={i * (horizon / 7)} width={1080} height={horizon / 7 + 1} fill={col} />;
      })}
      {/* small sun */}
      <circle cx={sunX} cy={360} r={70} fill={time === "night" ? "#FFE9C8" : "#FFD27A"} opacity={0.3} />
      <circle cx={sunX} cy={360} r={44} fill={time === "night" ? "#FFE9C8" : "#FFD27A"} />
      {/* faint dust haze */}
      {[0, 1, 2].map((i) => <rect key={i} x={f1(-200 + ((f * (0.3 + i * 0.1)) % 300))} y={900 + i * 60} width={1400} height={30} rx={15} fill="#FFFFFF" opacity={0.08} />)}
      {/* distant hills */}
      <Hills y={horizon - 40} color={lit(shade(ground, 0.22), time)} seed={seed + 2} amp={40} waves={3} />
      {/* near dunes */}
      <path d={`M -20 1920 L -20 1260 Q 200 1190 420 1250 Q 640 1310 860 1230 Q 960 1200 1100 1240 L 1100 1920 Z`} fill={dune} />
      <path d={`M -20 1920 L -20 1330 Q 240 1290 520 1350 Q 760 1400 1100 1320 L 1100 1920 Z`} fill={ground} />
      {/* craters */}
      {[[150, 1480, 90], [880, 1560, 70], [720, 1400, 40]].map(([x, y, r], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx={r} ry={r * 0.3} fill={shade(ground, 0.28)} />
          <ellipse cx={x} cy={y + 6} rx={r * 0.8} ry={r * 0.22} fill={shade(ground, 0.12)} />
        </g>
      ))}
      {/* rocks at the sides */}
      {[[60, 1420, 70], [1010, 1380, 60], [930, 1700, 90], [120, 1760, 110]].map(([x, y, r], i) => (
        <g key={i}>
          <path d={`M ${x - r} ${y} Q ${x - r * 0.4} ${y - r * 1.1} ${x + r * 0.2} ${y - r * 0.9} Q ${x + r} ${y - r * 0.5} ${x + r} ${y} Z`} fill={shade(ground, 0.25 + rnd(seed, i) * 0.1)} />
        </g>
      ))}
      {/* scattered pebbles on the stage edges */}
      {new Array(10).fill(0).map((_, i) => {
        const x = rnd(seed, 30 + i) * 1080, y = 1500 + rnd(seed, 60 + i) * 380;
        if (x > 230 && x < 850 && y > 1300 && y < 1750) return null;
        return <ellipse key={i} cx={f1(x)} cy={f1(y)} rx={f1(6 + rnd(seed, 90 + i) * 8)} ry={f1(4 + rnd(seed, 120 + i) * 4)} fill={shade(ground, 0.2)} />;
      })}
      {time === "night" && <rect x={0} y={0} width={1080} height={1920} fill="#1A1030" opacity={0.15} />}
    </g>
  );
}

const f1 = (v: number) => (Math.round(v * 10) / 10).toString();
