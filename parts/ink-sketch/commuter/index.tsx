import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Commuter: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"top":"coat","topColour":"grey","inner":"#f5f1e8","legs":"trousers","legsColour":"navy","hair":"short","hairColour":"black","skin":"brown","neck":"lanyard","neckColour":"blue","hold":"briefcase","itemColour":"brown","shoeStyle":"shoes","shoes":"#2a2220"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
