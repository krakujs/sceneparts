import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Beekeeper: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "none", "skin": "medium", "top": "jacket", "topColour": "#f5f1e8", "legs": "trousers", "legsColour": "#f5f1e8", "hat": "cap", "hatColour": "#f5f1e8", "shoeStyle": "boots", "shoes": "#5a4a3a", "extra": [{"map": ["gggggggggg", "gdgdgdgdgg", "gggggggggg", "gdgdgdgdgg", "gggggggggg", "gdgdgdgdgg"], "at": [0, 2], "ref": "head"}, {"map": ["yyyy", "ywyw", "yyyy"], "at": [0, -1], "ref": "hand"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
