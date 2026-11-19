import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Drink } from "../drink/index";

// Water glass (preset of flat-vector/drink): clear glass of water with a soft highlight, optional ice.
const LOOK = { vessel: "glass", color: "#DDEFF8", liquid: "#A9DDF2", level: 0.82, ice: false };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Drink {...q} />;
}
