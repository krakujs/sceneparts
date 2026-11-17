import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person, poseAt } from "../person/index";
import type { Pose } from "../person/index";
import { C, hairColour, skinColour } from "../style/index";

// Punk preset: tall coloured mohawk (drawn in the topper, hair="none"), studded black jacket, ripped jeans and boots.
/* eslint-disable @typescript-eslint/no-explicit-any */
const HIP = -470, TH = 235, SH = 215;
const rad = (d: number) => (d * Math.PI) / 180;
const pt = (x: number, y: number, a: number, l: number): [number, number] => [x + Math.sin(rad(a)) * l, y + Math.cos(rad(a)) * l];
const shin = (hipX: number, l: [number, number]) => {
  const k = pt(hipX, HIP, l[0], TH);
  const a = l[0] - l[1];
  return { k, a, an: pt(k[0], k[1], a, SH) };
};

export default function Part(p: PartProps<any>) {
  const P = poseAt((p.pose ?? "stand") as Pose, p.f);
  const legs = [shin(-24, P.bl), shin(26, P.fl)];
  const mohawk = hairColour(p.hairColor ?? "pink");
  const skin = skinColour(p.skin);
  const studs: [number, number][] = [[-30, -770], [-16, -728], [-8, -688], [-2, -628], [64, -770], [52, -728], [44, -688], [36, -628]];
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      age="adult"
      hair="none"
      top="blazer"
      topColor={C.ink}
      shirtColor={C.red}
      bottom="trousers"
      bottomColor={C.blueDark}
      shoes="boots"
      shoesColor={C.ink}
      hat="none"
      over={() => (
        <g>
          {studs.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={6} fill={C.greyLight} />
          ))}
          <g transform={`rotate(${-P.lean} 0 ${HIP})`}>
            {legs.map((L, i) => (
              <ellipse key={i} cx={L.k[0]} cy={L.k[1]} rx={24} ry={16} transform={`rotate(${L.a} ${L.k[0]} ${L.k[1]})`} fill={skin} />
            ))}
          </g>
        </g>
      )}
      topper={() => (
        <path
          d="M -86 -36 L -92 -86 L -66 -116 L -54 -150 L -30 -112 L -16 -196 L 6 -128 L 22 -206 L 44 -134 L 66 -170 L 74 -96 L 98 -36 Q 40 -70 -20 -62 Q -60 -56 -86 -36 Z"
          fill={mohawk}
        />
      )}
    />
  );
}
