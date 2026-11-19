import React from "react";
import { clamp, pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector reaction face generator: a round flat face (one darker crescent for depth, soft highlight, no outline)
// with mix-and-match eyes, brows, mouth, tears, extras and accessories. Centre (x, y), about 360 px wide at s = 1.
// Motion comes only from p.f: optional pop-in, idle animation (bob, bounce, shake...), blinking, floating extras.
// Presets reuse the drawing through the named export ReactionFace.

export type RFEyes = "dot" | "open" | "wide" | "happy" | "closed" | "wink" | "hearts" | "stars" | "spiral" | "x" | "squint" | "half" | "roll" | "coins" | "teary" | "side";
export type RFMouth = "smile" | "grin" | "laugh" | "flat" | "small" | "frown" | "o" | "gasp" | "scream" | "smirk" | "kiss" | "tongue" | "zip" | "wavy" | "grimace" | "drool" | "yawn" | "sad-open" | "teeth" | "none";
export type RFBrows = "none" | "up" | "angry" | "worried" | "one" | "flat";
export type RFTears = "none" | "drop" | "streams" | "fountain";
export type RFExtra = "none" | "hearts" | "zzz" | "steam" | "sparkles" | "orbit" | "burst" | "snow" | "heat" | "confetti" | "question" | "bubble" | "kiss-heart";
export type RFAccessory = "none" | "shades" | "nerd" | "party-hat" | "thermometer" | "mask" | "hand-chin" | "finger" | "ice-cap" | "napkin";
export type RFAnim = "none" | "bob" | "bounce" | "shake" | "wobble" | "pulse" | "tremble" | "spin" | "nod";
export type RFSpec = {
  color?: string; eyes?: RFEyes; mouth?: RFMouth; brows?: RFBrows; tears?: RFTears; extra?: RFExtra; accessory?: RFAccessory;
  blush?: boolean; sweat?: boolean; anim?: RFAnim; popIn?: boolean; blink?: boolean; look?: "center" | "left" | "right" | "up" | "down";
  rotate?: number; flip?: boolean; border?: boolean;
};

const R = 180, EX = 62, EY = -28, MY = 72;
const INK = C.ink, MOUTH = "#5B2333", TONGUE = "#EF6F8E", BLUE = "#6EC6F2", BLUE_D = "#3E9BD6", PINK = "#F27BA6", HEART = "#E8503F";
const line = (d: string, w = 12, col = INK) => <path d={d} fill="none" stroke={col} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />;

const heartPath = (cx: number, cy: number, r: number) =>
  `M ${cx} ${cy + r * 0.9} C ${cx - r * 1.5} ${cy - r * 0.1} ${cx - r * 0.9} ${cy - r * 1.25} ${cx} ${cy - r * 0.45} C ${cx + r * 0.9} ${cy - r * 1.25} ${cx + r * 1.5} ${cy - r * 0.1} ${cx} ${cy + r * 0.9} Z`;
const starPath = (cx: number, cy: number, r: number, rot = 0, pts = 5, inner = 0.45) => {
  let d = "";
  for (let i = 0; i < pts * 2; i++) {
    const a = rot + (i * Math.PI) / pts - Math.PI / 2, rr = i % 2 ? r * inner : r;
    d += `${i ? "L" : "M"} ${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)} `;
  }
  return d + "Z";
};
const dropPath = (cx: number, cy: number, r: number) => `M ${cx} ${cy - r * 1.7} Q ${cx + r * 1.05} ${cy - r * 0.2} ${cx + r} ${cy + r * 0.25} A ${r} ${r} 0 0 1 ${cx - r} ${cy + r * 0.25} Q ${cx - r * 1.05} ${cy - r * 0.2} ${cx} ${cy - r * 1.7} Z`;
const Drop = ({ x, y, r, c = BLUE }: { x: number; y: number; r: number; c?: string }) => (
  <g><path d={dropPath(x, y, r)} fill={c} /><ellipse cx={x - r * 0.35} cy={y} rx={r * 0.22} ry={r * 0.35} fill="#FFFFFF" opacity={0.7} /></g>
);

function Eye({ kind, cx, side, f, blink, look, col }: { kind: RFEyes; cx: number; side: number; f: number; blink: boolean; look: string; col: string }) {
  const ph = (f + (side > 0 ? 0 : 0)) % 96;
  const k = blink && ph < 6 ? Math.max(0.08, Math.abs(ph - 3) / 3) : 1;
  const lx = look === "left" ? -12 : look === "right" ? 12 : 0, ly = look === "up" ? -14 : look === "down" ? 12 : 0;
  const hi = (x: number, y: number, r: number) => <circle cx={x} cy={y} r={r} fill="#FFFFFF" />;
  switch (kind) {
    case "dot":
      return <g transform={`translate(${cx} ${EY}) scale(1 ${k})`}><ellipse cx={lx * 0.5} cy={ly * 0.5} rx={18} ry={26} fill={INK} />{hi(lx * 0.5 - 6, ly * 0.5 - 10, 6)}</g>;
    case "open": case "side": case "roll": {
      const px = kind === "side" ? 14 : lx, py = kind === "roll" ? -20 : ly;
      return <g transform={`translate(${cx} ${EY}) scale(1 ${k})`}><ellipse rx={32} ry={38} fill="#FFFFFF" /><circle cx={px} cy={py} r={18} fill={INK} />{hi(px - 6, py - 7, 5)}</g>;
    }
    case "wide":
      return <g transform={`translate(${cx} ${EY - 6}) scale(1 ${k})`}><ellipse rx={40} ry={48} fill="#FFFFFF" /><circle cx={lx * 0.6} cy={ly * 0.6} r={11} fill={INK} /></g>;
    case "teary":
      return <g transform={`translate(${cx} ${EY}) scale(1 ${k})`}><ellipse rx={34} ry={40} fill={INK} /><circle cx={-10} cy={-14} r={11} fill="#FFFFFF" /><circle cx={10} cy={10} r={6} fill="#FFFFFF" /><path d="M -30 16 Q 0 44 30 16" fill="none" stroke={BLUE} strokeWidth={7} strokeLinecap="round" /></g>;
    case "happy":
      return <g transform={`translate(${cx} ${EY})`}>{line("M -28 10 Q 0 -30 28 10", 12)}</g>;
    case "closed":
      return <g transform={`translate(${cx} ${EY})`}>{line("M -28 -4 Q 0 22 28 -4", 12)}</g>;
    case "wink":
      return side < 0
        ? <g transform={`translate(${cx} ${EY}) scale(1 ${k})`}><ellipse rx={18} ry={26} fill={INK} />{hi(-6, -10, 6)}</g>
        : <g transform={`translate(${cx} ${EY})`}>{line("M -28 6 Q 0 -24 28 6", 12)}</g>;
    case "half":
      return <g transform={`translate(${cx} ${EY + 4})`}><path d="M -26 0 A 26 22 0 0 0 26 0 Z" fill={INK} />{line("M -32 0 L 32 0", 9)}</g>;
    case "hearts": {
      const b = 1 + Math.sin(f * 0.35) * 0.1;
      return <g transform={`translate(${cx} ${EY}) scale(${b})`}><path d={heartPath(0, 0, 34)} fill={HEART} /><ellipse cx={-14} cy={-14} rx={7} ry={5} fill="#FFFFFF" opacity={0.6} /></g>;
    }
    case "stars":
      return <g transform={`translate(${cx} ${EY})`}><path d={starPath(0, 0, 38, Math.sin(f * 0.1) * 0.2)} fill={C.orange} /><path d={starPath(0, 0, 18, Math.sin(f * 0.1) * 0.2)} fill="#FFFFFF" opacity={0.45} /></g>;
    case "spiral": {
      let d = "";
      for (let i = 0; i <= 40; i++) { const a = i * 0.42, r = 2 + i * 0.75; d += `${i ? "L" : "M"} ${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)} `; }
      return <g transform={`translate(${cx} ${EY}) rotate(${(f * 9 * side) % 360})`}>{line(d, 7)}</g>;
    }
    case "x":
      return <g transform={`translate(${cx} ${EY})`}>{line("M -22 -22 L 22 22 M 22 -22 L -22 22", 12)}</g>;
    case "squint":
      return <g transform={`translate(${cx} ${EY}) scale(${-side} 1)`}>{line("M -24 -22 L 20 0 L -24 22", 12)}</g>;
    case "coins":
      return <g transform={`translate(${cx} ${EY}) scale(${1 + Math.sin(f * 0.3) * 0.06})`}><circle r={36} fill={C.green} /><circle r={28} fill="none" stroke={C.greenDark} strokeWidth={4} />
        <path d="M 12 -14 Q 0 -24 -12 -14 Q -18 -2 0 0 Q 18 3 12 15 Q 0 25 -13 14 M 0 -28 L 0 28" fill="none" stroke="#FFFFFF" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" /></g>;
  }
  void col;
  return null;
}

function Mouth({ kind, f }: { kind: RFMouth; f: number }) {
  const T = (d: string) => <path d={d} fill={MOUTH} />;
  switch (kind) {
    case "none": return null;
    case "smile": return line(`M -62 ${MY - 16} Q 0 ${MY + 46} 62 ${MY - 16}`, 13);
    case "small": return line(`M -26 ${MY + 4} Q 0 ${MY + 22} 26 ${MY + 4}`, 11);
    case "flat": return line(`M -48 ${MY + 12} L 48 ${MY + 12}`, 13);
    case "frown": return line(`M -56 ${MY + 36} Q 0 ${MY - 14} 56 ${MY + 36}`, 13);
    case "smirk": return line(`M -42 ${MY + 16} Q 18 ${MY + 24} 58 ${MY - 8}`, 13);
    case "wavy": return line(`M -60 ${MY + 14} q 15 -16 30 0 t 30 0 t 30 0 t 30 0`, 11);
    case "grin": case "laugh": case "tongue": case "drool": {
      const w = kind === "laugh" ? 84 : 76, open = kind === "laugh" ? 92 + Math.abs(Math.sin(f * 0.45)) * 18 : kind === "tongue" ? 70 : 78;
      const top = MY - 22;
      const mouth = `M ${-w} ${top} Q 0 ${top + open * 2} ${w} ${top} Z`;
      return (
        <g>
          {T(mouth)}
          <path d={`M ${-w + 8} ${top + 2} Q 0 ${top + 34} ${w - 8} ${top + 2} Z`} fill="#FFFFFF" />
          {kind !== "drool" && <ellipse cx={kind === "tongue" ? 18 : 0} cy={top + open * (kind === "tongue" ? 0.98 : 0.8)} rx={kind === "tongue" ? 30 : 36} ry={kind === "tongue" ? 34 : 18} fill={TONGUE} />}
          {kind === "tongue" && <path d={`M 18 ${top + open * 0.8} L 18 ${top + open * 1.2}`} stroke={shade(TONGUE, 0.25)} strokeWidth={5} strokeLinecap="round" />}
          {kind === "drool" && <Drop x={w - 14} y={top + 40 + ((f * 1.2) % 50)} r={17 - ((f * 1.2) % 50) * 0.08} />}
        </g>
      );
    }
    case "o": return <ellipse cx={0} cy={MY + 12} rx={20} ry={24} fill={MOUTH} />;
    case "gasp": return <g><ellipse cx={0} cy={MY + 14} rx={36} ry={46} fill={MOUTH} /><ellipse cx={0} cy={MY + 40} rx={20} ry={12} fill={TONGUE} /></g>;
    case "scream": {
      const h = 76 + Math.sin(f * 0.6) * 6;
      return <g><ellipse cx={0} cy={MY + 30} rx={44} ry={h} fill={MOUTH} /><ellipse cx={0} cy={MY + 30 + h * 0.6} rx={26} ry={16} fill={TONGUE} /></g>;
    }
    case "yawn": {
      const h = 50 + clamp(Math.sin(f * 0.08)) * 22;
      return <g><ellipse cx={0} cy={MY + 18} rx={46} ry={h} fill={MOUTH} /><ellipse cx={0} cy={MY + 18 + h * 0.55} rx={28} ry={14} fill={TONGUE} /></g>;
    }
    case "sad-open":
      return <g>{T(`M -66 ${MY + 52} Q 0 ${MY - 34} 66 ${MY + 52} Q 0 ${MY + 30} -66 ${MY + 52} Z`)}<path d={`M -40 ${MY + 40} Q 0 ${MY + 28} 40 ${MY + 40} Q 0 ${MY + 44} -40 ${MY + 46} Z`} fill={TONGUE} /></g>;
    case "kiss":
      return <g transform={`translate(10 ${MY + 8})`}>{line("M -8 -24 Q 18 -18 0 -4 Q 20 4 -6 18", 11)}</g>;
    case "zip":
      return <g>{line(`M -60 ${MY + 10} L 60 ${MY + 10}`, 12)}{[-44, -26, -8, 10, 28, 46].map((x) => <path key={x} d={`M ${x} ${MY - 2} L ${x} ${MY + 22}`} stroke={C.greyDark} strokeWidth={5} strokeLinecap="round" />)}
        <rect x={56} y={MY + 2} width={18} height={30} rx={5} fill={C.grey} /><circle cx={65} cy={MY + 24} r={4} fill={C.greyDark} /></g>;
    case "grimace": case "teeth":
      return <g><rect x={-74} y={MY - 18} width={148} height={56} rx={24} fill="#FFFFFF" stroke={INK} strokeWidth={9} />
        {line(`M -74 ${MY + 10} L 74 ${MY + 10}`, 6)}{[-37, 0, 37].map((x) => <path key={x} d={`M ${x} ${MY - 16} L ${x} ${MY + 36}`} stroke={INK} strokeWidth={6} />)}</g>;
  }
  return null;
}

function Brows({ kind, sideMul }: { kind: RFBrows; sideMul: number }) {
  void sideMul;
  const y = EY - 64;
  switch (kind) {
    case "none": return null;
    case "up": return <g>{line(`M -92 ${y - 6} Q -62 ${y - 30} -32 ${y - 8}`, 11)}{line(`M 32 ${y - 8} Q 62 ${y - 30} 92 ${y - 6}`, 11)}</g>;
    case "flat": return <g>{line(`M -90 ${y + 4} L -36 ${y + 4}`, 11)}{line(`M 36 ${y + 4} L 90 ${y + 4}`, 11)}</g>;
    case "angry": return <g>{line(`M -96 ${y - 8} L -30 ${y + 22}`, 13)}{line(`M 30 ${y + 22} L 96 ${y - 8}`, 13)}</g>;
    case "worried": return <g>{line(`M -94 ${y + 14} Q -64 ${y + 6} -34 ${y - 14}`, 11)}{line(`M 34 ${y - 14} Q 64 ${y + 6} 94 ${y + 14}`, 11)}</g>;
    case "one": return <g>{line(`M -90 ${y + 10} L -36 ${y + 10}`, 11)}{line(`M 32 ${y - 4} Q 62 ${y - 34} 94 ${y - 14}`, 11)}</g>;
  }
  return null;
}

function Tears({ kind, f }: { kind: RFTears; f: number }) {
  if (kind === "none") return null;
  if (kind === "drop") {
    const t = (f % 45) / 45;
    return <Drop x={-EX - 18} y={EY + 40 + t * 90} r={14} />;
  }
  if (kind === "streams") {
    const w = Math.sin(f * 0.4) * 3;
    return <g>{[-1, 1].map((sd) => <path key={sd} d={`M ${sd * (EX - 4) - 16} ${EY + 22} L ${sd * (EX - 4) + 16} ${EY + 22} L ${sd * (EX + 4) + 18 + w} ${R * 0.92} Q ${sd * (EX)} ${R * 0.98} ${sd * (EX + 4) - 18 + w} ${R * 0.92} Z`} fill={BLUE} opacity={0.92} />)}</g>;
  }
  // fountain: arcs of tears spraying out sideways (crying with laughter)
  return <g>{[-1, 1].map((sd) => [0, 1, 2].map((i) => {
    const t = ((f + i * 6) % 18) / 18;
    const x = sd * (EX + 30 + t * 110), y = EY - 6 - Math.sin(t * Math.PI) * 50 + t * 60;
    return <Drop key={`${sd}${i}`} x={x} y={y} r={13 - t * 4} />;
  }))}</g>;
}

function Extra({ kind, f }: { kind: RFExtra; f: number }) {
  switch (kind) {
    case "none": return null;
    case "hearts": return <g>{[0, 1, 2].map((i) => { const t = ((f + i * 20) % 60) / 60; return <path key={i} d={heartPath((i - 1) * 150 + Math.sin(t * 6 + i) * 14, -R - 10 - t * 120, 22 + i * 4)} fill={HEART} opacity={1 - t} />; })}</g>;
    case "kiss-heart": { const t = (f % 50) / 50; return <path d={heartPath(110 + t * 70, MY - t * 90, 26)} fill={HEART} opacity={1 - t * 0.7} />; }
    case "zzz": return <g>{[0, 1, 2].map((i) => { const t = ((f + i * 20) % 60) / 60; const sz = 34 + i * 12; return <text key={i} x={R * 0.7 + t * 60 + i * 30} y={-R * 0.6 - t * 130 - i * 30} fontFamily="Poppins, Arial, sans-serif" fontWeight={800} fontSize={sz} fill={C.blue} opacity={1 - t * 0.8}>Z</text>; })}</g>;
    case "steam": return <g>{[-1, 1].map((sd) => [0, 1].map((i) => { const t = ((f + i * 12) % 24) / 24; return <circle key={`${sd}${i}`} cx={sd * (R + 10 + t * 50)} cy={-R * 0.55 - t * 60} r={20 + t * 18} fill="#FFFFFF" opacity={0.9 - t * 0.7} />; }))}</g>;
    case "sparkles": return <g>{[[-200, -150, 30, 0], [210, -110, 24, 10], [190, 150, 20, 20], [-210, 120, 18, 30]].map(([x, y, r, o], i) => { const k = 0.6 + Math.abs(Math.sin((f + o) * 0.15)) * 0.5; return <path key={i} d={starPath(x, y, r * k, 0, 4, 0.3)} fill={C.yellow} stroke={C.orange} strokeWidth={4} strokeLinejoin="round" />; })}</g>;
    case "orbit": return <g>{[0, 1, 2, 3].map((i) => { const a = f * 0.12 + (i * Math.PI) / 2; return <path key={i} d={starPath(Math.cos(a) * 170, -R - 10 + Math.sin(a) * 34, 22, a, 5, 0.45)} fill={C.orange} opacity={Math.sin(a) > -0.3 ? 1 : 0.5} />; })}</g>;
    case "burst": {
      const k = 0.9 + Math.sin(f * 0.25) * 0.1;
      return <g transform={`translate(0 ${-R - 30}) scale(${k})`}>
        <path d={starPath(0, 0, 150, f * 0.01, 9, 0.6)} fill={C.orange} /><path d={starPath(0, 6, 100, -f * 0.01, 8, 0.6)} fill={C.yellow} />
        {[0, 1, 2].map((i) => <circle key={i} cx={(i - 1) * 60} cy={-30 - (i % 2) * 20} r={22} fill="#FFFFFF" opacity={0.85} />)}</g>;
    }
    case "snow": return <g>{[[-210, -120], [200, -170], [230, 60], [-230, 90], [-120, -230], [110, -240]].map(([x, y], i) => { const yy = y + ((f * 1.5 + i * 23) % 60); return <g key={i} transform={`translate(${x} ${yy}) rotate(${f * 2 + i * 20})`}>{line("M -14 0 L 14 0 M -7 -12 L 7 12 M 7 -12 L -7 12", 5, "#FFFFFF")}</g>; })}</g>;
    case "heat": return <g>{[-1, 0, 1].map((i) => { const o = Math.sin(f * 0.25 + i) * 8; return <path key={i} d={`M ${i * 90 + o} ${-R - 30} q 18 -22 0 -44 t 0 -44`} fill="none" stroke={C.orange} strokeWidth={10} strokeLinecap="round" opacity={0.85} />; })}</g>;
    case "confetti": return <g>{Array.from({ length: 14 }, (_, i) => { const a = i * 2.39, r = 210 + (i % 3) * 30, y = -R * 0.3 + Math.sin(a) * r * 0.7 + ((f * 2 + i * 9) % 40); const cols = [C.pink, C.blue, C.green, C.orange, C.purple, C.teal]; return <rect key={i} x={Math.cos(a) * r} y={y} width={16} height={9} rx={2} fill={cols[i % 6]} transform={`rotate(${f * 6 + i * 40} ${Math.cos(a) * r + 8} ${y + 4})`} />; })}</g>;
    case "question": { const b = Math.sin(f * 0.15) * 8; return <text x={R * 0.62} y={-R * 0.75 + b} fontFamily="Poppins, Arial, sans-serif" fontWeight={800} fontSize={120} fill={C.blue} transform={`rotate(14 ${R * 0.7} ${-R * 0.9})`}>?</text>; }
    case "bubble": { const r = 18 + Math.abs(Math.sin(f * 0.07)) * 26; return <g><circle cx={-58 - r * 0.6} cy={MY - 6} r={r} fill="#BFE6FA" opacity={0.85} /><circle cx={-58 - r * 0.9} cy={MY - 6 - r * 0.4} r={r * 0.22} fill="#FFFFFF" /></g>; }
  }
  return null;
}

function Accessory({ kind, f, col }: { kind: RFAccessory; f: number; col: string }) {
  const skin = "#FFC83D";
  switch (kind) {
    case "none": return null;
    case "shades": return <g><path d={`M -150 ${EY - 34} L 150 ${EY - 34} L 150 ${EY - 18} Q 140 ${EY + 40} 80 ${EY + 40} Q 22 ${EY + 40} 12 ${EY - 8} L -12 ${EY - 8} Q -22 ${EY + 40} -80 ${EY + 40} Q -140 ${EY + 40} -150 ${EY - 18} Z`} fill={INK} />
      <path d={`M -128 ${EY - 22} L -96 ${EY - 22} L -122 ${EY + 8} Z M 36 ${EY - 22} L 68 ${EY - 22} L 42 ${EY + 8} Z`} fill="#FFFFFF" opacity={0.35} /></g>;
    case "nerd": return <g fill="none" stroke={INK} strokeWidth={11}><circle cx={-EX} cy={EY} r={50} /><circle cx={EX} cy={EY} r={50} /><path d={`M -12 ${EY - 4} Q 0 ${EY - 16} 12 ${EY - 4} M -112 ${EY - 10} L -170 ${EY - 26} M 112 ${EY - 10} L 170 ${EY - 26}`} strokeLinecap="round" /></g>;
    case "party-hat": return <g transform={`rotate(${-14 + Math.sin(f * 0.15) * 4} 0 ${-R + 10})`}>
      <path d={`M -70 ${-R + 30} L 10 ${-R - 170} L 80 ${-R + 26} Q 5 ${-R + 50} -70 ${-R + 30} Z`} fill={C.purple} />
      <path d={`M -44 ${-R - 30} L 52 ${-R - 34} M -20 ${-R - 92} L 34 ${-R - 96}`} stroke={C.yellow} strokeWidth={18} strokeLinecap="round" />
      <circle cx={10} cy={-R - 176} r={24} fill={C.pink} /></g>;
    case "thermometer": return <g transform={`rotate(-22 70 ${MY + 4})`}><rect x={40} y={MY - 2} width={150} height={20} rx={10} fill="#FFFFFF" /><rect x={120} y={MY + 4} width={66} height={8} rx={4} fill={C.red} /><circle cx={186} cy={MY + 8} r={16} fill={C.red} /></g>;
    case "mask": return <g><path d={`M -128 ${MY - 46} Q 0 ${MY - 64} 128 ${MY - 46} L 118 ${MY + 46} Q 0 ${MY + 86} -118 ${MY + 46} Z`} fill="#CFEAF6" />
      {[-20, 8, 36].map((d) => <g key={d}>{line(`M -110 ${MY + d - 10} Q 0 ${MY + d - 22} 110 ${MY + d - 10}`, 5, "#9CCFE6")}</g>)}{line(`M -128 ${MY - 40} L -${R - 4} ${EY + 10} M 128 ${MY - 40} L ${R - 4} ${EY + 10}`, 6, "#FFFFFF")}</g>;
    case "hand-chin": return <g transform={`translate(70 ${R - 10}) rotate(${Math.sin(f * 0.1) * 3})`}>
      <path d="M -70 60 Q -86 -10 -50 -30 L 40 -34 Q 62 -32 58 -14 Q 54 0 30 0 L 0 0 Q 30 4 26 22 Q 22 36 0 34 Q 24 44 14 60 Q 4 72 -20 66 Q 0 80 -20 92 Q -50 100 -70 60 Z" fill={skin} stroke={shade(skin, 0.25)} strokeWidth={6} strokeLinejoin="round" />
      <path d="M 40 -34 L 66 -112 Q 76 -132 92 -122 Q 104 -114 96 -96 L 64 -18" fill={skin} stroke={shade(skin, 0.25)} strokeWidth={6} strokeLinejoin="round" /></g>;
    case "finger": {
      // a loose fist rising from the lower left, index finger laid upright across the lips
      const sk = shade(skin, 0.25);
      return <g transform={`translate(-6 ${MY + 78}) rotate(-10) scale(0.85)`}>
        <rect x={-19} y={-180} width={38} height={206} rx={19} fill={skin} stroke={sk} strokeWidth={6} />
        <path d="M -78 10 Q -86 -20 -50 -26 L 20 -26 Q 60 -26 64 10 L 64 60 Q 60 96 20 98 L -40 98 Q -82 96 -80 56 Z" fill={skin} stroke={sk} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -78 34 L 20 34 M -78 64 L 22 64" stroke={sk} strokeWidth={5} strokeLinecap="round" />
        <rect x={-19} y={-180} width={38} height={150} rx={19} fill={skin} />
        <path d="M -10 -166 Q 0 -172 10 -166" stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" fill="none" opacity={0.6} /></g>;
    }
    case "ice-cap": return <g><path d={`M ${-R + 14} ${-R * 0.42} Q 0 ${-R * 1.2} ${R - 14} ${-R * 0.42} L ${R - 30} ${-R * 0.3} L ${R - 50} ${-R * 0.05} L ${R - 72} ${-R * 0.3} L 40 ${-R * 0.12} L 10 ${-R * 0.38} L -30 ${-R * 0.1} L -60 ${-R * 0.36} L -100 ${-R * 0.02} L -120 ${-R * 0.32} Z`} fill="#E9F6FD" opacity={0.95} />
      <ellipse cx={-60} cy={-R * 0.7} rx={40} ry={14} fill="#FFFFFF" /></g>;
    case "napkin": return <g><path d={`M -120 ${R * 0.8} L 120 ${R * 0.8} L 0 ${R * 1.45} Z`} fill={C.red} /><path d={`M -80 ${R * 0.8} L 0 ${R * 1.45} M 80 ${R * 0.8} L 0 ${R * 1.45} M -90 ${R * 0.95} L 90 ${R * 0.95} M -55 ${R * 1.15} L 55 ${R * 1.15}`} fill="none" stroke="#FFFFFF" strokeWidth={10} opacity={0.75} /></g>;
  }
  void col;
  return null;
}

/** Shared drawing. Centre (x, y), s = scale, flip mirrors, rotate turns (180 = upside down). */
export function ReactionFace(p: PartProps<any> & RFSpec) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col = p.color ?? C.yellow, eyes: RFEyes = p.eyes ?? "dot", mouth: RFMouth = p.mouth ?? "smile";
  const anim: RFAnim = p.anim ?? "bob";
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  let dx = 0, dy = 0, rot = p.rotate ?? 0, sx = 1, sy = 1;
  if (anim === "bob") dy = Math.sin(f * 0.12) * 8;
  else if (anim === "bounce") { const b = Math.abs(Math.sin(f * 0.2)); dy = -b * 40; sy = 1 - (1 - b) * 0.06; sx = 1 + (1 - b) * 0.05; }
  else if (anim === "shake") dx = Math.sin(f * 1.6) * 9;
  else if (anim === "tremble") { dx = Math.sin(f * 2.3) * 4; dy = Math.cos(f * 3.1) * 3; }
  else if (anim === "wobble") rot += Math.sin(f * 0.18) * 9;
  else if (anim === "pulse") { const b = 1 + Math.sin(f * 0.25) * 0.05; sx = b; sy = b; }
  else if (anim === "spin") rot += Math.sin(f * 0.1) * 22;
  else if (anim === "nod") { dy = Math.abs(Math.sin(f * 0.22)) * 10; rot += Math.sin(f * 0.22) * 3; }
  const base = shade(col, 0.16);
  return (
    <g transform={`translate(${x + dx * s} ${y + dy * s}) scale(${(p.flip ? -s : s) * k} ${s * k})`}>
      <ellipse cx={0} cy={R + 26 - dy} rx={R * 0.72} ry={16} fill={C.shadow} />
      <g transform={`rotate(${rot}) scale(${sx} ${sy})`}>
        <Extra kind={p.extra ?? "none"} f={f} />
        {p.border !== false && <g><circle cy={rot === 0 ? 6 : 0} r={R + 16} fill={C.shadow} /><circle r={R + 16} fill="#FFFFFF" /></g>}
        <circle r={R} fill={base} />
        <circle cx={-10} cy={-12} r={R - 16} fill={col} />
        <ellipse cx={-92} cy={-108} rx={34} ry={18} transform="rotate(-40 -92 -108)" fill="#FFFFFF" opacity={0.45} />
        {p.blush && <g><ellipse cx={-112} cy={MY - 22} rx={30} ry={17} fill={PINK} opacity={0.6} /><ellipse cx={112} cy={MY - 22} rx={30} ry={17} fill={PINK} opacity={0.6} /></g>}
        <Eye kind={eyes} cx={-EX} side={-1} f={f} blink={p.blink ?? true} look={p.look ?? "center"} col={col} />
        <Eye kind={eyes} cx={EX} side={1} f={f} blink={p.blink ?? true} look={p.look ?? "center"} col={col} />
        <Brows kind={p.brows ?? "none"} sideMul={1} />
        <Mouth kind={mouth} f={f} />
        <Tears kind={p.tears ?? "none"} f={f} />
        {p.sweat && <Drop x={R * 0.72} y={-R * 0.42 + ((f * 0.8) % 40)} r={20} />}
        <Accessory kind={p.accessory ?? "none"} f={f} col={col} />
      </g>
    </g>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <ReactionFace {...p} />;
}
