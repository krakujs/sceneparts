import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Reader: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair":"bun","hairColour":"auburn","skin":"medium","glasses":"glasses","top":"sweater","topColour":"#2e6b45","hold":"openbook","itemColour":"#c9874f","pose":"sit","seat":"chair","legs":"trousers","legsColour":"#3a3f4a","shoeStyle":"shoes","shoes":"#2a2220"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
