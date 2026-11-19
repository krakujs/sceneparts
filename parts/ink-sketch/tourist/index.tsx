import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Tourist: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hat":"sunhat","hatColour":"yellow","glasses":"shades","neck":"cameraneck","neckColour":"black","top":"tee","topColour":"teal","legs":"shorts","legsColour":"#e0c08a","shoeStyle":"sneakers","shoes":"#f5f1e8","hold":"openbook","itemColour":"yellow","skin":"fair","hair":"ponytail","hairColour":"blonde"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
