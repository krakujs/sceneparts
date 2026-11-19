import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Bride: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"top": "gown", "topColour": "w", "hat": "flowers", "hatColour": "w", "hair": "long", "hairColour": "blonde", "skin": "light", "hold": "bouquet", "itemColour": "m"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
