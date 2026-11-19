import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Fruit } from "../fruit/index";

// Orange (preset of flat-vector/fruit): orange round with a dotted peel, a tiny stem and a leaf.
const LOOK = { shape: "round", w: 320, h: 300, color: "#FF8A3D", color2: "#F07226", texture: "dots", stem: "short", stemColor: "#6B4A2E", leaves: 1, leafColor: "#4BB46A", shine: true };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Fruit {...q} />;
}
