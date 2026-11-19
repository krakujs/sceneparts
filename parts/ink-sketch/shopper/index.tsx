import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Shopper: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"top":"shirt","topColour":"violet","legs":"trousers","legsColour":"navy","hold":"bag","itemColour":"green","hair":"bob","hairColour":"auburn","skin":"brown"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
