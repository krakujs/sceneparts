import React from "react";
import type { PartProps } from "@sceneparts/core";
import Figure from "../figure/index";

// Thoth: an egypt-tomb/figure preset. Every figure param still works (pose, hold, mouth, run, glow...).
const FIXED = {"kind": "god", "head": "ibis", "crown": "moon"} as const;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Figure {...FIXED} {...p} kind={FIXED.kind} head={FIXED.head} />;
}
