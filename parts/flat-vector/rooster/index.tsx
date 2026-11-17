import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bird } from "../bird/index";

// Rooster (preset of flat-vector/bird): Flat vector red-orange rooster with a big red comb, green-black arching tail and wattle; for farmyard scenes.
const LOOK = {"body":120,"bodyH":76,"head":30,"neck":18,"neckAngle":62,"neckW":24,"upright":14,"beak":"short","beakLen":18,"beakColor":"#F2B53D","color":"#D94E2F","headColor":"#D94E2F","wingColor":"#B83E20","comb":"rooster","tail":"train","tailLen":62,"tailColor":"#1F3A2E","tailEye":"#2E5A45","tailDrop":-35,"eyeSize":1,"leg":32,"legColor":"#F2B53D"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bird {...q} />;
}
