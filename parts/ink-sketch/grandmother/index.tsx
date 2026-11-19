import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Grandmother: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "elder", "hair": "bun", "hairColour": "grey", "glasses": "glasses", "top": "dress", "topColour": "#6f8fb5", "neck": "scarf", "neckColour": "#b35c7a", "legs": "none", "shoeStyle": "shoes", "shoes": "#3a2a22", "hold": "ball", "itemColour": "#d2403f", "eyes": "happy", "mouth": "smile", "skin": "tan", "extra": [{"d": "M -4 6 L 6 -2 L 52 -74 L 42 -80 Z", "at": "hand"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
