import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Park ranger: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"skin":"medium","hair":"long","hairColour":"brown","hat":"cowboy","hatColour":"#b8905a","top":"shirt","topColour":"#5f6e3a","legs":"trousers","legsColour":"#4a3b2a","neck":"scarf","neckColour":"#8a3a22","belt":true,"badge":"#e8c53a","shoeStyle":"boots","shoes":"#3a2a22","hold":"staff","itemColour":"brown"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
