import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person, poseAt } from "../person/index";
import { C } from "../style/index";

// Father with child: an adult standing, and a child a little behind him reaching forward with a straight arm to hold his hand.
// Both figures are placed from the same origin (x, vx, f), so they move together. The child's position is solved from the
// father's front hand each frame, so the hands meet. Mirrored as a whole when flip is set.
const rad = (d: number) => (d * Math.PI) / 180;
const pt = (x: number, y: number, a: number, l: number): [number, number] => [x + Math.sin(rad(a)) * l, y + Math.cos(rad(a)) * l];
/** Front hand of a figure in body units (before scale), from its pose at frame f. */
const frontHand = (pose: "stand" | "point", f: number): [number, number] => {
  const P = poseAt(pose, f);
  const el = pt(48, -775, P.fa[0], 165);
  return pt(el[0], el[1], P.fa[0] + P.fa[1], 150);
};
const CHILD = 0.64; // child scale relative to the adult (Person age "child")

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1;
  const X = p.x + (p.vx ?? 0) * p.f;
  const fatherX = 40 * s;
  const dadHand = frontHand("stand", p.f);
  const handX = fatherX + dadHand[0] * s;
  const childHand = frontHand("point", p.f);
  const childX = handX - childHand[0] * CHILD * s;
  return (
    <g transform={p.flip ? `translate(${2 * X} 0) scale(-1 1)` : undefined}>
      <Person x={X + fatherX} y={p.y} s={s} f={p.f} flip={false} age="adult" pose="stand" skin={p.skin} top="tshirt" topColor={p.topColor} bottom="trousers" bottomColor={C.navy} shoes="shoes" hair="short" hairColor="brown" />
      <Person x={X + childX} y={p.y} s={s} f={p.f} flip={false} age="child" pose="point" skin={p.childSkin} top="tshirt" topColor={p.childTopColor} bottom="shorts" bottomColor="#1FA39A" shoes="sneakers" hair="curly" hairColor="black" />
    </g>
  );
}
