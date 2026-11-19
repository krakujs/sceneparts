import React from "react";
import type { PartProps } from "@sceneparts/core";
import { PixSky, asTime } from "../backdrop/index";

// Sky clouds: a full-frame blue sky with many drifting pixel clouds and no ground, so it works behind flying
// sprites. time sets the sky colours; anim "drift" moves the clouds from p.f.

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const drift = (p.anim ?? "drift") === "drift";
  return (
    <g>
      <PixSky time={time} to={1920} f={drift ? p.f : 0} clouds={18} seed={p.seed ?? 9} drift={drift} />
    </g>
  );
}
