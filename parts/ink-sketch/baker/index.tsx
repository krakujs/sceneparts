import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Baker: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "build": "adult",
  "skin": "tan",
  "hair": "bun",
  "hairColour": "brown",
  "top": "shirt",
  "topColour": "w",
  "legs": "skirt",
  "legsColour": "n",
  "over": "apron",
  "overColour": "#e8dcc4",
  "hold": "tray",
  "itemColour": "x",
  "extra": [{"d":"M -36 -28 Q -42 -76 -8 -80 Q 0 -86 8 -80 Q 42 -76 36 -28 Z","fill":"#c9975a","at":"hand"}]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
