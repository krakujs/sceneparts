import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Waves } from "../world-sky/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Waves y={p.y} f={p.f} color={p.color} amp={p.amp} seed={p.seed} />;
}
