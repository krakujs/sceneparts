import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Writer: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "curly", "hairColour": "grey", "skin": "fair", "glasses": "glasses", "top": "sweater", "topColour": "#c9874f", "legs": "trousers", "legsColour": "#5a6170", "shoeStyle": "shoes", "extra": [{"map": ["kkkkkkk", "kwggwgk", "kwwwwwk", "kwggwgk", "kkkkkkk"], "at": [0, 4], "ref": "torso"}, {"map": ["k", "k", "k", "y"], "at": [0, 0], "ref": "hand"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
