import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Chemist: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "bob", "hairColour": "auburn", "skin": "light", "top": "labcoat", "topColour": "#f5f1e8", "inner": "#e8e8e8", "glasses": "goggles", "hold": "bottle", "itemColour": "#8a4fd6", "legs": "trousers", "legsColour": "#2a3a4a", "shoeStyle": "shoes", "shoes": "#2a1d17"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
