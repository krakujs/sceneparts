import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Camper: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hat":"beanie","hatColour":"green","hair":"bob","hairColour":"brown","skin":"light","top":"shirt","topColour":"red","legs":"shorts","legsColour":"#4a5a3a","shoeStyle":"boots","shoes":"#5a3a22","hold":"torch","itemColour":"yellow"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
