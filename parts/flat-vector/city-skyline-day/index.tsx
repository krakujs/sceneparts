import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, Skyline, lit, mix, rnd, asTime, asWeather, WeatherFx } from "../backdrop/index";

// City skyline (day): layered towers on a far and a near row, a tall tower with an antenna, a river strip
// and a lamp-lit promenade with railing. The stage in front stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const ff = drift ? f : 0, seed = 21, glow = time === "dusk" || time === "night";
  const B = lit(p.buildings ?? "#5B6E96", time);
  const river = p.river ?? true;
  const base = 1230;
  const lamp = (x: number) => (
    <g>
      <rect x={x - 6} y={1080} width={12} height={250} fill={C.greyDark} />
      <path d={`M ${x} 1080 Q ${x + 40} 1040 ${x + 70} 1070`} fill="none" stroke={C.greyDark} strokeWidth={10} />
      <rect x={x + 50} y={1062} width={40} height={14} rx={6} fill={C.greyDark} />
      {glow && <ellipse cx={x + 70} cy={1100} rx={110} ry={80} fill="#FFE9A8" opacity={0.22} />}
      <circle cx={x + 70} cy={1082} r={10} fill={glow ? "#FFF3C4" : C.greyLight} />
    </g>
  );
  return (
    <g>
      <Sky time={time} weather={weather} horizon={1100} f={ff} seed={seed} />
      <Skyline y={1120} color={mix(B, "#DCEFF9", 0.45)} seed={seed + 11} minH={160} maxH={420} windows={false} />
      <Skyline y={base} color={B} seed={seed} minH={300} maxH={620} lit={glow} />
      {/* tall tower with stripes and an antenna */}
      <rect x={700} y={680} width={96} height={550} fill={shade(B, 0.12)} />
      {new Array(8).fill(0).map((_, i) => <rect key={i} x={716} y={710 + i * 60} width={64} height={6} fill={shade(B, 0.3)} />)}
      <rect x={740} y={600} width={16} height={84} fill={shade(B, 0.12)} />
      <rect x={748} y={560} width={3} height={44} fill={C.greyDark} />
      <circle cx={749.5} cy={556} r={6} fill={glow ? "#FF6B6B" : C.red} opacity={0.6 + 0.4 * Math.sin(ff / 12)} />
      {/* river */}
      {river && (
        <g>
          <rect x={0} y={base} width={1080} height={62} fill={lit("#4E9ED8", time)} />
          {new Array(7).fill(0).map((_, i) => (
            <rect key={i} x={((i * 190 + Math.sin(ff / 20 + i) * 22) % 1200) - 60} y={base + 12 + (i % 3) * 16} width={90} height={6} rx={3} fill={lit("#BFE2F7", time)} opacity={0.7} />
          ))}
          {glow && new Array(6).fill(0).map((_, i) => (
            <rect key={i} x={rnd(seed, i) * 1000 + 30} y={base + 4} width={6} height={44} rx={3} fill="#FFD66B" opacity={0.35} />
          ))}
        </g>
      )}
      {/* embankment and promenade */}
      <rect x={0} y={1292} width={1080} height={26} fill={lit(C.greyLight, time)} />
      <rect x={0} y={1318} width={1080} height={602} fill={lit("#B7BCC8", time)} />
      <rect x={0} y={1318} width={1080} height={12} fill={shade(lit("#B7BCC8", time), 0.12)} />
      {new Array(9).fill(0).map((_, i) => <rect key={i} x={i * 130 + 60} y={1318} width={4} height={602} fill={shade(lit("#B7BCC8", time), 0.14)} />)}
      {/* railing along the embankment */}
      {[1420, 1530, 1640, 1750, 1860].map((y, i) => <rect key={`pv${i}`} x={0} y={y} width={1080} height={3} fill={shade(lit("#B7BCC8", time), 0.14)} />)}
      {new Array(17).fill(0).map((_, i) => <rect key={i} x={i * 68} y={1258} width={6} height={36} fill={lit(C.white, time)} />)}
      <rect x={0} y={1262} width={1080} height={6} fill={lit(C.white, time)} />
      {lamp(150)}
      {lamp(880)}
      {/* trees at the far edges */}
      {[[30, 1318, 80], [1050, 1318, 90]].map(([x, y, r], i) => (
        <g key={i}>
          <rect x={x - 9} y={y - r * 1.2} width={18} height={r * 1.2} fill={C.brownDark} />
          <circle cx={x} cy={y - r * 1.8} r={r} fill={lit(C.green, time)} />
          <circle cx={x - r * 0.35} cy={y - r * 2.2} r={r * 0.55} fill={lit(C.lime, time)} opacity={0.8} />
        </g>
      ))}
      <WeatherFx kind={weather} f={f} seed={seed} />
    </g>
  );
}
