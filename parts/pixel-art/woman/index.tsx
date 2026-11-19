import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Woman: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "bob", "hairColour": "#6b4226", "top": "dress", "topColour": "#9b59b6", "legs": "none", "skin": "tan", "shoeStyle": "shoes", "shoes": "#7a2e2e", "eyes": "open", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
