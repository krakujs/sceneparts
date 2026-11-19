import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Fruit } from "../fruit/index";

// Mango (preset of flat-vector/fruit): yellow-orange teardrop with a red-orange blush on the shaded side, tilted, with a stem and a leaf.
const LOOK = { shape: "oval", w: 300, h: 360, rot: -10, color: "#FFB640", color2: "#E8643A", stem: "short", stemColor: "#6B4A2E", leaves: 1, leafColor: "#4BB46A", shine: true };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Fruit {...q} />;
}
