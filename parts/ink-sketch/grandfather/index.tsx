import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Grandfather: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "elder", "hair": "short", "hairColour": "grey", "beard": "moustache", "top": "shirt", "topColour": "#f5f1e8", "over": "vest", "overColour": "#7a2e2e", "legs": "trousers", "legsColour": "#4a4a55", "shoeStyle": "shoes", "shoes": "#3a2a22", "hold": "book", "itemColour": "#e8e0c8", "eyes": "open", "mouth": "smile", "skin": "brown"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
