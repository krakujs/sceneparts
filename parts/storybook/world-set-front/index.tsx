import React from "react";
import type { PartProps } from "@sceneparts/core";
import { SETS } from "../world-set/index";

/** Front layer of a world set (drawn over the characters): near waves, railings, smoke. Use layer "fg" or put it last. */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const set = SETS[p.set] ?? SETS.sea;
  const { f, d, t: _t, style: _s, render: _r, ...v } = p;
  return <g>{set.front ? set.front({ f, dur: d, v }) : null}</g>;
}
