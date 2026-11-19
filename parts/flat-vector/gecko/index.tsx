import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Reptile } from "../reptile/index";

// Gecko (preset of flat-vector/reptile): small green-yellow lizard, big eyes, sticky toe pads, spots
const LOOK = { body: "lizard", len: 150, bodyH: 42, head: 30, snout: 18, snoutShape: "round", tailLen: 110, legLen: 52, legW: 15, toes: "pads", color: "#B8D957", belly: "#E9F5B0", pattern: "spots", patternColor: "#6E9A2A", eyeSize: 1.5 };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Reptile {...q} />;
}
