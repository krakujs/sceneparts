import React from "react";
import { interpolate, Easing, type Style } from "@sceneparts/core";

// India 90s nostalgia style: warm dusk light, flat shapes, brown ink outline, mohalla rooftops, CRT TVs, gully cricket.
// Fonts: Alfa Slab One (titles), Rubik (body), Special Elite (typewriter) – load them in your renderer for the full look.
export const titleFont = "'Alfa Slab One', Rockwell, Georgia, serif";
export const bodyFont = "Rubik, 'Helvetica Neue', Arial, sans-serif";
export const typeFont = "'Special Elite', 'Courier New', monospace";
export const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
export const pop = (f: number, d = 10) => interpolate(f, [0, d], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) });
export const ease = (f: number, a: number, b: number, from = 0, to = 1) =>
  interpolate(f, [a, b], [from, to], { ...clamp, easing: Easing.inOut(Easing.cubic) });
export const INK = "#2B160C";
export const P = {
  sky1: "#FFC27A", sky2: "#F48A5C", sky3: "#B85C7E", day1: "#9ED3E2", day2: "#FFE7B8",
  wall: "#EBCB92", wallDark: "#C9A066", floor: "#B9824F", mustard: "#FFC857", cream: "#FFF4D6",
  wood: "#9A5530", woodDark: "#5E2F1A", teal: "#2E7D7A", brick: "#C0502E", pink: "#E88BA0", green: "#6FA36B",
  tank: "#2E2B2A", concrete: "#D8C6A8", concreteDark: "#A9937A", skin: "#C98B5E", skinDark: "#A86E45",
  hair: "#1E1410", shorts: "#2F5D9E", stripeA: "#D9412B", stripeB: "#FFC857", modern1: "#1E2B3A", modern2: "#3D5A73",
};
export const SW = 7; // ink stroke width

// ---------- film look ----------
// ---------- people ----------
export const Arm: React.FC<{ x1: number; y1: number; x2: number; y2: number; x3: number; y3: number; color: string; w?: number }> = ({ x1, y1, x2, y2, x3, y3, color, w = 26 }) => (
  <g strokeLinecap="round" strokeLinejoin="round" fill="none">
    <polyline points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} stroke={INK} strokeWidth={w + 12} />
    <polyline points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} stroke={color} strokeWidth={w} />
  </g>
);
export type KidPose = "up" | "grip" | "idle" | "wave" | "point" | "cheer" | "bat" | "catch" | "bowl" | "run";
// Bittu – the series' original recurring kid. Feet at (x, y). Head ≈ y - 430*scale.
// ---------- CRT TV ----------
export type Screen = "snow" | "clear" | "khed" | "bars" | "off";
// ---------- mohalla rooftops ----------
export const BACK = ["#E9B8A0", "#CFE0C8", "#F2D49B", "#BFD5E2", "#E7C3D3", "#D9C6A8", "#F0C9A0"];

export const duskStops: [string, string][] = [["0", P.sky3], ["0.38", P.sky2], ["0.7", P.sky1], ["1", "#FFE2A8"]];
export const dayStops: [string, string][] = [["0", P.day1], ["0.45", "#CBE7E6"], ["1", P.day2]];

/** Warm slab title with a dark outline. */
export const Headline: React.FC<{ x: number; y: number; lines: string[]; accent?: string; size?: number; pop?: number }> = ({ x, y, lines, accent, size = 110, pop: k = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${k})`}>
    {lines.map((l, i) => (
      <text key={i} x={0} y={(i - (lines.length - 1) / 2) * size * 1.08} textAnchor="middle" fontFamily={titleFont} fontSize={size} fill={l === accent ? P.mustard : P.cream} stroke={INK} strokeWidth={size * 0.16} paintOrder="stroke" strokeLinejoin="round">{l}</text>
    ))}
  </g>
);

const style: Style = {
  id: "india-90s",
  ink: INK,
  accent: P.mustard,
  font: titleFont,
  paper: { base: "#F6DDB0", fibre: "#d9b47a", stain: "#c9905a" },
  title: (p) => <Headline {...p} />,
};
export default style;
