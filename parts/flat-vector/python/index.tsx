import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Reptile } from "../reptile/index";

// Python (preset of flat-vector/reptile): long thick brown-and-tan python with diamond blotches
const LOOK = { body: "snake", len: 600, bodyH: 84, head: 44, snout: 18, tailLen: 0, tongue: true, color: "#B08352", belly: "#E8D3A0", pattern: "diamonds", patternColor: "#5C3B1E", eyeSize: 1 };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Reptile {...q} />;
}
