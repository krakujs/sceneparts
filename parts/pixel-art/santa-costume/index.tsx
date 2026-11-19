import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Santa costume: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"top": "coat", "topColour": "r", "inner": "r", "belt": true, "hat": "santa", "hatColour": "r", "beard": "beard", "hairColour": "white", "hair": "short", "legs": "trousers", "legsColour": "r", "shoeStyle": "boots", "shoes": "k", "hold": "bag", "itemColour": "u", "skin": "light", "extra": [{"map": ["wwwwwwwwww"], "at": [0, 0], "ref": "torso"}, {"map": ["wwwwwwwwww"], "at": [0, 10], "ref": "torso"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
