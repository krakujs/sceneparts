import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Reptile } from "../reptile/index";

// Lizard (preset of flat-vector/reptile): common brown-green lizard, slim body, long tail, small stripes
const LOOK = { body: "lizard", len: 200, bodyH: 36, head: 24, snout: 16, snoutShape: "round", tailLen: 220, legLen: 40, legW: 12, color: "#7C8F4A", belly: "#D8CC93", pattern: "stripes", patternColor: "#4B5B2A", eyeSize: 1 };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Reptile {...q} />;
}
