import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Stork (preset of flat-vector/bird): Flat vector white stork with black wing feathers, a long red beak and long red legs; for marsh and countryside scenes.
const LOOK = {"body":120,"bodyH":64,"head":20,"neck":60,"neckAngle":65,"neckW":18,"upright":0,"beak":"long","beakLen":90,"beakColor":"#E2402F","color":"#FFFFFF","headColor":"#FFFFFF","wingColor":"#1F2433","wingspan":260,"alt":150,"tail":"short","tailLen":36,"tailColor":"#1F2433","leg":170,"legColor":"#E2402F","eyeSize":0.9};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
