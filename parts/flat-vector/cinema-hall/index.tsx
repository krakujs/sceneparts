import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, lit, asTime } from "../backdrop/index";

// Cinema hall: big glowing screen on the back wall, projector beam, aisle lights and rows of seats seen from behind.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const seat = L(p.seats ?? C.red), screen = p.screen ?? "#7FB8E8";
  const floorY = 1300, sheen = drift ? Math.sin(f / 30) * 12 : 0;
  return (
    <g>
      <Room time={time} wall={L("#2B2F4A")} floor={L("#3A2A3A")} floorY={floorY} floorKind="carpet" panels={false} />
      {/* projector beam from the back of the hall */}
      <path d="M 540 1000 L 240 190 L 840 190 Z" fill="#FFF6D8" opacity={time === "night" ? 0.07 : 0.1} />
      {/* screen with abstract shapes */}
      <rect x={180} y={200} width={720} height={400} rx={14} fill={L(C.greyDark)} />
      <rect x={200} y={220} width={680} height={360} rx={8} fill={screen} />
      <path d="M 200 580 Q 340 430 540 500 T 880 470 L 880 580 L 200 580 Z" fill={shade(screen, 0.25)} />
      <circle cx={700 + sheen} cy={330} r={46} fill={C.yellow} />
      {/* aisle lights along the floor, either side of the stage */}
      {[-1, 1].map((s) => [0, 1, 2, 3].map((i) => (
        <circle key={`${s}${i}`} cx={540 + s * (150 + i * 95)} cy={floorY - 30 - i * 18} r={7} fill={C.yellow} opacity={0.6 + 0.35 * Math.sin(f / 12 + i)} />
      )))}
      {/* rows of seats seen from behind; nearer rows are bigger */}
      {[0, 1, 2].map((r) => {
        const y = 900 + r * 170, sc = 1 + r * 0.22;
        return (
          <g key={r} transform={`translate(540 ${y}) scale(${sc}) translate(-540 ${-y})`}>
            {[0, 1, 2, 3, 4].map((i) => {
              const x = 540 + (i - 2) * 150;
              return (
                <g key={i}>
                  <rect x={x - 54} y={y - 150} width={108} height={150} rx={28} fill={shade(seat, 0.2)} />
                  <rect x={x - 46} y={y - 180} width={92} height={60} rx={26} fill={seat} />
                </g>
              );
            })}
          </g>
        );
      })}
    </g>
  );
}
