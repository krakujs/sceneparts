import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Fruit } from "../fruit/index";

// Lime (preset of flat-vector/fruit): small green oval with dots; optional cut half showing the segments.
const LOOK = { shape: "oval", w: 250, h: 270, color: "#A8D85A", color2: "#8DBE45", texture: "dots", stem: "short", stemColor: "#4E8A3A", leaves: 0, cut: "none", fleshColor: "#D8EE94", pit: "segments", shine: true };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Fruit {...q} />;
}
