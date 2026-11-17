import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade, skinColour, hairColour } from "../style/index";

// Flat vector person generator. Origin = feet (bottom centre), faces right, ~1000 px tall at s = 1.
// Poses, expressions, skin, hair, outfit, hat, face accessory, body extra and a held prop.
// `age` scales the figure (teen, child, toddler: smaller, bigger head, shorter legs; elder: slight stoop).
// Presets import Person and may add their own drawing with `held` (in the front hand), `over` (on the body) and `topper` (on the head).

export type Pose = "stand" | "walk" | "run" | "wave" | "point" | "think" | "cheer" | "talk" | "sit" | "hold";
export type Expression = "smile" | "neutral" | "open" | "surprised" | "sad" | "angry" | "laugh";
export type Hair = "short" | "buzz" | "side" | "spiky" | "curly" | "afro" | "long" | "ponytail" | "bun" | "bob" | "braid" | "none";
export type Top = "tshirt" | "shirt" | "blazer" | "coat" | "hoodie" | "sweater" | "dress" | "scrubs" | "tank" | "uniform" | "jumpsuit";
export type Bottom = "trousers" | "shorts" | "skirt" | "overalls";
export type Shoes = "shoes" | "sneakers" | "boots" | "heels" | "sandals";
export type Hat = "none" | "cap" | "beanie" | "hardhat" | "chef" | "beret" | "brim" | "fedora" | "peaked" | "helmet" | "headscarf" | "turban" | "mortarboard" | "bandana" | "tophat" | "scrubcap" | "skullcap" | "sailor";
export type Accessory = "none" | "glasses" | "sunglasses" | "goggles" | "mask" | "beard" | "moustache" | "stubble" | "headset" | "headphones" | "earrings";
export type Extra = "none" | "tie" | "bowtie" | "apron" | "hivis" | "lanyard" | "stethoscope" | "scarf" | "badge" | "backpack" | "toolbelt" | "sash";
export type Age = "adult" | "teen" | "child" | "toddler" | "elder";
export type Prop = "none" | "cane" | "phone" | "tablet" | "laptop" | "clipboard" | "book" | "mug" | "briefcase" | "bag" | "toolbox" | "wrench" | "hammer" | "mic" | "camera" | "box" | "paper" | "pen" | "broom" | "umbrella" | "tray" | "pointer";

/** Where the front hand is: x, y in body space and the forearm angle (deg, 0 = down, 90 = forward). */
export type Hand = { x: number; y: number; a: number; bx: number; by: number };
/** Useful points on the body for preset overlays (body space, before flip). */
export const A = { neck: [10, -805], chest: [30, -700], belly: [20, -560], waist: [4, -470], head: [12, -905], headR: 95 } as const;

export type PersonSpec = {
  pose?: Pose; expression?: Expression; skin?: string; hair?: Hair; hairColor?: string;
  top?: Top; topColor?: string; shirtColor?: string; bottom?: Bottom; bottomColor?: string; shoes?: Shoes; shoesColor?: string;
  hat?: Hat; hatColor?: string; accessory?: Accessory; extra?: Extra; extraColor?: string; prop?: Prop; propColor?: string;
  seat?: boolean; age?: Age;
  held?: (h: Hand) => React.ReactNode; over?: () => React.ReactNode; topper?: () => React.ReactNode;
};

/** Age presets: overall scale k, head scale (about the chin) and leg length factor. */
export const AGE: Record<Age, { k: number; head: number; leg: number }> = {
  adult: { k: 1, head: 1, leg: 1 }, teen: { k: 0.88, head: 1.06, leg: 0.97 }, child: { k: 0.64, head: 1.32, leg: 0.84 },
  toddler: { k: 0.48, head: 1.5, leg: 0.72 }, elder: { k: 0.97, head: 1, leg: 0.98 },
};

const TH = 235, SH = 215, UP = 165, FO = 150, HIP = -470, SHY = -775;
const rad = (d: number) => (d * Math.PI) / 180;
const pt = (x: number, y: number, a: number, l: number): [number, number] => [x + Math.sin(rad(a)) * l, y + Math.cos(rad(a)) * l];
type Limb = [number, number];
type PoseOut = { ba: Limb; fa: Limb; bl: Limb; fl: Limb; lean: number; jump: number; talk: boolean; tilt: number };

export function poseAt(pose: Pose, f: number): PoseOut {
  const o: PoseOut = { ba: [-5, 10], fa: [5, 10], bl: [-3, 0], fl: [3, 0], lean: 0, jump: 0, talk: false, tilt: 0 };
  const br = Math.sin(f / 22);
  o.ba = [-5 + br, 10]; o.fa = [5 - br, 10];
  if (pose === "walk" || pose === "run") {
    const run = pose === "run";
    const ph = f * (run ? 0.42 : 0.3), s = Math.sin(ph), c = Math.cos(ph), A1 = run ? 38 : 24;
    o.fl = [A1 * s, (run ? 20 : 6) + (run ? 70 : 30) * Math.max(0, c)];
    o.bl = [-A1 * s, (run ? 20 : 6) + (run ? 70 : 30) * Math.max(0, -c)];
    o.fa = [-(run ? 45 : 22) * s, run ? 85 : 18];
    o.ba = [(run ? 45 : 22) * s, run ? 85 : 18];
    o.lean = run ? 9 : 2;
    o.jump = run ? Math.abs(c) * 18 : 0;
  } else if (pose === "wave") {
    o.fa = [100, 66 + Math.sin(f / 4) * 22];
  } else if (pose === "point") {
    o.fa = [86 + Math.sin(f / 18) * 2, 2];
  } else if (pose === "think") {
    o.fa = [55, 160]; o.ba = [22, 84]; o.tilt = -4;
  } else if (pose === "cheer") {
    o.fa = [104, 62 + Math.sin(f / 5) * 10]; o.ba = [-150, -12 - Math.sin(f / 5) * 10];
    o.jump = Math.abs(Math.sin(f / 7)) * 46;
  } else if (pose === "talk") {
    o.fa = [32 + Math.sin(f / 9) * 12, 62 + Math.sin(f / 6) * 14]; o.talk = true;
  } else if (pose === "sit") {
    o.bl = [86, 86]; o.fl = [92, 92]; o.fa = [18, 55]; o.ba = [10, 55];
  } else if (pose === "hold") {
    o.fa = [24, 76]; o.ba = [18, 82];
  }
  return o;
}

const Seg: React.FC<{ p: [number, number][]; w: number; c: string }> = ({ p, w, c }) => (
  <path d={"M " + p.map((q) => `${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join(" L ")} stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" fill="none" />
);

function Shoe({ x, y, a, kind, col, skin }: { x: number; y: number; a: number; kind: Shoes; col: string; skin: string }) {
  const r = Math.max(-30, Math.min(30, a * 0.35));
  return (
    <g transform={`translate(${x} ${y}) rotate(${-r})`}>
      {kind === "boots" && <rect x={-32} y={-70} width={64} height={80} rx={14} fill={col} />}
      {kind === "sandals" ? (
        <g>
          <rect x={-28} y={-6} width={84} height={26} rx={13} fill={skin} />
          <rect x={-30} y={14} width={90} height={8} rx={4} fill={col} />
          <rect x={6} y={-4} width={12} height={20} rx={4} fill={col} />
        </g>
      ) : kind === "heels" ? (
        <g>
          <path d="M -26 -4 Q 30 -14 60 12 L 60 20 L -10 20 Z" fill={col} />
          <rect x={-28} y={0} width={14} height={22} rx={3} fill={shade(col, 0.3)} />
        </g>
      ) : (
        <g>
          <path d="M -32 -16 L 22 -16 Q 66 -10 66 14 L 66 20 L -32 20 Z" fill={col} />
          {kind === "sneakers" ? <rect x={-32} y={10} width={98} height={10} rx={4} fill={C.white} /> : <rect x={-32} y={14} width={98} height={6} fill={shade(col, 0.35)} />}
        </g>
      )}
    </g>
  );
}

function hairBack(h: Hair, c: string) {
  switch (h) {
    case "long": return <path d="M -100 -40 Q -122 90 -110 200 Q -40 222 30 200 Q 40 120 20 40 Z" fill={c} />;
    case "bob": return <path d="M -102 -30 Q -112 60 -84 90 L 30 90 Q 50 40 40 0 Z" fill={c} />;
    case "afro": return <circle cx={-14} cy={-28} r={134} fill={c} />;
    case "ponytail": return <path d="M -92 -60 Q -160 -40 -150 60 Q -146 130 -112 170 Q -120 90 -88 20 Z" fill={c} />;
    case "bun": return <circle cx={-66} cy={-92} r={42} fill={c} />;
    case "braid": return <g fill={c}>{[0, 1, 2, 3, 4].map((i) => <ellipse key={i} cx={-96 - i * 4} cy={10 + i * 44} rx={24 - i * 2} ry={28} />)}</g>;
    default: return null;
  }
}

function hairFront(h: Hair, c: string) {
  const base = "M -62 46 Q -112 30 -102 -42 Q -94 -112 6 -112 Q 92 -110 104 -34 Q 74 -60 30 -60 Q -18 -60 -38 -22 Q -46 14 -62 46 Z";
  switch (h) {
    case "none": return null;
    case "buzz": return <path d="M -66 30 Q -104 20 -98 -42 Q -90 -104 6 -104 Q 88 -102 100 -40 Q 70 -56 30 -56 Q -20 -56 -40 -20 Q -48 8 -66 30 Z" fill={c} opacity={0.75} />;
    case "afro": return <path d="M -70 50 Q -130 -20 -80 -110 Q 0 -160 80 -120 Q 120 -90 110 -40 Q 70 -66 20 -62 Q -30 -56 -44 -10 Z" fill={c} />;
    case "spiky": return <path d="M -62 46 Q -112 30 -102 -42 L -96 -100 L -60 -96 L -40 -140 L -8 -108 L 24 -146 L 44 -106 L 84 -128 L 82 -84 L 112 -70 Q 74 -60 30 -60 Q -18 -60 -38 -22 Q -46 14 -62 46 Z" fill={c} />;
    case "side": return <g fill={c}><path d={base} /><path d="M 10 -110 Q 110 -100 112 -20 Q 80 -70 20 -64 Z" /></g>;
    case "curly": return <g fill={c}><path d={base} />{[-90, -60, -26, 10, 46, 80].map((x, i) => <circle key={i} cx={x} cy={-96 + Math.abs(x) * 0.25 - (i % 2) * 10} r={30} />)}</g>;
    case "long": case "bob": case "braid": case "ponytail": case "bun":
      return <g fill={c}><path d={base} /><path d="M -10 -108 Q 100 -110 108 -10 Q 96 -40 70 -52 Q 30 -40 0 -64 Z" /></g>;
    default: return <path d={base} fill={c} />;
  }
}

function hatEl(h: Hat, c: string) {
  const d = shade(c, 0.22);
  switch (h) {
    case "cap": return <g><path d="M -96 -38 Q -96 -122 6 -122 Q 100 -120 100 -38 Z" fill={c} /><path d="M 60 -48 Q 140 -50 160 -30 L 70 -30 Z" fill={d} /><circle cx={4} cy={-122} r={9} fill={d} /></g>;
    case "beanie": return <g><path d="M -98 -30 Q -100 -140 4 -140 Q 104 -138 102 -30 Z" fill={c} /><rect x={-104} y={-50} width={210} height={36} rx={16} fill={d} /><circle cx={2} cy={-146} r={22} fill={d} /></g>;
    case "hardhat": return <g><path d="M -98 -46 Q -98 -150 6 -150 Q 108 -148 106 -46 Z" fill={c} /><rect x={-118} y={-54} width={250} height={24} rx={12} fill={d} /><rect x={-6} y={-146} width={22} height={96} rx={8} fill={d} /></g>;
    case "chef": return <g><rect x={-80} y={-110} width={170} height={60} rx={10} fill={c} />{[-50, 4, 58].map((x) => <circle key={x} cx={x} cy={-160} r={56} fill={c} />)}<rect x={-82} y={-70} width={174} height={22} fill={d} /></g>;
    case "beret": return <g><ellipse cx={-6} cy={-92} rx={118} ry={40} transform="rotate(-8 -6 -92)" fill={c} /><circle cx={-10} cy={-134} r={10} fill={d} /></g>;
    case "brim": return <g><ellipse cx={8} cy={-56} rx={180} ry={32} fill={d} /><path d="M -80 -56 Q -80 -150 8 -150 Q 96 -150 96 -56 Z" fill={c} /><rect x={-80} y={-84} width={176} height={20} fill={d} /></g>;
    case "fedora": return <g><ellipse cx={10} cy={-62} rx={150} ry={24} fill={d} /><path d="M -76 -62 L -66 -150 Q 10 -130 86 -150 L 96 -62 Z" fill={c} /><rect x={-74} y={-90} width={168} height={18} fill={d} /></g>;
    case "peaked": return <g><path d="M -98 -50 Q -110 -140 4 -140 Q 116 -140 104 -50 Z" fill={c} /><rect x={-98} y={-64} width={204} height={22} fill={d} /><path d="M 30 -50 Q 120 -52 140 -30 L 40 -30 Z" fill={C.ink} /><circle cx={50} cy={-98} r={14} fill={C.yellow} /></g>;
    case "helmet": return <g><path d="M -104 -10 Q -110 -140 6 -144 Q 116 -140 110 -30 L 80 -30 Q 70 -60 20 -60 Q -40 -56 -60 -10 Z" fill={c} /><path d="M -60 -120 Q 0 -150 70 -124" stroke={d} strokeWidth={16} fill="none" strokeLinecap="round" /></g>;
    case "headscarf": return <g><path d="M -64 150 Q -140 80 -118 -40 Q -102 -128 6 -130 Q 106 -128 118 -40 Q 124 40 96 92 Q 70 128 30 128 Q 60 110 84 70 Q 104 20 96 -40 Q 70 -66 20 -64 Q -36 -60 -50 -10 Q -60 40 -40 100 Q -30 140 -64 150 Z" fill={c} /><path d="M -70 -60 Q 0 -100 90 -60" stroke={d} strokeWidth={10} fill="none" /></g>;
    case "turban": return <g><path d="M -104 -30 Q -112 -160 4 -164 Q 116 -160 108 -30 Q 60 -60 4 -58 Q -50 -60 -104 -30 Z" fill={c} /><path d="M -90 -60 Q 0 -150 100 -70 M -96 -100 Q 10 -170 90 -110" stroke={d} strokeWidth={14} fill="none" /></g>;
    case "mortarboard": return <g><path d="M -96 -40 Q -96 -110 4 -112 Q 104 -110 104 -40 Z" fill={c} /><path d="M -140 -120 L 6 -168 L 150 -120 L 6 -80 Z" fill={c} /><path d="M 6 -122 L 120 -110 L 120 -30" stroke={C.yellow} strokeWidth={8} fill="none" /><circle cx={120} cy={-26} r={10} fill={C.yellow} /></g>;
    case "bandana": return <g><path d="M -98 -40 Q -98 -118 4 -120 Q 104 -118 104 -40 Q 50 -64 4 -64 Q -50 -64 -98 -40 Z" fill={c} /><path d="M -96 -40 L -150 -10 L -130 -60 Z" fill={d} /></g>;
    case "tophat": return <g><ellipse cx={4} cy={-72} rx={130} ry={20} fill={c} /><rect x={-70} y={-240} width={150} height={172} rx={8} fill={c} /><rect x={-70} y={-110} width={150} height={24} fill={C.red} /></g>;
    case "scrubcap": return <path d="M -102 -26 Q -104 -128 4 -128 Q 108 -126 106 -26 Q 56 -52 4 -52 Q -50 -52 -102 -26 Z" fill={c} />;
    case "skullcap": return <path d="M -74 -82 Q -40 -118 30 -114 Q 70 -110 86 -82 Q 10 -96 -74 -82 Z" fill={c} />;
    case "sailor": return <g><path d="M -88 -60 Q -90 -130 4 -130 Q 98 -130 96 -60 Z" fill={c} /><rect x={-100} y={-70} width={204} height={26} rx={12} fill={d} /></g>;
    default: return null;
  }
}

function face(e: Expression, f: number, talk: boolean, acc: Accessory, hairC: string) {
  const blink = f % 96 < 4 && e !== "laugh";
  const eyeRy = e === "surprised" ? 14 : 11;
  const ex = [36, 76];
  const brow = e === "angry" ? [18, -2] : e === "sad" ? [-14, 4] : e === "surprised" ? [0, -12] : [0, 0];
  let mouth: React.ReactNode;
  const open = talk ? Math.abs(Math.sin(f / 2.6)) : 0;
  const m0 = (k: string) => <path d={k} fill={C.inkSoft} />;
  if (talk && e !== "laugh") mouth = <ellipse cx={62} cy={52} rx={16} ry={3 + open * 12} fill={C.inkSoft} />;
  else if (e === "smile") mouth = <path d="M 42 44 Q 62 66 84 42" stroke={C.inkSoft} strokeWidth={7} fill="none" strokeLinecap="round" />;
  else if (e === "neutral") mouth = <path d="M 46 52 L 80 50" stroke={C.inkSoft} strokeWidth={7} strokeLinecap="round" />;
  else if (e === "sad") mouth = <path d="M 44 60 Q 62 44 82 58" stroke={C.inkSoft} strokeWidth={7} fill="none" strokeLinecap="round" />;
  else if (e === "angry") mouth = <path d="M 44 58 Q 62 48 82 56" stroke={C.inkSoft} strokeWidth={8} fill="none" strokeLinecap="round" />;
  else if (e === "surprised") mouth = <ellipse cx={62} cy={54} rx={12} ry={16} fill={C.inkSoft} />;
  else if (e === "open") mouth = <g>{m0("M 40 42 Q 62 44 86 40 Q 82 80 62 80 Q 42 80 40 42 Z")}<ellipse cx={62} cy={70} rx={12} ry={7} fill={C.pink} /></g>;
  else mouth = <g>{m0("M 36 38 Q 62 42 90 36 Q 86 88 62 88 Q 38 88 36 38 Z")}<path d="M 40 40 Q 62 44 88 38 L 86 48 Q 62 52 40 50 Z" fill={C.white} /></g>;
  const eyes = e === "laugh" || blink
    ? ex.map((x) => <path key={x} d={e === "laugh" ? `M ${x - 11} 4 Q ${x} -10 ${x + 11} 4` : `M ${x - 10} 0 L ${x + 10} 0`} stroke={C.ink} strokeWidth={6} fill="none" strokeLinecap="round" />)
    : ex.map((x) => <ellipse key={x} cx={x} cy={0} rx={9} ry={eyeRy} fill={C.ink} />);
  return (
    <g>
      {eyes}
      {ex.map((x, i) => <path key={"b" + x} d={`M ${x - 14} ${-28 + (i ? -brow[0] * 0.5 : brow[0] * 0.5) + brow[1]} L ${x + 14} ${-28 + (i ? brow[0] * 0.5 : -brow[0] * 0.5) + brow[1]}`} stroke={shade(hairC, 0.1)} strokeWidth={7} strokeLinecap="round" />)}
      <circle cx={84} cy={30} r={14} fill={C.pink} opacity={0.3} />
      {acc === "beard" ? <path d="M -30 10 Q -34 110 50 112 Q 100 108 100 50 Q 92 72 62 70 Q 30 70 10 40 Q -6 20 -30 10 Z" fill={hairC} /> : null}
      {acc === "stubble" ? <path d="M -28 20 Q -20 104 52 104 Q 96 100 98 52 Q 62 76 20 56 Z" fill={hairC} opacity={0.28} /> : null}
      {mouth}
      {acc === "moustache" || acc === "beard" ? <path d="M 36 40 Q 62 22 90 40 Q 62 34 36 40 Z" fill={hairC} stroke={hairC} strokeWidth={8} strokeLinejoin="round" /> : null}
    </g>
  );
}

function faceAcc(a: Accessory, c: string) {
  switch (a) {
    case "glasses": return <g stroke={C.ink} strokeWidth={6} fill="rgba(255,255,255,0.25)"><circle cx={30} cy={-2} r={20} /><circle cx={80} cy={-2} r={20} /><path d="M 50 -4 L 60 -4 M 10 -4 L -40 -12" fill="none" /></g>;
    case "sunglasses": return <g fill={C.ink}><rect x={10} y={-16} width={42} height={30} rx={10} /><rect x={62} y={-16} width={42} height={30} rx={10} /><path d="M 50 -6 L 64 -6 M 12 -8 L -40 -14" stroke={C.ink} strokeWidth={6} /></g>;
    case "goggles": return <g><rect x={-100} y={-20} width={130} height={16} fill={shade(c, 0.3)} /><rect x={6} y={-24} width={108} height={44} rx={20} fill={c} /><rect x={16} y={-16} width={40} height={28} rx={10} fill="#BFE6F5" /><rect x={64} y={-16} width={40} height={28} rx={10} fill="#BFE6F5" /></g>;
    case "mask": return <g><path d="M 10 22 Q 60 14 108 24 Q 110 70 60 92 Q 20 84 10 40 Z" fill="#9FD3E8" /><path d="M 10 30 L -44 10 M 14 70 L -44 30" stroke={C.white} strokeWidth={5} /></g>;
    case "headset": return <g><path d="M -48 -20 Q -40 -120 30 -112" stroke={C.ink} strokeWidth={10} fill="none" /><rect x={-64} y={-24} width={30} height={46} rx={12} fill={C.ink} /><path d="M -40 14 Q -10 70 50 60" stroke={C.ink} strokeWidth={7} fill="none" /><circle cx={52} cy={60} r={9} fill={C.ink} /></g>;
    case "headphones": return <g><path d="M -60 -10 Q -60 -128 16 -126 Q 70 -122 80 -60" stroke={c} strokeWidth={16} fill="none" /><rect x={-76} y={-30} width={42} height={62} rx={18} fill={c} /></g>;
    case "earrings": return <circle cx={-44} cy={34} r={8} fill={C.yellow} />;
    default: return null;
  }
}

function propEl(p: Prop, h: Hand, c: string, both: boolean): React.ReactNode {
  const { x, y, a } = h;
  const R = (n: React.ReactNode, ang = 0) => <g transform={`translate(${x} ${y}) rotate(${ang})`}>{n}</g>;
  const d = shade(c, 0.25);
  const cx = both ? (x + h.bx) / 2 : x;
  const cy = both ? (y + h.by) / 2 : y;
  switch (p) {
    case "phone": return R(<g><rect x={-18} y={-58} width={36} height={66} rx={8} fill={C.ink} /><rect x={-13} y={-52} width={26} height={50} rx={4} fill="#8FD0F2" /></g>, 0);
    case "tablet": return R(<g><rect x={-10} y={-90} width={110} height={80} rx={10} fill={C.ink} /><rect x={-2} y={-82} width={94} height={64} rx={4} fill="#8FD0F2" /></g>, -10);
    case "laptop": return <g transform={`translate(${cx} ${cy})`}><rect x={-80} y={-6} width={160} height={14} rx={5} fill={C.grey} /><path d="M -66 -6 L -80 -96 L 56 -96 L 70 -6 Z" fill={C.greyDark} /><circle cx={-6} cy={-52} r={8} fill={C.greyLight} /></g>;
    case "clipboard": return R(<g><rect x={-6} y={-110} width={90} height={120} rx={8} fill={C.brown} /><rect x={4} y={-96} width={70} height={98} fill={C.white} /><rect x={22} y={-116} width={34} height={16} rx={4} fill={C.grey} />{[0, 1, 2, 3].map((i) => <rect key={i} x={14} y={-80 + i * 20} width={48} height={7} rx={3} fill={C.greyLight} />)}</g>, -8);
    case "book": return R(<g><rect x={-10} y={-100} width={84} height={110} rx={6} fill={c} /><rect x={-10} y={-100} width={14} height={110} fill={d} /><rect x={14} y={-80} width={46} height={10} rx={4} fill={C.white} opacity={0.7} /></g>, -6);
    case "mug": return R(<g><rect x={-6} y={-62} width={56} height={62} rx={10} fill={c} /><path d="M 50 -48 Q 74 -46 72 -28 Q 70 -12 50 -14" stroke={c} strokeWidth={9} fill="none" /><path d="M 10 -76 q 8 -12 0 -24 M 30 -76 q 8 -12 0 -24" stroke={C.grey} strokeWidth={5} fill="none" opacity={0.6} /></g>);
    case "briefcase": return R(<g><path d="M -22 -8 L -22 -26 Q -22 -34 -12 -34 L 12 -34 Q 22 -34 22 -26 L 22 -8" stroke={C.brownDark} strokeWidth={8} fill="none" /><rect x={-70} y={-10} width={140} height={100} rx={12} fill={c} /><rect x={-70} y={24} width={140} height={10} fill={d} /></g>);
    case "bag": return R(<g><path d="M -26 0 Q -26 -40 0 -40 Q 26 -40 26 0" stroke={d} strokeWidth={7} fill="none" /><path d="M -50 0 L 50 0 L 42 110 L -42 110 Z" fill={c} /></g>);
    case "toolbox": return R(<g><rect x={-20} y={-22} width={40} height={16} rx={6} fill="none" stroke={C.greyDark} strokeWidth={8} /><rect x={-80} y={-8} width={160} height={84} rx={8} fill={c} /><rect x={-80} y={-8} width={160} height={22} fill={d} /><rect x={-12} y={8} width={24} height={14} rx={3} fill={C.greyLight} /></g>);
    case "wrench": return R(<g><rect x={-9} y={-120} width={18} height={150} rx={8} fill={C.grey} /><path d="M -26 -150 a 26 26 0 1 0 52 0 l -10 0 l 0 18 l -32 0 l 0 -18 Z" fill={C.grey} /></g>, 180 - a + 90 - 90);
    case "hammer": return R(<g><rect x={-9} y={-130} width={18} height={160} rx={6} fill={C.brown} /><rect x={-50} y={-160} width={100} height={42} rx={8} fill={C.greyDark} /></g>, 180 - a);
    case "mic": return R(<g><rect x={-11} y={-64} width={22} height={70} rx={8} fill={C.ink} /><circle cx={0} cy={-80} r={24} fill={C.greyDark} /></g>, 20);
    case "camera": return R(<g><rect x={-40} y={-76} width={110} height={70} rx={12} fill={C.ink} /><circle cx={24} cy={-40} r={24} fill={C.greyDark} /><circle cx={24} cy={-40} r={13} fill="#8FD0F2" /><rect x={-30} y={-88} width={30} height={14} rx={4} fill={C.ink} /></g>);
    case "box": return <g transform={`translate(${cx} ${cy})`}><rect x={-90} y={-110} width={180} height={140} rx={6} fill="#C99A62" /><rect x={-90} y={-110} width={180} height={18} fill="#B4844F" /><rect x={-14} y={-110} width={28} height={60} fill="#E8D2A8" /></g>;
    case "paper": return R(<g><rect x={-6} y={-100} width={78} height={100} rx={4} fill={C.white} />{[0, 1, 2, 3].map((i) => <rect key={i} x={6} y={-84 + i * 18} width={52} height={6} rx={3} fill={C.greyLight} />)}</g>, -6);
    case "pen": return R(<g><rect x={-5} y={-60} width={10} height={70} rx={4} fill={c} /><path d="M -5 -60 L 0 -76 L 5 -60 Z" fill={C.ink} /></g>, 160 - a);
    case "broom": return R(<g><rect x={-7} y={-260} width={14} height={500} rx={6} fill={C.brown} /><path d="M -14 230 L 14 230 L 50 330 L -50 330 Z" fill={C.yellowDark} /></g>, 10);
    case "umbrella": return R(<g><rect x={-5} y={-500} width={10} height={510} rx={4} fill={C.ink} /><path d="M -190 -470 Q 0 -620 190 -470 Q 143 -490 95 -470 Q 47 -490 0 -470 Q -47 -490 -95 -470 Q -143 -490 -190 -470 Z" fill={c} /><path d="M 0 10 q 0 20 -20 20" stroke={C.ink} strokeWidth={10} fill="none" /></g>);
    case "tray": return R(<g><ellipse cx={20} cy={-6} rx={96} ry={14} fill={C.grey} /><rect x={-10} y={-70} width={24} height={60} rx={4} fill="#BFE6F5" opacity={0.85} /><rect x={30} y={-56} width={40} height={46} rx={8} fill={c} /></g>);
    case "pointer": return R(<g><rect x={-5} y={-300} width={10} height={320} rx={5} fill={C.brownDark} /><circle cx={0} cy={-300} r={9} fill={C.red} /></g>, 180 - a);
    default: return null;
  }
}

function extraEl(e: Extra, c: string, top: Top) {
  const d = shade(c, 0.2);
  switch (e) {
    case "tie": return <g><path d="M 6 -800 L 30 -800 L 26 -780 L 34 -640 L 18 -610 L 2 -640 L 10 -780 Z" fill={c} /><path d="M 4 -804 L 32 -804 L 26 -780 L 10 -780 Z" fill={d} /></g>;
    case "bowtie": return <g fill={c}><path d="M 18 -790 L -14 -810 L -14 -770 Z" /><path d="M 18 -790 L 50 -810 L 50 -770 Z" /><circle cx={18} cy={-790} r={10} fill={d} /></g>;
    case "apron": return <g><path d="M -40 -720 L 70 -720 L 72 -640 Q 96 -600 96 -300 L -86 -300 Q -86 -600 -60 -640 Z" fill={c} /><rect x={-80} y={-500} width={170} height={16} fill={d} /><rect x={-30} y={-440} width={90} height={60} rx={8} fill={d} /><path d="M -40 -720 Q -20 -800 10 -806 M 70 -720 Q 50 -800 20 -806" stroke={d} strokeWidth={8} fill="none" /></g>;
    case "hivis": return <g><path d="M -74 -800 L -20 -800 L 4 -700 L 30 -800 L 82 -800 L 80 -470 L -74 -470 Z" fill={c} opacity={0.97} /><rect x={-74} y={-610} width={154} height={22} fill="#E9EEF2" /><rect x={-74} y={-540} width={154} height={22} fill="#E9EEF2" /></g>;
    case "lanyard": return <g><path d="M -18 -800 L 8 -650 L 36 -800" stroke={c} strokeWidth={8} fill="none" /><rect x={-16} y={-656} width={50} height={64} rx={6} fill={C.white} /><rect x={-6} y={-644} width={30} height={22} rx={4} fill={C.greyLight} /></g>;
    case "stethoscope": return <g fill="none" stroke={C.inkSoft} strokeWidth={9} strokeLinecap="round"><path d="M -36 -800 Q -46 -690 -6 -660 Q 30 -640 40 -700 Q 46 -760 50 -800" /><path d="M 40 -700 Q 60 -640 54 -600" /><circle cx={54} cy={-590} r={14} fill={C.grey} stroke="none" /></g>;
    case "scarf": return <g><rect x={-62} y={-822} width={140} height={44} rx={20} fill={c} /><rect x={-40} y={-790} width={36} height={130} rx={12} fill={d} /></g>;
    case "badge": return <g><path d="M 36 -700 L 60 -700 L 72 -678 L 60 -656 L 36 -656 L 24 -678 Z" fill={C.yellow} /><circle cx={48} cy={-678} r={8} fill={C.yellowDark} /></g>;
    case "backpack": return null;
    case "toolbelt": return <g><rect x={-78} y={-490} width={162} height={30} fill={C.brown} /><rect x={-60} y={-470} width={50} height={60} rx={6} fill={C.brownDark} /><rect x={30} y={-470} width={40} height={50} rx={6} fill={C.brownDark} /><rect x={42} y={-500} width={10} height={40} fill={C.grey} /></g>;
    case "sash": return <path d="M -70 -800 L -30 -800 L 84 -540 L 80 -500 Z" fill={c} />;
    default: return top ? null : null;
  }
}

export const Person: React.FC<PersonSpec & { x: number; y: number; s?: number; f: number; flip?: boolean }> = (q) => {
  const { x, y, s = 1, f, flip, pose = "stand", expression = "smile", hair = "short", top = "tshirt", bottom = "trousers", shoes = "shoes", hat = "none", accessory = "none", extra = "none", prop = "none", seat = true } = q;
  const skin = skinColour(q.skin), hc = hairColour(q.hairColor);
  const tc = q.topColor || C.blue, bc = top === "jumpsuit" ? tc : q.bottomColor || C.navy, sc = q.shoesColor || C.ink;
  const shirt = q.shirtColor || C.white, hatC = q.hatColor || C.red, xc = q.extraColor || C.red, pc = q.propColor || C.orange;
  const age: Age = q.age && q.age in AGE ? q.age : "adult";
  const G = AGE[age];
  const P = poseAt(pose, f);
  if (age === "elder" && pose !== "run") { P.lean += 5; P.tilt += 4; P.jump *= 0.5; }
  const th = TH * G.leg, sh2 = SH * G.leg;
  const lv = (l: Limb) => th * Math.cos(rad(l[0])) + sh2 * Math.cos(rad(l[0] - l[1]));
  const dy = TH + SH - Math.max(lv(P.bl), lv(P.fl)) - P.jump;
  const sleeve: "none" | "short" | "long" = top === "tank" ? "none" : ["tshirt", "dress", "scrubs"].includes(top) ? "short" : "long";
  const longCoat = top === "coat";
  const tcD = shade(tc, 0.16), skinD = shade(skin, 0.12);
  const leg = (l: Limb, hx: number, back: boolean) => {
    const h: [number, number] = [hx, HIP];
    const k = pt(h[0], h[1], l[0], th);
    const an = pt(k[0], k[1], l[0] - l[1], sh2);
    const col = back ? shade(bc, 0.14) : bc;
    const sk = back ? skinD : skin;
    const trousers = bottom === "trousers" || bottom === "overalls" || top === "jumpsuit";
    const shorts = bottom === "shorts" && top !== "jumpsuit";
    return (
      <g>
        <Seg p={[h, k, an]} w={62} c={sk} />
        {trousers ? <Seg p={[h, k, an]} w={74} c={col} /> : shorts ? <Seg p={[h, pt(h[0], h[1], l[0], th * 0.8)]} w={78} c={col} /> : null}
        <Shoe x={an[0]} y={an[1]} a={l[0] - l[1]} kind={shoes} col={back ? shade(sc, 0.15) : sc} skin={sk} />
      </g>
    );
  };
  const arm = (l: Limb, sx: number, back: boolean) => {
    const sh: [number, number] = [sx, SHY];
    const el = pt(sh[0], sh[1], l[0], UP);
    const ha = pt(el[0], el[1], l[0] + l[1], FO);
    const sk = back ? skinD : skin;
    const col = back ? tcD : tc;
    return {
      h: ha, a: l[0] + l[1],
      limb: (
        <g>
          <Seg p={[sh, el, ha]} w={52} c={sk} />
          {sleeve === "long" ? <Seg p={[sh, el, pt(el[0], el[1], l[0] + l[1], FO * 0.78)]} w={60} c={col} /> : sleeve === "short" ? <Seg p={[sh, pt(sh[0], sh[1], l[0], UP * 0.6)]} w={64} c={col} /> : null}
        </g>
      ),
      hand: <circle cx={ha[0]} cy={ha[1]} r={27} fill={sk} />,
    };
  };
  const bA = arm(P.ba, -44, true), fA = arm(P.fa, 48, false);
  const hand: Hand = { x: fA.h[0], y: fA.h[1], a: fA.a, bx: bA.h[0], by: bA.h[1] };
  const both = pose === "hold";
  const up = `rotate(${P.lean} 0 ${HIP})`;
  const torso = "M -76 -780 Q -76 -812 -44 -812 L 52 -812 Q 84 -812 84 -780 L 82 -455 L -76 -455 Z";
  const skirtLen = top === "dress" ? -270 : -300;
  const headT = `translate(12 -905) rotate(${P.tilt}) translate(0 75) scale(${G.head}) translate(0 -75)`;
  const sz = s * G.k;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -sz : sz} ${sz})`}>
      <ellipse cx={0} cy={4} rx={150 + P.jump * 0.6} ry={18} fill={C.shadow} />
      <g transform={`translate(0 ${dy})`}>
        {pose === "sit" && seat ? <g><rect x={-120} y={HIP + 30} width={300} height={40} rx={14} fill={C.brown} /><rect x={-100} y={HIP + 66} width={24} height={-HIP - 66 - dy} fill={C.brownDark} /><rect x={130} y={HIP + 66} width={24} height={-HIP - 66 - dy} fill={C.brownDark} /></g> : null}
        <g transform={up}>
          {extra === "backpack" ? <rect x={-150} y={-790} width={100} height={260} rx={30} fill={xc} /> : null}
          {hat !== "headscarf" ? <g transform={headT}>{hairBack(hair, hc)}</g> : null}
          {bA.limb}{bA.hand}
        </g>
        {leg(P.bl, -24, true)}
        {leg(P.fl, 26, false)}
        {bottom === "skirt" && top !== "jumpsuit" && top !== "dress" ? <path d={`M -80 ${HIP - 30} L 86 ${HIP - 30} L 120 ${HIP + 180} L -110 ${HIP + 180} Z`} fill={bc} /> : null}
        {(bottom === "trousers" || bottom === "overalls" || bottom === "shorts" || top === "jumpsuit") ? <rect x={-78} y={HIP - 30} width={162} height={70} rx={20} fill={bc} /> : null}
        <g transform={up}>
          <rect x={-8} y={-842} width={44} height={50} rx={14} fill={skinD} />
          {top === "hoodie" ? <path d="M -70 -800 Q -60 -860 10 -856 Q 80 -852 80 -800 Z" fill={tcD} /> : null}
          {longCoat ? <path d={`M -78 -600 L 86 -600 L 104 -300 L -100 -300 Z`} fill={tc} /> : null}
          {top === "dress" ? <path d={`M -76 -520 L 84 -520 L 128 ${skirtLen} L -122 ${skirtLen} Z`} fill={tc} /> : null}
          <path d={torso} fill={top === "tank" ? skin : tc} />
          {top === "tank" ? <path d="M -70 -812 L -40 -812 L -30 -760 L 50 -760 L 58 -812 L 80 -812 L 82 -455 L -76 -455 Z" fill={tc} /> : null}
          {top === "tshirt" || top === "dress" ? <path d="M -16 -812 Q 14 -770 46 -812 Z" fill={skin} /> : null}
          {top === "scrubs" ? <g><path d="M -12 -812 L 16 -740 L 44 -812 Z" fill={skin} /><rect x={30} y={-720} width={40} height={44} rx={6} fill={tcD} /></g> : null}
          {top === "shirt" || top === "uniform" ? <g><path d="M -26 -814 L 14 -770 L -8 -746 Z M 54 -814 L 14 -770 L 36 -746 Z" fill={shade(tc, -0.4)} /><path d="M 14 -770 L 14 -460" stroke={tcD} strokeWidth={4} />{[-720, -660, -600, -540].map((yy) => <circle key={yy} cx={22} cy={yy} r={5} fill={tcD} />)}</g> : null}
          {top === "uniform" ? <g fill={tcD}><rect x={-60} y={-730} width={46} height={50} rx={6} /><rect x={36} y={-730} width={42} height={50} rx={6} /><rect x={-80} y={-815} width={50} height={16} rx={6} fill={C.yellow} /><rect x={-76} y={-500} width={160} height={24} fill={C.ink} /></g> : null}
          {top === "blazer" || longCoat ? <g><path d="M -16 -812 L 14 -660 L 46 -812 Z" fill={shirt} /><path d="M -22 -812 L 14 -650 L -6 -560 L -40 -760 Z M 52 -812 L 14 -650 L 34 -560 L 70 -760 Z" fill={tcD} />{longCoat ? <g fill={tcD}><rect x={-60} y={-560} width={44} height={36} rx={6} /><rect x={40} y={-560} width={40} height={36} rx={6} /></g> : <circle cx={20} cy={-520} r={7} fill={C.ink} opacity={0.5} />}</g> : null}
          {top === "hoodie" ? <g><path d="M -30 -600 L 66 -600 L 76 -520 L -40 -520 Z" fill={tcD} /><path d="M 0 -800 L -4 -720 M 30 -800 L 34 -720" stroke={C.white} strokeWidth={6} strokeLinecap="round" /></g> : null}
          {top === "sweater" ? <g><rect x={-76} y={-490} width={158} height={34} fill={tcD} /><rect x={-20} y={-822} width={70} height={22} rx={10} fill={tcD} /></g> : null}
          {top === "jumpsuit" ? <g><path d="M 14 -800 L 14 -460" stroke={tcD} strokeWidth={6} /><rect x={-10} y={-820} width={54} height={20} rx={8} fill={tcD} /><rect x={-76} y={-500} width={160} height={22} fill={tcD} /></g> : null}
          {bottom === "overalls" && top !== "jumpsuit" ? <g><path d="M -50 -690 L 64 -690 L 70 -455 L -60 -455 Z" fill={bc} /><path d="M -50 -690 L -60 -812 M 64 -690 L 70 -812" stroke={bc} strokeWidth={18} /><circle cx={-44} cy={-680} r={8} fill={C.yellow} /><circle cx={58} cy={-680} r={8} fill={C.yellow} /><rect x={-14} y={-660} width={50} height={40} rx={6} fill={shade(bc, 0.15)} /></g> : null}
          {extraEl(extra, xc, top)}
          {q.over ? q.over() : null}
          <g transform={headT}>
            <circle cx={-48} cy={4} r={20} fill={skinD} />
            <circle cx={0} cy={0} r={95} fill={skin} />
            <path d="M 96 -6 Q 112 14 98 26" stroke={skinD} strokeWidth={9} fill="none" strokeLinecap="round" />
            {hat === "headscarf" ? null : hairFront(hair, hc)}
            {face(expression, f, P.talk, accessory, hc)}
            {faceAcc(accessory, hatC)}
            {hatEl(hat, hatC)}
            {q.topper ? q.topper() : null}
          </g>
          {fA.limb}
          {!q.held && prop === "cane" ? <g><path d={`M ${hand.x - 4} ${hand.y + 20} L ${hand.x + 14} ${-dy - 6}`} stroke={pc} strokeWidth={14} strokeLinecap="round" /><path d={`M ${hand.x - 4} ${hand.y + 20} L ${hand.x - 4} ${hand.y - 14} Q ${hand.x - 4} ${hand.y - 50} ${hand.x - 40} ${hand.y - 46} Q ${hand.x - 60} ${hand.y - 40} ${hand.x - 58} ${hand.y - 16}`} stroke={pc} strokeWidth={14} fill="none" strokeLinecap="round" /></g> : null}
          {q.held ? q.held(hand) : prop === "cane" ? null : propEl(prop, hand, pc, both)}
          {fA.hand}
          {both ? bA.hand : null}
        </g>
      </g>
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...p} x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={!!p.flip} />;
}
