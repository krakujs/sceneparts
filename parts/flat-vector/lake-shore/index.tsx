import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, Hills, TreeLine, Ground, WeatherFx, lit, rnd, asTime, asWeather } from "../backdrop/index";

// Lake shore: a calm lake with mirrored reflections, far shore trees and hills, reeds and a small wooden jetty.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather);
  const t = (p.anim ?? "drift") !== "none" ? f : 0;
  const L = (c: string) => lit(c, time);
  const water = L(p.water ?? "#4E9ED8");
  const reed = (x: number, base: number, h: number, k: string) => (
    <g key={k}>
      <rect x={x - 3} y={base - h} width={6} height={h} fill={L("#6FA35A")} />
      <ellipse cx={x} cy={base - h + 26} rx={8} ry={20} fill={L(C.brownDark)} />
    </g>
  );
  return (
    <g>
      <Sky time={time} weather={weather} horizon={1000} f={t} seed={15} />
      {/* far shore */}
      <Hills y={1010} color={L("#7FB58A")} amp={26} seed={16} waves={3} />
      <TreeLine y={1040} color={L(C.greenDark)} seed={17} size={0.55} kind="mixed" f={t} />
      {/* lake and its mirrored reflection of the far trees */}
      <rect x={0} y={1040} width={1080} height={250} fill={water} />
      <rect x={0} y={1040} width={1080} height={40} fill={shade(water, 0.12)} opacity={0.5} />
      <g transform="translate(0 2080) scale(1 -1)" opacity={0.22}>
        <TreeLine y={1040} color={L(C.greenDark)} seed={17} size={0.55} kind="mixed" f={t} />
      </g>
      {Array.from({ length: 12 }, (_, i) => {
        const y = 1080 + i * 17 + (i % 3) * 6;
        const x = (((rnd(18, i) * 1300 + t * (0.3 + (i % 4) * 0.15)) % 1300) + 1300) % 1300 - 120;
        return <rect key={i} x={x.toFixed(1)} y={y} width={60 + rnd(18, i + 9) * 70} height={5} rx={2.5} fill="#FFFFFF" opacity={0.5} />;
      })}
      {/* near shore */}
      <rect x={0} y={1286} width={1080} height={14} fill={L(C.sand)} />
      <Ground y={1300} color={L(C.green)} kind="grass" time={time} f={t} />
      {reed(30, 1310, 190, "r1")}
      {reed(78, 1320, 220, "r2")}
      {reed(128, 1312, 160, "r3")}
      {reed(1046, 1316, 200, "r4")}
      {/* small wooden jetty at the right side */}
      {p.jetty !== false && (
        <g>
          {[884, 964, 1044].map((x, i) => <rect key={i} x={x} y={1236} width={12} height={74} fill={L(C.brownDark)} />)}
          <rect x={860} y={1220} width={220} height={18} fill={L(C.brown)} />
          {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={860 + i * 38} y={1220} width={4} height={18} fill={shade(L(C.brown), 0.2)} />)}
        </g>
      )}
      <WeatherFx kind={weather} f={t} seed={15} />
    </g>
  );
}
