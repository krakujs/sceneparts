import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Librarian: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"skin":"medium","hair":"bun","hairColour":"black","top":"sweater","topColour":"#6a3a5a","glasses":"glasses","legs":"trousers","legsColour":"#3a3f4a","hold":"openbook","itemColour":"#2f7a4a"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
