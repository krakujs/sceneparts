import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Seagull (preset of flat-vector/bird): Flat vector white seagull with grey wings, black wing tips and a yellow red-spotted beak; flies by default, for coasts.
const LOOK = {"body":110,"bodyH":56,"head":24,"upright":0,"beak":"long","beakLen":40,"beakColor":"#FFD23F","beakTip":"#E8503F","color":"#FFFFFF","headColor":"#FFFFFF","wingColor":"#B8C2D1","wingTip":"#1F2433","wingspan":240,"alt":180,"tail":"wedge","tailLen":50,"tailColor":"#B8C2D1","leg":28,"legColor":"#F2A93B","eyeSize":0.9};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
