import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, lit, mix, rnd, asTime, asWeather, WeatherFx } from "../backdrop/index";

// Autumn park: big orange and red trees behind, a grass lawn, a leaf-covered path running to the front, a
// bench at the right side and leaves falling from p.f. The path in the middle stays clear for characters.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const ff = drift ? f : 0, seed = 162;
  const leaf = p.leafColour ?? "#E8703A";
  const cols = [leaf, C.red, C.yellowDark, shade(leaf, 0.15), C.orange];
  const Tree = ({ x, y, r, k }: { x: number; y: number; r: number; k: number }) => (
    <g>
      <rect x={x - r * 0.12} y={y - r * 1.2} width={r * 0.24} height={r * 1.2} fill={lit(C.brownDark, time)} />
      {new Array(7).fill(0).map((_, i) => {
        const a = rnd(seed + k, i) * Math.PI * 2, d = rnd(seed + k, i + 20) * r * 0.6;
        return <circle key={i} cx={x + Math.cos(a) * d} cy={y - r * 1.6 + Math.sin(a) * d * 0.6} r={r * (0.45 + rnd(seed + k, i + 40) * 0.25)} fill={lit(cols[(i + k) % cols.length], time)} />;
      })}
    </g>
  );
  const leaves = 18;
  return (
    <g>
      <Sky time={time} weather={weather} horizon={1000} f={ff} seed={seed} />
      {/* far trees */}
      <Tree x={90} y={1080} r={150} k={1} />
      <Tree x={360} y={1040} r={120} k={2} />
      <Tree x={720} y={1040} r={130} k={3} />
      <Tree x={990} y={1080} r={160} k={4} />
      {/* lawn */}
      <rect x={0} y={1150} width={1080} height={770} fill={lit("#9ACB74", time)} />
      {new Array(10).fill(0).map((_, i) => <ellipse key={i} cx={f1(rnd(seed, i) * 1080)} cy={f1(1200 + rnd(seed, i + 30) * 700)} rx={30} ry={6} fill={shade(lit("#9ACB74", time), 0.12)} />)}
      {/* path covered in leaves */}
      <path d="M 400 1150 L 680 1150 L 1000 1920 L 80 1920 Z" fill={lit(C.sand, time)} />
      <path d="M 400 1150 L 680 1150 L 690 1180 L 390 1180 Z" fill={shade(lit(C.sand, time), 0.1)} />
      {new Array(90).fill(0).map((_, i) => {
        const t = rnd(seed, i + 200), y = 1200 + t * 700, half = 140 + (y - 1150) * 0.5, x = 540 + (rnd(seed, i + 260) - 0.5) * 2 * half * 0.9;
        return <ellipse key={i} cx={f1(x)} cy={f1(y)} rx={f1(6 + (y - 1150) * 0.012)} ry={f1(3 + (y - 1150) * 0.006)} transform={`rotate(${f1(rnd(seed, i + 300) * 180)} ${f1(x)} ${f1(y)})`} fill={cols[i % cols.length]} opacity={0.85} />;
      })}
      {/* bench at the right side */}
      {p.bench !== false && (
        <g>
          <rect x={880} y={1400} width={170} height={16} rx={6} fill={lit(C.brown, time)} />
          <rect x={880} y={1360} width={170} height={14} rx={6} fill={lit(C.brown, time)} />
          <rect x={886} y={1374} width={10} height={40} fill={lit(C.brownDark, time)} />
          <rect x={1024} y={1374} width={10} height={40} fill={lit(C.brownDark, time)} />
          <rect x={900} y={1416} width={12} height={60} fill={lit(C.brownDark, time)} />
          <rect x={1020} y={1416} width={12} height={60} fill={lit(C.brownDark, time)} />
        </g>
      )}
      {/* falling leaves */}
      {new Array(leaves).fill(0).map((_, i) => {
        const x0 = rnd(seed + 9, i) * 1080, speed = 1.4 + rnd(seed + 9, i + 50) * 1.6;
        const y = ((rnd(seed + 9, i + 100) * 1920 + ff * speed) % 1960) - 20;
        const x = x0 + Math.sin(ff / 26 + i) * 30;
        const rot = ff * 3 + i * 40;
        return <ellipse key={i} cx={f1(x)} cy={f1(y)} rx={14} ry={7} fill={cols[i % cols.length]} transform={`rotate(${f1(rot)} ${f1(x)} ${f1(y)})`} />;
      })}
      <WeatherFx kind={weather} f={f} seed={seed} />
    </g>
  );
}

const f1 = (v: number) => (Math.round(v * 10) / 10).toString();
