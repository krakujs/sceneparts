import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Witch costume: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hat": "witch", "hatColour": "p", "top": "robe", "topColour": "k", "hold": "broom", "itemColour": "u", "hair": "long", "hairColour": "auburn", "skin": "tan", "shoeStyle": "boots", "shoes": "k"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
