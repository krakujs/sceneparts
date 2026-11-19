import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Father with child: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "short", "hairColour": "black", "beard": "stubble", "top": "tee", "topColour": "#4f9d69", "legs": "trousers", "legsColour": "#3c4a5c", "shoeStyle": "sneakers", "shoes": "#f5f1e8", "hold": "baby", "itemColour": "#f2c94c", "eyes": "open", "mouth": "smile", "skin": "dark"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
