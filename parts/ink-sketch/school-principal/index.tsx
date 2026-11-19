import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// School principal: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"skin":"brown","hair":"bob","hairColour":"grey","top":"suit","topColour":"#3a3f4a","inner":"#f5f1e8","neck":"pearls","legs":"trousers","legsColour":"#3a3f4a","shoeStyle":"shoes","shoes":"#2a2018","hold":"clipboard"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
