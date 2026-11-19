import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Owl (preset of ink-sketch/bird): round brown owl with a facial disc, big forward eyes and ear tufts
const LOOK = {"body":92,"bodyH":96,"head":40,"neck":0,"upright":70,"beak":"hook","beakLen":16,"beakColor":"#F2B53D","color":"#8A5A3C","belly":"#D9B48A","facialDisc":true,"discColor":"#EAD7B2","eyeRing":"#FFC83D","eyeSize":1.1,"crest":"earTufts","crestColor":"#6B4128","pattern":"spots","patternColor":"#F2E2C4","wingColor":"#6B4128","tail":"short","tailColor":"#6B4128","tailDrop":30,"leg":18,"legColor":"#E0B77A"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
