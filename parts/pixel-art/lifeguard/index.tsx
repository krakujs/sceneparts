import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Lifeguard: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"skin": "tan", "hair": "ponytail", "hairColour": "blonde", "hat": "cap", "hatColour": "#e0352b", "glasses": "shades", "top": "tank", "topColour": "#e0352b", "legs": "shorts", "legsColour": "#e0352b", "neck": "whistle", "neckColour": "#c9ced6", "shoeStyle": "sneakers", "shoes": "#f5f1e8", "extra": [{"map": [".rrrrr.", "rwwwwwr", "rw...wr", "rw...wr", "rwwwwwr", ".rrrrr."], "at": [25, 26], "ref": "grid"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
