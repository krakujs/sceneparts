import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Drink } from "../drink/index";

// Wine glass (preset of flat-vector/drink): stemmed glass of red, white or rose wine.
const LOOK = { vessel: "wine", color: "#DDEFF8", liquid: "#7A1632", level: 0.55, steam: false, h: 340 };
const WINES: Record<string, string> = { red: "#7A1632", white: "#EBDD8F", rose: "#F0A0AE" };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  q.liquid = WINES[q.liquid] ?? q.liquid;
  return <Drink {...q} />;
}
