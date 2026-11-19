import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Reptile } from "../reptile/index";

// Chameleon (preset of flat-vector/reptile): bright green, curled tail, casque helmet, turret eyes
const LOOK = { body: "lizard", len: 110, bodyH: 64, head: 36, snout: 22, snoutShape: "round", tailLen: 130, tailCurl: true, legLen: 58, legW: 16, color: "#4CD15A", belly: "#B9EE8A", casque: true, eyeBulge: true, eyeSize: 1.2 };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Reptile {...q} />;
}
