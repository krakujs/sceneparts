import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Professor: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build":"elder","skin":"tan","hair":"short","hairColour":"grey","beard":"beard","glasses":"glasses","top":"jacket","topColour":"#8a6a4a","inner":"#f5f1e8","legs":"trousers","legsColour":"#4a4f58","shoeStyle":"shoes","shoes":"#2a2018","hold":"book","itemColour":"#7a2a2a"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
