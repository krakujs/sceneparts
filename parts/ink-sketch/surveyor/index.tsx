import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Surveyor: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"skin":"tan","hair":"ponytail","hairColour":"black","hat":"cap","hatColour":"#3a4a6a","top":"tee","topColour":"teal","legs":"trousers","legsColour":"#5a5548","over":"hivis","overColour":"#e8f23a","shoeStyle":"boots","shoes":"#3a2a22","hold":"staff","itemColour":"yellow","extra":[{"d":"M 194 -500 L 206 -500 L 176 0 L 166 0 Z","at":"body"},{"d":"M 194 -500 L 206 -500 L 240 0 L 230 0 Z","at":"body"},{"d":"M 197 -500 L 203 -500 L 204 0 L 198 0 Z","at":"body"},{"d":"M 180 -512 L 220 -512 L 220 -496 L 180 -496 Z","at":"body"},{"d":"M 172 -606 L 226 -606 L 226 -512 L 172 -512 Z","fill":"#9a9790","at":"body"},{"d":"M 224 -580 L 268 -588 L 268 -560 L 224 -552 Z","fill":"#9a9790","at":"body"},{"d":"M 186 -626 L 212 -626 L 212 -606 L 186 -606 Z","at":"body"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
