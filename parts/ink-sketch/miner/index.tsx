import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Miner: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"skin":"brown","hair":"buzz","hairColour":"black","beard":"stubble","hat":"minerhat","hatColour":"#f2b632","top":"overalls","topColour":"#3f6fb0","inner":"#c24a2e","shoeStyle":"boots","shoes":"#2a2220","hold":"shovel","itemColour":"brown"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
