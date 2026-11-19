import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Poet: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "long", "hairColour": "auburn", "skin": "tan", "hat": "beret", "hatColour": "#7a4bb5", "top": "shirt", "topColour": "#f5f1e8", "neck": "scarf", "neckColour": "#d2403f", "hold": "openbook", "itemColour": "#c9874f", "legs": "trousers", "legsColour": "#2a2f45"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
