import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Puppy (preset of flat-vector/quadruped): small young dog: big head, big eyes, floppy ears, short legs
const LOOK = {"len": 190, "girth": 110, "leg": 70, "legW": 26, "neck": 16, "neckAngle": 55, "head": 66, "snout": 36, "ear": "floppy", "eye": 1.35, "tail": "thin", "tailLen": 80, "tailAngle": 55, "color": "#E9B77A", "belly": "#FBEBD2", "mouth": "tongue"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
