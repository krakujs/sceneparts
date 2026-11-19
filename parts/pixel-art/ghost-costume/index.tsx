import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Ghost costume: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"top": "tee", "topColour": "w", "legs": "none", "shoeStyle": "bare", "hair": "none", "extra": [{"map": [".....wwwww.....", "...wwwwwwwww...", "..wwwwwwwwwww..", ".wwwwwwwwwwwww.", "wwwwwwwwwwwwwww", "wwwwkkwwwkkwwww", "wwwwkkwwwkkwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwwwwwwwwwwwwww", "wwgwwwgwwwgwwwg"], "at": [10, 8], "ref": "grid"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
