import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Dentist: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "short", "hairColour": "brown", "skin": "fair", "top": "coat", "topColour": "#f5f1e8", "inner": "#8fd3c8", "glasses": "glasses", "mouth": "smile", "legs": "trousers", "legsColour": "#2a3a4a", "neck": "none", "extra": [{"map": ["gggg", "gwwg", "gggg", "..k."], "at": [0, -1], "ref": "hand"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
