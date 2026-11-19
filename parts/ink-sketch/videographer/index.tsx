import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Videographer: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hat": "cap",
  "hatColour": "#2a2f3a",
  "top": "tee",
  "topColour": "#3d6b8c",
  "over": "vest",
  "overColour": "#2a2a2a",
  "hair": "short",
  "hairColour": "brown",
  "skin": "medium",
  "legs": "trousers",
  "legsColour": "#3a3f4a",
  "extra": [
    {
      "d": "M 34 -806 L 128 -806 L 128 -756 L 34 -756 Z M 128 -796 L 160 -790 L 160 -772 L 128 -766 Z M 52 -822 L 80 -822 L 80 -806 L 52 -806 Z",
      "fill": "#5a6170"
    }
  ]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
