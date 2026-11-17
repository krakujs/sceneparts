import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Fruit } from "../fruit/index";

// Bell pepper (preset of flat-vector/fruit): bell shape with ribs and a thick green stem. color = red | yellow | green (or any hex).
const COLOURS: Record<string, string> = { red: "#E8503F", yellow: "#FFC83D", green: "#4BB46A" };
const LOOK = { shape: "bell", w: 300, h: 340, color: "#E8503F", texture: "ribs", stem: "thick", stemColor: "#348A4F", leaves: 0, shine: true };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  q.color = COLOURS[q.color] ?? q.color;
  return <Fruit {...q} />;
}
