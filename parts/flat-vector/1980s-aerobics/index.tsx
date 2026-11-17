import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person, poseAt } from "../person/index";
import type { Pose } from "../person/index";
import { C } from "../style/index";

// 1980s aerobics preset: bright tank leotard over leggings, striped leg warmers, sweatband headband and sneakers. Pose cheer bounces with p.f.
/* eslint-disable @typescript-eslint/no-explicit-any */
const HIP = -470, TH = 235, SH = 215;
const rad = (d: number) => (d * Math.PI) / 180;
const pt = (x: number, y: number, a: number, l: number): [number, number] => [x + Math.sin(rad(a)) * l, y + Math.cos(rad(a)) * l];
const shin = (hipX: number, l: [number, number]) => {
  const k = pt(hipX, HIP, l[0], TH);
  const a = l[0] - l[1];
  return { k, a, an: pt(k[0], k[1], a, SH) };
};
const band = (L: ReturnType<typeof shin>, from: number, to: number, w: number, c: string) => {
  const s = pt(L.k[0], L.k[1], L.a, SH * from);
  const e = pt(L.k[0], L.k[1], L.a, SH * to);
  return <path d={`M ${s[0]} ${s[1]} L ${e[0]} ${e[1]}`} stroke={c} strokeWidth={w} strokeLinecap="butt" />;
};

export default function Part(p: PartProps<any>) {
  const P = poseAt((p.pose ?? "cheer") as Pose, p.f);
  const legs = [shin(-24, P.bl), shin(26, P.fl)];
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      age="adult"
      top="tank"
      topColor={C.pink}
      bottom="trousers"
      bottomColor={C.purple}
      shoes="sneakers"
      shoesColor={C.white}
      hat="none"
      over={() => (
        <g>
          <rect x={-76} y={-520} width={160} height={12} fill={C.yellow} />
          <g transform={`rotate(${-P.lean} 0 ${HIP})`}>
            {legs.map((L, i) => (
              <g key={i}>
                {band(L, 0.4, 0.92, 80, C.orange)}
                {band(L, 0.4, 0.5, 80, C.yellow)}
                {band(L, 0.7, 0.74, 80, C.yellow)}
              </g>
            ))}
          </g>
        </g>
      )}
      topper={() => (
        <g>
          <path d="M -94 -36 Q 0 -124 94 -36" stroke={C.lime} strokeWidth={16} fill="none" strokeLinecap="round" />
        </g>
      )}
    />
  );
}
