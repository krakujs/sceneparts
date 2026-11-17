import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Fruit } from "../fruit/index";

// Onion (preset of flat-vector/fruit): red-purple round with peel lines and a thin curly top shoot.
const LOOK = { shape: "round", w: 300, h: 320, color: "#9B3E6E", color2: "#7A2E58", texture: "peel", textureColor: "#C77AA3", stem: "curly", stemColor: "#8DB860", leaves: 0, shine: true };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Fruit {...q} />;
}
