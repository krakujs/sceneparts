import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Puffin (preset of ink-sketch/bird): Ink sketch upright puffin, black and white, with a big striped orange triangular beak; for seabird and cliff scenes.
const LOOK = {"body":130,"bodyH":90,"head":28,"neck":0,"upright":70,"beak":"cone","beakLen":46,"beakColor":"#F26B38","beakTip":"#7A8499","color":"#1F2433","belly":"#FFFFFF","headColor":"#1F2433","wingColor":"#2E3345","eyeRing":"#C9CED8","wingspan":150,"alt":120,"tail":"short","tailLen":20,"tailColor":"#2E3345","leg":20,"legColor":"#F26B38","webbed":true,"eyeSize":0.9};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
