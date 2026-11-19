import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";
import { ink } from "../style/index";

// Crane (preset of ink-sketch/bird): Ink sketch grey-white crane with a red cap, black neck, long legs and a bustle tail; for marsh scenes.
const LOOK = {"body":150,"bodyH":80,"head":18,"neck":200,"neckAngle":70,"neckW":18,"upright":0,"beak":"long","beakLen":60,"beakColor":"#4A4A4A","color":"#1F2433","headColor":"#F4F6F8","cap":"#D7322B","wingColor":"#AEB6C4","wingspan":260,"alt":160,"tail":"long","tailLen":50,"tailColor":"#AEB6C4","leg":190,"legColor":"#3A3F4B","eyeSize":0.9};
function overlay(q: any) {
  const body = q.body ?? 150, bodyH = q.bodyH ?? 80;
  const cy = -(q.leg ?? 190) - bodyH / 2 + 4;
  return (
    <g>
      <ellipse cx={0} cy={cy} rx={body / 2} ry={bodyH / 2} fill="#E9ECF1" />
      <ellipse cx={-body * 0.08} cy={cy - bodyH * 0.03} rx={body * 0.36} ry={bodyH * 0.34} fill="#AEB6C4" />
    </g>
  );
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
