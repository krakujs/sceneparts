import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Sparrow (preset of ink-sketch/bird): small brown streaked songbird with a cone beak
const LOOK = {"body":62,"bodyH":44,"head":22,"neck":0,"upright":8,"beak":"cone","beakLen":14,"beakColor":"#8C6E5A","color":"#A9774E","belly":"#E9DCC6","pattern":"streaks","patternColor":"#5E3B26","cap":"#7A4E2E","wingColor":"#7C5234","tail":"short","tailColor":"#6E4A2E","leg":26,"legColor":"#C49A7A","eyeSize":1.1};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
