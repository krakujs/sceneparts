import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Chick (preset of ink-sketch/bird): Ink sketch tiny round yellow chick with a tiny beak and no neck; for cute baby animal scenes.
const LOOK = {"body":40,"bodyH":36,"head":24,"neck":0,"upright":0,"beak":"cone","beakLen":9,"beakColor":"#FF8A3D","color":"#FFD84A","headColor":"#FFD84A","wingColor":"#F5C02E","tail":"short","tailLen":8,"tailColor":"#F5C02E","tailDrop":20,"eyeSize":1.2,"leg":12,"legColor":"#FF8A3D"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
