import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Ostrich (preset of flat-vector/bird): Flat vector ostrich: large black body, white plumes, very long bare neck and long legs; flightless, for savanna scenes.
const LOOK = {"body":240,"bodyH":150,"head":24,"neck":215,"neckAngle":78,"neckW":30,"upright":0,"beak":"flat","beakLen":46,"beakColor":"#D9C7B8","color":"#C7ADA8","headColor":"#C7ADA8","legColor":"#B99A96","leg":200,"tail":"wedge","tailLen":90,"tailColor":"#FFFFFF","wingColor":"#FFFFFF","flightless":true,"eyeSize":0.9};
function overlay(q: any) {
  const body = q.body ?? 240, bodyH = q.bodyH ?? 150;
  const leg = q.pose === "perch" ? (q.leg ?? 200) * 0.35 : q.leg ?? 200;
  const cy = -leg - bodyH / 2 + 4;
  return (
    <g>
      <ellipse cx={0} cy={cy} rx={body / 2} ry={bodyH / 2} fill="#1F2433" />
      <ellipse cx={-body * 0.22} cy={cy - bodyH * 0.05} rx={body * 0.28} ry={bodyH * 0.42} fill="#FFFFFF" />
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
      <g transform={"translate(" + x + " " + y + ") scale(" + sc + " " + s + ")"}>{overlay(q)}</g>
    </g>
  );
}
