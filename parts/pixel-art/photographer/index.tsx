import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Photographer: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"skin": "tan", "hair": "curly", "hairColour": "black", "beard": "stubble", "top": "tee", "topColour": "#f5f1e8", "over": "vest", "overColour": "#7a6a4a", "legs": "trousers", "legsColour": "#4a4a4a", "shoeStyle": "boots", "shoes": "#3a2a22", "neck": "cameraneck", "neckColour": "#2a2a2a", "hold": "camera", "itemColour": "#2a2a2a"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
