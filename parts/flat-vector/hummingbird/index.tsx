import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Hummingbird (preset of flat-vector/bird): Flat vector tiny iridescent green hummingbird with a red throat and needle beak; hovers, for garden scenes.
const LOOK = {"body":26,"bodyH":24,"head":11,"neck":0,"upright":0,"beak":"needle","beakLen":40,"beakColor":"#2A2F3A","color":"#3FBF7A","headColor":"#3FBF7A","belly":"#E8503F","wingColor":"#A8E8C4","wingspan":70,"alt":60,"tail":"forked","tailLen":18,"tailColor":"#2E9F63","leg":8,"legColor":"#2A2F3A","eyeSize":0.8};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
