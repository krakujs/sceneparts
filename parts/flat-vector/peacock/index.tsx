import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Peacock (preset of flat-vector/bird): Flat vector royal blue peacock with a crown crest and a big green eye-spotted tail fan; for display scenes.
const LOOK = {"body":120,"bodyH":70,"head":26,"neck":60,"neckAngle":75,"neckW":14,"upright":10,"beak":"cone","beakLen":14,"beakColor":"#8A93A6","color":"#2A5CB8","headColor":"#2A5CB8","wingColor":"#1F4A9A","crest":"crown","crestColor":"#3D6FE0","tail":"fan","tailLen":150,"tailColor":"#2E8B57","tailEye":"#1FA39A","tailDrop":0,"eyeSize":0.9,"leg":42,"legColor":"#6B5A4A"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
