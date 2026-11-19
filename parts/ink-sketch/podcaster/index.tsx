import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Podcaster: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "buzz", "hairColour": "black", "skin": "brown", "beard": "stubble", "hat": "headset", "hatColour": "#1b1b2e", "top": "hoodie", "topColour": "#7a4bb5", "hold": "mic", "itemColour": "#5a6170", "legs": "trousers", "legsColour": "#2a2f45"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
