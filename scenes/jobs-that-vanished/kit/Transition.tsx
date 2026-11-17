import React from "react";
import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame } from "remotion";
import { C } from "../theme";

// Scene-to-scene transitions. Each scene's <Sequence> overlaps the previous one by OVERLAP frames,
// and the incoming scene (rendered on top) animates in with one of these styles.
// Pick per scene with `"transition": "<name>"` or per episode with storyboard.direction.transitions (a set name).
export const OVERLAP = 10; // frames
export type TransitionName = "cut" | "fade" | "wipe" | "iris" | "whip" | "slam" | "paper" | "flash" | "push" | "zoom" | "ink";
export const TRANSITIONS: TransitionName[] = ["cut", "fade", "wipe", "iris", "whip", "slam", "paper", "flash", "push", "zoom", "ink"];

// Named sets the creative director can choose for a whole episode (cycled across scenes 2..n).
export const TRANSITION_SETS: Record<string, TransitionName[]> = {
  storybook: ["paper", "iris", "wipe", "fade", "paper", "ink"],
  punchy: ["whip", "slam", "flash", "push", "whip", "zoom"],
  documentary: ["fade", "flash", "wipe", "fade", "push"],
  mix: ["whip", "iris", "paper", "slam", "wipe", "flash", "ink", "push"],
};

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const ease = Easing.bezier(0.65, 0, 0.35, 1);

export const TransitionIn: React.FC<{ name?: string; seed: string; children: React.ReactNode }> = ({ name = "cut", seed, children }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, OVERLAP], [0, 1], { ...clamp, easing: ease });
  if (f >= OVERLAP || name === "cut") return <AbsoluteFill>{children}</AbsoluteFill>;
  const style: React.CSSProperties = {};
  let overlay: React.ReactNode = null;
  switch (name) {
    case "fade":
      style.opacity = p;
      break;
    case "wipe": {
      style.clipPath = `inset(0 ${(1 - p) * 100}% 0 0)`;
      overlay = <div style={{ position: "absolute", top: 0, bottom: 0, left: `calc(${p * 100}% - 14px)`, width: 28, background: C.ink, boxShadow: `0 0 0 6px ${C.mustard}` }} />;
      break;
    }
    case "iris":
      style.clipPath = `circle(${p * 125}% at 50% 42%)`;
      break;
    case "ink": {
      // blobby ink reveal from a random point
      const cx = 25 + random(seed + "x") * 50;
      const cy = 30 + random(seed + "y") * 40;
      const pts = new Array(14).fill(0).map((_, i) => {
        const a = (i / 14) * Math.PI * 2;
        const r = p * 150 * (0.82 + 0.3 * random(`${seed}r${i}`));
        return `${cx + Math.cos(a) * r * 0.56}% ${cy + Math.sin(a) * r * 0.32}%`;
      });
      style.clipPath = `polygon(${pts.join(",")})`;
      break;
    }
    case "whip":
      style.translate = `${(1 - p) * 1080}px 0px`;
      style.filter = `blur(${(1 - p) * 26}px)`;
      break;
    case "push":
      style.translate = `0px ${(1 - p) * 1920}px`;
      break;
    case "zoom":
      style.scale = String(interpolate(p, [0, 1], [0.55, 1]));
      style.opacity = interpolate(f, [0, 4], [0, 1], clamp);
      style.filter = `blur(${(1 - p) * 10}px)`;
      break;
    case "slam": {
      const q = interpolate(f, [0, 5], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
      const shake = f >= 5 ? Math.sin(f * 2.7) * interpolate(f, [5, OVERLAP], [14, 0], clamp) : 0;
      style.scale = String(interpolate(q, [0, 1], [1.35, 1]));
      style.opacity = interpolate(f, [0, 2], [0, 1], clamp);
      style.translate = `${shake}px ${-shake * 0.6}px`;
      break;
    }
    case "paper": {
      // diagonal page sweep with a soft shadow edge
      const a = p * 140;
      style.clipPath = `polygon(0 0, ${a}% 0, ${a - 40}% 100%, 0 100%)`;
      break;
    }
    case "flash":
      overlay = <AbsoluteFill style={{ background: "#FFF8E8", opacity: interpolate(f, [0, 1, OVERLAP], [1, 0.95, 0], clamp) }} />;
      break;
    default:
      style.opacity = p;
  }
  return (
    <AbsoluteFill>
      <AbsoluteFill style={style}>{children}</AbsoluteFill>
      {overlay}
    </AbsoluteFill>
  );
};
