import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Judge: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"skin": "tan", "hair": "bun", "hairColour": "grey", "top": "robe", "topColour": "#1a1a1f", "neck": "scarf", "neckColour": "#f5f1e8", "hold": "gavel", "itemColour": "#6b4a2a"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
