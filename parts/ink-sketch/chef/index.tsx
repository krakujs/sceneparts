import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Chef: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "build": "adult",
  "skin": "medium",
  "hat": "chef",
  "hatColour": "w",
  "beard": "moustache",
  "hairColour": "black",
  "top": "coat",
  "topColour": "w",
  "legs": "trousers",
  "legsColour": "d",
  "shoes": "k",
  "over": "apron",
  "overColour": "g",
  "hold": "spatula",
  "itemColour": "g"
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
