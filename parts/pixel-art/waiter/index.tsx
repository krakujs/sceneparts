import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Waiter: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "adult", "skin": "dark", "hair": "short", "hairColour": "black", "top": "shirt", "topColour": "w", "over": "vest", "overColour": "k", "neck": "bowtie", "neckColour": "k", "legs": "trousers", "legsColour": "k", "hold": "tray", "itemColour": "g", "arms": "one-up"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
