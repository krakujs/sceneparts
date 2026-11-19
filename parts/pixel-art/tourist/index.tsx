import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Tourist: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hat": "sunhat", "hatColour": "x", "glasses": "shades", "neck": "cameraneck", "neckColour": "k", "top": "tee", "topColour": "c", "legs": "shorts", "legsColour": "#e0c08a", "hold": "openbook", "itemColour": "y", "skin": "light", "hair": "ponytail", "hairColour": "blonde"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
