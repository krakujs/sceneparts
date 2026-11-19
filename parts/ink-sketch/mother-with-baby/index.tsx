import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Mother with baby: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "long", "hairColour": "brown", "top": "tee", "topColour": "#e8a0bf", "legs": "trousers", "legsColour": "#3c4a5c", "shoeStyle": "shoes", "shoes": "#3a2a22", "hold": "baby", "itemColour": "#bfe6ff", "eyes": "happy", "mouth": "smile", "blush": true, "skin": "medium"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
