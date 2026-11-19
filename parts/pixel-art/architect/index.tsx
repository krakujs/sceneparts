import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Architect: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "adult", "skin": "light", "hair": "bob", "hairColour": "black", "glasses": "glasses", "top": "jacket", "topColour": "d", "inner": "w", "legs": "trousers", "legsColour": "k", "hold": "tablet", "itemColour": "d"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
