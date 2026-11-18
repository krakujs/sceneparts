import React from "react";
import type { PartProps } from "@sceneparts/core";
import ThumbsUp from "../thumbs-up/index";

// Flat vector thumbs-down: the thumbs-up fist turned upside down (thumb pointing down, cuff on top).
// Centre (x, y), about 400 px wide at s = 1. Same params as flat-vector/thumbs-up.

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <ThumbsUp {...p} down />;
}
