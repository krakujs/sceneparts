import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Birthday child: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "child", "hat": "party", "hatColour": "m", "blush": true, "top": "tee", "topColour": "e", "legs": "shorts", "legsColour": "b", "hold": "parcel", "itemColour": "r", "hair": "buzz", "hairColour": "brown", "skin": "light"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
