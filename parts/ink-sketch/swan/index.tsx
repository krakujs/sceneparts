import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Swan (preset of ink-sketch/bird): Ink sketch white swan with a long S-curved neck and orange beak; for lakes and calm water scenes.
const LOOK = {"body":130,"bodyH":72,"head":24,"neck":110,"neckAngle":62,"neckW":18,"neckBend":0.22,"upright":0,"beak":"flat","beakLen":38,"beakColor":"#F28C28","beakTip":"#1F2433","color":"#FFFFFF","headColor":"#FFFFFF","wingColor":"#EEF0F4","tail":"short","tailLen":36,"tailColor":"#E0E4EA","tailDrop":18,"eyeRing":"#1F2433","eyeSize":0.8,"leg":20,"legColor":"#F28C28","webbed":true};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
