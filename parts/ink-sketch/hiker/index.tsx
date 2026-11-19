import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Hiker: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hat":"sunhat","hatColour":"#d8b27a","hair":"short","hairColour":"brown","beard":"stubble","skin":"medium","top":"shirt","topColour":"green","legs":"trousers","legsColour":"brown","shoeStyle":"boots","shoes":"#5a3a22","back":"backpack","backColour":"orange","hold":"staff","itemColour":"brown"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
