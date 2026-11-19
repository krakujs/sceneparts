import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Fruit } from "../fruit/index";

// Fig (preset of flat-vector/fruit): purple teardrop with a short stem; optional cut showing pink flesh and seeds.
const LOOK = { shape: "teardrop", w: 270, h: 330, color: "#6B3F8E", color2: "#4E2C6B", stem: "short", stemColor: "#6B4A2E", leaves: 0, cut: "none", fleshColor: "#E77A8E", pit: "seeds", shine: true };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Fruit {...q} />;
}
