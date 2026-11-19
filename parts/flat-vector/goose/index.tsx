import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Goose (preset of flat-vector/bird): Flat vector grey-brown goose with a long black neck and white chin strap; for farm and pond walking scenes.
const LOOK = {"body":130,"bodyH":76,"head":24,"neck":130,"neckAngle":65,"neckW":18,"upright":4,"beak":"flat","beakLen":36,"beakColor":"#F28C28","color":"#8A7E70","headColor":"#2A2E36","wingColor":"#6F6456","tail":"short","tailLen":34,"tailColor":"#2A2E36","tailDrop":18,"eyeRing":"#FFFFFF","eyeSize":0.8,"leg":40,"legColor":"#F28C28","webbed":true};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
