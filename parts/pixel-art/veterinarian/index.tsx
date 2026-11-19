import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Veterinarian: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "bob", "hairColour": "#3a2a22", "skin": "light", "top": "tee", "topColour": "#2aa198", "legs": "trousers", "legsColour": "#2aa198", "neck": "stethoscope", "neckColour": "#3a3a3a", "shoeStyle": "sneakers", "shoes": "#f5f1e8", "extra": [{"map": ["..kk..", ".kwwk.", "kwwwwk", "kuwwwk", "k.kk.k"], "at": [2, 6], "ref": "torso"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
