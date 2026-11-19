import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Paramedic: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hair": "ponytail",
  "hairColour": "#2a1d17",
  "skin": "brown",
  "top": "uniform",
  "topColour": "#1f3a5f",
  "over": "hivis",
  "overColour": "#d8e800",
  "legs": "trousers",
  "legsColour": "#1f3a5f",
  "hat": "cap",
  "hatColour": "#1f3a5f",
  "hold": "bag",
  "itemColour": "#d2403f",
  "shoeStyle": "boots",
  "shoes": "#2a1d17"
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
