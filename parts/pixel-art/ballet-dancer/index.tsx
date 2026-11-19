import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Ballet dancer: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "bun", "hairColour": "brown", "skin": "light", "top": "tank", "topColour": "#ef8fb4", "legs": "none", "shoeStyle": "shoes", "shoes": "#f5f1e8", "arms": "up", "extra": [{"map": ["mmmmmmmmmmmmmm", "mmmmmmmmmmmmmm", "..mmmmmmmmmm.."], "at": [-2, -1], "ref": "legs"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
