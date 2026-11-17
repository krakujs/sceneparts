import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Woodpecker (preset of flat-vector/bird): Flat vector black and white woodpecker with a red cap, chisel beak and stiff tail; perches on trunks, for forest scenes.
const LOOK = {"body":84,"bodyH":56,"head":22,"neck":0,"upright":55,"beak":"cone","beakLen":34,"beakColor":"#5A5F6B","color":"#1F2433","headColor":"#F4F4F0","cap":"#E8503F","belly":"#F4F4F0","pattern":"spots","patternColor":"#FFFFFF","wingColor":"#1F2433","tail":"short","tailLen":44,"tailColor":"#1F2433","tailDrop":55,"leg":26,"legColor":"#5A5F6B","wingspan":130,"alt":120,"eyeSize":0.9};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
