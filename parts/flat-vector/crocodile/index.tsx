import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Reptile } from "../reptile/index";

// Crocodile (preset of flat-vector/reptile): long olive-green body, long snout with white teeth, ridged back, thick tail
const LOOK = { body: "croc", len: 380, bodyH: 86, head: 40, snout: 120, snoutShape: "long", teeth: true, tailLen: 260, legLen: 46, legW: 30, ridge: "plates", back: "#4F6A2A", belly: "#D9C98A", eyeSize: 0.9, color: "#6F8A3A", pattern: "none" };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Reptile {...q} />;
}
