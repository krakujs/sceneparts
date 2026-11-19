import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Reptile } from "../reptile/index";

// Newt (preset of flat-vector/reptile): small dark-olive body, orange belly and spots.
const LOOK = { body: "lizard", len: 80, bodyH: 40, head: 22, snout: 8, snoutShape: "round", tailLen: 130, legLen: 22, legW: 9, color: "#4D5B2C", belly: "#F08A24", pattern: "spots", patternColor: "#F5A94A", eyeSize: 1.3 };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Reptile {...q} />;
}
