import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Fruit } from "../fruit/index";

// Coconut (preset of flat-vector/fruit): brown fuzzy round with a cut half showing white flesh.
const LOOK = { shape: "round", w: 330, h: 300, color: "#8A5A3C", color2: "#5E3B26", texture: "fuzz", textureColor: "#5E3B26", stem: "none", leaves: 0, cut: "half", fleshColor: "#FFFFFF", pit: "none", shine: true };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Fruit {...q} />;
}
