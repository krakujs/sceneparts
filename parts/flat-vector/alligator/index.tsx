import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Reptile } from "../reptile/index";

// Alligator (preset of flat-vector/reptile): darker blackish-green, broad U-shaped snout, scute ridge
const LOOK = { body: "croc", len: 320, bodyH: 130, head: 48, snout: 60, snoutShape: "broad", tailLen: 300, legLen: 50, legW: 30, color: "#2E3B2A", belly: "#A7AE7A", back: "#1C2619", ridge: "plates", eyeSize: 0.9, pattern: "none" };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Reptile {...q} />;
}
