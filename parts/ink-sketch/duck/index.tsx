import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Duck (preset of ink-sketch/bird): Ink sketch mallard-style duck with a green head, flat yellow bill and grey body; for ponds and park scenes.
const LOOK = {"body":96,"bodyH":56,"head":26,"neck":0,"upright":4,"beak":"flat","beakLen":30,"beakColor":"#FFC83D","color":"#8E9AA6","headColor":"#1F7A4D","belly":"#8A5A3C","wingColor":"#7E8A96","wingTip":"#3D6FE0","tail":"short","tailLen":24,"tailColor":"#2B3A4A","tailDrop":25,"eyeRing":"none","eyeSize":0.9,"leg":14,"legColor":"#FF8A3D","webbed":true};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
