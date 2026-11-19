import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Budgie (preset of ink-sketch/bird): Ink sketch small lime-green budgerigar with a yellow face and black wavy bars; for small perch scenes.
const LOOK = {"body":56,"bodyH":38,"head":14,"neck":0,"upright":25,"beak":"cone","beakLen":9,"beakColor":"#E8A33D","color":"#A8D85A","headColor":"#FFC83D","wingColor":"#7DB83E","pattern":"bars","patternColor":"#1F2433","tail":"long","tailLen":44,"tailColor":"#3E9A5E","tailDrop":28,"leg":18,"legColor":"#8A7A6A","eyeRing":"#FFFFFF","eyeSize":1};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
