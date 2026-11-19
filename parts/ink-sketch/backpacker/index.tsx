import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Backpacker: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hat":"beanie","hatColour":"teal","hair":"curly","hairColour":"black","skin":"tan","top":"tee","topColour":"coral","legs":"trousers","legsColour":"navy","shoeStyle":"sneakers","shoes":"#5b5650","back":"backpack","backColour":"red","hold":"bottle","itemColour":"blue"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
