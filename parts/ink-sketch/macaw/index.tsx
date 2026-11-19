import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Macaw (preset of ink-sketch/bird): Ink sketch scarlet macaw with blue and yellow wings, a very long tail and a big hook beak; for tropical scenes.
const LOOK = {"body":110,"bodyH":64,"head":30,"neck":0,"upright":12,"beak":"big","beakLen":42,"beakColor":"#3A4157","color":"#E8503F","wingColor":"#3D6FE0","wingTip":"#F2C230","eyeRing":"#FFFFFF","eyeSize":0.9,"tail":"long","tailLen":84,"tailColor":"#3D6FE0","tailDrop":6,"leg":26,"legColor":"#5E5A60"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
