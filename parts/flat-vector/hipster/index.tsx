import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person, poseAt } from "../person/index";
import type { Pose } from "../person/index";
import { C } from "../style/index";

// Hipster preset: teal beanie, full beard, round thick-frame glasses, red flannel shirt, rolled jeans and a takeaway coffee cup (no logo).
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
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      age="adult"
      top="shirt"
      topColor={C.red}
      shirtColor={C.red}
      bottom="trousers"
      bottomColor={C.blueDark}
      shoes="boots"
      shoesColor={C.brownDark}
      hat="beanie"
      hatColor={C.tealDark}
      accessory="beard"
      over={() => (
        <g>
          {[-64, -22, 20, 62].map((x) => (
            <rect key={x} x={x} y={-812} width={9} height={356} fill={C.white} opacity={0.32} />
          ))}
          {[-770, -700, -630, -560].map((y) => (
            <rect key={y} x={-76} y={y} width={160} height={9} fill={C.white} opacity={0.32} />
          ))}
          <g transform={`rotate(${-P.lean} 0 ${HIP})`}>
            {legs.map((L, i) => {
              const s = pt(L.k[0], L.k[1], L.a, SH * 0.78);
              return <path key={i} d={`M ${s[0]} ${s[1]} L ${L.an[0]} ${L.an[1]}`} stroke={C.sky} strokeWidth={80} strokeLinecap="butt" />;
            })}
          </g>
        </g>
      )}
      topper={() => (
        <g fill="none" stroke={C.ink} strokeWidth={8}>
          <circle cx={30} cy={-2} r={22} fill={C.sky} fillOpacity={0.35} />
          <circle cx={80} cy={-2} r={22} fill={C.sky} fillOpacity={0.35} />
          <path d="M 52 -4 Q 56 -10 60 -4" />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-12) scale(1.35)`}>
          <rect x={-22} y={-134} width={44} height={14} rx={5} fill={C.greyDark} />
          <path d="M -26 -122 L 26 -122 L 18 -12 L -18 -12 Z" fill={C.white} />
          <path d="M -24 -96 L 24 -96 L 20 -44 L -20 -44 Z" fill={C.sand} />
        </g>
      )}
    />
  );
}
