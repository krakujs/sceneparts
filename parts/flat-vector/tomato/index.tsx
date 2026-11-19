import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Fruit } from "../fruit/index";

// Tomato (preset of flat-vector/fruit): red squat round with a green star calyx.
const LOOK = { shape: "squat", w: 380, h: 240, color: "#E8503F", color2: "#C93F30", stem: "calyx", stemColor: "#4BB46A", leaves: 0, shine: true };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Fruit {...q} />;
}
