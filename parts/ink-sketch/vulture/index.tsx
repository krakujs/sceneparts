import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Vulture (preset of ink-sketch/bird): Ink sketch dark brown vulture with a bare pink head on a long thin neck; hunched, for desert and carrion scenes.
const LOOK = {"body":110,"bodyH":74,"head":22,"neck":80,"neckAngle":70,"neckW":12,"upright":35,"beak":"hook","beakLen":20,"beakColor":"#E8D9B8","color":"#3B2A22","headColor":"#E8A39A","wingColor":"#2A1E18","tail":"short","tailLen":50,"tailColor":"#2A1E18","tailDrop":10,"eyeRing":"#5E3B26","eyeSize":0.8,"leg":36,"legColor":"#8A7A6A"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
