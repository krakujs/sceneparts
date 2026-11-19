import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Turkey (preset of ink-sketch/bird): Ink sketch plump brown turkey with a bare blue-grey head, red wattle and a big upright fan tail; for farm scenes.
const LOOK = {"body":150,"bodyH":110,"head":26,"neck":70,"neckAngle":65,"neckW":26,"upright":0,"beak":"short","beakLen":14,"beakColor":"#E9C46A","headColor":"#8FB8E0","color":"#4E3020","comb":"turkey","tail":"fan","tailLen":120,"tailColor":"#6B4128","tailEye":"#E9D3A9","pattern":"bars","patternColor":"#3A2216","wingColor":"#5A3A26","leg":70,"legColor":"#C9937A","eyeSize":0.9};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
