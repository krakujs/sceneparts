import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Flamingo (preset of flat-vector/bird): pink flamingo with very long thin legs, a long S neck and a bent beak
const LOOK = {"body":120,"bodyH":62,"head":20,"neck":170,"neckAngle":70,"neckBend":0.35,"neckW":14,"upright":12,"beak":"curved","beakLen":40,"beakColor":"#F7C6D4","beakTip":"#1F2433","color":"#F27BA6","wingColor":"#E86B9C","wingTip":"#2A2A3A","tail":"short","tailLen":22,"tailColor":"#E86B9C","leg":200,"legColor":"#F2A0BC","eyeSize":0.9};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
