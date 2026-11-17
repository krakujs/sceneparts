import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Dish } from "../dish/index";

// Rice bowl (preset of flat-vector/dish): white bowl with a grainy mound of rice, steam and chopsticks.
const LOOK = { vessel: "bowl", w: 420, vesselColor: "#FFFFFF", rimColor: "#E9EEF3", fill: "grains", fillColor: "#FFFFFF", fillColor2: "#E3DCC8", garnish: "chopsticks", steam: true };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Dish {...q} />;
}
