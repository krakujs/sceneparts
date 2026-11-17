import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Samurai preset: layered lacquered armour plates, indigo hakama, black topknot and a sheathed sword at the waist. Dignified stance.
/* eslint-disable @typescript-eslint/no-explicit-any */
const lac = "#A3262E";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.ink}
      bottom="skirt"
      bottomColor="#2C3A6B"
      shoes="sandals"
      shoesColor={C.brownDark}
      hat="none"
      hair="none"
      over={() => (
        <g>
          <path d="M -70 -806 L 78 -806 L 78 -700 L -70 -700 Z" fill={C.ink} />
          {[-690, -650, -610, -570, -530].map((yy, i) => (
            <path key={yy} d={`M -72 ${yy} L 80 ${yy} L 78 ${yy + 34} L -70 ${yy + 34} Z`} fill={i % 2 ? lac : shade(lac, 0.12)} stroke={C.ink} strokeWidth={4} />
          ))}
          <path d="M -90 -790 L -50 -800 L -52 -700 L -92 -716 Z" fill={lac} />
          <path d="M 88 -790 L 48 -800 L 50 -700 L 90 -716 Z" fill={lac} />
          <rect x={-76} y={-486} width={160} height={30} rx={6} fill={C.yellow} />
          <rect x={-76} y={-476} width={160} height={10} fill={C.yellowDark} />
          <g transform="rotate(-28 -20 -440)">
            <rect x={-110} y={-456} width={210} height={16} rx={6} fill={C.brownDark} />
            <rect x={-40} y={-464} width={22} height={30} rx={6} fill={C.yellow} />
          </g>
        </g>
      )}
      topper={() => (
        <g>
          <path d="M -96 -10 Q -100 -118 4 -118 Q 102 -116 98 -10 Q 70 -60 20 -66 Q -40 -66 -96 -10 Z" fill={C.ink} />
          <ellipse cx={-42} cy={-124} rx={34} ry={30} fill={C.ink} />
          <path d="M -70 -132 Q -42 -110 -14 -132" stroke={C.inkSoft} strokeWidth={5} fill="none" />
        </g>
      )}
    />
  );
}
