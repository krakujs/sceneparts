import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Reptile } from "../reptile/index";

// Turtle (preset of flat-vector/reptile): pond turtle, low dark-green shell with yellow plate edges, small head and legs
const LOOK = { body: "turtle", shell: "flat", len: 200, bodyH: 70, head: 24, snout: 8, tailLen: 30, legLen: 36, legW: 26, color: "#6E8F45", shellColor: "#2E5B3A", plateColor: "#D8BC43", eyeSize: 1.1 };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Reptile {...q} />;
}
