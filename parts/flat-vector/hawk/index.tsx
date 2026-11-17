import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Hawk (preset of flat-vector/bird): Flat vector brown hawk with a pale streaked chest, rusty tail and hooked beak; for field and forest scenes.
const LOOK = {"body":100,"bodyH":62,"head":28,"neck":0,"upright":16,"beak":"hook","beakLen":22,"beakColor":"#4A4F5E","color":"#8A5A3C","headColor":"#7A4E2E","belly":"#F2E2C4","pattern":"streaks","patternColor":"#6B4128","wingColor":"#6B4128","tail":"wedge","tailLen":58,"tailColor":"#C2532B","tailDrop":14,"eyeRing":"#FFC83D","leg":36,"legColor":"#E0B77A"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
