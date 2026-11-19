import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Surveyor: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"skin": "tan", "hair": "bob", "hairColour": "black", "hat": "cap", "hatColour": "#3a4a6a", "top": "tee", "topColour": "#2f7a6a", "legs": "trousers", "legsColour": "#5a5548", "over": "hivis", "overColour": "#e8f23a", "shoeStyle": "boots", "extra": [{"map": ["..ddd..", ".dyyyd.", "..ddd..", "...d...", "...d...", "...d...", "..d.d..", ".d...d.", "d.....d"], "at": [24, 36], "ref": "grid"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
