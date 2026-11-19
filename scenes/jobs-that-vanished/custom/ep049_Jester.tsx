import React from "react";
import { Easing, Sequence, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep049 Court jester – Archie Armstrong mocks kings for pay, roasts "little Laud", gets his coat pulled over his head and is
// banished … Laud later loses his head, the fool outlives him – and today the jester hosts late-night TV.
// visual: { mode: "court" | "roast" | "grace" | "fool" | "block" | "tv", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatAt?: number[] (0–1), floatTop?, floatSide?: "left" | "alt",
//           punchAt? (grace), banishAt? (fool), answer?, answerAccent?, answerAt? (tv) }
// Respectful: no mocking of bodies/disabilities; the execution is shown only as an empty block, an axe and a fallen cap.

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKIN = "#F2B88E";
const SKIN_D = "#D9946A";
const BLUSH = "#F07A6A";
const RED = "#D8372B";
const RED_D = "#9A2219";
const YEL = "#F7C534";
const YEL_D = "#C99417";
const GREEN = "#3FA05C";
const GREEN_D = "#2A6E3E";
const GOLD = "#F2B544";
const GOLD_D = "#B97F18";
const GOLD_HI = "#FFE9A6";
const HAIR = "#5A3820";
const WOOD = "#8A5A34";
const WOOD_D = "#5E3A1E";
const STONE = "#EBD3A6";
const STONE_D = "#CFB07E";
const CARPET = "#B8322A";
const BLACK = "#26221E";
const LAWN = "#FAF7EF";
const LAWN_D = "#D9D3C4";
const GREY = "#B9B4AA";
const ERMINE = "#FBF7EE";
const PURPLE = "#6B3FA0";
const SUIT = "#2B3446";
const SUIT_D = "#1B2130";

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

export const Bell: React.FC<{ x: number; y: number; r?: number; rot?: number }> = ({ x, y, r = 24, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <circle cx={0} cy={0} r={r} fill={GOLD} stroke={INK} strokeWidth={Math.max(3, r * 0.22)} />
    <path d={`M ${-r * 0.55} ${r * 0.25} L ${r * 0.55} ${r * 0.25}`} stroke={INK} strokeWidth={Math.max(2.5, r * 0.16)} strokeLinecap="round" />
    <circle cx={0} cy={r * 0.55} r={r * 0.16} fill={INK} />
    <circle cx={-r * 0.35} cy={-r * 0.35} r={r * 0.22} fill={GOLD_HI} />
  </g>
);

// three-pointed fool's cap with bells. Head centre = (0,-540). jingle = swing amplitude (deg).
export const Cap: React.FC<{ f: number; jingle?: number }> = ({ f, jingle = 6 }) => {
  const a = (k: number) => Math.sin(f / 2.6 + k * 1.7) * jingle;
  return (
    <g>
      {/* middle point (behind) */}
      <g transform={`rotate(${a(1)} 0 -650)`}>
        <path d="M -62 -650 Q -66 -900 70 -950 Q 18 -860 62 -650 Z" fill={YEL} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
        <path d="M -30 -700 Q -30 -840 40 -900" stroke={YEL_D} strokeWidth={8} fill="none" strokeLinecap="round" />
        <Bell x={78} y={-944} r={26} rot={a(1) * 2} />
      </g>
      {/* left point */}
      <g transform={`rotate(${a(0)} -60 -650)`}>
        <path d="M -112 -630 L -10 -672 Q -150 -870 -322 -650 Q -200 -718 -112 -630 Z" fill={RED} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
        <path d="M -60 -700 Q -150 -800 -260 -700" stroke={RED_D} strokeWidth={8} fill="none" strokeLinecap="round" />
        <Bell x={-326} y={-626} r={28} rot={a(0) * 2} />
      </g>
      {/* right point */}
      <g transform={`rotate(${a(2)} 60 -650)`}>
        <path d="M 112 -630 L 10 -672 Q 150 -870 322 -650 Q 200 -718 112 -630 Z" fill={GREEN} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
        <path d="M 60 -700 Q 150 -800 260 -700" stroke={GREEN_D} strokeWidth={8} fill="none" strokeLinecap="round" />
        <Bell x={326} y={-626} r={28} rot={a(2) * 2} />
      </g>
      {/* band */}
      <path d="M -116 -662 Q 0 -704 116 -662 L 120 -606 Q 0 -646 -120 -606 Z" fill={PURPLE} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      {[-80, -40, 0, 40, 80].map((k) => (
        <path key={k} d={`M ${k} ${-664 + Math.abs(k) * 0.12} l 13 20 l -13 20 l -13 -20 Z`} fill={GOLD} stroke={INK} strokeWidth={3} />
      ))}
    </g>
  );
};

export type JFace = "laugh" | "grin" | "pray" | "smug" | "shock" | "wink";
const JHead: React.FC<{ f: number; face?: JFace }> = ({ f, face = "grin" }) => {
  const talk = (Math.sin(f / 1.8) + 1) / 2;
  const eyeL = (k: number) => {
    const x = k * 34;
    if (face === "laugh") return <path key={k} d={`M ${x - 22} -548 Q ${x} -578 ${x + 22} -548`} stroke={INK} strokeWidth={9} fill="none" strokeLinecap="round" />;
    if (face === "pray") return <path key={k} d={`M ${x - 20} -556 Q ${x} -540 ${x + 20} -556`} stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />;
    if (face === "wink" && k > 0) return <path key={k} d={`M ${x - 20} -552 Q ${x} -572 ${x + 20} -552`} stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />;
    if (face === "shock")
      return (
        <g key={k}>
          <circle cx={x} cy={-556} r={20} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          <circle cx={x} cy={-554} r={9} fill={INK} />
        </g>
      );
    return (
      <g key={k}>
        <ellipse cx={x} cy={-556} rx={13} ry={17} fill={INK} />
        <circle cx={x - 4} cy={-562} r={4.5} fill="#FFFFFF" />
      </g>
    );
  };
  return (
    <g>
      {/* hair curls by the ears */}
      <circle cx={-92} cy={-560} r={30} fill={HAIR} stroke={INK} strokeWidth={6} />
      <circle cx={92} cy={-560} r={30} fill={HAIR} stroke={INK} strokeWidth={6} />
      <path d="M -94 -580 Q -100 -470 -40 -446 Q 0 -432 40 -446 Q 100 -470 94 -580 Q 92 -650 0 -652 Q -92 -650 -94 -580 Z" fill={SKIN} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <circle cx={-60} cy={-506} r={20} fill={BLUSH} opacity={0.45} />
      <circle cx={60} cy={-506} r={20} fill={BLUSH} opacity={0.45} />
      {/* brows */}
      {face === "shock" ? (
        <path d="M -56 -600 Q -34 -616 -12 -600 M 56 -600 Q 34 -616 12 -600" stroke={HAIR} strokeWidth={9} fill="none" strokeLinecap="round" />
      ) : face === "smug" || face === "wink" ? (
        <path d="M -56 -588 L -12 -596 M 56 -604 Q 34 -616 12 -598" stroke={HAIR} strokeWidth={9} fill="none" strokeLinecap="round" />
      ) : (
        <path d="M -56 -592 Q -34 -608 -12 -594 M 56 -592 Q 34 -608 12 -594" stroke={HAIR} strokeWidth={9} fill="none" strokeLinecap="round" />
      )}
      {[-1, 1].map(eyeL)}
      {/* nose */}
      <circle cx={0} cy={-526} r={15} fill="#E58A6A" stroke={INK} strokeWidth={5} />
      {/* moustache */}
      <path d="M -6 -506 Q -40 -514 -58 -494 Q -34 -500 -6 -496 Z M 6 -506 Q 40 -514 58 -494 Q 34 -500 6 -496 Z" fill={HAIR} stroke={INK} strokeWidth={3} />
      {/* mouth */}
      {face === "laugh" ? (
        <g>
          <path d={`M -54 -490 Q 0 ${-410 - talk * 14} 54 -490 Z`} fill="#7A2A26" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <path d="M -48 -489 L 48 -489 L 44 -476 Q 0 -470 -44 -476 Z" fill="#FFFFFF" />
          <ellipse cx={0} cy={-444 - talk * 4} rx={20} ry={10} fill="#E8737A" />
        </g>
      ) : null}
      {face === "grin" || face === "wink" ? <path d="M -46 -488 Q 0 -436 46 -488 Z" fill="#FFFFFF" stroke={INK} strokeWidth={6} strokeLinejoin="round" /> : null}
      {face === "smug" || face === "pray" ? <path d="M -30 -480 Q 4 -462 34 -486" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" /> : null}
      {face === "shock" ? <ellipse cx={0} cy={-470} rx={18} ry={24} fill="#7A2A26" stroke={INK} strokeWidth={5} /> : null}
      {/* goatee */}
      <path d="M -14 -444 L 0 -414 L 14 -444 Z" fill={HAIR} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
    </g>
  );
};

// fool's sceptre: a stick with a little carved jester head (stick along +x from the hand)
export const Marotte: React.FC<{ at: P; ang: number; s?: number; f: number }> = ({ at, ang, s = 1, f }) => (
  <g transform={`translate(${at[0]} ${at[1]}) rotate(${ang}) scale(${s})`}>
    <path d="M -30 0 L 250 0" stroke={INK} strokeWidth={24} strokeLinecap="round" />
    <path d="M -30 0 L 250 0" stroke={WOOD} strokeWidth={13} strokeLinecap="round" />
    {[0, 1, 2].map((k) => (
      <path key={k} d={`M 238 ${-6 + k * 6} q ${-30 - k * 10} ${30 + Math.sin(f / 3 + k) * 12} ${-60 - k * 10} ${44 + k * 6}`} stroke={[RED, YEL, GREEN][k]} strokeWidth={9} fill="none" strokeLinecap="round" />
    ))}
    <g transform="translate(296 0) rotate(90)">
      <path d="M -26 -40 Q -60 -90 -92 -54 M 0 -46 Q 0 -110 22 -122 M 26 -40 Q 60 -90 92 -54" stroke={INK} strokeWidth={30} fill="none" strokeLinecap="round" />
      <path d="M -26 -40 Q -60 -90 -92 -54" stroke={RED} strokeWidth={20} fill="none" strokeLinecap="round" />
      <path d="M 0 -46 Q 0 -110 22 -122" stroke={YEL} strokeWidth={20} fill="none" strokeLinecap="round" />
      <path d="M 26 -40 Q 60 -90 92 -54" stroke={GREEN} strokeWidth={20} fill="none" strokeLinecap="round" />
      <Bell x={-94} y={-48} r={13} />
      <Bell x={24} y={-128} r={13} />
      <Bell x={94} y={-48} r={13} />
      <circle cx={0} cy={0} r={46} fill={SKIN} stroke={INK} strokeWidth={7} />
      <circle cx={-16} cy={-6} r={6} fill={INK} />
      <circle cx={16} cy={-6} r={6} fill={INK} />
      <path d="M -20 14 Q 0 32 20 14" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
      <circle cx={0} cy={4} r={7} fill="#E58A6A" />
    </g>
  </g>
);

// curled-toe shoe with a bell (dir 1 = toe to the right)
const Shoe: React.FC<{ at: P; dir: number; col: string }> = ({ at, dir, col }) => (
  <g transform={`translate(${at[0]} ${at[1]}) scale(${dir} 1)`}>
    <path d="M -50 14 Q -56 -30 -10 -32 Q 50 -36 84 -12 Q 116 -30 108 -72 Q 136 -30 98 10 Q 40 28 -50 14 Z" fill={col} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <Bell x={108} y={-80} r={14} />
  </g>
);

// The jester. Origin = belt centre. R = viewer-left arm (yellow sleeve), L = viewer-right arm (red sleeve).
const SH_R: P = [-140, -404];
const SH_L: P = [140, -404];
export type JLegs = "stand" | "hop" | "kick" | "stride" | "none";
const JLEGS: Record<Exclude<JLegs, "none">, { r: [P, P, P]; l: [P, P, P] }> = {
  stand: { r: [[-55, 100], [-80, 340], [-92, 570]], l: [[55, 100], [80, 340], [92, 570]] },
  hop: { r: [[-55, 100], [-230, 260], [-150, 440]], l: [[55, 100], [70, 340], [80, 570]] },
  kick: { r: [[-55, 100], [-200, 330], [-330, 520]], l: [[55, 100], [150, 330], [260, 560]] },
  stride: { r: [[-55, 100], [-150, 330], [-210, 570]], l: [[55, 100], [130, 330], [200, 560]] },
};

export const Jester: React.FC<{
  x: number;
  y: number;
  s?: number;
  f: number;
  legs?: JLegs;
  handR?: P;
  elbowR?: P;
  handL?: P;
  elbowL?: P;
  face?: JFace;
  lean?: number;
  pointR?: boolean;
  pointL?: boolean;
  cap?: boolean;
  coatOver?: boolean;
  jingle?: number;
  bob?: number;
  flip?: boolean;
  suit?: boolean; // today: a late-night host's suit (still wearing the cap)
  children?: React.ReactNode; // props in hands, drawn in local coords under the hands
}> = ({ x, y, s = 1, f, legs = "stand", handR = [-260, -200], elbowR, handL = [260, -200], elbowL, face = "grin", lean = 0, pointR = false, pointL = false, cap = true, coatOver = false, jingle = 6, bob = 3, flip = false, suit = false, children }) => {
  const breathe = Math.sin(f / 10) * bob;
  const eR = elbowR ?? elbowOf(SH_R, handR, -50);
  const eL = elbowL ?? elbowOf(SH_L, handL, 50);
  const L = legs !== "none" ? JLEGS[legs] : null;
  const finger = (hand: P, elbow: P) => {
    const dx = hand[0] - elbow[0];
    const dy = hand[1] - elbow[1];
    const n = Math.hypot(dx, dy) || 1;
    const tip: P = [hand[0] + (dx / n) * 70, hand[1] + (dy / n) * 70];
    return (
      <g>
        <path d={`M ${hand[0]} ${hand[1]} L ${tip[0]} ${tip[1]}`} stroke={INK} strokeWidth={30} strokeLinecap="round" />
        <path d={`M ${hand[0]} ${hand[1]} L ${tip[0]} ${tip[1]}`} stroke={SKIN} strokeWidth={17} strokeLinecap="round" />
      </g>
    );
  };
  const sleeveR = coatOver ? LAWN : suit ? SUIT : YEL;
  const sleeveL = coatOver ? LAWN : suit ? SUIT : RED;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      {L ? (
        <g>
          <Limb a={L.l[0]} b={L.l[1]} c={L.l[2]} w={62} col={RED} />
          <Shoe at={L.l[2]} dir={1} col={YEL} />
          <Limb a={L.r[0]} b={L.r[1]} c={L.r[2]} w={62} col={YEL} />
          <Shoe at={L.r[2]} dir={-1} col={RED} />
        </g>
      ) : null}
      <g transform={`rotate(${lean} 0 0) translate(0 ${breathe})`}>
        {/* dagged hem */}
        {suit ? null : new Array(8).fill(0).map((_, k) => {
          const x0 = -128 + k * 32;
          return <path key={k} d={`M ${x0} 10 L ${x0 + 32} 10 L ${x0 + 16} 120 Z`} fill={coatOver ? LAWN : k % 2 ? YEL : RED} stroke={INK} strokeWidth={6} strokeLinejoin="round" />;
        })}
        {/* torso: counterchanged motley (or a white shirt when the coat is yanked up) */}
        <rect x={-38} y={-470} width={76} height={70} fill={SKIN_D} stroke={INK} strokeWidth={6} />
        {coatOver ? (
          <path d="M -150 -420 Q 0 -450 150 -420 L 126 14 L -126 14 Z" fill={LAWN} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
        ) : suit ? (
          <g>
            <path d="M -150 -420 Q 0 -450 150 -420 L 126 14 L -126 14 Z" fill={SUIT} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
            <path d="M -60 -440 L 0 -230 L 60 -440 Z" fill="#FFFFFF" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
            <path d="M -16 -420 L 16 -420 L 26 -300 L 0 -250 L -26 -300 Z" fill={RED} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
            <path d="M -66 -440 L -110 -330 L -60 -320 L -10 -230 M 66 -440 L 110 -330 L 60 -320 L 10 -230" stroke={SUIT_D} strokeWidth={9} fill="none" strokeLinejoin="round" />
            <path d="M 70 -300 l 50 0 l -6 22 l -38 0 Z" fill="#FFFFFF" stroke={INK} strokeWidth={4} />
          </g>
        ) : (
          <g>
            <path d="M -150 -420 Q -75 -442 0 -446 L 0 14 L -126 14 Z" fill={RED} />
            <path d="M 150 -420 Q 75 -442 0 -446 L 0 14 L 126 14 Z" fill={YEL} />
            {[[-80, -300], [-70, -130], [80, -300], [70, -130]].map(([dx, dy], k) => (
              <path key={k} d={`M ${dx} ${dy - 44} l 30 44 l -30 44 l -30 -44 Z`} fill={dx < 0 ? YEL : RED} stroke={INK} strokeWidth={4} opacity={0.9} />
            ))}
            <path d="M -150 -420 Q 0 -450 150 -420 L 126 14 L -126 14 Z" fill="none" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
            {[-330, -250, -170, -90].map((k) => (
              <circle key={k} cx={0} cy={k} r={11} fill={GOLD} stroke={INK} strokeWidth={4} />
            ))}
          </g>
        )}
        {/* belt */}
        <rect x={-134} y={-24} width={268} height={44} rx={10} fill={WOOD} stroke={INK} strokeWidth={7} />
        <rect x={-26} y={-30} width={52} height={56} rx={8} fill={GOLD} stroke={INK} strokeWidth={6} />
        {coatOver ? (
          // coat bundled over the head, flapping
          <g transform={`rotate(${Math.sin(f / 2) * 5} 0 -520)`}>
            <path d="M -170 -420 Q -210 -600 -110 -700 Q 0 -760 110 -700 Q 210 -600 170 -420 Q 0 -470 -170 -420 Z" fill={RED} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
            <path d="M 0 -740 Q 120 -700 170 -420 Q 80 -446 0 -452 Z" fill={YEL} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
            <path d="M -110 -470 Q -120 -600 -60 -680 M 60 -470 Q 80 -580 40 -690" stroke={RED_D} strokeWidth={7} fill="none" strokeLinecap="round" />
            {[-120, -40, 40, 120].map((k, i) => (
              <path key={k} d={`M ${k - 20} -436 l 20 46 l 20 -46 Z`} fill={i % 2 ? YEL : RED} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
            ))}
          </g>
        ) : (
          <g>
            {/* ruff collar with tiny bells (head drawn on top) */}
            {suit ? null : new Array(9).fill(0).map((_, k) => {
              const cx = -136 + k * 34;
              return (
                <g key={k}>
                  <path d={`M ${cx - 20} -448 L ${cx + 20} -448 L ${cx} -376 Z`} fill={k % 2 ? YEL : GREEN} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
                  {k % 2 === 0 ? <Bell x={cx} y={-372} r={10} /> : null}
                </g>
              );
            })}
            <JHead f={f} face={face} />
            {cap ? <Cap f={f} jingle={jingle} /> : null}
          </g>
        )}
        <Limb a={SH_L} b={eL} c={handL} w={66} col={sleeveL} />
        <Limb a={SH_R} b={eR} c={handR} w={66} col={sleeveR} />
        {children}
        {pointR ? finger(handR, eR) : null}
        {pointL ? finger(handL, eL) : null}
        <circle cx={handR[0]} cy={handR[1]} r={34} fill={SKIN} stroke={INK} strokeWidth={6} />
        <circle cx={handL[0]} cy={handL[1]} r={34} fill={SKIN} stroke={INK} strokeWidth={6} />
      </g>
    </g>
  );
};

// throne, origin = seat front centre
const Throne: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -250 0 L -250 -820 Q -250 -930 -150 -960 L 0 -1020 L 150 -960 Q 250 -930 250 -820 L 250 0 Z" fill={GOLD} stroke={INK} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -200 -40 L -200 -800 Q -200 -880 -120 -905 L 0 -950 L 120 -905 Q 200 -880 200 -800 L 200 -40 Z" fill={RED} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -160 -760 Q 0 -820 160 -760" stroke={RED_D} strokeWidth={10} fill="none" />
    <circle cx={0} cy={-1030} r={34} fill={GOLD} stroke={INK} strokeWidth={8} />
    <circle cx={-250} cy={-830} r={26} fill={GOLD} stroke={INK} strokeWidth={7} />
    <circle cx={250} cy={-830} r={26} fill={GOLD} stroke={INK} strokeWidth={7} />
    {/* armrests */}
    <rect x={-300} y={-150} width={110} height={70} rx={20} fill={GOLD} stroke={INK} strokeWidth={8} />
    <rect x={190} y={-150} width={110} height={70} rx={20} fill={GOLD} stroke={INK} strokeWidth={8} />
    <rect x={-280} y={-90} width={60} height={390} fill={GOLD_D} stroke={INK} strokeWidth={7} />
    <rect x={220} y={-90} width={60} height={390} fill={GOLD_D} stroke={INK} strokeWidth={7} />
    <rect x={-240} y={-20} width={480} height={70} rx={14} fill={RED_D} stroke={INK} strokeWidth={8} />
  </g>
);

export type KFace = "scowl" | "laugh" | "fume";
// seated king, origin = seat front centre (draw on top of the Throne at the same x/y/s)
const King: React.FC<{ x: number; y: number; s?: number; f: number; face?: KFace }> = ({ x, y, s = 1, f, face = "scowl" }) => {
  const shake = face === "laugh" ? Math.sin(f / 1.6) * 4 : 0;
  const red = face === "fume" ? 0.45 + Math.sin(f / 3) * 0.1 : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* robe + legs */}
      <path d="M -190 -40 L 190 -40 L 230 300 L -230 300 Z" fill={RED} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -40 -40 L -60 300 L 60 300 L 40 -40 Z" fill={ERMINE} stroke={INK} strokeWidth={6} />
      {[0, 1, 2, 3].map((k) => (
        <path key={k} d={`M ${-6 + (k % 2) * 12} ${20 + k * 70} l 6 14 l 6 -14 Z`} fill={INK} />
      ))}
      <ellipse cx={-110} cy={318} rx={70} ry={28} fill={BLACK} stroke={INK} strokeWidth={6} />
      <ellipse cx={110} cy={318} rx={70} ry={28} fill={BLACK} stroke={INK} strokeWidth={6} />
      <g transform={`translate(0 ${shake})`}>
        {/* torso */}
        <path d="M -170 -420 Q 0 -450 170 -420 L 190 -20 L -190 -20 Z" fill={PURPLE} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
        <path d="M -150 -300 Q 0 -260 150 -300" stroke={GOLD} strokeWidth={10} fill="none" />
        {/* ermine cape collar */}
        <path d="M -200 -430 Q 0 -360 200 -430 L 210 -330 Q 0 -270 -210 -330 Z" fill={ERMINE} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        {[-150, -90, -30, 30, 90, 150].map((k) => (
          <path key={k} d={`M ${k - 5} ${-350 + Math.abs(k) * 0.12} l 5 14 l 5 -14 Z`} fill={INK} />
        ))}
        {/* arms on the armrests, sceptre in the viewer-right hand */}
        <Limb a={[-170, -380]} b={[-250, -230]} c={[-230, -120]} w={64} col={PURPLE} />
        <Limb a={[170, -380]} b={[250, -230]} c={[230, -130]} w={64} col={PURPLE} />
        <path d="M 230 -120 L 290 -440" stroke={INK} strokeWidth={24} strokeLinecap="round" />
        <path d="M 230 -120 L 290 -440" stroke={GOLD} strokeWidth={13} strokeLinecap="round" />
        <circle cx={294} cy={-460} r={30} fill={GOLD} stroke={INK} strokeWidth={7} />
        <circle cx={294} cy={-460} r={11} fill={RED} />
        <circle cx={-230} cy={-120} r={32} fill={SKIN} stroke={INK} strokeWidth={6} />
        <circle cx={230} cy={-130} r={32} fill={SKIN} stroke={INK} strokeWidth={6} />
        {/* head */}
        <ellipse cx={0} cy={-520} rx={88} ry={98} fill={SKIN} stroke={INK} strokeWidth={8} />
        <ellipse cx={0} cy={-520} rx={88} ry={98} fill="#E0473A" opacity={red} />
        {/* beard */}
        <path d="M -90 -530 Q -100 -380 0 -350 Q 100 -380 90 -530 Q 50 -470 0 -476 Q -50 -470 -90 -530 Z" fill={HAIR} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -60 -490 Q -30 -506 0 -494 Q 30 -506 60 -490" stroke={INK} strokeWidth={14} fill="none" strokeLinecap="round" />
        <path d="M -60 -490 Q -30 -506 0 -494 Q 30 -506 60 -490" stroke={HAIR} strokeWidth={8} fill="none" strokeLinecap="round" />
        {face === "laugh" ? (
          <>
            <path d="M -52 -556 Q -32 -582 -12 -556 M 52 -556 Q 32 -582 12 -556" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />
            <path d="M -40 -470 Q 0 -404 40 -470 Z" fill="#7A2A26" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          </>
        ) : (
          <>
            <path d="M -62 -594 L -14 -572 M 62 -594 L 14 -572" stroke={HAIR} strokeWidth={12} strokeLinecap="round" />
            <circle cx={-34} cy={-552} r={10} fill={INK} />
            <circle cx={34} cy={-552} r={10} fill={INK} />
            <path d="M -34 -448 Q 0 -470 34 -448" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />
          </>
        )}
        <path d="M 0 -548 Q -14 -510 4 -500" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
        {/* crown */}
        <path d="M -92 -600 L -100 -720 L -50 -660 L 0 -740 L 50 -660 L 100 -720 L 92 -600 Z" fill={GOLD} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
        <rect x={-96} y={-622} width={192} height={36} rx={8} fill={GOLD_D} stroke={INK} strokeWidth={6} />
        {[-60, 0, 60].map((k, i) => (
          <circle key={k} cx={k} cy={-604} r={11} fill={[RED, GREEN, RED][i]} stroke={INK} strokeWidth={3} />
        ))}
        {face === "fume"
          ? [0, 1, 2].map((k) => {
              const p = ((f + k * 7) % 21) / 21;
              return <circle key={k} cx={(k - 1) * 140} cy={-760 - p * 120} r={26 + p * 30} fill="#FFFFFF" stroke={INK} strokeWidth={4} opacity={0.8 * (1 - p)} />;
            })
          : null}
      </g>
    </g>
  );
};

export type LFace = "scowl" | "fume" | "shock";
// Archbishop Laud (after Van Dyck: black cap and chimere, white lawn sleeves, grey moustache + small beard). Origin = belt centre.
const Laud: React.FC<{ x: number; y: number; s?: number; f: number; face?: LFace; handR?: P; handL?: P; robe?: boolean; children?: React.ReactNode }> = ({ x, y, s = 1, f, face = "scowl", handR = [-170, -150], handL = [170, -150], robe = true, children }) => {
  const red = face === "fume" ? 0.5 + Math.sin(f / 3) * 0.12 : 0;
  const shR: P = [-120, -380];
  const shL: P = [120, -380];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {robe ? <path d="M -150 0 L 150 0 L 210 560 L -210 560 Z" fill={BLACK} stroke={INK} strokeWidth={8} strokeLinejoin="round" /> : null}
      <Limb a={shR} b={[-190, -240]} c={handR} w={96} col={LAWN} />
      <Limb a={shL} b={[190, -240]} c={handL} w={96} col={LAWN} />
      <path d="M -130 -400 Q 0 -430 130 -400 L 150 30 L -150 30 Z" fill={BLACK} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -40 -400 L -30 30 M 40 -400 L 30 30" stroke="#3A3530" strokeWidth={6} />
      <rect x={-34} y={-420} width={68} height={40} fill={SKIN_D} stroke={INK} strokeWidth={6} />
      {/* white collar bands */}
      <path d="M -50 -404 L 50 -404 L 40 -350 L -40 -350 Z" fill={LAWN} stroke={INK} strokeWidth={5} />
      {children}
      {[handR, handL].map((h, k) => (
        <g key={k}>
          <ellipse cx={h[0]} cy={h[1] - 20} rx={46} ry={24} fill={BLACK} stroke={INK} strokeWidth={5} />
          <circle cx={h[0]} cy={h[1]} r={30} fill={SKIN} stroke={INK} strokeWidth={6} />
        </g>
      ))}
      {/* head */}
      <ellipse cx={0} cy={-500} rx={80} ry={92} fill={SKIN} stroke={INK} strokeWidth={8} />
      <ellipse cx={0} cy={-500} rx={80} ry={92} fill="#E0473A" opacity={red} />
      <path d="M -82 -510 Q -100 -470 -78 -440 M 82 -510 Q 100 -470 78 -440" stroke={GREY} strokeWidth={18} fill="none" strokeLinecap="round" />
      <path d="M -84 -540 Q 0 -660 84 -540 Q 0 -580 -84 -540 Z" fill={BLACK} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      {face === "shock" ? (
        <>
          <circle cx={-30} cy={-506} r={16} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          <circle cx={30} cy={-506} r={16} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          <circle cx={-30} cy={-506} r={6} fill={INK} />
          <circle cx={30} cy={-506} r={6} fill={INK} />
        </>
      ) : (
        <>
          <path d="M -58 -540 L -12 -520 M 58 -540 L 12 -520" stroke={GREY} strokeWidth={11} strokeLinecap="round" />
          <circle cx={-30} cy={-504} r={9} fill={INK} />
          <circle cx={30} cy={-504} r={9} fill={INK} />
        </>
      )}
      <path d="M 0 -500 Q -12 -470 4 -462" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d="M -4 -450 Q -40 -458 -58 -436 Q -30 -444 -4 -440 Z M 4 -450 Q 40 -458 58 -436 Q 30 -444 4 -440 Z" fill={GREY} stroke={INK} strokeWidth={3} />
      {face === "shock" ? <ellipse cx={0} cy={-424} rx={14} ry={18} fill="#7A2A26" stroke={INK} strokeWidth={4} /> : <path d="M -26 -418 Q 0 -434 26 -418" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />}
      <path d="M -16 -410 L 0 -380 L 16 -410 Z" fill={GREY} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {face === "fume"
        ? [0, 1].map((k) => {
            const p = ((f + k * 9) % 18) / 18;
            return <circle key={k} cx={(k ? 1 : -1) * 100} cy={-620 - p * 100} r={22 + p * 26} fill="#FFFFFF" stroke={INK} strokeWidth={4} opacity={0.85 * (1 - p)} />;
          })
        : null}
    </g>
  );
};

// great hall: warm stone wall, two tall sunlit windows, crown banners, red carpet floor
const Hall: React.FC<{ floor: number; f: number }> = ({ floor, f }) => (
  <g>
    <rect x={0} y={0} width={1080} height={floor} fill={STONE} />
    {new Array(Math.ceil(floor / 110)).fill(0).map((_, r) => (
      <g key={r}>
        <path d={`M 0 ${r * 110} L 1080 ${r * 110}`} stroke={STONE_D} strokeWidth={5} />
        {[0, 1, 2, 3].map((k) => (
          <path key={k} d={`M ${k * 300 + (r % 2) * 150 + 60} ${r * 110} l 0 110`} stroke={STONE_D} strokeWidth={5} />
        ))}
      </g>
    ))}
    {[180, 900].map((cx, i) => (
      <g key={i}>
        <path d={`M ${cx - 110} ${floor - 520} L ${cx - 110} 560 Q ${cx} 430 ${cx + 110} 560 L ${cx + 110} ${floor - 520} Z`} fill="#BFE6F2" stroke={INK} strokeWidth={8} />
        <path d={`M ${cx} 470 L ${cx} ${floor - 520} M ${cx - 110} 760 L ${cx + 110} 760`} stroke={INK} strokeWidth={7} />
        <path d={`M ${cx - 70} ${floor - 560} L ${cx - 30} 620`} stroke="#FFFFFF" strokeWidth={12} opacity={0.7} strokeLinecap="round" />
      </g>
    ))}
    {[400, 680].map((bx, i) => {
      const wave = Math.sin(f / 9 + i) * 6;
      return (
        <g key={i}>
          <path d={`M ${bx - 80} 380 L ${bx + 80} 380 L ${bx + 80 + wave} 820 L ${bx} 760 L ${bx - 80 + wave} 820 Z`} fill={RED} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          <rect x={bx - 96} y={366} width={192} height={24} rx={8} fill={GOLD} stroke={INK} strokeWidth={5} />
          <path d={`M ${bx - 44} 600 L ${bx - 50} 520 L ${bx - 22} 556 L ${bx} 500 L ${bx + 22} 556 L ${bx + 50} 520 L ${bx + 44} 600 Z`} fill={GOLD} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        </g>
      );
    })}
    <rect x={0} y={floor} width={1080} height={1920 - floor} fill="#C99A62" />
    <path d={`M 0 ${floor} L 1080 ${floor}`} stroke={INK} strokeWidth={8} />
    <path d={`M 300 ${floor} L 780 ${floor} L 1080 1920 L 0 1920 Z`} fill={CARPET} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d={`M 330 ${floor + 20} L 750 ${floor + 20} L 1020 1920 M 60 1920 L 330 ${floor + 20}`} stroke={GOLD} strokeWidth={8} fill="none" />
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

// banquet table front (tabletop line at y)
const Table: React.FC<{ y: number; f: number }> = ({ y, f }) => (
  <g>
    <rect x={-20} y={y} width={1120} height={1920 - y} fill="#F4EBD6" stroke={INK} strokeWidth={8} />
    {new Array(8).fill(0).map((_, k) => (
      <path key={k} d={`M ${k * 150 + 40} ${y + 30} Q ${k * 150 + 70} ${y + 300} ${k * 150 + 40} 1920`} stroke={LAWN_D} strokeWidth={8} fill="none" />
    ))}
    <rect x={-20} y={y - 18} width={1120} height={40} fill={WOOD} stroke={INK} strokeWidth={7} />
    {/* roast bird */}
    <g transform={`translate(560 ${y - 18})`}>
      <ellipse cx={0} cy={-6} rx={150} ry={26} fill="#E9E4DA" stroke={INK} strokeWidth={6} />
      <path d="M -110 -20 Q -110 -130 0 -136 Q 110 -130 110 -20 Z" fill="#C9772F" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -60 -100 Q -20 -120 20 -110" stroke="#F0B062" strokeWidth={10} fill="none" strokeLinecap="round" />
      <path d="M 96 -60 L 150 -96" stroke={INK} strokeWidth={26} strokeLinecap="round" />
      <path d="M 96 -60 L 150 -96" stroke="#C9772F" strokeWidth={16} strokeLinecap="round" />
      <circle cx={158} cy={-102} r={16} fill={LAWN} stroke={INK} strokeWidth={5} />
      {[0, 1].map((k) => {
        const p = ((f + k * 12) % 24) / 24;
        return <path key={k} d={`M ${-30 + k * 60} ${-150 - p * 90} q 12 -18 0 -36 q -12 -18 0 -36`} stroke="#FFFFFF" strokeWidth={7} fill="none" strokeLinecap="round" opacity={0.7 * (1 - p)} />;
      })}
    </g>
    {/* goblets + grapes + candle */}
    {[160, 960].map((gx, i) => (
      <g key={i} transform={`translate(${gx} ${y - 18})`}>
        <path d="M -40 -150 L 40 -150 Q 40 -80 0 -76 Q -40 -80 -40 -150 Z" fill={GOLD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M 0 -76 L 0 -16 M -30 0 L 30 0" stroke={INK} strokeWidth={10} strokeLinecap="round" />
        <path d="M 0 -76 L 0 -16 M -30 0 L 30 0" stroke={GOLD} strokeWidth={5} strokeLinecap="round" />
      </g>
    ))}
    {[[300, 0], [330, 0], [315, -26], [345, -26], [330, -52]].map(([gx, gy], k) => (
      <circle key={k} cx={gx} cy={y - 34 + gy} r={17} fill={PURPLE} stroke={INK} strokeWidth={4} />
    ))}
    <g transform={`translate(800 ${y - 18})`}>
      <rect x={-18} y={-150} width={36} height={150} fill={LAWN} stroke={INK} strokeWidth={5} />
      <path d={`M 0 ${-156} q ${-18 + Math.sin(f / 2) * 4} -30 0 -62 q 18 30 0 62 Z`} fill={GOLD} stroke={INK} strokeWidth={4} />
    </g>
  </g>
);

// the new prayer book, smoking, pages flying (centre at origin)
const Book: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[0, 1, 2].map((k) => {
      const p = ((f + k * 8) % 24) / 24;
      return <circle key={k} cx={(k - 1) * 60 + Math.sin(f / 4 + k) * 10} cy={-120 - p * 160} r={30 + p * 40} fill="#8E8A84" stroke={INK} strokeWidth={4} opacity={0.75 * (1 - p)} />;
    })}
    {[0, 1, 2].map((k) => {
      const p = ((f + k * 9) % 27) / 27;
      const dx = (k - 1) * 240 * p;
      return (
        <g key={`pg${k}`} transform={`translate(${dx} ${-80 - p * 260}) rotate(${p * 300 * (k % 2 ? 1 : -1)})`} opacity={1 - p}>
          <rect x={-36} y={-46} width={72} height={92} fill={LAWN} stroke={INK} strokeWidth={4} />
          <path d="M -22 -24 L 22 -24 M -22 -4 L 22 -4 M -22 16 L 12 16" stroke={GREY} strokeWidth={5} />
        </g>
      );
    })}
    <rect x={-120} y={-80} width={240} height={160} rx={12} fill={RED_D} stroke={INK} strokeWidth={8} />
    <path d="M 0 -80 L 0 80" stroke="#6E1810" strokeWidth={8} />
    <path d="M -60 -40 L -60 40 M -84 -14 L -36 -14 M 60 -40 L 60 40 M 36 -14 L 84 -14" stroke={GOLD} strokeWidth={9} strokeLinecap="round" />
  </g>
);

// Tower Hill: the White Tower behind, an empty scaffold with block + axe, the fallen black cap
const TowerHill: React.FC<{ f: number; ground: number }> = ({ f, ground }) => (
  <g>
    <rect x={0} y={0} width={1080} height={ground} fill="#CFE3EC" />
    <g transform={`translate(${780} ${ground - 380})`} opacity={0.9}>
      <rect x={-200} y={-380} width={400} height={380} fill="#E8DFCB" stroke="#7E8C99" strokeWidth={8} />
      {[-200, 200].map((tx) => (
        <g key={tx}>
          <rect x={tx - 50} y={-470} width={100} height={470} fill="#E8DFCB" stroke="#7E8C99" strokeWidth={8} />
          <path d={`M ${tx - 50} -470 Q ${tx} -580 ${tx + 50} -470 Z`} fill="#A9B8C4" stroke="#7E8C99" strokeWidth={6} />
          <path d={`M ${tx} -560 L ${tx} -610`} stroke="#7E8C99" strokeWidth={6} />
        </g>
      ))}
      {[-110, 0, 110].map((k) => (
        <path key={k} d={`M ${k - 18} -200 L ${k - 18} -260 Q ${k} -290 ${k + 18} -260 L ${k + 18} -200 Z`} fill="#7E8C99" />
      ))}
    </g>
    {[0, 1, 2].map((k) => (
      <path key={k} transform={`translate(${200 + k * 160 + ((f * 1.5 + k * 80) % 300)} ${300 + k * 50})`} d="M -26 0 Q -12 -14 0 0 Q 12 -14 26 0" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
    ))}
    <rect x={0} y={ground} width={1080} height={1920 - ground} fill="#8DB86A" />
    <path d={`M 0 ${ground} L 1080 ${ground}`} stroke={INK} strokeWidth={7} />
    {/* scaffold */}
    <g transform={`translate(760 ${ground + 90})`}>
      <rect x={-300} y={-60} width={600} height={60} fill={WOOD} stroke={INK} strokeWidth={8} />
      {[-260, -80, 100, 260].map((k) => (
        <rect key={k} x={k - 18} y={0} width={36} height={260} fill={WOOD_D} stroke={INK} strokeWidth={6} />
      ))}
      <path d="M -300 -40 L 300 -40" stroke={WOOD_D} strokeWidth={5} />
      {/* block + axe */}
      <path d="M -120 -60 L -110 -170 L 110 -170 L 120 -60 Z" fill="#A87A4C" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -40 -170 Q 0 -140 40 -170" stroke={INK} strokeWidth={8} fill="#7A5432" />
      <path d="M 70 -170 L 200 -420" stroke={INK} strokeWidth={26} strokeLinecap="round" />
      <path d="M 70 -170 L 200 -420" stroke="#B88A55" strokeWidth={15} strokeLinecap="round" />
      <path d="M 40 -190 Q 30 -250 80 -260 L 120 -200 Q 90 -170 40 -190 Z" fill="#C9D0DA" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      {/* the black cap on the boards */}
      <path d="M -250 -60 Q -190 -140 -130 -60 Z" fill={BLACK} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    </g>
  </g>
);

// late-night studio: city skyline backdrop, ON AIR + APPLAUSE signs
const Studio: React.FC<{ f: number; desk: number }> = ({ f, desk }) => {
  const blink = Math.sin(f / 4) > -0.3 ? 1 : 0.35;
  return (
    <g>
      <defs>
        <linearGradient id="ep049sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#141A3A" />
          <stop offset="100%" stopColor="#3B3F8E" />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={1080} height={desk} fill="url(#ep049sky)" />
      <circle cx={880} cy={520} r={60} fill="#FFF3C4" opacity={0.9} />
      {[[0, 260], [120, 380], [230, 300], [330, 460], [460, 340], [560, 420], [690, 300], [800, 440], [930, 330]].map(([bx, h], k) => (
        <g key={k}>
          <rect x={bx} y={desk - 120 - h} width={110} height={h + 120} fill={k % 2 ? "#232A56" : "#2C3466"} stroke="#141A3A" strokeWidth={4} />
          {new Array(Math.floor(h / 60)).fill(0).map((_, r) =>
            [0, 1].map((c) => ((k + r + c) % 3 ? <rect key={`${r}${c}`} x={bx + 20 + c * 44} y={desk - 100 - h + r * 60} width={24} height={30} fill="#FFD983" opacity={0.85} /> : null)),
          )}
        </g>
      ))}
      <rect x={0} y={desk - 140} width={1080} height={140} fill="#1A1F3F" opacity={0.6} />
      {/* signs */}
      <g transform="translate(820 610)">
        <rect x={-190} y={-52} width={380} height={104} rx={14} fill={blink > 0.5 ? "#E8402F" : "#7A2A26"} stroke={INK} strokeWidth={7} />
        <text x={0} y={22} textAnchor="middle" fontFamily={titleFont} fontSize={62} fill={C.cream}>APPLAUSE</text>
      </g>
      <g transform="translate(180 620)">
        <rect x={-120} y={-40} width={240} height={80} rx={40} fill={INK} stroke="#E8402F" strokeWidth={6} />
        <circle cx={-76} cy={0} r={18} fill="#FF4A3A" opacity={blink} />
        <text x={18} y={18} textAnchor="middle" fontFamily={titleFont} fontSize={44} fill={C.cream}>ON AIR</text>
      </g>
    </g>
  );
};

// TV monitor showing a crowned, fuming cartoon leader
const Monitor: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-200} y={-150} width={400} height={300} rx={20} fill="#1B1F2E" stroke={INK} strokeWidth={9} />
    <rect x={-176} y={-126} width={352} height={252} rx={10} fill="#9ED3E6" />
    <circle cx={0} cy={20} r={80} fill={SKIN} stroke={INK} strokeWidth={6} />
    <circle cx={0} cy={20} r={80} fill="#E0473A" opacity={0.35 + Math.sin(f / 3) * 0.1} />
    <path d="M -64 -50 L -72 -120 L -34 -86 L 0 -136 L 34 -86 L 72 -120 L 64 -50 Z" fill={GOLD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -46 -10 L -12 4 M 46 -10 L 12 4" stroke={INK} strokeWidth={8} strokeLinecap="round" />
    <circle cx={-28} cy={20} r={8} fill={INK} />
    <circle cx={28} cy={20} r={8} fill={INK} />
    <path d="M -26 66 Q 0 48 26 66" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
    <rect x={-60} y={150} width={120} height={50} fill="#1B1F2E" stroke={INK} strokeWidth={6} />
  </g>
);

// open doorway with daylight (right side), for the banishment
const Door: React.FC<{ x: number; floor: number }> = ({ x, floor }) => (
  <g>
    <path d={`M ${x - 170} ${floor} L ${x - 170} ${floor - 600} Q ${x} ${floor - 760} ${x + 170} ${floor - 600} L ${x + 170} ${floor} Z`} fill="#FFF3C4" stroke={INK} strokeWidth={9} />
    <path d={`M ${x - 170} ${floor} L ${x - 170} ${floor - 600} L ${x - 300} ${floor - 640} L ${x - 300} ${floor + 40} Z`} fill={WOOD} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    <circle cx={x - 270} cy={floor - 300} r={14} fill={GOLD} stroke={INK} strokeWidth={4} />
    <path d={`M ${x - 140} ${floor} L ${x + 140} ${floor} L ${x + 300} 1920 L ${x - 300} 1920 Z`} fill="#FFF3C4" opacity={0.45} />
  </g>
);

const Ha: React.FC<{ x: number; y: number; f: number; at?: number; size?: number; rot?: number; text?: string }> = ({ x, y, f, at = 0, size = 80, rot = -8, text = "HA!" }) => {
  const p = popIn(f, at, 7);
  if (p <= 0) return null;
  const wob = Math.sin(f / 2.5) * 4;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot + wob}) scale(${p})`}>
      <text x={0} y={0} textAnchor="middle" fontFamily={titleFont} fontSize={size} fill={C.mustard} stroke={INK} strokeWidth={9} paintOrder="stroke">{text}</text>
    </g>
  );
};

export const CourtJester: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "court";
  let float: string[] = v.float ?? [];
  let floatAt: number[] | undefined = v.floatAt;
  let sky: "day" | "paper" = "paper";
  let body: React.ReactNode = null;
  let headline: string | undefined = v.headline;

  if (mode === "court") {
    // frame 0: the jester mid-hop, laughing, pointing at a scowling king, marotte waving, bells flying
    const hop = Math.abs(Math.sin(f / 5)) * 34;
    const fume = f > dur * 0.62;
    body = (
      <>
        <Hall floor={1520} f={f} />
        <Throne x={850} y={1190} s={0.7} />
        <King x={850} y={1190} s={0.7} f={f} face={fume ? "fume" : "scowl"} />
        <Jester x={370} y={1390 - hop} s={1.0} f={f} legs="hop" face="laugh" jingle={11} handR={[-270, -560]} handL={[330, -440]} pointL lean={Math.sin(f / 5) * 3}>
          <Marotte at={[-270, -560]} ang={-78 + Math.sin(f / 3) * 14} s={1.0} f={f} />
        </Jester>
        <Speed x={370 + 60} y={1390 - hop - 470} f={f} r={150} />
        <Ha x={150} y={1060} f={f} at={2} size={86} rot={-12} />
        <Ha x={620} y={1210} f={f} at={14} size={70} rot={10} text="HA HA!" />
      </>
    );
  } else if (mode === "roast") {
    // close-up: shaking the belled cap → hand cupped to the mouth, shouting the truth; the king behind is laughing
    const shout = f > dur * (v.shoutAt ?? 0.55);
    const jig = Math.sin(f / 1.6) * 26;
    body = (
      <>
        <Hall floor={1640} f={f} />
        <Throne x={870} y={1160} s={0.5} />
        <King x={870} y={1160} s={0.5} f={f} face="laugh" />
        <Jester x={500} y={1570} s={1.3} f={f} legs="stand" face={shout ? "laugh" : "grin"} jingle={shout ? 7 : 16} handR={shout ? [-240, -300] : [-300 + jig * 0.4, -640 + jig]} elbowR={shout ? [-250, -170] : [-300, -420]} handL={shout ? [96, -478] : [200, -80]} elbowL={shout ? [230, -330] : [260, -260]} />
        {shout ? <Speed x={500 + 170 * 1.3} y={1570 - 480 * 1.3} f={f} n={4} r={40} /> : null}
        {!shout ? <Speed x={500 - 360 * 1.3} y={1570 - 700 * 1.3} f={f} n={3} r={50} /> : null}
      </>
    );
  } else if (mode === "grace") {
    // hands folded, eyes shut, saying grace … then the punchline: pointing at the archbishop, who fumes
    const punchAt = (v.punchAt ?? 0.55) * dur;
    const punch = f >= punchAt;
    body = (
      <>
        <Hall floor={1500} f={f} />
        <Laud x={820} y={1530} s={0.98} f={f} robe={false} face={punch ? "fume" : "scowl"} handR={[-150, -170]} handL={[150, -170]} />
        <Jester
          x={370}
          y={1545}
          s={1.05}
          f={f}
          legs="none"
          face={punch ? "laugh" : "pray"}
          jingle={punch ? 12 : 2}
          handR={punch ? [-260, -330] : [-26, -300]}
          elbowR={punch ? [-250, -170] : [-190, -230]}
          handL={punch ? [280, -450] : [26, -300]}
          elbowL={punch ? [200, -330] : [190, -230]}
          pointL={punch}
        />
        <Table y={1400} f={f} />
        {punch ? <Ha x={190} y={1010} f={f} at={punchAt + 2} size={80} rot={-12} /> : null}
      </>
    );
  } else if (mode === "fool") {
    // "Who's fool now?" at the smoking prayer book → coat yanked over his head, out of the door
    const banishAt = (v.banishAt ?? 0.6) * dur;
    if (f < banishAt) {
      floatAt = v.floatAt;
      body = (
        <>
          <Hall floor={1520} f={f} />
          <Laud x={770} y={1250} s={0.85} f={f} face="fume" handR={[-70, -200]} handL={[70, -200]}>
            <Book x={0} y={-230} s={0.85} f={f} />
          </Laud>
          <Jester x={320} y={1360} s={0.95} f={f} legs="stride" face="wink" jingle={10} handR={[-160, -60]} elbowR={[-270, -230]} handL={[300, -440]} pointL lean={-4} />
          <Ha x={180} y={960} f={f} at={dur * 0.3} size={74} rot={-10} />
        </>
      );
    } else {
      const lf = f - banishAt;
      const walk = ease(lf, 0, dur - banishAt);
      float = v.float2 ?? [];
      floatAt = (v.float2At ?? []).map((t: number) => t);
      body = (
        <>
          <Hall floor={1520} f={f} />
          <Door x={850} floor={1520} />
          <Laud x={190} y={1300} s={0.62} f={f} face="scowl" handR={[-150, -150]} handL={[290, -330]} />
          <g transform="translate(330 1760) rotate(-24) scale(0.55) translate(0 540)">
            <Cap f={f} jingle={0} />
          </g>
          <Jester x={520 + walk * 240} y={1390 + Math.abs(Math.sin(lf / 3)) * -16} s={0.9} f={f} legs={Math.sin(lf / 3) > 0 ? "stride" : "stand"} coatOver handR={[-250, -620 + Math.sin(lf / 2) * 50]} elbowR={[-300, -420]} handL={[250, -640 + Math.cos(lf / 2) * 50]} elbowL={[300, -430]} lean={6} />
          <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={interpolate(lf, [0, 6], [0.9, 0], clamp)} />
        </>
      );
    }
  } else if (mode === "block") {
    // Tower Hill: an empty block, the axe, the fallen black cap – and the fool, very much alive
    sky = "day";
    const wink = f > dur * (v.winkAt ?? 0.55);
    body = (
      <>
        <TowerHill f={f} ground={1360} />
        <Jester x={250} y={1420} s={0.95} f={f} legs="stand" face={wink ? "wink" : "smug"} jingle={wink ? 12 : 4} handR={[-170, -60]} elbowR={[-280, -240]} handL={[250, -560]}>
          <Marotte at={[250, -560]} ang={-70 + Math.sin(f / 4) * 10} s={0.9} f={f} />
        </Jester>
      </>
    );
  } else if (mode === "tv") {
    // spotlight on the old jester → (answer) a late-night host at his desk, still wearing the cap, roasting a crowned leader on screen
    const answerAt = (v.answerAt ?? 0.5) * dur;
    if (f >= answerAt && v.answer) headline = undefined;
    const flash = interpolate(f, [answerAt - 1, answerAt + 5], [1, 0], clamp);
    if (f < answerAt) {
      const bow = ease(f, 0, answerAt * 0.7);
      body = (
        <>
          <rect x={0} y={0} width={1080} height={1920} fill="#1C1830" />
          <path d="M 440 0 L 640 0 L 1000 1760 L 80 1760 Z" fill="#FFF3C4" opacity={0.22} />
          <ellipse cx={540} cy={1770} rx={460} ry={90} fill="#FFF3C4" opacity={0.35} />
          <Jester x={540} y={1300} s={0.95} f={f} legs="stand" face="grin" jingle={8} lean={-14 * bow} handR={[-320 + 60 * bow, -380 + 240 * bow]} handL={[260, -420]}>
            <Marotte at={[260, -420]} ang={-60} s={0.9} f={f} />
          </Jester>
        </>
      );
    } else {
      const lf = f - answerAt;
      body = (
        <>
          <Studio f={f} desk={1390} />
          <Monitor x={850} y={1060} s={0.85} f={f} />
          <Jester x={380} y={1520} s={1.0} f={f} legs="none" suit face="laugh" jingle={10} handR={[-200, -150]} elbowR={[-260, -280]} handL={[250, -430]} pointL>
            <g transform="translate(-200 -150) rotate(-14)">
              <rect x={-40} y={-90} width={80} height={110} rx={6} fill="#7FB3E0" stroke={INK} strokeWidth={5} />
            </g>
          </Jester>
          {/* desk */}
          <path d="M 40 1390 L 1040 1390 L 990 1920 L 90 1920 Z" fill={WOOD} stroke={INK} strokeWidth={9} strokeLinejoin="round" />
          <rect x={40} y={1376} width={1000} height={36} rx={10} fill={WOOD_D} stroke={INK} strokeWidth={7} />
          <rect x={120} y={1520} width={840} height={70} fill="#2C3466" stroke={INK} strokeWidth={6} />
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <circle key={k} cx={200 + k * 136} cy={1555} r={14} fill={GOLD} opacity={Math.sin(f / 3 + k) > 0 ? 1 : 0.4} />
          ))}
          <g transform="translate(640 1376)">
            <path d="M 0 0 L 0 -90 L -40 -150" stroke={INK} strokeWidth={14} fill="none" strokeLinecap="round" />
            <rect x={-74} y={-196} width={60} height={70} rx={26} fill="#3A3F4E" stroke={INK} strokeWidth={6} transform="rotate(-30 -44 -161)" />
          </g>
          <g transform="translate(860 1376)">
            <path d="M -40 0 L -46 -90 L 46 -90 L 40 0 Z" fill={C.cream} stroke={INK} strokeWidth={6} />
            <path d="M 46 -70 Q 80 -60 44 -30" stroke={INK} strokeWidth={8} fill="none" />
          </g>
          <Ha x={720} y={830} f={lf} at={4} size={70} rot={8} text="HA HA!" />
          <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={flash} />
        </>
      );
    }
  }

  return (
    <Backdrop sky={sky} stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>{body}</svg>
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 290} size={v.size ?? 100} /> : null}
      {mode === "tv" && v.answer ? (
        <Sequence from={Math.round((v.answerAt ?? 0.5) * dur)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 290} size={v.answerSize ?? 108} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats key={float.join("|")} items={float} f={f} dur={dur} top={v.floatTop ?? 330} at={floatAt} side={v.floatSide} />
    </Backdrop>
  );
};
