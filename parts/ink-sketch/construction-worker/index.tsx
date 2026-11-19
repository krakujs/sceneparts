import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Construction worker: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "build": "adult",
  "skin": "brown",
  "hat": "hardhat",
  "hatColour": "o",
  "beard": "stubble",
  "top": "tee",
  "topColour": "b",
  "over": "hivis",
  "overColour": "y",
  "legs": "trousers",
  "legsColour": "d",
  "shoeStyle": "boots",
  "shoes": "u",
  "hold": "shovel",
  "itemColour": "g"
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
