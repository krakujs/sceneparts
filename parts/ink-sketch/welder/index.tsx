import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Welder: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "build": "adult",
  "skin": "fair",
  "hair": "short",
  "hairColour": "black",
  "top": "overalls",
  "topColour": "d",
  "legs": "trousers",
  "legsColour": "#3a5a7a",
  "hold": "torch",
  "itemColour": "y",
  "inner": "d",
  "extra": [{"d":"M -100 -4 L -98 -70 L -60 -104 L 0 -112 L 70 -100 L 102 -52 L 106 20 L 70 48 L 10 60 L -50 50 L -96 30 Z M 70 -100 L 70 -100 M 50.7 -103.3 L 102 -52 M 31.4 -106.6 L 102.9 -35.1 M 12.1 -109.9 L 103.9 -18.1 M -5.3 -111.3 L 104.8 -1.2 M -19.4 -109.4 L 105.8 15.8 M -33.5 -107.5 L 99.3 25.3 M -47.6 -105.6 L 90.3 32.3 M -61.1 -103.1 L 81.3 39.3 M -69.5 -95.5 L 72.3 46.3 M -77.9 -87.9 L 60 50 M -86.4 -80.4 L 46.7 52.7 M -94.8 -72.8 L 33.3 55.3 M -98.3 -60.3 L 20 58 M -98.8 -44.8 L 5.2 59.2 M -99.2 -29.2 L -14 56 M -99.7 -13.7 L -33.2 52.8 M -99.2 2.8 L -53.5 48.5 M -97.1 20.9 L -81.8 36.2","fill":"#f7f2e7","at":"head"},{"d":"M 18 -20 L 96 -28 L 98 10 L 16 18 Z M 96 -28 L 96 -28 M 85.1 -26.9 L 96.7 -15.3 M 74.2 -25.8 L 97.3 -2.7 M 63.3 -24.7 L 98 10 M 52.5 -23.5 L 87.1 11.1 M 41.6 -22.4 L 76.1 12.1 M 30.7 -21.3 L 65.2 13.2 M 19.8 -20.2 L 54.3 14.3 M 17.5 -10.5 L 43.3 15.3 M 16.9 0.9 L 32.4 16.4 M 16.3 12.3 L 21.5 17.5","fill":"#4f9c97","at":"head"}]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
