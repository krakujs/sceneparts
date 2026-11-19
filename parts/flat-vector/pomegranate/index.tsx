import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Fruit } from "../fruit/index";

// Pomegranate (preset of flat-vector/fruit): deep red round with a crown on top; optional cut showing the seeds.
const LOOK = { shape: "round", w: 320, h: 300, color: "#B8323F", color2: "#8C2230", stem: "crown", stemColor: "#8A5A3C", leaves: 0, cut: "none", fleshColor: "#E8485C", pit: "seeds", shine: true };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Fruit {...q} />;
}
