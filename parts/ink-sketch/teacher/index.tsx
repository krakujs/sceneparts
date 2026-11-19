import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Teacher: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"skin":"light","hair":"bob","hairColour":"auburn","top":"sweater","topColour":"#d9b35a","legs":"skirt","legsColour":"#4a3a5a","shoeStyle":"shoes","shoes":"#3a2a22","hold":"book","itemColour":"#2f7a4a"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
