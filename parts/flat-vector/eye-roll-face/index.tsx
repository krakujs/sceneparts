import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Eye Roll Face (preset of flat-vector/reaction-face): exasperated face rolling its eyes up.
const LOOK = {"eyes": "roll", "mouth": "flat", "brows": "flat", "anim": "wobble"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
