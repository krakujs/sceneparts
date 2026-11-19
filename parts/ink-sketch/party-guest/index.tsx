import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Party guest: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hat":"party","hatColour":"yellow","blush":true,"top":"tee","topColour":"teal","legs":"skirt","legsColour":"pink","hold":"cup","itemColour":"coral","hair":"curly","hairColour":"red","skin":"medium"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
