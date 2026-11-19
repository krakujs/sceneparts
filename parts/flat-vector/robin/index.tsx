import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Robin (preset of flat-vector/bird): Flat vector small robin with a brown-grey back, orange-red breast and a small beak; a songbird for garden scenes.
const LOOK = {"body":72,"bodyH":52,"head":22,"neck":0,"upright":0,"beak":"cone","beakLen":14,"beakColor":"#E8B04A","color":"#6B6E78","headColor":"#4A4D57","belly":"#E8653A","wingColor":"#585C66","wingspan":120,"alt":120,"tail":"short","tailLen":34,"tailColor":"#4A4D57","leg":20,"legColor":"#8A6A55","eyeSize":0.9};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
