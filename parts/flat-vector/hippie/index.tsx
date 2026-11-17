import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person, poseAt } from "../person/index";
import type { Pose } from "../person/index";
import { C } from "../style/index";

// Hippie preset: long hair with a headband and a flower, round tinted glasses, flowing patterned shirt and flared jeans.
/* eslint-disable @typescript-eslint/no-explicit-any */
const HIP = -470, TH = 235, SH = 215;
const rad = (d: number) => (d * Math.PI) / 180;
const pt = (x: number, y: number, a: number, l: number): [number, number] => [x + Math.sin(rad(a)) * l, y + Math.cos(rad(a)) * l];
const shin = (hipX: number, l: [number, number]) => {
  const k = pt(hipX, HIP, l[0], TH);
  const a = l[0] - l[1];
  return { k, a, an: pt(k[0], k[1], a, SH) };
};
const flare = (L: ReturnType<typeof shin>, c: string) => {
  const s = pt(L.k[0], L.k[1], L.a, SH * 0.5);
  const e = L.an;
  const nx = Math.cos(rad(L.a)), ny = -Math.sin(rad(L.a));
  const pts = [[s[0] + nx * 37, s[1] + ny * 37], [e[0] + nx * 62, e[1] + ny * 62], [e[0] - nx * 62, e[1] - ny * 62], [s[0] - nx * 37, s[1] - ny * 37]];
  return <polygon points={pts.map((q) => q.join(",")).join(" ")} fill={c} />;
};
const petals = (cx: number, cy: number) =>
  Array.from({ length: 5 }, (_, i) => {
    const a = rad(i * 72);
    return <circle key={i} cx={cx + Math.cos(a) * 14} cy={cy + Math.sin(a) * 14} r={12} fill={C.pink} />;
  });

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
      topColor={C.orange}
      shirtColor={C.orange}
      bottom="trousers"
      bottomColor={C.blueDark}
      shoes="sandals"
      shoesColor={C.brown}
      hat="none"
      accessory="glasses"
      over={() => (
        <g>
          {[-60, -20, 20, 60].map((x, i) =>
            [-758, -698, -638, -578, -518].map((y, j) => (
              <circle key={`${x}-${y}`} cx={x + (j % 2) * 20 - 10} cy={y} r={9} fill={(i + j) % 2 ? C.yellow : C.pink} />
            )),
          )}
          <g transform={`rotate(${-P.lean} 0 ${HIP})`}>{legs.map((L, i) => <g key={i}>{flare(L, C.blueDark)}</g>)}</g>
        </g>
      )}
      topper={() => (
        <g>
          <circle cx={30} cy={-2} r={20} fill={C.yellowDark} opacity={0.55} />
          <circle cx={80} cy={-2} r={20} fill={C.yellowDark} opacity={0.55} />
          <path d="M -94 -40 Q -10 -122 96 -44" stroke={C.purple} strokeWidth={14} fill="none" strokeLinecap="round" />
          {petals(-74, -64)}
          <circle cx={-74} cy={-64} r={7} fill={C.yellow} />
        </g>
      )}
    />
  );
}
