import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Dish } from "../dish/index";

// Chips bowl (preset of flat-vector/dish): red bowl heaped with golden crinkly chips.
const LOOK = { vessel: "bowl", w: 440, vesselColor: "#E94F3E", rimColor: "#F7C9BD", fill: "pieces", fillColor: "#F5B83D", fillColor2: "#E0A21F", steam: false };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Dish {...q} />;
}
