import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Witch costume: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hat":"witch","hatColour":"violet","top":"robe","topColour":"black","belt":true,"hair":"long","hairColour":"auburn","skin":"fair","shoeStyle":"boots","shoes":"black","hold":"broom","itemColour":"yellow"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
