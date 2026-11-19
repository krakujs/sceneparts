import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Gamer: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hat":"headset","hatColour":"black","top":"hoodie","topColour":"violet","legs":"trousers","legsColour":"black","hold":"controller","itemColour":"black","hair":"spiky","hairColour":"blue","skin":"light"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
