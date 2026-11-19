import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Farmer: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hair": "braids",
  "hairColour": "#5a3a22",
  "skin": "tan",
  "top": "overalls",
  "topColour": "#3a6fb0",
  "inner": "#d2403f",
  "hat": "sunhat",
  "hatColour": "#e9d58f",
  "hold": "pitchfork",
  "shoeStyle": "boots",
  "shoes": "#5a3a22"
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
