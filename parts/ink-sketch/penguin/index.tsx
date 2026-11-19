import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Penguin (preset of ink-sketch/bird): Ink sketch upright penguin with a black back, white belly, orange beak and feet; flightless, waddles when walking.
const LOOK = {"body":150,"bodyH":80,"head":26,"neck":0,"upright":75,"beak":"short","beakLen":18,"beakColor":"#F4A231","color":"#1F2433","belly":"#FFFFFF","headColor":"#1F2433","wingColor":"#1F2433","flightless":true,"tail":"short","tailLen":18,"tailColor":"#1F2433","tailDrop":45,"leg":22,"legColor":"#F4A231","webbed":true};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
