import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Parrot (preset of flat-vector/bird): Flat vector green parrot with a red forehead, hooked pale beak and long tail; for jungle and perch scenes.
const LOOK = {"body":84,"bodyH":62,"head":30,"neck":0,"upright":22,"beak":"hook","beakLen":24,"beakColor":"#F0E4C8","color":"#3DAA5C","wingColor":"#2E9A4E","cap":"#E8503F","eyeRing":"#FFFFFF","eyeSize":1,"tail":"long","tailLen":70,"tailColor":"#2E9A4E","tailDrop":30,"leg":26,"legColor":"#7A6A5A"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
