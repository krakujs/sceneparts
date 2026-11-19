import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Heron (preset of ink-sketch/bird): Ink sketch blue-grey heron with a long S-curved neck, spear beak and black head crest; for wetland and pond scenes.
const LOOK = {"body":130,"bodyH":66,"head":20,"neck":220,"neckAngle":70,"neckBend":0.25,"neckW":14,"upright":0,"beak":"spear","beakLen":110,"beakColor":"#E0B53F","color":"#7F93AA","headColor":"#8FA1B8","cap":"#1F2433","crest":"tuft","crestColor":"#1F2433","wingColor":"#5F7290","wingspan":280,"alt":160,"tail":"short","tailLen":40,"tailColor":"#5F7290","leg":200,"legColor":"#6B6A5E","eyeSize":0.9};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
