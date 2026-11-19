import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Journalist: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "spiky", "hairColour": "black", "skin": "tan", "top": "jacket", "topColour": "#7a5a3a", "inner": "#f5f1e8", "neck": "lanyard", "neckColour": "#2f5fb8", "badge": "#f5f1e8", "hold": "book", "itemColour": "#f5f1e8", "legs": "trousers", "legsColour": "#2a2f45"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
