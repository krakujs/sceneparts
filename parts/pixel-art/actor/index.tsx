import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Actor: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "long", "hairColour": "brown", "skin": "medium", "top": "jacket", "topColour": "#7a1f2b", "legs": "trousers", "legsColour": "#1b1b2e", "back": "cape", "backColour": "#7a4bb5", "shoeStyle": "boots", "shoes": "#1b1b2e", "extra": [{"map": ["kkkkkkk", "kyyyyyk", "kkykykk", "kyyyyyk", "kyykyyk", "kkkkkkk"], "at": [0, -4], "ref": "hand"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
