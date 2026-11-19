import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Scientist: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "spiky", "hairColour": "#3a2a22", "skin": "medium", "top": "labcoat", "topColour": "#f5f1e8", "inner": "#d9e6ef", "glasses": "goggles", "hold": "bottle", "itemColour": "#3fbf5a", "legs": "trousers", "legsColour": "#3a4a5a", "shoeStyle": "shoes", "shoes": "#2a2a2a"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
