import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Student: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build":"teen","skin":"light","hair":"spiky","hairColour":"brown","top":"hoodie","topColour":"#e07a2a","legs":"trousers","legsColour":"#333a44","shoeStyle":"sneakers","shoes":"#f5f1e8","back":"backpack","backColour":"#3a5a8a","hold":"book","itemColour":"#2a6fb8"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
