import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Streamer: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "spiky", "hairColour": "blue", "skin": "fair", "hat": "headset", "hatColour": "#3a3f4a", "top": "hoodie", "topColour": "#2e6b45", "hold": "controller", "itemColour": "#5a6170", "pose": "sit", "seat": "chair", "legs": "trousers", "legsColour": "#3a3f4a", "shoeStyle": "sneakers"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
