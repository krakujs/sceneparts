import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person, poseAt } from "../person/index";
import type { Pose } from "../person/index";
import { C, hairColour } from "../style/index";

// 1970s disco dancer preset: big feathered hair, wide-collar orange shirt, flared trousers and platform boots. Pose wave raises one arm; the arm moves with p.f.
/* eslint-disable @typescript-eslint/no-explicit-any */
const HIP = -470, TH = 235, SH = 215;
const rad = (d: number) => (d * Math.PI) / 180;
const pt = (x: number, y: number, a: number, l: number): [number, number] => [x + Math.sin(rad(a)) * l, y + Math.cos(rad(a)) * l];
const shin = (hipX: number, l: [number, number]) => {
  const k = pt(hipX, HIP, l[0], TH);
  const a = l[0] - l[1];
  return { k, a, an: pt(k[0], k[1], a, SH) };
};
// Bell-bottom: the trouser leg widens from the shin to the ankle.
const flare = (L: ReturnType<typeof shin>, c: string) => {
  const s = pt(L.k[0], L.k[1], L.a, SH * 0.5);
  const e = L.an;
  const nx = Math.cos(rad(L.a)), ny = -Math.sin(rad(L.a));
  const pts = [[s[0] + nx * 37, s[1] + ny * 37], [e[0] + nx * 66, e[1] + ny * 66], [e[0] - nx * 66, e[1] - ny * 66], [s[0] - nx * 37, s[1] - ny * 37]];
  return <polygon key={pts[0][0]} points={pts.map((q) => q.join(",")).join(" ")} fill={c} />;
};

export default function Part(p: PartProps<any>) {
  const P = poseAt((p.pose ?? "wave") as Pose, p.f);
  const legs = [shin(-24, P.bl), shin(26, P.fl)];
  const hc = hairColour(p.hairColor ?? "brown");
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      age="adult"
      hair="none"
      top="shirt"
      topColor={C.orange}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.purpleDark}
      shoes="boots"
      shoesColor={C.yellow}
      hat="none"
      over={() => (
        <g>
          <path d="M -124 -930 Q -156 -840 -116 -786 L -60 -800 Q 0 -790 20 -846 L 112 -796 Q 146 -840 122 -930 Q 124 -1020 20 -1032 Q -104 -1020 -124 -930 Z" fill={hc} />
          <g transform={`rotate(${-P.lean} 0 ${HIP})`}>{legs.map((L, i) => <g key={i}>{flare(L, C.purpleDark)}</g>)}</g>
          <path d="M -22 -816 L -68 -770 L 2 -742 Z M 58 -816 L 102 -770 L 30 -742 Z" fill={C.yellow} />
        </g>
      )}
    />
  );
}
