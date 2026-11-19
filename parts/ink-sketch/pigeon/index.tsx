import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Pigeon (preset of ink-sketch/bird): Ink sketch grey city pigeon with an iridescent green neck patch and two dark wing bars; for street and rooftop scenes.
const LOOK = {"body":92,"bodyH":54,"head":24,"neck":0,"upright":12,"beak":"short","beakLen":12,"beakColor":"#4A4F5E","color":"#9AA3B5","headColor":"#8E96A8","cap":"#3F9C86","eyeRing":"#E8833A","eyeSize":1,"wingColor":"#7D8698","pattern":"bars","patternColor":"#2F3442","tail":"short","tailColor":"#6F7889","tailDrop":12,"leg":26,"legColor":"#E58FA6"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
