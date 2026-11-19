import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Falcon (preset of ink-sketch/bird): Ink sketch slate-blue falcon with pale barred chest, dark moustache and pointed wings; for fast sky scenes.
const LOOK = {"body":96,"bodyH":56,"head":26,"neck":0,"upright":8,"beak":"hook","beakLen":18,"beakColor":"#F2B53D","color":"#5F6B82","headColor":"#4B5569","belly":"#E8E4DC","pattern":"bars","patternColor":"#8A93A6","wingColor":"#4B5569","wingTip":"#2A2F3D","tail":"short","tailLen":56,"tailColor":"#4B5569","tailDrop":12,"eyeRing":"#F2B53D","leg":30,"legColor":"#F2B53D"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
