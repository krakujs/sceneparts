import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";
import { ink } from "../style/index";

// Emu (preset of ink-sketch/bird): Ink sketch shaggy grey-brown emu with a long blue-grey neck and long legs; flightless, for outback scenes.
const LOOK = {"body":190,"bodyH":130,"head":22,"neck":190,"neckAngle":72,"neckW":24,"upright":0,"beak":"flat","beakLen":30,"beakColor":"#2A2F3A","color":"#7C93AD","headColor":"#7C93AD","legColor":"#5E4A3E","leg":200,"tail":"short","tailLen":30,"tailColor":"#6E5646","flightless":true,"eyeSize":0.9};
function overlay(q: any) {
  const body = q.body ?? 190, bodyH = q.bodyH ?? 130;
  const leg = q.pose === "perch" ? (q.leg ?? 200) * 0.35 : q.leg ?? 200;
  const cy = -leg - bodyH / 2 + 4;
  return (
    <g>
      <ellipse cx={0} cy={cy} rx={body / 2} ry={bodyH / 2} fill="#7A6252" />
      {[-0.3, -0.1, 0.1, 0.27].map((k, i) => (
        <line key={i} x1={body * k} y1={cy - bodyH * 0.25} x2={body * (k + 0.04)} y2={cy + bodyH * 0.2} stroke="#5A4638" strokeWidth={3} strokeLinecap="round" />
      ))}
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
