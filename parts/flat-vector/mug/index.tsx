import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Drink } from "../drink/index";

// Mug (preset of flat-vector/drink): plain mug with a handle, coffee surface and steam.
const LOOK = { vessel: "mug", color: "#3D6FE0", liquid: "#5B3420", level: 0.9, steam: true };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Drink {...q} />;
}
