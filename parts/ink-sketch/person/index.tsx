import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, PAPER, ACCENT, LW, WASH, SKIN, HAIR, col } from "../style/index";

// Ink-line person. Origin = feet, faces right, ~980 px tall at s = 1. Outlines in INK, PAPER fill, offset washes.
// Motion only from p.f. Body space: feet at y = 0, up is negative.
// Preset anchors: head [12,-927] (r 95), neck [10,-805], chest [30,-700], belly [20,-560], waist [4,-470], hand [101,-466].
// extra: { d, fill?, at: "head"|"body"|"hand", back? } with d in that anchor's local space.

export const ANCHOR = {
  head: [12, -927] as const, headR: 95, neck: [10, -805] as const,
  chest: [30, -700] as const, belly: [20, -560] as const, waist: [4, -470] as const,
  hand: [101, -466] as const, backHand: [-40, -470] as const,
};

export type Person = {
  x?: number; y?: number; s?: number; flip?: boolean;
  build?: "adult" | "teen" | "child" | "toddler" | "baby" | "elder";
  anim?: "idle" | "walk" | "run" | "wave" | "cheer" | "jump" | "talk" | "none";
  arms?: "down" | "up" | "one-up";
  pose?: "stand" | "sit"; seat?: "none" | "chair" | "wheelchair";
  skin?: string; hair?: string; hairColour?: string; beard?: string; glasses?: string;
  eyes?: "open" | "happy" | "closed"; mouth?: "smile" | "flat" | "open" | "frown" | "mask"; blush?: boolean;
  hat?: string; hatColour?: string;
  top?: string; topColour?: string; inner?: string;
  legs?: "trousers" | "shorts" | "skirt" | "none"; legsColour?: string;
  shoeStyle?: "shoes" | "boots" | "sneakers" | "bare"; shoes?: string;
  over?: "none" | "apron" | "hivis" | "vest" | "sash" | "lifejacket"; overColour?: string;
  neck?: string; neckColour?: string; belt?: boolean; badge?: string;
  hold?: string; itemColour?: string;
  back?: "none" | "backpack" | "cape" | "wings" | "tank" | "guitar" | "quiver"; backColour?: string;
  belly?: boolean; wash?: "colour" | "accent" | "none"; vx?: number;
  extra?: { d: string; fill?: string; at?: "head" | "body" | "hand"; back?: boolean }[];
  f?: number;
};

export const BUILD: Record<string, { k: number; head: number; leg: number }> = {
  adult: { k: 1, head: 1, leg: 1 }, teen: { k: 0.9, head: 1.05, leg: 0.97 }, child: { k: 0.66, head: 1.3, leg: 0.84 },
  toddler: { k: 0.5, head: 1.5, leg: 0.7 }, baby: { k: 0.3, head: 1.65, leg: 0.5 }, elder: { k: 0.97, head: 1, leg: 0.98 },
};

const TH = 235, SH = 215, UP = 165, FO = 150, HIP = -470, SHY = -775;
const rad = (d: number) => (d * Math.PI) / 180;
const pt = (x: number, y: number, a: number, l: number): [number, number] => [x + Math.sin(rad(a)) * l, y + Math.cos(rad(a)) * l];
type L = [number, number];
type Motion = { ba: L; fa: L; bl: L; fl: L; lean: number; tilt: number; bob: number; talk: boolean };

/** Limb angles (degrees from straight down, elbow/knee relative) for the animation at frame f. */
export function motion(anim: string, f: number, sit: boolean): Motion {
  const br = Math.sin(f / 22);
  const o: Motion = { ba: [-5 + br, 10], fa: [5 - br, 10], bl: [-3, 0], fl: [3, 0], lean: 0, tilt: 0, bob: 0, talk: false };
  if (sit) { o.bl = [86, 86]; o.fl = [92, 92]; o.ba = [10, 55]; o.fa = [18, 55]; }
  if (anim === "walk" || anim === "run") {
    const run = anim === "run", ph = f * (run ? 0.42 : 0.3), s = Math.sin(ph), c = Math.cos(ph), A = run ? 38 : 24;
    o.fl = [A * s, (run ? 20 : 6) + (run ? 70 : 30) * Math.max(0, c)];
    o.bl = [-A * s, (run ? 20 : 6) + (run ? 70 : 30) * Math.max(0, -c)];
    o.fa = [-(run ? 45 : 22) * s, run ? 85 : 18];
    o.ba = [(run ? 45 : 22) * s, run ? 85 : 18];
    o.lean = run ? 9 : 2;
    o.bob = run ? Math.abs(c) * 18 : 0;
  } else if (anim === "wave") {
    o.fa = [100, 66 + Math.sin(f / 4) * 22];
  } else if (anim === "cheer") {
    o.fa = [165, 8 + Math.sin(f / 5) * 10]; o.ba = [-165, -8 - Math.sin(f / 5) * 10];
    o.bob = Math.abs(Math.sin(f / 7)) * 40;
  } else if (anim === "jump") {
    o.fa = [150, 20]; o.ba = [-150, -20]; o.bl = [-6, 14]; o.fl = [6, 14];
    o.bob = Math.abs(Math.sin((f * Math.PI) / 30)) * 60;
  } else if (anim === "talk") {
    o.fa = [32 + Math.sin(f / 9) * 12, 62 + Math.sin(f / 6) * 14]; o.talk = true;
  }
  return o;
}

const pathOf = (pts: L[]) => "M " + pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ");

/** A limb: ink underlay, paper core, and a loose offset wash. */
export const Bone: React.FC<{ pts: L[]; w: number; wc?: string; wo?: number }> = ({ pts, w, wc, wo = 0.5 }) => {
  const d = pathOf(pts);
  return (
    <g>
      <path d={d} fill="none" stroke={INK} strokeWidth={w + LW * 2} strokeLinecap="round" />
      <path d={d} fill="none" stroke={PAPER} strokeWidth={w} strokeLinecap="round" />
      {wc ? <path d={d} fill="none" stroke={wc} strokeWidth={w * 0.85} opacity={wo} strokeLinecap="round" transform="translate(4 3)" /> : null}
    </g>
  );
};

/** A closed shape: paper fill, offset wash, then the ink outline on top. */
export const Sh: React.FC<{ d: string; wc?: string; wo?: number; dx?: number; dy?: number }> = ({ d, wc, wo = 0.5, dx = 5, dy = 4 }) => (
  <g>
    <path d={d} fill={PAPER} stroke="none" />
    {wc ? <path d={d} fill={wc} opacity={wo} stroke="none" transform={`translate(${dx} ${dy})`} /> : null}
    <path d={d} fill="none" stroke={INK} strokeWidth={LW} strokeLinejoin="round" strokeLinecap="round" />
  </g>
);

/** An ink line (no fill). */
const Ln: React.FC<{ d: string; w?: number }> = ({ d, w = LW }) => (
  <path d={d} fill="none" stroke={INK} strokeWidth={w} strokeLinecap="round" />
);

/** Hair behind the head (drawn before the head). Head centre is the origin. */
function hairBack(h: string, c: string) {
  switch (h) {
    case "long": return <Sh d="M -88 -56 Q -136 60 -116 196 Q -40 220 24 184 Q 6 100 14 -24 Z" wc={c} wo={0.7} />;
    case "bob": return <Sh d="M -96 -44 Q -114 50 -88 96 L 42 96 Q 62 40 44 -16 Z" wc={c} wo={0.7} />;
    case "ponytail": return <Sh d="M -70 -70 Q -158 -40 -146 60 Q -132 124 -96 160 Q -112 80 -62 -18 Z" wc={c} wo={0.7} />;
    case "bun": return <Sh d="M -58 -128 A 36 36 0 1 0 -58 -56 A 36 36 0 1 0 -58 -128 Z" wc={c} wo={0.7} dx={3} dy={3} />;
    case "pigtails": return <g><Sh d="M -92 -40 Q -150 -20 -140 60 Q -128 110 -104 110 Q -96 40 -70 -10 Z" wc={c} wo={0.7} /><Sh d="M -46 -120 Q -92 -130 -90 -170 Q -60 -196 -30 -150 Q -24 -120 -46 -120 Z" wc={c} wo={0.7} /></g>;
    case "braids": return <g>{[0, 1, 2, 3, 4].map((i) => <ellipse key={i} cx={-94 - i * 3} cy={-6 + i * 42} rx={26 - i * 2} ry={24} fill={c} stroke={INK} strokeWidth={LW} />)}</g>;
    case "afro": return <circle cx={-12} cy={-18} r={134} fill={c} stroke={INK} strokeWidth={LW} />;
    default: return null;
  }
}

/** Hair on top of the head (fringe, cap, spikes). */
function hairFront(h: string, c: string) {
  const cap = "M -96 6 Q -102 -102 0 -104 Q 98 -102 98 -20 Q 60 -58 18 -54 Q -22 -50 -50 -22 Q -70 2 -96 6 Z";
  switch (h) {
    case "short": case "bun": case "ponytail": case "long": case "bob": case "pigtails": case "braids": return <Sh d={cap} wc={c} wo={0.75} />;
    case "spiky": return <Sh d="M -96 4 L -116 -34 L -84 -54 L -96 -100 L -54 -90 L -30 -134 L 0 -104 L 30 -136 L 52 -98 L 92 -110 L 84 -64 L 112 -40 Q 98 -22 98 -20 Q 60 -58 18 -54 Q -22 -50 -50 -22 Q -70 2 -96 4 Z" wc={c} wo={0.75} />;
    case "curly": return <g>{[[-74, -66], [-40, -98], [2, -106], [44, -98], [76, -66], [-92, -24], [88, -28]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={28} fill={c} stroke={INK} strokeWidth={LW} />)}<Sh d={cap} wc={c} wo={0.75} /></g>;
    case "afro": return <Sh d="M -80 -6 Q -86 -100 0 -102 Q 84 -98 92 -26 Q 40 -62 4 -56 Q -40 -50 -80 -6 Z" wc={c} wo={0.75} />;
    case "buzz": return <Sh d="M -94 0 Q -98 -98 0 -98 Q 94 -96 96 -26 Q 56 -60 10 -60 Q -40 -60 -70 -6 Z" wc={c} wo={0.6} />;
    case "mohawk": return <Sh d="M -44 -90 Q -48 -160 4 -158 Q 26 -152 26 -92 Q -8 -80 -44 -90 Z" wc={c} wo={0.8} />;
    default: return null;
  }
}

/** Facial hair, glasses and face accessories (face looks right). */
function facial(beard: string, hc: string, glasses: string, eyes: string, mouth: string, blush: boolean, f: number, talk: boolean) {
  const blink = eyes === "open" && f % 96 < 4;
  const open = talk ? 3 + Math.abs(Math.sin(f / 2.6)) * 10 : 0;
  const ex = [40, 74];
  return (
    <g>
      {beard === "beard" ? <Sh d="M 18 26 Q 26 92 72 90 Q 108 84 102 44 Q 96 66 70 66 Q 42 66 30 34 Z" wc={hc} wo={0.8} dx={3} dy={2} /> : null}
      {beard === "stubble" ? <g fill={hc} opacity={0.55}>{[[30, 44], [42, 62], [56, 70], [72, 70], [86, 60], [96, 46], [50, 56], [64, 62]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3.2} />)}</g> : null}
      {beard === "goatee" ? <Sh d="M 56 60 Q 66 92 80 74 Q 84 60 74 58 Z" wc={hc} wo={0.8} dx={2} dy={2} /> : null}
      {beard === "moustache" || beard === "beard" ? <Sh d="M 52 40 Q 68 30 88 38 Q 70 44 52 40 Z" wc={hc} wo={0.9} dx={2} dy={1} /> : null}
      {blush ? <circle cx={60} cy={24} r={13} fill={WASH.pink} opacity={0.5} /> : null}
      {eyes === "happy" ? ex.map((x) => <Ln key={x} d={`M ${x - 9} 2 Q ${x} -10 ${x + 9} 2`} w={6} />)
        : eyes === "closed" || blink ? ex.map((x) => <Ln key={x} d={`M ${x - 8} 0 L ${x + 8} 1`} w={6} />)
        : ex.map((x) => <circle key={x} cx={x} cy={-4} r={6.5} fill={INK} />)}
      <Ln d="M 94 -4 Q 106 12 96 22" w={5} />
      <Ln d="M -4 -22 Q -26 2 -8 26" w={6} />
      {mouth === "smile" ? <Ln d="M 50 40 Q 66 58 84 40" w={6} /> : null}
      {mouth === "flat" ? <Ln d="M 52 48 L 82 48" w={6} /> : null}
      {mouth === "frown" ? <Ln d="M 52 60 Q 66 42 84 58" w={6} /> : null}
      {mouth === "open" ? <ellipse cx={66} cy={52} rx={10} ry={open || 9} fill={INK} /> : null}
      {mouth === "mask" ? <g><path d="M 26 10 Q 60 -4 96 12 Q 100 62 62 82 Q 24 62 26 10 Z" fill="#dfe8ec" stroke={INK} strokeWidth={LW} strokeLinejoin="round" /><Ln d="M 96 14 Q 110 6 120 20" w={4} /><Ln d="M 26 14 Q 6 2 -8 6" w={4} /></g> : null}
      {glasses === "glasses" ? <g fill="none" stroke={INK} strokeWidth={5}><circle cx={ex[0]} cy={-4} r={17} /><circle cx={ex[1]} cy={-4} r={17} /><path d="M 57 -4 L 57 -4 M 23 -8 L 4 -14" /></g> : null}
      {glasses === "shades" ? <g fill={INK}><rect x={22} y={-20} width={34} height={26} rx={9} /><rect x={58} y={-20} width={34} height={26} rx={9} /><path d="M 56 -10 L 58 -10" stroke={INK} strokeWidth={5} /></g> : null}
      {glasses === "goggles" ? <g><rect x={-10} y={-18} width={120} height={12} fill={INK} /><rect x={20} y={-26} width={44} height={34} rx={14} fill={PAPER} stroke={INK} strokeWidth={LW} /><rect x={56} y={-26} width={44} height={34} rx={14} fill={WASH.teal} opacity={0.6} stroke={INK} strokeWidth={LW} /></g> : null}
      {glasses === "eyepatch" ? <g><ellipse cx={ex[0]} cy={-4} rx={18} ry={16} fill={INK} /><Ln d="M 22 -20 Q 56 -60 90 -18" w={4} /></g> : null}
    </g>
  );
}

/** Headwear, drawn on top of the head. c = hat colour. */
function hatShape(h: string, c: string) {
  const H = (d: string, o = 0.8) => <Sh d={d} wc={c} wo={o} dx={4} dy={3} />;
  switch (h) {
    case "cap": return <g>{H("M -94 -26 Q -96 -104 0 -104 Q 94 -102 96 -26 Q 40 -44 -94 -26 Z")}{H("M 40 -40 Q 118 -44 136 -26 Q 118 -20 40 -24 Z")}</g>;
    case "hardhat": case "minerhat": return <g>{H("M -92 -30 Q -94 -116 0 -116 Q 96 -114 94 -30 Z")}{H("M -110 -28 L 110 -28 L 106 -12 L -106 -12 Z")}{H("M -10 -116 L 12 -116 L 12 -88 L -10 -88 Z", 1)}{h === "minerhat" ? <g><circle cx={50} cy={-96} r={12} fill={PAPER} stroke={INK} strokeWidth={LW} /></g> : null}</g>;
    case "beanie": return <g>{H("M -96 -34 Q -98 -120 0 -120 Q 98 -118 96 -34 Z")}{H("M -100 -52 L 100 -52 L 98 -30 L -98 -30 Z", 1)}<circle cx={0} cy={-124} r={16} fill={c} stroke={INK} strokeWidth={LW} /></g>;
    case "chef": return <g><circle cx={-44} cy={-112} r={40} fill={PAPER} stroke={INK} strokeWidth={LW} /><circle cx={0} cy={-128} r={44} fill={PAPER} stroke={INK} strokeWidth={LW} /><circle cx={44} cy={-112} r={40} fill={PAPER} stroke={INK} strokeWidth={LW} />{H("M -84 -94 L 84 -94 L 84 -62 L -84 -62 Z", 0.6)}</g>;
    case "peaked": return <g>{H("M -94 -40 Q -96 -110 0 -110 Q 96 -108 94 -40 Z")}{H("M 30 -44 Q 120 -48 138 -34 Q 110 -26 30 -26 Z")}<circle cx={40} cy={-80} r={9} fill={PAPER} stroke={INK} strokeWidth={4} /></g>;
    case "nurse": return <g>{H("M -62 -86 L 62 -86 L 42 -112 L -42 -112 Z", 0.4)}<path d="M -4 -100 L 4 -100 L 4 -92 L 12 -92 L 12 -84 L 4 -84 L 4 -76 L -4 -76 L -4 -84 L -12 -84 L -12 -92 L -4 -92 Z" fill={WASH.red} /></g>;
    case "surgical": return H("M -96 -36 Q -100 -112 0 -112 Q 100 -112 96 -36 Q 50 -62 0 -60 Q -50 -62 -96 -36 Z");
    case "cowboy": return <g>{H("M -58 -40 Q -60 -128 0 -128 Q 60 -128 58 -40 Z")}{H("M -150 -40 Q 0 -72 150 -40 Q 0 -18 -150 -40 Z")}<Ln d="M -58 -58 Q 0 -66 58 -58" w={6} /></g>;
    case "tophat": return <g>{H("M -120 -62 Q 0 -88 124 -62 Q 0 -40 -120 -62 Z")}{H("M -62 -62 L -56 -178 Q 0 -186 56 -178 L 62 -62 Z")}<path d="M -60 -112 L 60 -112 L 60 -92 L -60 -92 Z" fill={INK} opacity={0.75} /></g>;
    case "helmet": return H("M -104 -18 Q -106 -124 0 -124 Q 106 -122 104 -18 L 78 -18 Q 60 -56 0 -56 Q -60 -56 -78 -18 Z");
    case "firehelmet": return <g>{H("M -104 -20 Q -108 -128 0 -128 Q 108 -126 104 -20 Z")}{H("M -108 -40 L 108 -40 L 104 -22 L -108 -22 Z", 1)}{H("M 60 -40 Q 110 -40 128 -30 Q 96 -20 60 -22 Z", 1)}<circle cx={-20} cy={-70} r={10} fill={WASH.yellow} stroke={INK} strokeWidth={4} /></g>;
    case "graduation": return <g>{H("M -150 -104 L 0 -158 L 150 -104 L 0 -50 Z")}{H("M -66 -66 Q -66 -92 0 -92 Q 66 -92 66 -66 L 66 -48 L -66 -48 Z", 0.9)}<Ln d="M 0 -104 L 110 -92 L 110 -68" w={4} /><circle cx={110} cy={-66} r={6} fill={WASH.yellow} stroke={INK} strokeWidth={4} /></g>;
    case "beret": return <g>{H("M -112 -88 Q -90 -140 0 -134 Q 96 -140 112 -84 Q 70 -66 0 -68 Q -70 -66 -112 -88 Z")}<circle cx={-4} cy={-132} r={9} fill={INK} /></g>;
    case "witch": return <g>{H("M -90 -52 L 70 -52 L 18 -206 Z")}{H("M -130 -52 Q 0 -82 130 -52 Q 0 -30 -130 -52 Z")}</g>;
    case "crown": return H("M -74 -62 L -84 -126 L -42 -100 L 0 -150 L 42 -100 L 84 -126 L 74 -62 Z");
    case "headset": return <g><Ln d="M -70 -8 Q -78 -108 0 -106 Q 72 -106 76 -18" w={9} /><rect x={-88} y={-30} width={28} height={48} rx={10} fill={INK} /><Ln d="M 62 -14 Q 64 34 26 40" w={5} /><circle cx={22} cy={40} r={8} fill={INK} /></g>;
    case "headscarf": return <g>{H("M -98 -4 Q -100 -118 0 -118 Q 100 -118 98 -4 Q 60 -46 0 -46 Q -60 -46 -98 -4 Z", 0.8)}{H("M -92 -20 Q -150 10 -130 70 Q -110 40 -86 -4 Z")}</g>;
    case "bandana": return <g>{H("M -96 -30 Q 0 -86 96 -30 L 98 -12 Q 0 -66 -98 -12 Z")}{H("M -96 -22 L -150 6 L -120 46 L -84 -4 Z")}</g>;
    case "turban": return <g>{H("M -102 -26 Q -110 -130 0 -132 Q 108 -128 102 -26 Q 50 -58 0 -56 Q -50 -58 -102 -26 Z")}<Ln d="M -92 -70 Q 0 -120 96 -70 M -96 -40 Q 0 -94 98 -44" w={4} /></g>;
    case "sunhat": return <g>{H("M -150 -46 Q 0 -78 150 -46 Q 0 -20 -150 -46 Z")}{H("M -80 -48 Q -84 -104 0 -104 Q 84 -104 80 -48 Z")}</g>;
    case "party": return <g>{H("M -54 -90 L 50 -90 L 96 -206 Z")}<Ln d="M -20 -92 L 70 -150" w={8} /><circle cx={96} cy={-206} r={12} fill={PAPER} stroke={INK} strokeWidth={4} /></g>;
    case "santa": return <g>{H("M -96 -40 Q -110 -120 40 -170 Q 40 -90 96 -40 Z")}{H("M -100 -40 Q 0 -66 100 -40 L 100 -22 Q 0 -48 -100 -22 Z", 0.2)}<circle cx={40} cy={-172} r={18} fill={PAPER} stroke={INK} strokeWidth={LW} /></g>;
    case "spacehelmet": return <g><circle cx={0} cy={-6} r={116} fill={c} opacity={0.22} stroke={INK} strokeWidth={LW} /><Ln d="M -74 -72 Q -44 -102 -8 -106" w={9} /></g>;
    case "pirate": return <g>{H("M -120 -52 Q -110 -104 0 -104 Q 110 -104 120 -52 Q 60 -74 0 -70 Q -60 -74 -120 -52 Z")}<circle cx={0} cy={-88} r={9} fill={PAPER} stroke={INK} strokeWidth={4} /></g>;
    case "flowers": return <g><path d="M -96 -64 Q -122 40 -86 140 Q -20 170 40 140 L 40 -60 Q 0 -120 -96 -64 Z" fill={PAPER} opacity={0.72} stroke={INK} strokeWidth={3} />{[[-70, -68], [-30, -104], [16, -106], [56, -84], [-6, -62]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r={17} fill={c} stroke={INK} strokeWidth={4} /><circle cx={x} cy={y} r={5} fill={PAPER} /></g>)}</g>;
    case "bunnyears": return <g>{[[-44, -146, -10], [22, -150, 8]].map(([x, y, r], i) => <g key={i} transform={`rotate(${r} ${x} ${y})`}><ellipse cx={x} cy={y} rx={20} ry={66} fill={PAPER} stroke={INK} strokeWidth={LW} /><ellipse cx={x} cy={y} rx={9} ry={46} fill={c} opacity={0.6} /></g>)}</g>;
    default: return null;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const circD = (x: number, y: number, r: number) => `M ${x - r} ${y} A ${r} ${r} 0 1 0 ${x + r} ${y} A ${r} ${r} 0 1 0 ${x - r} ${y} Z`;
const rp = (x: number, y: number, w: number, h: number) => `M ${x} ${y} L ${x + w} ${y} L ${x + w} ${y + h} L ${x} ${y + h} Z`;

/** A stick: ink underlay plus a coloured core. */
const Pole: React.FC<{ x1: number; y1: number; x2: number; y2: number; w?: number; c?: string }> = ({ x1, y1, x2, y2, w = 14, c }) => (
  <g>
    <path d={`M ${x1} ${y1} L ${x2} ${y2}`} stroke={INK} strokeWidth={w + LW * 2} strokeLinecap="round" fill="none" />
    <path d={`M ${x1} ${y1} L ${x2} ${y2}`} stroke={c ?? PAPER} strokeWidth={w} strokeLinecap="round" fill="none" />
  </g>
);

/** A foot: ankle is the origin. */
const Foot: React.FC<{ x: number; y: number; a: number; kind: string; sc: string }> = ({ x, y, a, kind, sc }) => {
  const r = Math.max(-20, Math.min(20, a * 0.25));
  return (
    <g transform={`translate(${x} ${y}) rotate(${-r})`}>
      {kind === "bare" ? <Sh d="M -20 -16 Q 40 -18 46 6 L 46 14 L -20 14 Z" wc={sc} />
        : kind === "boots" ? <Sh d="M -28 -72 L 6 -72 L 6 -10 Q 60 -6 62 16 L 62 22 L -28 22 Z" wc={sc} wo={0.75} />
        : <g><Sh d="M -28 -18 L 22 -18 Q 62 -12 62 14 L 62 20 L -28 20 Z" wc={sc} wo={0.75} />{kind === "sneakers" ? <Ln d="M -28 8 L 62 8" w={4} /> : null}</g>}
    </g>
  );
};

/** Items held in one hand (origin = hand, items extend up). */
function handItem(n: string, x: number, y: number, c: string, sk: string): React.ReactNode {
  const T = (k: React.ReactNode) => <g transform={`translate(${x} ${y})`}>{k}</g>;
  switch (n) {
    case "clipboard": return T(<g><Sh d={rp(-34, -100, 68, 94)} wc={WASH.brown} wo={0.6} /><Ln d="M -14 -66 L 14 -66 M -14 -48 L 14 -48 M -14 -30 L 10 -30" w={4} /><rect x={-12} y={-108} width={24} height={14} rx={3} fill={INK} /></g>);
    case "wrench": return T(<Sh d="M -8 4 L -8 -92 Q -26 -100 -22 -120 Q -10 -132 0 -122 Q 10 -132 22 -120 Q 26 -100 8 -92 L 8 4 Z" wc={WASH.grey} />);
    case "hammer": return T(<g><Sh d={rp(-6, -100, 12, 104)} wc={WASH.brown} wo={0.6} /><Sh d={rp(-40, -126, 80, 30)} wc={WASH.grey} /></g>);
    case "book": return T(<g><Sh d={rp(-34, -96, 68, 92)} wc={c} /><Ln d="M -20 -80 L 20 -80" w={4} /></g>);
    case "phone": return T(<g><Sh d={rp(-16, -64, 32, 62)} /><Sh d={rp(-11, -56, 22, 40)} wc={WASH.blue} wo={0.6} /></g>);
    case "mic": return T(<g><Sh d={rp(-7, -60, 14, 64)} wc={WASH.black} /><Sh d={circD(0, -80, 24)} wc={WASH.grey} /></g>);
    case "cup": return T(<g><Sh d="M -20 -50 L 22 -50 L 20 0 L -18 0 Z" wc={c} /><Ln d="M 22 -40 Q 40 -36 38 -22 Q 36 -8 20 -10" w={6} /></g>);
    case "tray": return T(<g><Sh d="M -60 -6 Q 0 -26 60 -6 Q 0 14 -60 -6 Z" wc={WASH.grey} /><Sh d={rp(-14, -34, 28, 26)} wc={c} /></g>);
    case "briefcase": return T(<g><Ln d="M -12 -66 L -12 -78 L 12 -78 L 12 -66" w={6} /><Sh d={rp(-42, -66, 84, 60)} wc={c} /></g>);
    case "bag": return T(<g><Ln d="M -18 -60 Q -18 -92 0 -92 Q 18 -92 18 -60" w={6} /><Sh d="M -34 -60 L 34 -60 L 40 6 L -40 6 Z" wc={c} /></g>);
    case "camera": return T(<g><Sh d={rp(-14, -60, 20, 10)} /><Sh d={rp(-30, -50, 60, 44)} wc={WASH.grey} /><Sh d={circD(0, -28, 14)} wc={WASH.blue} wo={0.6} /></g>);
    case "spatula": return T(<g><Pole x1={0} y1={0} x2={0} y2={-84} w={10} c={WASH.brown} /><Sh d={rp(-18, -112, 36, 28)} wc={WASH.grey} /></g>);
    case "magnifier": return T(<g><Pole x1={10} y1={10} x2={30} y2={30} w={12} c={WASH.brown} /><Sh d={circD(-4, -30, 24)} wc={WASH.teal} wo={0.3} /></g>);
    case "paintbrush": return T(<g><Pole x1={0} y1={0} x2={0} y2={-90} w={8} c={WASH.brown} /><Sh d="M -6 -90 L 6 -90 L 12 -116 Q 0 -132 -12 -116 Z" wc={c} /></g>);
    case "palette": return T(<g><Sh d="M -36 -40 Q -40 -90 0 -92 Q 40 -90 36 -50 Q 30 -30 16 -36 Q 4 -18 -10 -32 Q -30 -20 -36 -40 Z" wc={WASH.yellow} wo={0.6} /><circle cx={-12} cy={-70} r={5} fill={c} /><circle cx={8} cy={-72} r={5} fill={WASH.blue} /></g>);
    case "envelope": return T(<g><Sh d={rp(-40, -60, 80, 50)} wc={WASH.grey} wo={0.3} /><Ln d="M -40 -60 L 0 -30 L 40 -60" w={4} /></g>);
    case "syringe": return T(<g><Ln d="M 0 -100 L 0 -120" w={6} /><Sh d={rp(-8, -100, 16, 70)} wc={WASH.blue} wo={0.3} /><Ln d="M 0 -30 L 0 -6" w={3} /></g>);
    case "bottle": return T(<g><Sh d="M -8 -110 L 8 -110 L 8 -90 Q 26 -80 24 -40 L 24 0 L -24 0 L -24 -40 Q -26 -80 -8 -90 Z" wc={c} /><Sh d={rp(-8, -120, 16, 10)} /></g>);
    case "torch": return T(<g><Sh d={rp(-7, -60, 14, 64)} wc={WASH.brown} /><Sh d="M -14 -60 Q -22 -90 -4 -110 Q 0 -96 6 -104 Q 22 -86 14 -60 Z" wc={WASH.orange} wo={0.8} /></g>);
    case "sword": return T(<g><Sh d="M -6 -4 L -6 -110 L 0 -128 L 6 -110 L 6 -4 Z" wc={WASH.grey} wo={0.4} /><Sh d={rp(-24, -8, 48, 10)} wc={WASH.brown} /><Sh d={rp(-5, 2, 10, 24)} wc={WASH.brown} /></g>);
    case "wand": return T(<g><Pole x1={0} y1={0} x2={16} y2={-100} w={7} c={PAPER} /><Sh d="M 16 -110 l 6 14 l 14 2 l -11 9 l 4 14 l -13 -8 l -13 8 l 4 -14 l -11 -9 l 14 -2 Z" wc={WASH.yellow} wo={0.8} /></g>);
    case "ball": return T(<Sh d={circD(0, -30, 34)} wc={c} />);
    case "baton": return T(<g><Pole x1={-4} y1={-14} x2={6} y2={-100} w={16} c={WASH.grey} /></g>);
    case "gavel": return T(<g><Sh d={rp(-6, -80, 12, 90)} wc={WASH.brown} /><Sh d={rp(-30, -108, 60, 28)} wc={WASH.brown} wo={0.8} /></g>);
    default: return null;
  }
}

/** Items held at the chest with both hands (origin = midpoint between the hands). */
function chestItem(n: string, x: number, y: number, c: string, sk: string): React.ReactNode {
  const T = (k: React.ReactNode) => <g transform={`translate(${x} ${y})`}>{k}</g>;
  switch (n) {
    case "guitar": return T(<g transform="rotate(-50) scale(1.4)"><Sh d={rp(-8, -190, 16, 180)} wc={WASH.brown} wo={0.7} /><Sh d="M 0 -34 Q 36 -40 34 -6 Q 32 12 46 30 Q 54 80 0 80 Q -54 80 -46 30 Q -32 12 -34 -6 Q -36 -40 0 -34 Z" wc={c} /><circle cy={22} r={13} fill={INK} /></g>);
    case "baby": return T(<g><Sh d="M -60 40 Q 0 -10 60 40 Q 60 70 0 74 Q -60 70 -60 40 Z" wc={c} /><Sh d={circD(0, -6, 40)} wc={sk} /><circle cx={-12} cy={-6} r={4} fill={INK} /><circle cx={12} cy={-6} r={4} fill={INK} /><Ln d="M -8 14 Q 0 20 8 14" w={4} /></g>);
    case "openbook": return T(<g><Sh d="M -70 -20 Q -30 -40 0 -20 Q 30 -40 70 -20 L 70 30 Q 30 10 0 30 Q -30 10 -70 30 Z" wc={c} /><Ln d="M 0 -20 L 0 30" w={4} /></g>);
    case "parcel": return T(<g><Sh d={rp(-50, -40, 100, 70)} wc={WASH.brown} wo={0.55} /><Sh d={rp(-8, -40, 16, 70)} wc={WASH.yellow} wo={0.7} /></g>);
    case "controller": return T(<g><Sh d="M -60 -20 Q -60 -40 -40 -40 L 40 -40 Q 60 -40 60 -20 L 60 20 Q 60 40 40 30 L 16 10 L -16 10 L -40 30 Q -60 40 -60 20 Z" wc={c} /><circle cx={34} cy={-12} r={5} fill={INK} /><circle cx={-30} cy={-8} r={5} fill={INK} /></g>);
    case "laptop": return T(<g><Sh d={rp(-60, -70, 120, 80)} /><Sh d={rp(-52, -62, 104, 64)} wc={WASH.blue} wo={0.35} /><Sh d={rp(-72, 10, 144, 14)} wc={WASH.grey} /></g>);
    case "tablet": return T(<g><Sh d={rp(-44, -50, 88, 108)} wc={WASH.grey} wo={0.3} /><Sh d={rp(-36, -40, 72, 88)} wc={WASH.blue} wo={0.35} /></g>);
    case "bouquet": return T(<g><Ln d="M 0 40 L -6 -10" w={6} /><Sh d={circD(-30, -40, 20)} wc={c} /><Sh d={circD(0, -60, 20)} wc={c} /><Sh d={circD(30, -40, 20)} wc={c} /><Sh d={circD(0, -20, 18)} wc={c} /></g>);
    case "bowl": return T(<g><Sh d="M -70 -20 L 70 -20 Q 60 40 0 40 Q -60 40 -70 -20 Z" wc={c} /><Sh d="M -66 -20 Q 0 -44 66 -20 Q 0 0 -66 -20 Z" wc={WASH.orange} wo={0.6} /></g>);
    default: return null;
  }
}

/** Long poles: from the hand down to the ground (gy = ground in body space). */
function poleItem(n: string, hx: number, hy: number, gy: number, c: string): React.ReactNode {
  const pc = c;
  switch (n) {
    case "cane": return <g><Pole x1={hx} y1={hy} x2={hx + 6} y2={gy} w={12} c={WASH.brown} /><Ln d={`M ${hx} ${hy} Q ${hx - 22} ${hy - 6} ${hx - 22} ${hy - 26}`} w={12} /></g>;
    case "whitecane": return <g><Pole x1={hx} y1={hy} x2={hx + 6} y2={gy} w={12} c={PAPER} /><Pole x1={hx + 6} y1={gy - 40} x2={hx + 6} y2={gy} w={12} c={pc} /></g>;
    case "crutch": return <g><Pole x1={hx} y1={hy} x2={hx + 6} y2={gy} w={12} c={WASH.brown} /><Ln d={`M ${hx - 14} ${hy} L ${hx + 14} ${hy}`} w={10} /></g>;
    case "broom": return <g><Pole x1={hx} y1={hy} x2={hx + 6} y2={gy - 90} w={12} c={WASH.brown} /><Sh d={`M ${hx - 34} ${gy} L ${hx + 36} ${gy} L ${hx + 22} ${gy - 92} L ${hx - 20} ${gy - 92} Z`} wc={pc} wo={0.7} /></g>;
    case "shovel": return <g><Pole x1={hx} y1={hy} x2={hx + 6} y2={gy - 60} w={12} c={WASH.brown} /><Sh d={`M ${hx - 22} ${gy - 60} L ${hx + 22} ${gy - 60} L ${hx + 18} ${gy} L ${hx - 18} ${gy} Z`} wc={WASH.grey} /></g>;
    case "rake": return <g><Pole x1={hx} y1={hy} x2={hx + 6} y2={gy - 40} w={12} c={WASH.brown} /><Sh d={`M ${hx - 40} ${gy - 40} L ${hx + 40} ${gy - 40} L ${hx + 40} ${gy - 30} L ${hx - 40} ${gy - 30} Z`} wc={WASH.grey} /><Ln d={`M ${hx - 30} ${gy - 30} L ${hx - 30} ${gy} M ${hx - 10} ${gy - 30} L ${hx - 10} ${gy} M ${hx + 10} ${gy - 30} L ${hx + 10} ${gy} M ${hx + 30} ${gy - 30} L ${hx + 30} ${gy}`} w={6} /></g>;
    case "pitchfork": return <g><Pole x1={hx} y1={hy} x2={hx + 6} y2={gy - 60} w={12} c={WASH.brown} /><Ln d={`M ${hx - 16} ${gy - 60} L ${hx - 16} ${gy} M ${hx} ${gy - 60} L ${hx} ${gy} M ${hx + 16} ${gy - 60} L ${hx + 16} ${gy}`} w={6} /></g>;
    case "mop": return <g><Pole x1={hx} y1={hy} x2={hx + 6} y2={gy - 50} w={12} c={WASH.brown} /><Sh d={`M ${hx - 40} ${gy} Q ${hx} ${gy - 70} ${hx + 40} ${gy} Z`} wc={pc} /></g>;
    case "staff": return <g><Pole x1={hx} y1={hy - 60} x2={hx + 6} y2={gy} w={12} c={WASH.brown} /><Sh d={circD(hx, hy - 70, 18)} wc={pc} wo={0.7} /></g>;
    case "flag": return <g><Pole x1={hx} y1={hy} x2={hx} y2={hy - 300} w={10} c={WASH.brown} /><Sh d={`M ${hx} ${hy - 300} L ${hx + 130} ${hy - 270} L ${hx} ${hy - 240} Z`} wc={pc} /></g>;
    case "fishingrod": return <g><Pole x1={hx} y1={hy} x2={hx + 200} y2={hy - 220} w={7} c={WASH.brown} /><Ln d={`M ${hx + 200} ${hy - 220} L ${hx + 200} ${hy - 40}`} w={3} /></g>;
    default: return null;
  }
}

const CHEST = ["guitar", "baby", "openbook", "parcel", "controller", "laptop", "bouquet", "tablet", "bowl"];
const POLES = ["cane", "whitecane", "crutch", "broom", "shovel", "rake", "pitchfork", "mop", "staff", "flag", "fishingrod"];

/** Neckwear, drawn over the torso (body space). */
function neckEl(n: string, c: string) {
  switch (n) {
    case "tie": return <Sh d="M 2 -800 L 24 -800 L 30 -640 L 10 -618 L -10 -640 Z" wc={c} wo={0.8} />;
    case "bowtie": return <g><Sh d="M 10 -792 L -18 -810 L -18 -774 Z" wc={c} wo={0.8} /><Sh d="M 10 -792 L 38 -810 L 38 -774 Z" wc={c} wo={0.8} /></g>;
    case "stethoscope": return <g><Ln d="M -36 -800 Q -46 -690 -6 -662 Q 30 -642 40 -700 Q 46 -760 50 -800" w={7} /><Ln d="M 40 -700 Q 60 -640 54 -604" w={7} /><circle cx={54} cy={-592} r={14} fill={PAPER} stroke={INK} strokeWidth={LW} /></g>;
    case "lanyard": return <g><Pole x1={-18} y1={-800} x2={10} y2={-650} w={8} c={c} /><Sh d={rp(0, -668, 34, 40)} wc={PAPER} /></g>;
    case "scarf": return <g><Sh d="M -64 -826 Q -10 -844 50 -826 L 50 -794 Q -10 -778 -64 -794 Z" wc={c} wo={0.8} /><Sh d="M -40 -800 L -6 -800 L -2 -660 L -40 -664 Z" wc={c} wo={0.8} /></g>;
    case "medal": return <g><Ln d="M -6 -800 L 26 -700 M 40 -800 L 26 -700" w={5} /><circle cx={26} cy={-686} r={20} fill={WASH.yellow} stroke={INK} strokeWidth={LW} /></g>;
    case "necklace": return <g>{[0, 1, 2, 3, 4, 5, 6].map((i) => <circle key={i} cx={-40 + i * 14} cy={-796 + Math.sin((i / 6) * Math.PI) * 48} r={6} fill={PAPER} stroke={INK} strokeWidth={3} />)}</g>;
    case "whistle": return <g><Pole x1={-6} y1={-800} x2={20} y2={-720} w={6} c={c} /><Sh d={rp(20, -722, 26, 14)} wc={WASH.grey} /></g>;
    case "cameraneck": return <g><Pole x1={-30} y1={-800} x2={20} y2={-700} w={6} c={c} /><Sh d={rp(0, -716, 40, 28)} wc={WASH.grey} /></g>;
    case "pearls": return <g>{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <circle key={i} cx={-46 + i * 14} cy={-798 + Math.sin((i / 7) * Math.PI) * 50} r={7} fill={PAPER} stroke={INK} strokeWidth={3} />)}</g>;
    default: return null;
  }
}

/** Overlay garments over the torso (body space). */
function overEl(n: string, c: string) {
  switch (n) {
    case "apron": return <g><Sh d="M -44 -700 L 72 -700 L 80 -330 L -80 -330 Z" wc={c} wo={0.7} /><Ln d="M -44 -700 Q -10 -780 10 -790 M 72 -700 Q 50 -780 20 -790" w={6} /></g>;
    case "hivis": return <g><Sh d="M -74 -800 L -20 -800 L 4 -700 L 30 -800 L 82 -800 L 80 -470 L -74 -470 Z" wc={c} wo={0.8} /><Sh d={rp(-74, -610, 154, 20)} wc={PAPER} /><Sh d={rp(-74, -540, 154, 20)} wc={PAPER} /></g>;
    case "vest": return <g><Sh d="M -60 -800 L -20 -800 L -4 -600 L -2 -460 L -70 -460 L -76 -700 Z" wc={c} wo={0.8} /><Sh d="M 70 -800 L 32 -800 L 16 -600 L 14 -460 L 78 -460 L 84 -700 Z" wc={c} wo={0.8} /></g>;
    case "sash": return <Sh d="M -70 -800 L -30 -800 L 84 -540 L 80 -500 Z" wc={c} wo={0.8} />;
    case "lifejacket": return <g><Sh d="M -74 -800 L -40 -800 L -30 -600 L -70 -560 L -76 -700 Z" wc={c} wo={0.8} /><Sh d="M 80 -800 L 46 -800 L 36 -600 L 76 -560 L 82 -700 Z" wc={c} wo={0.8} /><Sh d={rp(-74, -560, 158, 60)} wc={c} wo={0.8} /><Ln d="M -74 -530 L 84 -530" w={5} /></g>;
    default: return null;
  }
}

/** Back gear, drawn behind the body. */
function backEl(n: string, c: string, f: number) {
  const flap = Math.sin(f / 10) * 10;
  switch (n) {
    case "backpack": return <Sh d="M -132 -800 Q -150 -800 -150 -770 L -150 -560 Q -150 -530 -120 -530 L -60 -530 L -60 -800 Z" wc={c} wo={0.8} />;
    case "cape": return <Sh d={`M -40 -800 Q -150 -760 -170 -560 Q -120 -520 -${150 - flap} -330 L -10 -460 Z`} wc={c} wo={0.8} />;
    case "wings": return <g><Sh d={`M -40 -790 Q -170 -880 -170 -700 Q -140 -640 -60 -640 Z`} wc={c} wo={0.7} /><Sh d={`M -40 -740 Q -150 -760 -150 -600 Q -110 -560 -50 -600 Z`} wc={c} wo={0.7} /></g>;
    case "tank": return <g><Sh d={rp(-120, -790, 44, 230)} wc={WASH.grey} /><Ln d="M -116 -790 L -80 -800" w={8} /></g>;
    case "guitar": return <g><Ln d="M -40 -800 L -130 -620" w={10} /><Sh d={circD(-140, -560, 52)} wc={c} wo={0.7} /></g>;
    case "quiver": return <g><Sh d={rp(-110, -800, 40, 200)} wc={WASH.brown} wo={0.6} /><Ln d="M -100 -800 L -100 -840 M -86 -800 L -86 -846 M -72 -800 L -72 -836" w={4} /></g>;
    default: return null;
  }
}

const TORSO = "M -78 -778 Q -78 -812 -44 -812 L 52 -812 Q 86 -812 86 -778 L 76 -455 L -70 -455 Z";
const LONG = "M -78 -790 Q -78 -812 -44 -812 L 52 -812 Q 86 -812 86 -780 L 102 -330 L -98 -330 Z";
const GOWN = "M -78 -790 Q -78 -812 -44 -812 L 52 -812 Q 86 -812 86 -780 L 130 -40 L -124 -40 Z";

/** Figure: a person in ink. Everything is a pure function of q (and q.f for motion). */
export function Figure(q: Person & { f: number }) {
  const f = q.f ?? 0;
  const G = BUILD[q.build && BUILD[q.build] ? q.build : "adult"];
  const mode = q.wash ?? "colour";
  const g = (c: string) => (mode === "colour" ? c : PAPER); // washes for everything except the top
  const skin = col(q.skin, SKIN.fair, SKIN), hc = col(q.hairColour, HAIR.brown, HAIR);
  const tc = col(q.topColour, WASH.blue), T = mode === "none" ? PAPER : mode === "accent" ? ACCENT : tc;
  const top = q.top ?? "tee", legs = q.legs ?? "trousers", long = ["dress", "gown", "robe"].includes(top);
  const lc = g(col(q.legsColour, WASH.navy)), ic = col(q.inner, PAPER), hold = q.hold ?? "none", anim = q.anim ?? "idle";
  const build = q.build ?? "adult";
  const seatKind = q.seat ?? "none";
  const sit = q.pose === "sit" || (q.seat && q.seat !== "none") || build === "baby";
  const P = motion(anim, f, sit);
  let ba = P.ba, fa = P.fa;
  const armAnim = !["wave", "cheer", "jump", "talk", "walk", "run"].includes(anim);
  if (armAnim && CHEST.includes(hold)) { fa = [18, 40]; ba = [6, 46]; }
  else if (armAnim && q.arms === "up") { fa = [165, 8]; ba = [-165, -8]; }
  else if (armAnim && q.arms === "one-up") { fa = [160, 8]; }
  if (q.build === "elder" || build === "elder") { P.lean += 5; P.tilt += 4; }
  const th = TH * G.leg, sh2 = SH * G.leg;
  const lv = (l: L) => th * Math.cos(rad(l[0])) + sh2 * Math.cos(rad(l[0] - l[1]));
  const dy = 450 - Math.max(lv(P.bl), lv(P.fl)) - P.bob;
  const sz = (q.s ?? 1) * G.k, hs = G.head, hy = -832 - 95 * hs;
  const sk = g(skin), sl: "none" | "short" | "long" = top === "tank" ? "none" : top === "tee" ? "short" : "long";
  const leg = (l: L, hx: number, back: boolean) => {
    const h: L = [hx, HIP], k = pt(h[0], h[1], l[0], th), a = pt(k[0], k[1], l[0] - l[1], sh2);
    return (
      <g>
        {!long ? <Bone pts={[h, k, a]} w={50} wc={back ? undefined : sk} wo={0.45} /> : top === "dress" ? <Bone pts={[k, a]} w={46} wc={back ? undefined : sk} wo={0.45} /> : null}
        {!long && legs === "trousers" ? <Bone pts={[h, k, a]} w={66} wc={lc} wo={back ? 0.25 : 0.55} /> : null}
        {!long && legs === "shorts" ? <Bone pts={[h, pt(h[0], h[1], l[0], th * 0.55)]} w={76} wc={back ? undefined : lc} wo={0.55} /> : null}
        <Foot x={a[0]} y={a[1] - 16} a={l[0] - l[1]} kind={q.shoeStyle ?? "shoes"} sc={g(col(q.shoes, "#3a2a22"))} />
      </g>
    );
  };
  const arm = (l: L, sx: number, back: boolean) => {
    const sh: L = [sx, SHY], el = pt(sh[0], sh[1], l[0], UP), ha = pt(el[0], el[1], l[0] + l[1], FO);
    const sleeve = sl === "long" ? [sh, el, pt(el[0], el[1], l[0] + l[1], FO * 0.78)] : sl === "short" ? [sh, pt(sh[0], sh[1], l[0], UP * 0.6)] : null;
    return {
      h: ha,
      limb: <g><Bone pts={[sh, el, ha]} w={52} wc={back ? undefined : sk} wo={0.45} />{sleeve ? <Bone pts={sleeve as L[]} w={62} wc={back ? undefined : T} wo={0.6} /> : null}</g>,
    };
  };
  const bA = arm(ba, -44, true), fA = arm(fa, 48, false);
  const H = { x: fA.h[0], y: fA.h[1], bx: bA.h[0], by: bA.h[1] };
  const mid: [number, number] = [(H.x + H.bx) / 2, (H.y + H.by) / 2];
  const pc = col(q.itemColour, WASH.red);
  // extra overlays: at = head | body | hand (their local space), back = drawn behind the body
  const ex = (where: string, back: boolean) => (q.extra ?? []).filter((e) => (e.at ?? "body") === where && !!e.back === back).map((e, i) => <Sh key={i} d={e.d} wc={e.fill ? g(col(e.fill, e.fill)) : undefined} />);
  const head = (
    <g transform={`translate(12 ${hy}) rotate(${P.tilt}) scale(${hs})`}>
      {hairBack(q.hair ?? "short", g(hc))}
      {ex("head", true)}
      <Sh d={circD(0, 0, 95)} wc={sk} dx={4} dy={3} />
      {hairFront(q.hair ?? "short", g(hc))}
      {facial(q.beard ?? "none", g(hc), q.glasses ?? "none", q.eyes ?? "open", anim === "talk" ? "open" : q.mouth ?? "smile", !!q.blush, f, P.talk)}
      {hatShape(q.hat ?? "none", g(col(q.hatColour, WASH.red)))}
      {ex("head", false)}
    </g>
  );
  const shirt = (
    <g>
      <Sh d={TORSO} wc={T} />
      <path d="M -26 -814 L 14 -770 L -8 -746 Z M 54 -814 L 14 -770 L 36 -746 Z" fill={ic} stroke={INK} strokeWidth={LW} />
      <Ln d="M 14 -770 L 14 -460" w={4} />
    </g>
  );
  const garment = (() => {
    switch (top) {
      case "tank": return <Sh d="M -60 -812 L -36 -812 L -30 -760 L 46 -760 L 54 -812 L 70 -812 L 82 -455 L -76 -455 Z" wc={T} />;
      case "shirt": return shirt;
      case "uniform": return <g>{shirt}<Sh d={rp(-60, -730, 46, 40)} wc={T} /><Sh d={rp(36, -730, 42, 40)} wc={T} /><Ln d="M -76 -500 L 84 -500" w={6} /></g>;
      case "jacket": case "suit": return <g><Sh d={TORSO} wc={T} /><path d="M -16 -812 L 14 -660 L 46 -812 Z" fill={ic} stroke={INK} strokeWidth={LW} /><Sh d="M -22 -812 L 14 -650 L -6 -560 L -40 -760 Z M 52 -812 L 14 -650 L 34 -560 L 70 -760 Z" wc={T} wo={0.3} /></g>;
      case "coat": case "labcoat": return <g><Sh d={LONG} wc={T} /><path d="M -16 -812 L 14 -660 L 46 -812 Z" fill={ic} stroke={INK} strokeWidth={LW} /><Ln d="M 14 -660 L 14 -330" w={4} /><circle cx={-6} cy={-420} r={6} fill={INK} /><circle cx={34} cy={-420} r={6} fill={INK} /></g>;
      case "hoodie": return <g><Sh d="M -70 -800 Q -60 -872 10 -866 Q 80 -862 80 -800 Z" wc={T} /><Sh d={TORSO} wc={T} /><Sh d="M -30 -600 L 66 -600 L 76 -520 L -40 -520 Z" wc={T} wo={0.3} /><Ln d="M 0 -800 L -4 -720 M 30 -800 L 34 -720" w={5} /></g>;
      case "sweater": return <g><Sh d={TORSO} wc={T} /><Ln d="M -76 -500 L 82 -500 M -76 -484 L 82 -484" w={5} /><Ln d="M -14 -812 Q 14 -790 46 -812" w={5} /></g>;
      case "overalls": return <g>{shirt}<Sh d="M -50 -700 L 64 -700 L 70 -455 L -60 -455 Z" wc={lc} wo={0.6} /><Sh d={rp(-56, -812, 14, 110)} wc={lc} wo={0.6} /><Sh d={rp(50, -812, 14, 110)} wc={lc} wo={0.6} /></g>;
      case "dress": return <Sh d="M -78 -790 Q -78 -812 -44 -812 L 52 -812 Q 86 -812 86 -780 L 104 -330 L -100 -330 Z" wc={T} />;
      case "gown": return <Sh d={GOWN} wc={T} />;
      case "robe": return <g><Sh d={GOWN} wc={T} /><Ln d="M -40 -812 Q 14 -760 52 -812" w={5} /><Ln d="M -70 -470 L 84 -470" w={5} /></g>;
      default: return <g><Sh d={TORSO} wc={T} /><Ln d="M -14 -812 Q 14 -770 46 -812" w={5} /></g>;
    }
  })();
  const hx = fA.h[0], hy2 = fA.h[1];
  const seatEl = seatKind === "wheelchair" ? (
    <g>
      <Sh d={circD(-30, -dy - 150, 150)} wc={WASH.grey} wo={0.15} />
      <Sh d={rp(-100, HIP + 34, 200, 26)} wc={WASH.brown} />
      <Pole x1={-100} y1={HIP + 30} x2={-150} y2={HIP - 200} w={14} c={WASH.brown} />
      <Pole x1={-150} y1={HIP - 200} x2={-180} y2={HIP - 206} w={12} c={WASH.brown} />
      <Pole x1={100} y1={HIP + 60} x2={170} y2={-dy - 10} w={12} c={WASH.grey} />
    </g>
  ) : seatKind === "chair" ? (
    <g>
      <Sh d={rp(-140, HIP - 190, 26, 230)} wc={WASH.brown} />
      <Sh d={rp(-140, HIP + 34, 300, 30)} wc={WASH.brown} />
      <Pole x1={-120} y1={HIP + 64} x2={-120} y2={-dy} w={16} c={WASH.brown} />
      <Pole x1={130} y1={HIP + 64} x2={130} y2={-dy} w={16} c={WASH.brown} />
    </g>
  ) : null;
  const torso = (
    <g>
      <Bone pts={[[12, -870], [12, -800]]} w={42} wc={sk} wo={0.45} />
      {garment}
      {q.belly ? <Sh d="M 26 -600 Q 110 -560 96 -470 L 60 -456 Z" wc={T} wo={0.4} /> : null}
      {q.belt ? <g><Sh d={rp(-78, -478, 162, 26)} wc={WASH.black} /><Sh d={rp(14, -476, 26, 22)} wc={WASH.yellow} wo={0.4} /></g> : null}
      {q.badge && q.badge !== "none" ? <Sh d={circD(30, -690, 14)} wc={col(q.badge, WASH.red)} wo={0.8} /> : null}
      {q.over && q.over !== "none" ? overEl(q.over, g(col(q.overColour, WASH.yellow))) : null}
      {q.neck && q.neck !== "none" ? neckEl(q.neck, g(col(q.neckColour, WASH.red))) : null}
      {ex("body", false)}
    </g>
  );
  const hips = long || legs === "none" ? null : legs === "skirt"
    ? <Sh d={`M -84 ${HIP - 30} L 90 ${HIP - 30} L 126 ${HIP + 140} L -120 ${HIP + 140} Z`} wc={lc} wo={0.6} />
    : <Sh d={`M -78 ${HIP - 30} L 84 ${HIP - 30} L 80 ${HIP + 36} L -74 ${HIP + 36} Z`} wc={lc} wo={0.6} />;
  const held = CHEST.includes(hold) ? chestItem(hold, mid[0], mid[1], pc, sk) : POLES.includes(hold) ? poleItem(hold, hx, hy2, -dy, pc) : handItem(hold, hx, hy2, pc, sk);
  const upG = `rotate(${P.lean} 0 ${HIP})`;
  return (
    <g transform={`translate(${q.x ?? 540} ${q.y ?? 1600}) scale(${q.flip ? -sz : sz} ${sz})`}>
      <ellipse cx={0} cy={4} rx={150 + P.bob * 0.6} ry={16} fill={INK} opacity={0.18} />
      <g transform={`translate(0 ${dy})`}>
        {seatEl}
        <g transform={upG}>
          {q.back && q.back !== "none" ? backEl(q.back, g(col(q.backColour, pc)), f) : null}
          {bA.limb}
          {CHEST.includes(hold) ? null : <Hand x={bA.h[0]} y={bA.h[1]} c={sk} />}
          {ex("body", true)}
        </g>
        {leg(P.bl, -24, true)}
        {leg(P.fl, 26, false)}
        {hips}
        <g transform={upG}>
          {torso}
          {head}
          {fA.limb}
          {held}
          {CHEST.includes(hold) ? <Hand x={bA.h[0]} y={bA.h[1]} c={sk} /> : null}
          <Hand x={hx} y={hy2} c={sk} />
          <g transform={`translate(${hx} ${hy2})`}>{ex("hand", false)}</g>
        </g>
      </g>
    </g>
  );
}

const Hand: React.FC<{ x: number; y: number; c?: string }> = ({ x, y, c }) => <Sh d={circD(x, y, 25)} wc={c} dx={3} dy={2} />;

/** Default export: the part. x may be [from,to]; vx drifts it per frame. */
export default function Part(p: PartProps<any>) {
  return <Figure {...p} x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} />;
}
