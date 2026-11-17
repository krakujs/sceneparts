import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Dish } from "../dish/index";

// Curry (preset of flat-vector/dish): bowl of orange-yellow curry with chunks, herbs and steam.
const LOOK = { vessel: "bowl", w: 420, vesselColor: "#FFFFFF", rimColor: "#E9EEF3", fill: "chunks", fillColor: "#F2A231", fillColor2: "#E86A2C", garnish: "herbs", steam: true };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Dish {...q} />;
}
