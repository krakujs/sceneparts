import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Old man: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "elder", "hair": "bald", "hairColour": "grey", "beard": "beard", "glasses": "glasses", "top": "sweater", "topColour": "#5e8a6e", "legs": "trousers", "legsColour": "#5b5b66", "shoeStyle": "boots", "shoes": "#3a2a22", "hold": "cane", "itemColour": "#8a5a2b", "eyes": "open", "mouth": "smile", "skin": "fair"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
