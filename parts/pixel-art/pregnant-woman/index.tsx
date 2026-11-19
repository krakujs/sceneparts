import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Pregnant woman: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "long", "hairColour": "brown", "top": "dress", "topColour": "#7fb8c9", "belly": true, "legs": "none", "shoeStyle": "sneakers", "shoes": "#f5f1e8", "eyes": "happy", "mouth": "smile", "blush": true};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
