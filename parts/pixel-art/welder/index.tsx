import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Welder: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "adult", "skin": "fair", "hair": "short", "hairColour": "black", "top": "overalls", "topColour": "d", "legs": "trousers", "legsColour": "#3a5a7a", "hold": "torch", "itemColour": "y", "extra": [{"map": [".dddddddddd.", "dddddddddddd", "ddkkkkkkkkdd", "ddkffffffkdd", "ddkkkkkkkkdd", "dddddddddddd", "dddddddddddd", ".dddddddddd.", "..dddddddd.."], "at": [-1, 1], "ref": "head"}], "inner": "d"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
