import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Eagle (preset of flat-vector/bird): Flat vector dark brown eagle with a white head and tail, big yellow hook beak and yellow feet; for majestic sky scenes.
const LOOK = {"body":128,"bodyH":80,"head":36,"neck":0,"upright":14,"beak":"hook","beakLen":40,"beakColor":"#FFC83D","color":"#4A2E1E","headColor":"#FFFFFF","wingColor":"#3B2316","tail":"wedge","tailLen":60,"tailColor":"#FFFFFF","tailDrop":8,"eyeRing":"#FFC83D","eyeSize":0.9,"leg":46,"legColor":"#FFC83D"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
