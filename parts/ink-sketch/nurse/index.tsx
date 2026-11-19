import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Nurse: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hair": "bun",
  "hairColour": "#5a3a22",
  "skin": "medium",
  "top": "uniform",
  "topColour": "#9fd8f0",
  "legs": "trousers",
  "legsColour": "#9fd8f0",
  "hat": "nurse",
  "hatColour": "#f5f1e8",
  "badge": "#c0c0c0",
  "hold": "syringe",
  "shoeStyle": "sneakers",
  "shoes": "#f5f1e8"
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
