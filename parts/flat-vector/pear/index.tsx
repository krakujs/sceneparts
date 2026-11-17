import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Fruit } from "../fruit/index";

// Pear (preset of flat-vector/fruit): green-yellow pear with a curved stem and a leaf.
const LOOK = { shape: "pear", w: 300, h: 380, color: "#C5D95A", color2: "#A6BC3F", stem: "curly", stemColor: "#6B4A2E", leaves: 1, leafColor: "#4BB46A", shine: true };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Fruit {...q} />;
}
