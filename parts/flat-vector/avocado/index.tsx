import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Fruit } from "../fruit/index";

// Avocado (preset of flat-vector/fruit): dark green teardrop with a cut half showing pale flesh and the brown stone.
const LOOK = { shape: "teardrop", w: 290, h: 380, color: "#2F7A45", color2: "#22593A", stem: "none", leaves: 0, cut: "half", fleshColor: "#EEF0A6", pit: "stone", shine: true };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Fruit {...q} />;
}
