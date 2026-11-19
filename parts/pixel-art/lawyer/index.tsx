import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Lawyer: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"skin": "light", "hair": "short", "hairColour": "black", "top": "suit", "topColour": "#2a2f3a", "inner": "#f5f1e8", "neck": "tie", "neckColour": "#8a2c1e", "legs": "trousers", "legsColour": "#2a2f3a", "shoeStyle": "shoes", "shoes": "#1a1410", "hold": "briefcase", "itemColour": "#5a3a22"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
