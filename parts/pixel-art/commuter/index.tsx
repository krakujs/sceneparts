import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Commuter: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"top": "coat", "topColour": "d", "inner": "#f5f1e8", "legs": "trousers", "legsColour": "n", "hold": "briefcase", "itemColour": "u", "hair": "short", "hairColour": "black", "skin": "brown"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
