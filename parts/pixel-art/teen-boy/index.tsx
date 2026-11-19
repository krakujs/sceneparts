import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Teen boy: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "teen", "hair": "spiky", "hairColour": "black", "top": "hoodie", "topColour": "#4a4f5c", "legs": "trousers", "legsColour": "#23305e", "shoeStyle": "sneakers", "shoes": "#f5f1e8", "hold": "phone", "itemColour": "#222222", "eyes": "open", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
