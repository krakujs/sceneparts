import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Fruit } from "../fruit/index";

// Plum (preset of flat-vector/fruit): purple oval plum with a short stem.
const LOOK = { shape: "oval", w: 260, h: 290, color: "#7A4BB5", color2: "#5A3390", stem: "short", stemColor: "#6B4A2E", leaves: 0, shine: true };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Fruit {...q} />;
}
