import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Engineer: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"skin": "medium", "hair": "short", "hairColour": "brown", "hat": "hardhat", "hatColour": "#f5f1e8", "top": "shirt", "topColour": "#4f6d8f", "legs": "trousers", "legsColour": "#3b4450", "over": "hivis", "overColour": "#e8f23a", "shoeStyle": "boots", "hold": "tablet", "itemColour": "#2a2a2a"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
