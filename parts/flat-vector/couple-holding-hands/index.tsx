import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person, poseAt } from "../person/index";
import { C, SKIN, shade } from "../style/index";

// Couple holding hands: two adults walking right, one slightly ahead, the back hand of the front person
// joined to the front hand of the person behind. The joined hands are drawn where the two arms meet.
const UP = 165, FO = 150, SHY = -775, HIP = -470, TH = 235, SH = 215;
const rad = (d: number) => (d * Math.PI) / 180;
const pt = (x: number, y: number, a: number, l: number): [number, number] => [x + Math.sin(rad(a)) * l, y + Math.cos(rad(a)) * l];
/** Global position of a walking person's front or back hand (mirrors the Person generator's arm maths). */
function handAt(x: number, y: number, sz: number, f: number, which: "fa" | "ba", sx: number): [number, number] {
  const P = poseAt("walk", f);
  const lv = (l: [number, number]) => TH * Math.cos(rad(l[0])) + SH * Math.cos(rad(l[0] - l[1]));
  const dy = TH + SH - Math.max(lv(P.bl), lv(P.fl)) - P.jump;
  const l = P[which];
  const el = pt(sx, SHY, l[0], UP);
  const ha = pt(el[0], el[1], l[0] + l[1], FO);
  const t = rad(P.lean), dx = ha[0], dyy = ha[1] - HIP;
  const rx = dx * Math.cos(t) - dyy * Math.sin(t), ry = dx * Math.sin(t) + dyy * Math.cos(t) + HIP;
  return [x + sz * rx, y + sz * (ry + dy)];
}
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f;
  const sc = p.s ?? 1;
  const xBack = -90, xFront = 60, sBack = 0.44, sFront = 0.5;
  const skinF = SKIN.tan, skinB = SKIN.brown;
  const [ax, ay] = handAt(xFront, 0, sFront, f, "ba", -44);
  const [bx, by] = handAt(xBack, 0, sBack, f, "fa", 48);
  const mx = (ax + bx) / 2, my = (ay + by) / 2;
  return (
    <g transform={`translate(${p.x} ${p.y}) scale(${p.flip ? -sc : sc} ${sc})`}>
      <Person x={xBack} y={0} s={sBack} f={f + 9} pose="walk" expression="smile" skin="brown" hair="afro" hairColor="black" top="shirt" topColor={shade(C.teal, 0.25)} shirtColor={C.white} bottom="trousers" bottomColor={shade(C.navy, 0.2)} shoes="shoes" shoesColor={C.ink} />
      <Person x={xFront} y={0} s={sFront} f={f} pose="walk" expression="smile" skin="tan" hair="long" hairColor="brown" top="dress" topColor={C.pink} bottom="skirt" bottomColor={C.pink} shoes="heels" shoesColor={C.redDark} />
      {/* joined hands */}
      <path d={`M ${ax.toFixed(1)} ${ay.toFixed(1)} L ${bx.toFixed(1)} ${by.toFixed(1)}`} stroke={skinF} strokeWidth={26} strokeLinecap="round" />
      <circle cx={mx} cy={my} r={20} fill={skinF} />
    </g>
  );
}
