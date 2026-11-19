import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Air traffic controller: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "braids", "hairColour": "#2a1d17", "skin": "dark", "top": "shirt", "topColour": "#4a7fb5", "neck": "tie", "neckColour": "#3a3a3a", "hat": "headset", "hatColour": "#2a2a2a", "hold": "tablet", "itemColour": "#3a3a3a", "legs": "trousers", "legsColour": "#4a4a4a"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
