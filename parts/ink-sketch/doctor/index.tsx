import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Doctor: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hair": "bob",
  "hairColour": "#2a2624",
  "skin": "light",
  "top": "labcoat",
  "topColour": "#f5f1e8",
  "inner": "#5ab4f0",
  "legsColour": "#23305e",
  "neck": "stethoscope",
  "hold": "clipboard"
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
