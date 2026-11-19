import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Police officer: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"skin":"dark","hair":"buzz","hairColour":"black","hat":"peaked","hatColour":"#1f2f57","top":"uniform","topColour":"#1f2f57","inner":"#f5f1e8","neck":"tie","neckColour":"#111111","legs":"trousers","legsColour":"#1f2f57","shoeStyle":"boots","shoes":"#111111","belt":true,"badge":"#e8c53a","extra":[{"d":"M -4 -66 A 14 14 0 1 0 24 -66 A 14 14 0 1 0 -4 -66 Z","fill":"#f2b632","at":"head"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
