import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Reptile } from "../reptile/index";

// Cobra (preset of flat-vector/reptile): coiled tan-brown cobra, raised head, open hood, tongue flick
const LOOK = { body: "coil", len: 200, bodyH: 64, head: 36, snout: 18, snoutShape: "round", hood: true, tongue: true, color: "#B98A4E", eyeSize: 1.1, pattern: "none" };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Reptile {...q} />;
}
