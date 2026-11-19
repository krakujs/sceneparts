import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";
import { ink } from "../style/index";

// Cardinal (preset of ink-sketch/bird): Ink sketch bright red cardinal with a pointed crest, black face mask and orange cone beak; for winter garden scenes.
const LOOK = {"body":80,"bodyH":56,"head":22,"neck":0,"upright":0,"beak":"cone","beakLen":20,"beakColor":"#F28C28","color":"#D7322B","headColor":"#D7322B","crest":"tuft","crestColor":"#D7322B","wingColor":"#B3241E","wingspan":130,"alt":120,"tail":"long","tailLen":55,"tailColor":"#B3241E","leg":24,"legColor":"#8A6A55","eyeSize":0.9};
function overlay(q: any) {
  const body = q.body ?? 80, bodyH = q.bodyH ?? 56, head = q.head ?? 22;
  const cy = -(q.leg ?? 24) - bodyH / 2 + 4;
  const hx = body * 0.4, hy = cy - bodyH * 0.08;
  return <ellipse cx={hx + head * 0.45} cy={hy + head * 0.1} rx={head * 0.4} ry={head * 0.5} fill="#1F2433" />;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const x = (q.x ?? 540) + (q.vx ?? 0) * (q.f ?? 0), y = q.y ?? 1560, s = q.s ?? 1, sc = q.flip ? -s : s;
  return (
    <g>
      <Bird {...q} />
      <g transform={"translate(" + x + " " + y + ") scale(" + sc + " " + s + ")"}>{ink(<g data-split>{overlay(q)}</g>, 4)}</g>
    </g>
  );
}
