import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Crow (preset of ink-sketch/bird): Ink sketch all-black glossy crow with a sturdy black beak; for city, field and bare-tree scenes.
const LOOK = {"body":96,"bodyH":58,"head":26,"neck":0,"upright":8,"beak":"cone","beakLen":24,"beakColor":"#3A4157","color":"#22263A","wingColor":"#2C3142","tail":"short","tailColor":"#181B27","tailDrop":14,"leg":30,"legColor":"#3A3F4F","eyeSize":1};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
