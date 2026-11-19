import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Cockatoo (preset of ink-sketch/bird): Ink sketch white cockatoo with a spiky yellow crest and dark hook beak; for perch and jungle scenes.
const LOOK = {"body":84,"bodyH":60,"head":30,"neck":0,"upright":18,"beak":"hook","beakLen":22,"beakColor":"#2E3340","color":"#F7F5EE","wingColor":"#E6E2D6","crest":"spiky","crestColor":"#FFC83D","tail":"short","tailLen":46,"tailColor":"#E6E2D6","tailDrop":25,"leg":24,"legColor":"#5A5F6E","eyeSize":1};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
