import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Courier: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "adult", "skin": "light", "hat": "cap", "hatColour": "n", "hair": "ponytail", "hairColour": "brown", "top": "shirt", "topColour": "#3a6ea5", "legs": "trousers", "legsColour": "d", "hold": "parcel", "itemColour": "u"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
