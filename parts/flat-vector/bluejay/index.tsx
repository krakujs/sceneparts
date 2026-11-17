import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Blue jay (preset of flat-vector/bird): Flat vector blue jay with a blue back, white belly, crest tuft and barred wings; for woodland scenes.
const LOOK = {"body":84,"bodyH":58,"head":24,"neck":0,"upright":0,"beak":"cone","beakLen":24,"beakColor":"#2A2F3A","color":"#3D7FE0","headColor":"#3D7FE0","belly":"#F4F6FA","crest":"tuft","crestColor":"#3D7FE0","wingColor":"#2A6BD0","wingTip":"#1F2433","pattern":"bars","patternColor":"#FFFFFF","wingspan":140,"alt":120,"tail":"long","tailLen":50,"tailColor":"#2A6BD0","leg":22,"legColor":"#2A2F3A","eyeSize":0.9};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
