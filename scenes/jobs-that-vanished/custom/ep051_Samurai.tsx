import React from "react";
import { Easing, Sequence, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep051 Samurai – the right to cut down a disrespectful commoner (bureiuchi / "kiri-sute gomen"), the strict rules after it
// (strike at once, report, witness, 20 days at home, wrong call = your life), the 1876 sword ban, the topknot snipped …
// and the twist: sumo wrestlers still wear the topknot today.
// visual: { mode: "draw" | "street" | "report" | "home" | "ban" | "sumo", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatAt?: number[] (0–1), floatTop?, floatSide?: "left" | "alt",
//           dangerAt? (home), snipAt? (ban), answer?, answerAccent?, answerAt? (sumo) }
// Respectful: no fake Japanese text anywhere (scrolls/curtains are blank or wavy lines), cartoon-level threat only –
// the blade never touches anyone, nobody is hurt on screen.

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKIN = "#F2C29A";
const SKIN_D = "#D99A70";
const PATE = "#F7D9BE";
const BLUSH = "#F07A6A";
const HAIR = "#1E1A1A";
const RED = "#C8372D";
const RED_D = "#8E2219";
const RED_HI = "#E85A45";
const NAVY = "#24345E";
const NAVY_D = "#16213F";
const INDIGO = "#2F4A86";
const IRON = "#3A3F4E";
const IRON_HI = "#6B7286";
const GOLD = "#F2B544";
const GOLD_D = "#B97F18";
const GOLD_HI = "#FFE9A6";
const STEEL = "#DDE6EE";
const STEEL_D = "#9AA8B6";
const WOOD = "#8A5A34";
const WOOD_D = "#5E3A1E";
const PLASTER = "#FBF4E4";
const TILE = "#56657E";
const TILE_D = "#3C475B";
const EARTH = "#E2B983";
const EARTH_D = "#C99A62";
const TATAMI = "#D9CF8E";
const TATAMI_D = "#B4A862";
const SHOJI = "#FFF8E8";
const BROWN = "#9A6A3E";
const HAKAMA = "#5C6475";
const HAKAMA_D = "#434A58";
const PINK = "#F7B7C4";
const CLAY = "#D9A46A";
const CLAY_D = "#B07A43";
const STRAW = "#E9D58E";

const ease = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
const popIn = (f: number, at: number, len = 8) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });
type P = [number, number];

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number; at?: number[]; side?: string }> = ({ items, f, dur, top = 330, at, side = "alt" }) => (
  <>
    {items.map((t, i) => {
      const start = at && at[i] !== undefined ? at[i] * dur : 4 + i * Math.max(10, (dur - 16) / Math.max(1, items.length));
      const age = f - start;
      if (age < 0) return null;
      const left = side === "left" || i % 2 === 0;
      return (
        <div key={i} style={{ position: "absolute", ...(left ? { left: 80 } : { right: 170 }), top: top + i * 120 - Math.min(age, 30) * 0.8, fontFamily: titleFont, fontSize: 64, color: INK, background: i % 2 ? C.mustard : C.cream, border: `6px solid ${INK}`, borderRadius: 16, padding: "6px 26px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 4], [0, 1], clamp), scale: interpolate(age, [0, 9], [0.4, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

const Limb: React.FC<{ a: P; b: P; c: P; w: number; col: string }> = ({ a, b, c, w, col }) => {
  const d = `M ${a[0]} ${a[1]} L ${b[0]} ${b[1]} L ${c[0]} ${c[1]}`;
  return (
    <g>
      <path d={d} stroke={INK} strokeWidth={w + 13} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};
const elbowOf = (sh: P, hand: P, out: number): P => [(sh[0] + hand[0]) / 2 + out, Math.max(sh[1], hand[1]) + 50];

// four-point sparkle
const Glint: React.FC<{ x: number; y: number; r: number; o?: number }> = ({ x, y, r, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <path d={`M 0 ${-r} Q ${r * 0.14} ${-r * 0.14} ${r} 0 Q ${r * 0.14} ${r * 0.14} 0 ${r} Q ${-r * 0.14} ${r * 0.14} ${-r} 0 Q ${-r * 0.14} ${-r * 0.14} 0 ${-r} Z`} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
  </g>
);

// A Japanese sword in its own frame: scabbard mouth at the origin, scabbard along +x, hilt along −x.
// draw = how far the blade is pulled out (px). Rotated by `ang` around the mouth.
export const Sword: React.FC<{ at: P; ang: number; len?: number; hilt?: number; draw?: number; f: number; glint?: number; scabbard?: boolean }> = ({ at, ang, len = 520, hilt = 210, draw = 0, f, glint = 0, scabbard = true }) => {
  const t = -draw; // tsuba position
  return (
    <g transform={`translate(${at[0]} ${at[1]}) rotate(${ang})`}>
      {scabbard ? (
        <g>
          <path d={`M 0 -15 L ${len - 30} -12 Q ${len + 6} 0 ${len - 30} 12 L 0 15 Z`} fill="#1F1B22" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <path d={`M 20 -8 L ${len - 40} -6`} stroke="#4A4458" strokeWidth={5} strokeLinecap="round" />
          <rect x={-6} y={-17} width={16} height={34} rx={4} fill={GOLD_D} stroke={INK} strokeWidth={4} />
          {/* sageo cord */}
          <path d={`M 60 12 q 30 40 80 36 q 40 -4 60 26`} stroke={RED} strokeWidth={7} fill="none" strokeLinecap="round" />
        </g>
      ) : null}
      {draw > 0 ? (
        <g>
          <path d={`M ${t} -11 L 4 -11 L 4 11 L ${t} 11 Z`} fill={STEEL} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          <path d={`M ${t + 6} -4 L 0 -4`} stroke={STEEL_D} strokeWidth={4} strokeDasharray="16 10" />
          <path d={`M ${t + 4} -9 L 0 -9`} stroke="#FFFFFF" strokeWidth={3} />
        </g>
      ) : null}
      {/* habaki + tsuba */}
      <rect x={t - 14} y={-13} width={16} height={26} fill={GOLD} stroke={INK} strokeWidth={3} />
      <ellipse cx={t - 20} cy={0} rx={11} ry={38} fill={IRON} stroke={INK} strokeWidth={5} />
      <ellipse cx={t - 20} cy={0} rx={4} ry={26} fill={GOLD_D} />
      {/* hilt with diamond wrap */}
      <rect x={t - 30 - hilt} y={-15} width={hilt} height={30} rx={8} fill={C.cream} stroke={INK} strokeWidth={5} />
      {new Array(Math.max(1, Math.floor((hilt - 24) / 34))).fill(0).map((_, k) => {
        const x0 = t - 44 - k * 34;
        return <path key={k} d={`M ${x0} -13 L ${x0 - 34} 13 M ${x0 - 34} -13 L ${x0} 13`} stroke={INK} strokeWidth={7} strokeLinecap="round" />;
      })}
      <rect x={t - 40 - hilt} y={-16} width={18} height={32} rx={6} fill={GOLD_D} stroke={INK} strokeWidth={4} />
      {glint > 0 && draw > 0 ? <Glint x={t * 0.5} y={-4} r={30 + Math.sin(f / 2) * 10} o={glint} /> : null}
    </g>
  );
};

export type SFace = "stern" | "shout" | "shock" | "proud" | "sulk" | "calm";
export type SHair = "kabuto" | "topknot" | "cropped";

// kabuto: neck guard (behind the face) – drawn first
const Shikoro: React.FC = () => (
  <g>
    {[0, 1, 2].map((k) => (
      <path key={k} d={`M ${-118 - k * 10} ${-640 + k * 52} Q ${-170 - k * 30} ${-560 + k * 52} ${-206 - k * 22} ${-488 + k * 46} L ${206 + k * 22} ${-488 + k * 46} Q ${170 + k * 30} ${-560 + k * 52} ${118 + k * 10} ${-640 + k * 52} Z`} fill={k % 2 ? IRON : NAVY} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    ))}
    {[-180, -120, 120, 180].map((x) =>
      [0, 1, 2].map((r) => <circle key={`${x}${r}`} cx={x + (x < 0 ? -r * 14 : r * 14)} cy={-560 + r * 50} r={6} fill={GOLD} stroke={INK} strokeWidth={2} />),
    )}
  </g>
);

// kabuto: bowl, visor, side wings and the golden horn crest (drawn over the face)
const KabutoTop: React.FC<{ f: number; shine?: number }> = ({ f, shine = 0 }) => (
  <g>
    {/* fukigaeshi side wings */}
    {[-1, 1].map((d) => (
      <g key={d}>
        <path d={`M ${d * 104} -640 L ${d * 190} -700 L ${d * 200} -610 L ${d * 112} -590 Z`} fill={NAVY} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <circle cx={d * 160} cy={-640} r={18} fill={GOLD} stroke={INK} strokeWidth={4} />
      </g>
    ))}
    {/* bowl with ribs */}
    <path d="M -122 -628 Q -126 -770 0 -782 Q 126 -770 122 -628 Z" fill={IRON} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    {[-80, -40, 0, 40, 80].map((x) => (
      <path key={x} d={`M ${x * 0.3} -778 Q ${x} -730 ${x * 1.35} -632`} stroke={IRON_HI} strokeWidth={5} fill="none" />
    ))}
    {[-96, -48, 0, 48, 96].map((x) => (
      <circle key={x} cx={x} cy={-648 + Math.abs(x) * 0.08} r={6} fill={GOLD} stroke={INK} strokeWidth={2} />
    ))}
    <path d="M -70 -760 Q -40 -776 -10 -778" stroke="#FFFFFF" strokeWidth={8} opacity={0.35 + shine * 0.5} strokeLinecap="round" fill="none" />
    <ellipse cx={0} cy={-782} rx={22} ry={9} fill={GOLD} stroke={INK} strokeWidth={4} />
    {/* visor */}
    <path d="M -128 -634 Q 0 -596 128 -634 L 132 -610 Q 0 -566 -132 -610 Z" fill={IRON} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    {/* kuwagata horn crest */}
    <g transform={`rotate(${Math.sin(f / 14) * 1.2} 0 -650)`}>
      {[-1, 1].map((d) => (
        <path key={d} d={`M ${d * 8} -652 Q ${d * 120} -700 ${d * 162} -900 Q ${d * 108} -780 ${d * 4} -690 Z`} fill={GOLD} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      ))}
      {[-1, 1].map((d) => (
        <path key={`h${d}`} d={`M ${d * 40} -686 Q ${d * 110} -730 ${d * 140} -850`} stroke={GOLD_HI} strokeWidth={7} fill="none" strokeLinecap="round" />
      ))}
      <path d="M -34 -640 L 34 -640 L 22 -690 L -22 -690 Z" fill={GOLD_D} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <circle cx={0} cy={-664} r={15} fill={RED} stroke={INK} strokeWidth={4} />
    </g>
  </g>
);

const SHead: React.FC<{ f: number; face?: SFace; hair?: SHair }> = ({ f, face = "stern", hair = "kabuto" }) => {
  const talk = (Math.sin(f / 1.8) + 1) / 2;
  const eye = (d: number) => {
    const x = d * 36;
    if (face === "shock")
      return (
        <g key={d}>
          <circle cx={x} cy={-560} r={21} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          <circle cx={x} cy={-558} r={9} fill={INK} />
        </g>
      );
    if (face === "proud" || face === "calm") return <path key={d} d={`M ${x - 20} -556 Q ${x} -574 ${x + 20} -556`} stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />;
    return (
      <g key={d}>
        <ellipse cx={x} cy={-558} rx={12} ry={15} fill={INK} />
        <circle cx={x - 4} cy={-563} r={4} fill="#FFFFFF" />
      </g>
    );
  };
  return (
    <g>
      {hair === "kabuto" ? <Shikoro /> : null}
      {/* ears */}
      {hair !== "kabuto" ? [-1, 1].map((d) => <ellipse key={d} cx={d * 92} cy={-548} rx={18} ry={28} fill={SKIN} stroke={INK} strokeWidth={6} />) : null}
      {/* face */}
      <path d="M -90 -590 Q -94 -476 -40 -450 Q 0 -436 40 -450 Q 94 -476 90 -590 Q 88 -656 0 -658 Q -88 -656 -90 -590 Z" fill={SKIN} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      {hair === "topknot" ? (
        <g>
          {/* shaved crown (sakayaki), side + back hair, the topknot folded forward over the crown */}
          <path d="M -86 -604 Q -84 -656 0 -658 Q 84 -656 86 -604 Q 40 -620 0 -620 Q -40 -620 -86 -604 Z" fill={PATE} />
          <path d="M -92 -600 Q -102 -540 -86 -500 L -74 -528 Q -80 -566 -72 -606 Z M 92 -600 Q 102 -540 86 -500 L 74 -528 Q 80 -566 72 -606 Z" fill={HAIR} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          <path d="M -18 -652 L -14 -728 Q 0 -742 14 -728 L 18 -652 Z" fill={HAIR} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          <rect x={-17} y={-676} width={34} height={12} rx={3} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
        </g>
      ) : null}
      {hair === "cropped" ? <path d="M -94 -580 Q -100 -690 0 -692 Q 100 -690 94 -580 Q 80 -626 30 -628 Q 10 -610 -20 -630 Q -70 -628 -94 -580 Z" fill={HAIR} stroke={INK} strokeWidth={6} strokeLinejoin="round" /> : null}
      <circle cx={-60} cy={-508} r={18} fill={BLUSH} opacity={face === "shock" ? 0.15 : 0.35} />
      <circle cx={60} cy={-508} r={18} fill={BLUSH} opacity={face === "shock" ? 0.15 : 0.35} />
      {/* brows */}
      {face === "shock" || face === "sulk" ? (
        <path d="M -60 -604 Q -36 -620 -14 -602 M 60 -604 Q 36 -620 14 -602" stroke={HAIR} strokeWidth={10} fill="none" strokeLinecap="round" />
      ) : face === "proud" || face === "calm" ? (
        <path d="M -62 -596 Q -38 -608 -14 -596 M 62 -596 Q 38 -608 14 -596" stroke={HAIR} strokeWidth={10} fill="none" strokeLinecap="round" />
      ) : (
        <path d="M -64 -606 L -14 -584 M 64 -606 L 14 -584" stroke={HAIR} strokeWidth={13} strokeLinecap="round" />
      )}
      {[-1, 1].map(eye)}
      <path d="M 0 -548 Q -12 -516 6 -510" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
      {/* mouth */}
      {face === "stern" ? <path d="M -30 -480 Q 0 -488 30 -480" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" /> : null}
      {face === "calm" ? <path d="M -24 -482 Q 0 -472 24 -482" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" /> : null}
      {face === "proud" ? <path d="M -40 -488 Q 0 -446 40 -488 Z" fill="#FFFFFF" stroke={INK} strokeWidth={6} strokeLinejoin="round" /> : null}
      {face === "sulk" ? <path d="M -30 -470 Q 0 -492 30 -470" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" /> : null}
      {face === "shock" ? <ellipse cx={0} cy={-474} rx={18} ry={24} fill="#7A2A26" stroke={INK} strokeWidth={5} /> : null}
      {face === "shout" ? (
        <g>
          <path d={`M -44 -494 Q 0 ${-430 - talk * 16} 44 -494 Z`} fill="#7A2A26" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <path d="M -38 -493 L 38 -493 L 34 -482 Q 0 -478 -34 -482 Z" fill="#FFFFFF" />
        </g>
      ) : null}
      {hair === "kabuto" ? (
        <g>
          {/* chin cord + throat guard */}
          <path d="M -100 -560 Q -70 -440 0 -432 Q 70 -440 100 -560" stroke={RED} strokeWidth={9} fill="none" />
          <g transform="translate(0 -24)">
            <KabutoTop f={f} shine={(Math.sin(f / 6) + 1) / 2} />
          </g>
        </g>
      ) : null}
    </g>
  );
};

// lacquered plates with lacing (sode / kusazuri): w × h rectangle, `rows` lames
const Lames: React.FC<{ w: number; h: number; rows: number; col?: string }> = ({ w, h, rows, col = RED }) => (
  <g>
    <rect x={-w / 2} y={0} width={w} height={h} rx={10} fill={col} stroke={INK} strokeWidth={7} />
    {new Array(rows - 1).fill(0).map((_, r) => (
      <path key={r} d={`M ${-w / 2} ${((r + 1) * h) / rows} L ${w / 2} ${((r + 1) * h) / rows}`} stroke={RED_D} strokeWidth={6} />
    ))}
    {new Array(rows).fill(0).map((_, r) =>
      new Array(Math.max(2, Math.floor(w / 30))).fill(0).map((__, c, arr) => {
        const x = -w / 2 + ((c + 0.5) * w) / arr.length;
        const y = (r * h) / rows + h / rows / 2;
        return <path key={`${r}-${c}`} d={`M ${x} ${y - 9} L ${x} ${y + 9}`} stroke={NAVY} strokeWidth={6} strokeLinecap="round" />;
      }),
    )}
    <rect x={-w / 2} y={h - 12} width={w} height={12} fill={GOLD_D} stroke={INK} strokeWidth={4} />
  </g>
);

const SH_R: P = [-150, -410];
const SH_L: P = [150, -410];
const KAT_AT: P = [150, 6];
const KAT_ANG = 35;
const WAK_AT: P = [116, -16];
const WAK_ANG = 22;
const axis = (ang: number, d: number, at: P): P => [at[0] + Math.cos((ang * Math.PI) / 180) * d, at[1] + Math.sin((ang * Math.PI) / 180) * d];
export const gripOf = (draw: number): P => axis(KAT_ANG, -draw - 120, KAT_AT);

export type SLegs = "wide" | "stand" | "kneel" | "none";

// The samurai. Origin = belt centre. R = viewer-left arm (sword hand), L = viewer-right arm.
export const Samurai: React.FC<{
  x: number;
  y: number;
  s?: number;
  f: number;
  armour?: boolean;
  face?: SFace;
  hair?: SHair;
  legs?: SLegs;
  handR?: P;
  elbowR?: P;
  handL?: P;
  elbowL?: P;
  grip?: boolean; // right hand on the katana hilt, left hand on the scabbard
  draw?: number; // px of blade drawn
  glint?: number;
  swords?: boolean;
  lean?: number;
  bob?: number;
  flip?: boolean;
  children?: React.ReactNode;
}> = ({ x, y, s = 1, f, armour = true, face = "stern", hair, legs = "wide", handR, elbowR, handL, elbowL, grip = false, draw = 0, glint = 0, swords = true, lean = 0, bob = 3, flip = false, children }) => {
  const breathe = Math.sin(f / 10) * bob;
  const hairStyle: SHair = hair ?? (armour ? "kabuto" : "topknot");
  const hR: P = grip ? gripOf(draw) : handR ?? [-250, -150];
  const hL: P = grip ? axis(KAT_ANG, 70, KAT_AT) : handL ?? [250, -150];
  const eR = elbowR ?? (grip ? [-200 + draw * 0.1, -150 + draw * 0.25] : elbowOf(SH_R, hR, -50));
  const eL = elbowL ?? (grip ? [260, -170] : elbowOf(SH_L, hL, 50));
  const sleeve = armour ? NAVY : INDIGO;
  const shin = armour ? IRON : "#FFFFFF";
  const legsEl =
    legs === "wide" || legs === "stand" ? (
      <g>
        {[-1, 1].map((d) => {
          const wide = legs === "wide";
          const bx = wide ? 330 : 230;
          const ix = wide ? 120 : 60;
          const fx = wide ? 250 : 150;
          return (
            <g key={d}>
              <path d={`M ${d * 240} 520 L ${d * fx} 610`} stroke={INK} strokeWidth={58} strokeLinecap="round" />
              <path d={`M ${d * 240} 520 L ${d * fx} 610`} stroke={shin} strokeWidth={44} strokeLinecap="round" />
              <ellipse cx={d * (fx + 20)} cy={622} rx={74} ry={26} fill={STRAW} stroke={INK} strokeWidth={6} />
              <path d={`M ${d * fx} 600 L ${d * (fx + 40)} 618`} stroke={RED} strokeWidth={8} strokeLinecap="round" />
              <path d={`M ${d * 150} 0 L ${d * 8} 0 L ${d * ix} 540 L ${d * bx} 530 Z`} fill={HAKAMA} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
              <path d={`M ${d * 80} 20 L ${d * (ix + 70)} 530 M ${d * 120} 20 L ${d * (bx - 60)} 530`} stroke={HAKAMA_D} strokeWidth={7} />
            </g>
          );
        })}
      </g>
    ) : legs === "kneel" ? (
      <g>
        <path d="M -170 0 Q -300 140 -320 250 L 320 250 Q 300 140 170 0 Z" fill={HAKAMA} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
        {[-200, -110, -30, 30, 110, 200].map((k) => (
          <path key={k} d={`M ${k * 0.6} 20 L ${k} 240`} stroke={HAKAMA_D} strokeWidth={7} />
        ))}
        <path d="M -320 250 L 320 250" stroke={INK} strokeWidth={8} />
      </g>
    ) : null;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      {legsEl}
      <g transform={`rotate(${lean} 0 0) translate(0 ${breathe})`}>
        {armour ? (
          <g>
            {/* kusazuri: skirt of plates */}
            {[-2, -1, 0, 1, 2].map((k) => (
              <g key={k} transform={`translate(${k * 62} 6) rotate(${k * -5})`}>
                <Lames w={86} h={legs === "kneel" ? 170 : 230} rows={5} />
              </g>
            ))}
          </g>
        ) : null}
        {/* neck */}
        <rect x={-38} y={-480} width={76} height={80} fill={SKIN_D} stroke={INK} strokeWidth={6} />
        {armour ? (
          <g>
            {/* dō: lacquered breastplate */}
            <path d="M -156 -430 Q 0 -462 156 -430 L 142 6 L -142 6 Z" fill={RED} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
            <path d="M -152 -430 Q 0 -462 152 -430 L 150 -370 Q 0 -398 -150 -370 Z" fill={IRON} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
            {[-300, -220, -140, -60].map((yy) => (
              <path key={yy} d={`M -146 ${yy} Q 0 ${yy - 22} 146 ${yy}`} stroke={RED_D} strokeWidth={7} fill="none" />
            ))}
            {[-340, -260, -180, -100].map((yy) =>
              [-110, -66, -22, 22, 66, 110].map((xx) => <path key={`${yy}${xx}`} d={`M ${xx} ${yy - 12 - (110 - Math.abs(xx)) * 0.12} l 0 22`} stroke={NAVY} strokeWidth={6} strokeLinecap="round" />),
            )}
            <path d="M -110 -330 Q -60 -360 -20 -350" stroke={RED_HI} strokeWidth={9} fill="none" strokeLinecap="round" opacity={0.8} />
            {/* throat guard */}
            <path d="M -70 -440 Q 0 -400 70 -440 L 60 -420 Q 0 -384 -60 -420 Z" fill={IRON} stroke={INK} strokeWidth={5} />
          </g>
        ) : (
          <g>
            {/* kimono with white under-collar, hakama ties */}
            <path d="M -156 -430 Q 0 -462 156 -430 L 142 10 L -142 10 Z" fill={INDIGO} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
            <path d="M -60 -446 L 10 -250 L 60 -446" stroke="#FFFFFF" strokeWidth={22} fill="none" strokeLinejoin="round" />
            <path d="M -74 -446 L 14 -220 M 74 -446 L -6 -250" stroke={NAVY_D} strokeWidth={8} fill="none" />
            <path d="M -142 -150 L 142 -150" stroke={NAVY_D} strokeWidth={5} opacity={0.4} />
            <circle cx={-90} cy={-330} r={20} fill="#FFFFFF" stroke={NAVY_D} strokeWidth={4} />
            <circle cx={90} cy={-330} r={20} fill="#FFFFFF" stroke={NAVY_D} strokeWidth={4} />
          </g>
        )}
        {/* obi */}
        <rect x={-148} y={-26} width={296} height={44} rx={8} fill={armour ? NAVY : "#C9B48A"} stroke={INK} strokeWidth={7} />
        {swords ? (
          <g>
            <Sword at={WAK_AT} ang={WAK_ANG} len={300} hilt={120} f={f} />
            <Sword at={KAT_AT} ang={KAT_ANG} len={470} hilt={200} draw={draw} f={f} glint={glint} />
          </g>
        ) : null}
        <SHead f={f} face={face} hair={hairStyle} />
        <Limb a={SH_L} b={eL} c={hL} w={armour ? 66 : 76} col={sleeve} />
        <Limb a={SH_R} b={eR} c={hR} w={armour ? 66 : 76} col={sleeve} />
        {armour ? (
          <g>
            <path d={`M ${eL[0]} ${eL[1]} L ${hL[0]} ${hL[1]}`} stroke={IRON} strokeWidth={34} strokeLinecap="round" />
            <path d={`M ${eR[0]} ${eR[1]} L ${hR[0]} ${hR[1]}`} stroke={IRON} strokeWidth={34} strokeLinecap="round" />
            {/* sode shoulder guards */}
            <g transform="translate(-212 -440) rotate(12)">
              <Lames w={150} h={220} rows={5} />
            </g>
            <g transform="translate(212 -440) rotate(-12)">
              <Lames w={150} h={220} rows={5} />
            </g>
          </g>
        ) : null}
        {children}
        <circle cx={hR[0]} cy={hR[1]} r={34} fill={SKIN} stroke={INK} strokeWidth={6} />
        <circle cx={hL[0]} cy={hL[1]} r={34} fill={SKIN} stroke={INK} strokeWidth={6} />
      </g>
    </g>
  );
};

// A townsman in profile, facing right. Origin = hip. bow 0 = upright, 1 = deep bow; back < 0 = recoiling.
// arms: "knees" (hands on knees, bowing) | "up" (startled) | "point" (witness: one arm raised, pointing right)
const Townsman: React.FC<{ x: number; y: number; s?: number; f: number; bow?: number; arms?: "knees" | "up" | "point"; flip?: boolean; sweat?: boolean; coat?: string }> = ({ x, y, s = 1, f, bow = 0, arms = "knees", flip = false, sweat = true, coat = BROWN }) => {
  const a = (bow * 72 * Math.PI) / 180;
  const sh: P = [Math.sin(a) * 250, -Math.cos(a) * 250];
  const hd: P = [sh[0] + Math.sin(a) * 110, sh[1] - Math.cos(a) * 110];
  const knee: P = [60, 160];
  const hand: P = arms === "knees" ? [knee[0] + 40, knee[1] - 30] : arms === "up" ? [sh[0] + 30, sh[1] - 180] : [sh[0] + 200, sh[1] - 60];
  const elbow: P = arms === "knees" ? [sh[0] * 0.6 + 70, sh[1] * 0.5 + 40] : arms === "up" ? [sh[0] + 90, sh[1] - 60] : [sh[0] + 100, sh[1] - 10];
  const shake = Math.sin(f / 1.5) * 3;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      {/* legs */}
      <Limb a={[0, 0]} b={knee} c={[30, 320]} w={56} col={coat} />
      <Limb a={[-20, 0]} b={[-30, 160]} c={[-50, 320]} w={56} col={coat} />
      <ellipse cx={50} cy={334} rx={50} ry={18} fill={STRAW} stroke={INK} strokeWidth={5} />
      <ellipse cx={-30} cy={334} rx={50} ry={18} fill={STRAW} stroke={INK} strokeWidth={5} />
      {/* body */}
      <g transform={`translate(${shake} 0)`}>
        <path d={`M 0 0 L ${sh[0]} ${sh[1]}`} stroke={INK} strokeWidth={150} strokeLinecap="round" />
        <path d={`M 0 0 L ${sh[0]} ${sh[1]}`} stroke={coat} strokeWidth={136} strokeLinecap="round" />
        <path d={`M ${sh[0] * 0.1} ${sh[1] * 0.1} L ${sh[0] * 0.1 + 70} ${sh[1] * 0.1}`} stroke="#E8D9B0" strokeWidth={24} strokeLinecap="round" />
        {/* head */}
        <circle cx={hd[0]} cy={hd[1]} r={74} fill={SKIN} stroke={INK} strokeWidth={7} />
        <g transform={`rotate(${bow * 72} ${hd[0]} ${hd[1]})`}>
          <path d={`M ${hd[0] - 74} ${hd[1] + 6} Q ${hd[0] - 80} ${hd[1] - 70} ${hd[0] - 10} ${hd[1] - 74} Q ${hd[0] - 30} ${hd[1] - 30} ${hd[0] - 50} ${hd[1] + 30} Z`} fill={HAIR} stroke={INK} strokeWidth={4} />
          <path d={`M ${hd[0] - 30} ${hd[1] - 70} L ${hd[0] + 26} ${hd[1] - 84}`} stroke={HAIR} strokeWidth={18} strokeLinecap="round" />
          <circle cx={hd[0] + 34} cy={hd[1] - 6} r={arms === "up" ? 12 : 8} fill={arms === "up" ? "#FFFFFF" : INK} stroke={INK} strokeWidth={arms === "up" ? 4 : 0} />
          {arms === "up" ? <circle cx={hd[0] + 36} cy={hd[1] - 5} r={5} fill={INK} /> : null}
          <path d={`M ${hd[0] + 18} ${hd[1] - 30} L ${hd[0] + 50} ${hd[1] - 36}`} stroke={HAIR} strokeWidth={7} strokeLinecap="round" />
          {arms === "up" ? <ellipse cx={hd[0] + 46} cy={hd[1] + 38} rx={10} ry={14} fill="#7A2A26" stroke={INK} strokeWidth={4} /> : <path d={`M ${hd[0] + 30} ${hd[1] + 36} L ${hd[0] + 56} ${hd[1] + 32}`} stroke={INK} strokeWidth={6} strokeLinecap="round" />}
          <path d={`M ${hd[0] + 70} ${hd[1] - 4} q 12 10 0 18`} stroke={INK} strokeWidth={5} fill={SKIN} />
        </g>
        <Limb a={sh} b={elbow} c={hand} w={44} col={coat} />
        <circle cx={hand[0]} cy={hand[1]} r={24} fill={SKIN} stroke={INK} strokeWidth={5} />
        {arms === "point" ? <path d={`M ${hand[0]} ${hand[1]} l 50 -14`} stroke={INK} strokeWidth={22} strokeLinecap="round" /> : null}
        {sweat
          ? [0, 1].map((k) => {
              const p = ((f + k * 10) % 20) / 20;
              return <path key={k} d={`M ${hd[0] - 60 - p * 50 - k * 30} ${hd[1] - 70 + p * 40} q -12 22 0 30 q 12 -8 0 -30 Z`} fill="#BFE6F2" stroke={INK} strokeWidth={3} opacity={1 - p} />;
            })
          : null}
      </g>
    </g>
  );
};

// a seated Edo official in kamishimo (winged shoulders) writing with a brush. Origin = desk-top centre.
const Official: React.FC<{ x: number; y: number; s?: number; f: number; look?: boolean }> = ({ x, y, s = 1, f, look = false }) => {
  const write = Math.sin(f / 2.2) * 14;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M -150 -380 Q 0 -410 150 -380 L 160 20 L -160 20 Z" fill={INDIGO} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -50 -396 L 0 -280 L 50 -396" stroke="#FFFFFF" strokeWidth={20} fill="none" />
      {[-1, 1].map((d) => (
        <path key={d} d={`M ${d * 30} -400 L ${d * 270} -430 L ${d * 250} -360 L ${d * 120} -250 Z`} fill="#6A7A9A" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      ))}
      <rect x={-34} y={-430} width={68} height={50} fill={SKIN_D} stroke={INK} strokeWidth={6} />
      <g transform="translate(0 40)">
        <SHead f={f} face={look ? "stern" : "calm"} hair="topknot" />
      </g>
      {/* writing arm */}
      <Limb a={[120, -340]} b={[200, -150]} c={[90 + write, -40]} w={64} col={INDIGO} />
      <circle cx={90 + write} cy={-40} r={28} fill={SKIN} stroke={INK} strokeWidth={6} />
      <path d={`M ${96 + write} -50 L ${70 + write} 10`} stroke={INK} strokeWidth={12} strokeLinecap="round" />
      <path d={`M ${70 + write} 10 L ${64 + write} 26`} stroke={INK} strokeWidth={8} strokeLinecap="round" />
      <Limb a={[-120, -340]} b={[-190, -150]} c={[-120, -30]} w={64} col={INDIGO} />
      <circle cx={-120} cy={-30} r={28} fill={SKIN} stroke={INK} strokeWidth={6} />
      {/* low desk with a blank scroll (wavy lines only – no fake writing) */}
      <rect x={-330} y={0} width={660} height={40} rx={8} fill={WOOD} stroke={INK} strokeWidth={8} />
      <rect x={-300} y={40} width={40} height={140} fill={WOOD_D} stroke={INK} strokeWidth={6} />
      <rect x={260} y={40} width={40} height={140} fill={WOOD_D} stroke={INK} strokeWidth={6} />
      <rect x={-200} y={-14} width={320} height={22} rx={4} fill={SHOJI} stroke={INK} strokeWidth={5} />
      {[0, 1, 2].map((k) => (
        <path key={k} d={`M ${-170 + k * 60} -8 l 0 10`} stroke={STEEL_D} strokeWidth={6} strokeLinecap="round" />
      ))}
    </g>
  );
};

// sumo wrestler in shiko stance with a topknot. Origin = belt centre. lift 0–1 raises the viewer-right leg (stomp).
const Rikishi: React.FC<{ x: number; y: number; s?: number; f: number; lift?: number; bowing?: boolean }> = ({ x, y, s = 1, f, lift = 0, bowing = false }) => {
  const kneeR: P = [-250, 210];
  const footR: P = [-300, 470];
  const kneeL: P = [250 + lift * 60, 210 - lift * 330];
  const footL: P = [300 + lift * 120, 470 - lift * 420];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Limb a={[-110, 40]} b={kneeR} c={footR} w={130} col={SKIN} />
      <Limb a={[110, 40]} b={kneeL} c={footL} w={130} col={SKIN} />
      <ellipse cx={footR[0] - 20} cy={footR[1] + 30} rx={90} ry={34} fill={SKIN} stroke={INK} strokeWidth={7} />
      <ellipse cx={footL[0] + 20} cy={footL[1] + 30} rx={90} ry={34} fill={SKIN} stroke={INK} strokeWidth={7} />
      <g transform={`rotate(${bowing ? 0 : lift * -6} 0 0)`}>
        {/* body */}
        <ellipse cx={0} cy={-230} rx={250} ry={290} fill={SKIN} stroke={INK} strokeWidth={9} />
        <path d="M -150 -330 Q -80 -290 -20 -320 M 150 -330 Q 80 -290 20 -320" stroke={SKIN_D} strokeWidth={8} fill="none" strokeLinecap="round" />
        <circle cx={0} cy={-130} r={9} fill={SKIN_D} />
        <ellipse cx={-120} cy={-200} rx={40} ry={26} fill={BLUSH} opacity={0.25} />
        {/* mawashi + sagari */}
        <path d="M -236 -40 Q 0 -10 236 -40 L 230 50 Q 0 90 -230 50 Z" fill={NAVY} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
        <path d="M -70 50 L 70 50 L 40 150 L -40 150 Z" fill={NAVY} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        {new Array(9).fill(0).map((_, k) => (
          <path key={k} d={`M ${-80 + k * 20} 60 L ${-90 + k * 22 + Math.sin(f / 4 + k) * 6} 220`} stroke={NAVY_D} strokeWidth={9} strokeLinecap="round" />
        ))}
        {/* arms: hands on knees */}
        <Limb a={[-200, -400]} b={[-300, -200]} c={[-240, 130]} w={110} col={SKIN} />
        <Limb a={[200, -400]} b={[300, -200]} c={[kneeL[0] - 10, Math.min(130, kneeL[1] - 60)]} w={110} col={SKIN} />
        <circle cx={-240} cy={130} r={52} fill={SKIN} stroke={INK} strokeWidth={7} />
        <circle cx={kneeL[0] - 10} cy={Math.min(130, kneeL[1] - 60)} r={52} fill={SKIN} stroke={INK} strokeWidth={7} />
        {/* head */}
        <g transform="translate(0 80)">
          <path d="M -100 -580 Q -104 -460 -44 -436 Q 0 -424 44 -436 Q 104 -460 100 -580 Q 98 -660 0 -664 Q -98 -660 -100 -580 Z" fill={SKIN} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
          <path d="M -100 -560 Q -104 -660 0 -666 Q 104 -660 100 -560 Q 90 -620 0 -624 Q -90 -620 -100 -560 Z" fill={HAIR} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          {/* ginkgo-leaf topknot */}
          <path d="M -22 -650 L -18 -676 Q -96 -684 -86 -724 Q 0 -704 86 -724 Q 96 -684 18 -676 L 22 -650 Z" fill={HAIR} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <path d="M -50 -700 Q 0 -688 50 -700" stroke="#4A4458" strokeWidth={5} fill="none" />
          <rect x={-20} y={-676} width={40} height={10} rx={3} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
          <path d="M -62 -596 Q -38 -608 -14 -596 M 62 -596 Q 38 -608 14 -596" stroke={HAIR} strokeWidth={11} fill="none" strokeLinecap="round" />
          <path d="M -54 -556 Q -34 -572 -14 -556 M 54 -556 Q 34 -572 14 -556" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />
          <path d="M 0 -546 Q -12 -514 6 -508" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
          <path d="M -40 -486 Q 0 -448 40 -486 Z" fill="#FFFFFF" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <circle cx={-64} cy={-504} r={18} fill={BLUSH} opacity={0.4} />
          <circle cx={64} cy={-504} r={18} fill={BLUSH} opacity={0.4} />
        </g>
      </g>
    </g>
  );
};

const Petals: React.FC<{ f: number; n?: number }> = ({ f, n = 10 }) => (
  <g>
    {new Array(n).fill(0).map((_, k) => {
      const p = ((f * 0.6 + k * 47) % 300) / 300;
      const px = ((k * 137) % 1080) + Math.sin(f / 12 + k) * 60 - p * 200;
      const py = -40 + p * 2000;
      return <ellipse key={k} cx={px} cy={py} rx={13} ry={8} fill={PINK} stroke="#D98A9A" strokeWidth={2} transform={`rotate(${f * 3 + k * 40} ${px} ${py})`} />;
    })}
  </g>
);

// warm Edo street: blue mountain, tiled roofs, plaster walls, plain indigo shop curtains, a blossom branch
const Street: React.FC<{ f: number; ground: number }> = ({ f, ground }) => (
  <g>
    <defs>
      <linearGradient id="ep051sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#9FD3EC" />
        <stop offset="100%" stopColor="#FFE7BE" />
      </linearGradient>
    </defs>
    <rect x={0} y={0} width={1080} height={ground} fill="url(#ep051sky)" />
    <circle cx={860} cy={560} r={90} fill="#FFF3C4" opacity={0.9} />
    <path d="M 120 900 L 430 560 Q 470 530 510 560 L 820 900 Z" fill="#8FAAD0" stroke="#6F8AB4" strokeWidth={6} strokeLinejoin="round" />
    <path d="M 360 636 L 430 560 Q 470 530 510 560 L 580 636 Q 540 610 510 640 Q 480 610 450 646 Q 410 612 360 636 Z" fill="#FFFFFF" />
    {[0, 1, 2, 3].map((k) => {
      const hx = k * 290 - 40;
      const top = ground - 640 + (k % 2) * 50;
      return (
        <g key={k}>
          <rect x={hx} y={top + 110} width={300} height={ground - top - 110} fill={PLASTER} stroke={INK} strokeWidth={6} />
          <path d={`M ${hx} ${top + 300} L ${hx + 300} ${top + 300}`} stroke={WOOD_D} strokeWidth={12} />
          {[0, 1, 2].map((c) => (
            <path key={c} d={`M ${hx + 20 + c * 130} ${top + 110} L ${hx + 20 + c * 130} ${ground}`} stroke={WOOD} strokeWidth={14} />
          ))}
          <rect x={hx + 70} y={top + 150} width={160} height={110} fill="#E9DFC6" stroke={WOOD_D} strokeWidth={6} />
          {[1, 2, 3].map((c) => (
            <path key={c} d={`M ${hx + 70 + c * 40} ${top + 150} l 0 110`} stroke={WOOD_D} strokeWidth={5} />
          ))}
          {/* roof */}
          <path d={`M ${hx - 30} ${top + 120} L ${hx + 20} ${top} L ${hx + 280} ${top} L ${hx + 330} ${top + 120} Z`} fill={TILE} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          {[0, 1, 2].map((r) => (
            <path key={r} d={`M ${hx - 10 + r * 6} ${top + 30 + r * 32} L ${hx + 310 - r * 6} ${top + 30 + r * 32}`} stroke={TILE_D} strokeWidth={6} />
          ))}
          {/* curtain (plain, no lettering) */}
          {[0, 1, 2].map((c) => (
            <path key={c} d={`M ${hx + 40 + c * 74} ${top + 330} L ${hx + 108 + c * 74} ${top + 330} L ${hx + 108 + c * 74 + Math.sin(f / 10 + c) * 4} ${top + 470} L ${hx + 40 + c * 74 + Math.sin(f / 10 + c) * 4} ${top + 470} Z`} fill={k % 2 ? INDIGO : RED_D} stroke={INK} strokeWidth={5} />
          ))}
        </g>
      );
    })}
    {/* lantern */}
    <g transform={`translate(970 ${ground - 330}) rotate(${Math.sin(f / 12) * 4})`}>
      <path d="M 0 -80 L 0 -40" stroke={INK} strokeWidth={5} />
      <ellipse cx={0} cy={20} rx={52} ry={66} fill={RED} stroke={INK} strokeWidth={6} />
      {[-30, 0, 30].map((k) => (
        <path key={k} d={`M -50 ${20 + k} Q 0 ${30 + k} 50 ${20 + k}`} stroke={RED_D} strokeWidth={4} fill="none" />
      ))}
      <rect x={-30} y={-52} width={60} height={14} fill={INK} />
      <rect x={-30} y={80} width={60} height={14} fill={INK} />
    </g>
    <rect x={0} y={ground} width={1080} height={1920 - ground} fill={EARTH} />
    <path d={`M 0 ${ground} L 1080 ${ground}`} stroke={INK} strokeWidth={8} />
    {[0, 1, 2, 3, 4].map((k) => (
      <ellipse key={k} cx={100 + k * 230} cy={ground + 120 + (k % 2) * 160} rx={40} ry={8} fill={EARTH_D} />
    ))}
    {/* blossom branch */}
    <path d="M -20 250 Q 160 300 280 260 Q 340 240 380 270" stroke={WOOD_D} strokeWidth={22} fill="none" strokeLinecap="round" />
    {[[60, 240], [130, 290], [210, 250], [270, 300], [330, 240], [380, 280], [170, 220]].map(([bx, by], k) => (
      <g key={k}>
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx={bx + Math.cos((r * Math.PI) / 180) * 18} cy={by + Math.sin((r * Math.PI) / 180) * 18} rx={14} ry={10} fill={PINK} stroke="#D98A9A" strokeWidth={2} transform={`rotate(${r} ${bx + Math.cos((r * Math.PI) / 180) * 18} ${by + Math.sin((r * Math.PI) / 180) * 18})`} />
        ))}
        <circle cx={bx} cy={by} r={6} fill={GOLD} />
      </g>
    ))}
  </g>
);

// tatami room: paper sliding screens, wooden posts, mats
const Room: React.FC<{ floor: number; tint?: number }> = ({ floor, tint = 0 }) => (
  <g>
    <rect x={0} y={0} width={1080} height={floor} fill={SHOJI} />
    {[0, 1, 2, 3].map((k) => (
      <g key={k}>
        <rect x={k * 270} y={260} width={270} height={floor - 260} fill={SHOJI} stroke={WOOD} strokeWidth={14} />
        {[1, 2].map((c) => (
          <path key={c} d={`M ${k * 270 + c * 90} 260 L ${k * 270 + c * 90} ${floor}`} stroke={WOOD} strokeWidth={6} />
        ))}
        {new Array(Math.floor((floor - 260) / 110)).fill(0).map((_, r) => (
          <path key={r} d={`M ${k * 270} ${260 + (r + 1) * 110} L ${k * 270 + 270} ${260 + (r + 1) * 110}`} stroke={WOOD} strokeWidth={6} />
        ))}
      </g>
    ))}
    <rect x={0} y={220} width={1080} height={50} fill={WOOD_D} stroke={INK} strokeWidth={6} />
    <rect x={0} y={floor} width={1080} height={1920 - floor} fill={TATAMI} />
    <path d={`M 0 ${floor} L 1080 ${floor}`} stroke={INK} strokeWidth={8} />
    {[0, 1, 2].map((r) => (
      <path key={r} d={`M 0 ${floor + 150 + r * 200} L 1080 ${floor + 150 + r * 200}`} stroke={TATAMI_D} strokeWidth={14} />
    ))}
    <path d={`M 540 ${floor} L 540 ${floor + 150} M 300 ${floor + 150} L 300 ${floor + 350} M 780 ${floor + 150} L 780 ${floor + 350}`} stroke={TATAMI_D} strokeWidth={14} />
    {tint > 0 ? <rect x={0} y={0} width={1080} height={1920} fill="#C8372D" opacity={tint} /> : null}
  </g>
);

// sumo ring: hanging roof edge with tassels, warm crowd, raised clay ring with straw bales
const Dohyo: React.FC<{ f: number; top: number }> = ({ f, top }) => (
  <g>
    <rect x={0} y={0} width={1080} height={1920} fill="#5A3A5E" />
    {new Array(6).fill(0).map((_, r) =>
      new Array(12).fill(0).map((__, c) => {
        const cx = c * 96 + (r % 2) * 48;
        const cy = 640 + r * 90;
        const cols = ["#F2B544", "#E85A45", "#7FB3E0", "#F4EAD5", "#3FA05C"];
        return (
          <g key={`${r}${c}`}>
            <ellipse cx={cx} cy={cy + 40} rx={40} ry={34} fill={cols[(r * 3 + c) % 5]} opacity={0.75} />
            <circle cx={cx} cy={cy + Math.sin(f / 4 + c + r) * 4} r={26} fill="#E9B98E" opacity={0.85} />
          </g>
        );
      }),
    )}
    {/* roof edge + purple drape */}
    <rect x={-20} y={430} width={1120} height={60} fill={WOOD_D} stroke={INK} strokeWidth={7} />
    <path d="M -20 490 L 1100 490 L 1100 560 Q 900 600 720 560 Q 540 600 360 560 Q 180 600 -20 560 Z" fill="#6B3FA0" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    {[[50, "#3FA05C"], [1030, "#D8372B"]].map(([tx, col], k) => (
      <g key={k} transform={`rotate(${Math.sin(f / 10 + k) * 3} ${tx} 560)`}>
        <path d={`M ${tx} 560 L ${tx} 640`} stroke={INK} strokeWidth={8} />
        <path d={`M ${(tx as number) - 34} 640 L ${(tx as number) + 34} 640 L ${(tx as number) + 44} 860 L ${(tx as number) - 44} 860 Z`} fill={col as string} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <circle cx={tx} cy={636} r={22} fill={col as string} stroke={INK} strokeWidth={6} />
      </g>
    ))}
    {/* raised clay platform */}
    <path d={`M -40 ${top} L 1120 ${top} L 1180 1920 L -100 1920 Z`} fill={CLAY} stroke={INK} strokeWidth={8} />
    <path d={`M -40 ${top} L 1120 ${top}`} stroke={CLAY_D} strokeWidth={10} />
    <ellipse cx={540} cy={top + 230} rx={640} ry={170} fill="none" stroke={INK} strokeWidth={46} />
    <ellipse cx={540} cy={top + 230} rx={640} ry={170} fill="none" stroke={STRAW} strokeWidth={32} />
    <path d={`M 470 ${top + 200} L 470 ${top + 230} M 610 ${top + 200} L 610 ${top + 230}`} stroke="#FFFFFF" strokeWidth={10} />
  </g>
);

const Speed: React.FC<{ x: number; y: number; f: number; n?: number; r?: number }> = ({ x, y, f, n = 3, r = 60 }) => (
  <g>
    {new Array(n).fill(0).map((_, k) => {
      const a = -0.9 + k * 0.6;
      const p = ((f + k * 4) % 12) / 12;
      const d0 = r + p * 30;
      return <path key={k} d={`M ${x + Math.cos(a) * d0} ${y + Math.sin(a) * d0} l ${Math.cos(a) * 34} ${Math.sin(a) * 34}`} stroke={INK} strokeWidth={8} strokeLinecap="round" opacity={1 - p} />;
    })}
  </g>
);

const Pow: React.FC<{ x: number; y: number; f: number; at?: number; size?: number; rot?: number; text: string; col?: string }> = ({ x, y, f, at = 0, size = 80, rot = -8, text, col = C.mustard }) => {
  const p = popIn(f, at, 7);
  if (p <= 0) return null;
  const wob = Math.sin(f / 2.5) * 3;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot + wob}) scale(${p})`}>
      <text x={0} y={0} textAnchor="middle" fontFamily={titleFont} fontSize={size} fill={col} stroke={INK} strokeWidth={9} paintOrder="stroke">{text}</text>
    </g>
  );
};

// big scissors, pivot at origin, blades pointing −x. open 0–1
const Scissors: React.FC<{ x: number; y: number; s?: number; open: number; rot?: number }> = ({ x, y, s = 1, open, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[-1, 1].map((d) => (
      <g key={d} transform={`rotate(${d * open * 18})`}>
        <path d={`M 0 0 L -300 ${d * -8} Q -310 ${d * 6} -290 ${d * 14} L 0 ${d * 24} Z`} fill={STEEL} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d={`M 0 ${d * 10} L 120 ${d * 60}`} stroke={INK} strokeWidth={26} strokeLinecap="round" />
        <path d={`M 0 ${d * 10} L 120 ${d * 60}`} stroke={RED} strokeWidth={14} strokeLinecap="round" />
        <ellipse cx={160} cy={d * 76} rx={50} ry={34} fill="none" stroke={INK} strokeWidth={26} />
        <ellipse cx={160} cy={d * 76} rx={50} ry={34} fill="none" stroke={RED} strokeWidth={14} />
      </g>
    ))}
    <circle cx={0} cy={0} r={14} fill={GOLD} stroke={INK} strokeWidth={5} />
  </g>
);

const Topknot: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -60 -14 L 60 -18 Q 80 0 60 18 L -60 14 Q -76 0 -60 -14 Z" fill={HAIR} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-16} y={-20} width={16} height={40} rx={3} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
    <path d="M -60 -6 L 50 -8" stroke="#4A4458" strokeWidth={4} />
  </g>
);

export const SamuraiScene: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "draw";
  let float: string[] = v.float ?? [];
  let floatAt: number[] | undefined = v.floatAt;
  let body: React.ReactNode = null;
  let headline: string | undefined = v.headline;

  if (mode === "draw") {
    // frame 0: the armoured samurai fills the frame, blade already half out and glinting; a townsman bows low in front
    const draw = 80 + 120 * ease(f, 2, 30);
    body = (
      <>
        <Street f={f} ground={1480} />
        <Samurai x={520} y={1330} s={1.12} f={f} legs="wide" grip draw={draw} glint={1} face="stern" />
        <Speed x={330} y={1060} f={f} n={4} r={70} />
        <Townsman x={150} y={1560} s={0.5} f={f} bow={0.85} arms="knees" />
        <Pow x={800} y={1010} f={f} at={10} size={84} rot={-10} text="SHING!" />
        <Petals f={f} n={9} />
      </>
    );
  } else if (mode === "street") {
    // close: hand on the hilt, the startled townsman recoils
    const draw = 30 + 30 * ease(f, dur * 0.5, dur * 0.6);
    body = (
      <>
        <Street f={f} ground={1560} />
        <Samurai x={680} y={1500} s={1.25} f={f} armour={false} legs="wide" grip draw={draw} glint={f > dur * 0.5 ? 1 : 0} face="stern" />
        <Townsman x={190} y={1440} s={0.82} f={f} bow={-0.12} arms="up" />
        <Petals f={f} n={6} />
      </>
    );
  } else if (mode === "report") {
    // the paperwork: kneel before an official, a witness points
    body = (
      <>
        <Room floor={1420} />
        <Official x={680} y={1230} s={0.92} f={f} look={f > dur * 0.6} />
        <Samurai x={300} y={1560} s={0.82} f={f} armour={false} legs="kneel" face="stern" handR={[-150, -40]} handL={[150, -40]} />
        <Townsman x={930} y={1540} s={0.5} f={f} bow={0} arms="point" flip sweat={false} coat="#7E8C5A" />
      </>
    );
  } else if (mode === "home") {
    // twenty days at home, ticking off the days – then the danger: a wrong call could cost his life
    const dangerAt = (v.dangerAt ?? 0.55) * dur;
    const danger = f >= dangerAt;
    const days = Math.min(20, Math.floor(interpolate(f, [2, dangerAt - 4], [1, 20], clamp)));
    const pulse = danger ? 0.18 + Math.sin((f - dangerAt) / 2.5) * 0.08 : 0;
    body = (
      <>
        <Room floor={1380} tint={pulse} />
        {/* day tally sheet (marks only) */}
        <g transform="translate(560 430) rotate(2)">
          <rect x={0} y={0} width={420} height={300} fill="#FFFDF4" stroke={INK} strokeWidth={7} />
          {new Array(days).fill(0).map((_, k) => {
            const grp = Math.floor(k / 5);
            const i = k % 5;
            const gx = 30 + (grp % 2) * 200;
            const gy = 40 + Math.floor(grp / 2) * 130;
            return i < 4 ? <path key={k} d={`M ${gx + i * 32} ${gy} l 0 90`} stroke={INK} strokeWidth={11} strokeLinecap="round" /> : <path key={k} d={`M ${gx - 10} ${gy + 70} L ${gx + 120} ${gy + 20}`} stroke={RED} strokeWidth={11} strokeLinecap="round" />;
          })}
        </g>
        <Samurai x={400} y={1560} s={1.05} f={f} armour={false} legs="kneel" swords={false} face={danger ? "shock" : "sulk"} handR={[-160, -40]} handL={[160, -40]} />
        {danger ? <Pow x={160} y={980} f={f} at={dangerAt + 2} size={110} rot={-12} text="?!" col="#FFFFFF" /> : null}
      </>
    );
  } else if (mode === "ban") {
    // 1876: the swords fly off the belt, then giant scissors snip the topknot
    const swordAt = (v.swordAt ?? 0.08) * dur;
    const snipAt = (v.snipAt ?? 0.6) * dur;
    const fly = ease(f, swordAt, swordAt + 14);
    const snipped = f >= snipAt;
    const sc = interpolate(f, [snipAt - 14, snipAt - 2], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
    const open = f < snipAt - 1 ? 0.5 + Math.sin(f / 2) * 0.3 : 0;
    const kf = f - snipAt;
    const bx = 540;
    const by = 1240;
    body = (
      <>
        <Street f={f} ground={1520} />
        <Samurai x={bx} y={by} s={1.0} f={f} armour={false} legs="stand" swords={false} hair={snipped ? "cropped" : "topknot"} face={snipped ? "shock" : f > swordAt + 6 ? "shock" : "calm"} handR={[-250, -170]} handL={[250, -170]} />
        {/* swords leaving the belt */}
        <g opacity={1 - ease(f, swordAt + 10, swordAt + 18)}>
          <Sword at={[bx + 116 + fly * 380, by - 16 - fly * 700]} ang={22 - fly * 200} len={300} hilt={120} f={f} />
          <Sword at={[bx + 150 + fly * 520, by + 6 - fly * 560]} ang={35 + fly * 260} len={470} hilt={200} f={f} />
        </g>
        {fly > 0 && f < swordAt + 22 ? <Speed x={bx + 260} y={by - 200} f={f} n={4} r={60} /> : null}
        {/* scissors */}
        {!snipped || kf < 10 ? <Scissors x={bx + 40 + (1 - sc) * 700 + Math.max(0, kf) * 40} y={by - 700 - (1 - sc) * 200} s={0.9} open={open} rot={-12} /> : null}
        {snipped ? <Topknot x={bx + 10 - kf * 18} y={by - 700 - kf * 22 + kf * kf * 0.9} s={1.1} rot={kf * 25} /> : null}
        {snipped && kf < 26 ? <Pow x={bx + 270} y={by - 560} f={f} at={snipAt} size={96} rot={10} text="SNIP!" /> : null}
        <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={snipped ? interpolate(kf, [0, 5], [0.7, 0], clamp) : 0} />
      </>
    );
  } else if (mode === "sumo") {
    // the cut topknot spins in the dark → flash → a sumo wrestler stomps in the ring, topknot and all
    const answerAt = (v.answerAt ?? 0.5) * dur;
    if (f >= answerAt && v.answer) headline = undefined;
    const flash = interpolate(f, [answerAt - 1, answerAt + 5], [1, 0], clamp);
    if (f < answerAt) {
      body = (
        <>
          <rect x={0} y={0} width={1080} height={1920} fill="#1C1830" />
          <path d="M 420 0 L 660 0 L 1000 1760 L 80 1760 Z" fill="#FFF3C4" opacity={0.18} />
          <ellipse cx={540} cy={1770} rx={460} ry={90} fill="#FFF3C4" opacity={0.3} />
          <Topknot x={540} y={1060 + Math.sin(f / 5) * 20} s={3.2} rot={Math.sin(f / 7) * 25} />
          {[0, 1, 2].map((k) => (
            <Pow key={k} x={[220, 860, 540][k]} y={[860, 900, 1400][k] + Math.sin(f / 4 + k) * 12} f={f} at={k * 6} size={[120, 100, 90][k]} rot={[-12, 10, 4][k]} text="?" col={C.cream} />
          ))}
        </>
      );
    } else {
      const lf = f - answerAt;
      const cyc = lf % 34;
      const lift = cyc < 12 ? ease(cyc, 0, 12) : cyc < 17 ? 1 - ease(cyc, 12, 17) : 0;
      const dust = cyc >= 17 && cyc < 27 ? (cyc - 17) / 10 : -1;
      body = (
        <>
          <Dohyo f={f} top={1330} />
          <Rikishi x={540} y={1290} s={0.92} f={f} lift={lift} />
          {dust >= 0
            ? [-1, 1].map((d) => <ellipse key={d} cx={540 + d * (300 + dust * 160)} cy={1760 - dust * 40} rx={60 + dust * 60} ry={30 + dust * 20} fill="#F4EAD5" opacity={0.8 * (1 - dust)} />)
            : null}
          <Pow x={860} y={1180} f={lf} at={18} size={80} rot={8} text="STOMP!" />
          <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={flash} />
        </>
      );
    }
  }

  return (
    <Backdrop sky="day" stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>{body}</svg>
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 290} size={v.size ?? 100} /> : null}
      {mode === "sumo" && v.answer ? (
        <Sequence from={Math.round((v.answerAt ?? 0.5) * dur)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 290} size={v.answerSize ?? 108} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats key={float.join("|")} items={float} f={f} dur={dur} top={v.floatTop ?? 330} at={floatAt} side={v.floatSide} />
    </Backdrop>
  );
};
