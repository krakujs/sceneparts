import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Duckling (preset of flat-vector/bird): Flat vector small fluffy yellow duckling with an orange flat bill; for cute stand and walk scenes.
const LOOK = {"body":46,"bodyH":36,"head":20,"neck":0,"upright":6,"beak":"flat","beakLen":18,"beakColor":"#FF8A3D","color":"#FFD84A","headColor":"#FFD84A","wingColor":"#F5C02E","tail":"short","tailLen":12,"tailColor":"#F5C02E","tailDrop":20,"eyeSize":1.2,"leg":12,"legColor":"#FF8A3D","webbed":true};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
