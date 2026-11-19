import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Raven (preset of ink-sketch/bird): Ink sketch big black raven with a heavy hooked beak and shaggy throat; for gothic and wilderness scenes.
const LOOK = {"body":122,"bodyH":72,"head":34,"neck":0,"upright":10,"beak":"hook","beakLen":38,"beakColor":"#2A2E3D","color":"#1F2433","belly":"#333A4E","wingColor":"#2A2F40","tail":"wedge","tailLen":58,"tailColor":"#171A24","tailDrop":10,"leg":40,"legColor":"#2E3343","eyeSize":0.9};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
