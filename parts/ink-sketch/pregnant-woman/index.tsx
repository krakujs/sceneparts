import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Pregnant woman: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "long", "hairColour": "brown", "top": "dress", "topColour": "#7fb8c9", "legs": "none", "shoeStyle": "sneakers", "shoes": "#f5f1e8", "eyes": "happy", "mouth": "smile", "blush": true, "skin": "fair", "extra": [{"d": "M 50 -650 Q 152 -628 150 -520 Q 146 -440 84 -424 L 40 -470 Z", "fill": "#7fb8c9", "at": "body"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
