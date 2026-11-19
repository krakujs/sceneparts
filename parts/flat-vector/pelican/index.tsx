import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Pelican (preset of flat-vector/bird): Flat vector white pelican with a long beak and a big orange throat pouch, short legs and webbed feet; for coast scenes.
const LOOK = {"body":170,"bodyH":90,"head":28,"neck":80,"neckAngle":55,"neckW":34,"upright":0,"beak":"pouch","beakLen":90,"beakColor":"#F2C14E","color":"#FFFFFF","headColor":"#FFFFFF","wingColor":"#E6EBF2","wingTip":"#5D6578","wingspan":260,"alt":160,"tail":"short","tailLen":40,"tailColor":"#E6EBF2","leg":26,"legColor":"#F28C28","webbed":true,"eyeSize":0.9};
function overlay(q: any) {
  const body = q.body ?? 170, bodyH = q.bodyH ?? 90, head = q.head ?? 28, neck = q.neck ?? 80;
  const cy = -(q.leg ?? 26) - bodyH / 2 + 4;
  const a = ((q.neckAngle ?? 55) * Math.PI) / 180;
  const hx = body * 0.3 + Math.cos(a) * neck, hy = cy - bodyH * 0.2 - Math.sin(a) * neck;
  const bx = hx + head * 0.8, by = hy + head * 0.12;
  const L = q.beakLen ?? 90;
  return <ellipse cx={bx + L * 0.5} cy={by + head * 0.35} rx={L * 0.36} ry={head * 0.5} fill="#F28C28" />;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const x = (q.x ?? 540) + (q.vx ?? 0) * (q.f ?? 0), y = q.y ?? 1560, s = q.s ?? 1, sc = q.flip ? -s : s;
  return (
    <g>
      <Bird {...q} />
      <g transform={"translate(" + x + " " + y + ") scale(" + sc + " " + s + ")"}>{overlay(q)}</g>
    </g>
  );
}
