import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Lab technician: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "bun", "hairColour": "#5a3a22", "skin": "fair", "top": "labcoat", "topColour": "#f5f1e8", "inner": "#c9d8e6", "glasses": "glasses", "legs": "trousers", "legsColour": "#4a5a6a", "shoeStyle": "sneakers", "shoes": "#3a3a3a", "extra": [{"map": ["g.g.g", "gcgcg", "gcgcg", "ddddd"], "at": [0, -3], "ref": "hand"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
