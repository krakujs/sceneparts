import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Reptile } from "../reptile/index";

// Snake (preset of flat-vector/reptile): long green S-curved snake, lighter belly, forked tongue flick
const LOOK = { body: "snake", len: 600, bodyH: 46, head: 34, snout: 14, tailLen: 0, tongue: true, belly: "#E8F2B0", color: "#4FA66B", pattern: "none", eyeSize: 1.1 };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Reptile {...q} />;
}
