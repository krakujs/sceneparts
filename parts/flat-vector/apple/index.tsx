import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Fruit } from "../fruit/index";

// Apple (preset of flat-vector/fruit): red round apple with a short stem and one leaf.
const LOOK = { shape: "round", w: 330, h: 300, color: "#E8503F", color2: "#C73B2E", stem: "short", stemColor: "#6B4A2E", leaves: 1, leafColor: "#4BB46A", shine: true };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Fruit {...q} />;
}
