import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Shepherd: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "none", "beard": "beard", "hairColour": "#3a2a22", "skin": "tan", "top": "robe", "topColour": "#7a6a5a", "back": "cape", "backColour": "#5a4a3a", "hat": "headscarf", "hatColour": "#c9a66b", "hold": "staff", "itemColour": "#8a5a2a", "legs": "none", "shoeStyle": "boots", "shoes": "#5a3a22"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
