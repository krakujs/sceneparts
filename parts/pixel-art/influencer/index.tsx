import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Influencer: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "long", "hairColour": "blonde", "skin": "light", "glasses": "shades", "blush": true, "top": "jacket", "topColour": "#ef8fb4", "inner": "#f5f1e8", "legs": "shorts", "legsColour": "#5a6170", "shoeStyle": "boots", "shoes": "#2a2f45", "hold": "phone", "itemColour": "#1b1b2e", "arms": "one-up"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
