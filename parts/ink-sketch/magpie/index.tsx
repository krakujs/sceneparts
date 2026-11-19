import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Magpie (preset of ink-sketch/bird): Ink sketch black and white magpie with a long dark green-black tail and black beak; for countryside scenes.
const LOOK = {"body":110,"bodyH":70,"head":26,"neck":0,"upright":0,"beak":"cone","beakLen":28,"beakColor":"#1F2433","color":"#1F2433","headColor":"#1F2433","belly":"#FFFFFF","wingColor":"#2B2F3D","wingTip":"#FFFFFF","wingspan":170,"alt":130,"tail":"long","tailLen":90,"tailColor":"#1E3A34","tailDrop":10,"leg":34,"legColor":"#1F2433","eyeSize":0.9};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
