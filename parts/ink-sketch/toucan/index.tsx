import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";
import { ink } from "../style/index";

// Toucan (preset of ink-sketch/bird): Ink sketch black toucan with a white-yellow throat and a huge orange-yellow beak; for tropical rainforest scenes.
const LOOK = {"body":120,"bodyH":92,"head":30,"neck":0,"upright":0,"beak":"big","beakLen":96,"beakColor":"#FFB020","beakTip":"#1F2433","color":"#1F2433","headColor":"#1F2433","belly":"#F7E9B0","wingColor":"#2A2F3A","wingspan":200,"alt":140,"tail":"short","tailLen":56,"tailColor":"#1F2433","eyeRing":"#5BA8E0","leg":40,"legColor":"#5A6070","eyeSize":0.9};
function overlay(q: any) {
  const body = q.body ?? 120, bodyH = q.bodyH ?? 92, head = q.head ?? 30, L = q.beakLen ?? 96;
  const cy = -(q.leg ?? 40) - bodyH / 2 + 4;
  const bx = body * 0.4 + head * 0.8, by = cy - bodyH * 0.08 + head * 0.12;
  const ex = bx + L * 0.8;
  return <path d={"M " + ex + " " + (by - head * 0.45) + " Q " + (bx + L + 2) + " " + by + " " + ex + " " + (by + head * 0.45) + " Z"} fill="#1F2433" />;
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
