import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Student with backpack: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build":"teen","back":"backpack","backColour":"green","top":"tee","topColour":"orange","legs":"trousers","legsColour":"navy","shoeStyle":"sneakers","shoes":"#f5f1e8","hold":"book","itemColour":"violet","hair":"spiky","hairColour":"brown","skin":"medium"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
