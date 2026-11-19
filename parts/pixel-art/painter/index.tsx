import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Painter: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "bun", "hairColour": "black", "skin": "medium", "hat": "beret", "hatColour": "#2e6b45", "top": "shirt", "topColour": "#f5f1e8", "over": "apron", "overColour": "#c9874f", "hold": "paintbrush", "itemColour": "#7a4a2b", "legs": "trousers", "legsColour": "#3a3f4a", "extra": [{"map": ["..r..b.", ".y..e..", "...r.y."], "at": [1, 4], "ref": "torso"}, {"map": ["..xxxx.", ".xrxxyx", "xxxxxxx", "xexxxbx", ".xxxxx."], "at": [-5, 6], "ref": "torso"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
