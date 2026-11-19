import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Chicken (preset of ink-sketch/bird): Ink sketch brown hen with a small red comb and short tail; for farmyard pecking scenes.
const LOOK = {"body":110,"bodyH":72,"head":30,"neck":24,"neckAngle":62,"neckW":22,"upright":10,"beak":"short","beakLen":16,"beakColor":"#F2B53D","color":"#A0622D","headColor":"#A0622D","belly":"#E9C9A0","wingColor":"#7C4520","comb":"rooster","tail":"short","tailLen":40,"tailColor":"#6E4A2E","tailDrop":32,"eyeSize":1,"leg":24,"legColor":"#F2B53D","pattern":"scales","patternColor":"#7C4520"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
