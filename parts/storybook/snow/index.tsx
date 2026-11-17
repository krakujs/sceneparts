import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Flakes } from "../world-sky/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Flakes f={p.f} n={p.n} color={p.color} speed={p.speed} />;
}
