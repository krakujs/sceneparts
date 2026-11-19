import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Graduate: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"top": "gown", "topColour": "n", "hat": "graduation", "hatColour": "k", "hair": "long", "hairColour": "brown", "skin": "fair", "extra": [{"map": ["wwwwwwww", "yyyyyyyy"], "at": [0, -1], "ref": "hand"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
