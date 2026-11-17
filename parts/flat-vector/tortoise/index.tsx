import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Reptile } from "../reptile/index";

// Tortoise (preset of flat-vector/reptile): tall domed brown shell with hex plates, stumpy grey legs
const LOOK = { body: "turtle", shell: "dome", len: 230, bodyH: 130, head: 30, snout: 8, tailLen: 20, legLen: 40, legW: 30, shellColor: "#8A5A3C", plateColor: "#5E3B26", color: "#9AA3B5", eyeSize: 1 };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Reptile {...q} />;
}
