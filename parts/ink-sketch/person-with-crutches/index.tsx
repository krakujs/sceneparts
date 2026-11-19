import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Person with crutches: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "short", "hairColour": "brown", "top": "tee", "topColour": "#f2b8a0", "legs": "trousers", "legsColour": "#3c4a5c", "shoeStyle": "shoes", "shoes": "#3a2a22", "hold": "crutch", "itemColour": "#8a5a2b", "eyes": "open", "mouth": "smile", "skin": "fair", "extra": [{"d": "M 6 -172 L 76 -172 L 74 -100 L 8 -100 Z", "at": "body"}, {"d": "M -70 -730 L -54 -730 L -84 -8 L -100 -8 Z", "at": "body", "back": true}, {"d": "M -86 -742 L -44 -742 L -40 -722 L -90 -722 Z", "at": "body", "back": true}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
