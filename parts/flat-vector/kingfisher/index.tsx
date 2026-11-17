import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Kingfisher (preset of flat-vector/bird): Flat vector small kingfisher with a bright turquoise back, orange chest and long dark spear beak; for river scenes.
const LOOK = {"body":76,"bodyH":54,"head":24,"neck":0,"upright":20,"beak":"spear","beakLen":60,"beakColor":"#2A2F3A","color":"#1B9CC4","headColor":"#1B9CC4","belly":"#F28C28","wingColor":"#1F6F94","wingspan":120,"alt":120,"tail":"short","tailLen":30,"tailColor":"#1B7FA0","tailDrop":20,"leg":14,"legColor":"#D9572E","eyeSize":0.9};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
