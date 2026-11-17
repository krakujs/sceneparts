import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Galleon } from "../world-set/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Galleon f={p.f} x={p.x} y={p.y} s={p.s} broken={p.broken} sail={p.sail} hull={p.hull} flag={p.flag} />;
}
