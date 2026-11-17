import type React from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */

export type Layer = "bg" | "mid" | "fg" | "screen";

/** One thing drawn in a shot: { "t": "<part id or short name>", ...params }. */
export type ItemSpec = { t: string; at?: number; until?: number; layer?: Layer; [k: string]: any };

export type ShotSpec = {
  /** Start time in seconds. */
  at: number;
  id?: string;
  cam?: number[][];
  auto?: boolean;
  shake?: number;
  night?: boolean;
  tint?: number | [number, number];
  grade?: "warm" | "night" | "red" | "gold" | "none";
  rays?: boolean;
  bg?: string;
  sky?: boolean | number;
  ground?: boolean | number;
  items?: ItemSpec[];
  over?: ItemSpec[];
  /** A full-frame template part (e.g. "drop-in-opener") instead of items; its params go in `params`. */
  template?: string;
  params?: Record<string, any>;
  /** "in" = repeat frame 0 of the first shot, so the video loops seamlessly. */
  loop?: "in";
};

export type Caption = { from: number; to: number; text: string };
export type ArtifactSpec = { src: string; label: string; credit?: string; at: number; until?: number };

/** A whole video. Everything Claude writes for a video lives in this one JSON file. */
export type StorySpec = {
  $schema?: string;
  title?: string;
  /** Style id, e.g. "egypt-tomb". Short part names in items resolve inside this style first, then "core". */
  style: string;
  fps?: number;
  width?: number;
  height?: number;
  duration?: number;
  loop?: boolean;
  audio?: string;
  music?: { src: string; volume?: number };
  shots: ShotSpec[];
  captions?: Caption[];
  captionPos?: "low" | "mid" | "high";
  artifact?: ArtifactSpec;
  boil?: boolean;
  atmos?: boolean | { dust?: number };
};

// ---------------- parts ----------------

export type PartType = "style" | "character" | "prop" | "scenery" | "background" | "effect" | "text" | "template";
export const PART_TYPES: PartType[] = ["style", "character", "prop", "scenery", "background", "effect", "text", "template"];

export type ParamDoc = {
  name: string;
  /** number | string | boolean | colour | enum | angles ([shoulder, elbow] degrees) | string[] | object | item | items */
  type: string;
  default?: unknown;
  values?: string[];
  min?: number;
  max?: number;
  note?: string;
};

export type PartManifest = {
  id: string;
  type: PartType;
  style: string;
  name: string;
  summary: string;
  tags: string[];
  params: ParamDoc[];
  example: Record<string, any>;
  uses?: string[];
  layer?: Layer;
  author: string;
  license: "MIT";
  origin: "original";
  version: string;
};

/** A style: palette, paper, bands and title card shared by every part of that style. */
export type Style = {
  id: string;
  ink: string;
  accent: string;
  font: string;
  paper?: { base: string; fibre?: string; stain?: string } | null;
  decor?: { sky?: (y: number) => React.ReactNode; ground?: (y: number) => React.ReactNode; skyY?: number; groundY?: number };
  title?: (p: { x: number; y: number; lines: string[]; accent?: string; size?: number; pop?: number }) => React.ReactNode;
  defs?: React.ReactNode;
};

/** What every part component receives: its params (eased, defaults applied) plus timing and helpers. */
export type PartProps<P = Record<string, any>> = P & {
  /** Frame inside the shot. */
  f: number;
  /** Shot length in frames. */
  d: number;
  /** Shot progress 0..1. */
  t: number;
  style: Style;
  /** Draw another item (for templates and parts that compose parts). */
  render: (item: ItemSpec, key?: React.Key) => React.ReactNode;
};
export type PartComponent = React.FC<PartProps<any>>;

export type PartEntry = { manifest: PartManifest; component?: PartComponent; style?: Style };
export type Registry = Record<string, PartEntry>;
