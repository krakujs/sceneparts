import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Backdrop, Sky } from "../kit/Backdrop";
import { Street, STREET_GROUND } from "../kit/Street";
import { Figure, FigureSpec } from "../kit/Figure";
import { Icon } from "../kit/Icons";
import { Headline, Tag, Typewriter } from "../kit/Text";
import { C, bodyFont, titleFont, typeFont } from "../theme";
import { CUSTOM } from "../custom/registry";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const pop = (f: number, d = 10) => interpolate(f, [0, d], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) });

import type { SceneProps } from "./types";
export type { SceneProps };
import { Versus, Timeline, Desk } from "./extra";
import { Photo } from "./photo";

const FIG_Y = STREET_GROUND + 70;

// ---------- hook ----------
const Hook: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const fig: FigureSpec = v.figure ?? { prop: "pole", action: "walk" };
  return (
    <Backdrop sky={(v.sky as Sky) ?? "night"}>
      <Street scroll={f * 2} lit={v.lit ?? "none"} tint={0.45} />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Figure {...fig} x={interpolate(f, [0, dur], [-120, 760])} y={FIG_Y} scale={0.78} walking />
      </svg>
      <Headline text={v.headline ?? scene.narration} accent={v.accent ?? scene.highlight ?? []} top={v.top ?? 360} size={v.size ?? 104} />
    </Backdrop>
  );
};

// ---------- setting ----------
const Setting: React.FC<SceneProps> = ({ scene }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  return (
    <Backdrop sky={(v.sky as Sky) ?? "night"}>
      <AbsoluteFill style={{ scale: interpolate(f, [0, 200], [1.12, 1.0], clamp) }}>
        <Street scroll={300 + f * 1.2} lit={v.lit ?? "random"} tint={v.sky === "day" ? 0 : 0.4} lampsLit={v.sky !== "day"} />
      </AbsoluteFill>
      <Typewriter text={[v.place, v.year].filter(Boolean).join(" · ")} top={250} />
      {v.icon ? (
        <div style={{ position: "absolute", left: 540, top: 820, translate: "-50% 0", scale: pop(f - 8, 12) }}>
          <Icon name={v.icon} size={200} />
        </div>
      ) : null}
    </Backdrop>
  );
};

// ---------- worker (character walks the street doing the job) ----------
const Worker: React.FC<SceneProps> = ({ scene }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const fig: FigureSpec = v.figure ?? { prop: "pole", action: "tap" };
  const speed = v.speed ?? 3;
  const figX = v.x ?? 330;
  return (
    <Backdrop sky={(v.sky as Sky) ?? "night"}>
      <Street scroll={f * speed} lit={v.lit ?? "behind"} litX={figX + 120} tint={0.42} lampsLit={v.lampsLit ?? true} />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Figure {...fig} x={figX} y={FIG_Y} scale={v.scale ?? 0.78} walking={v.walking ?? speed > 0} />
      </svg>
      {v.tag ? <Tag text={v.tag} x={figX + 60} y={v.tagY ?? 760} /> : null}
    </Backdrop>
  );
};

// ---------- stat (count-up number) ----------
const Stat: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const val = interpolate(f, [4, Math.min(dur * 0.6, 40)], [Number(v.from ?? 0), Number(v.value ?? 0)], { ...clamp, easing: Easing.out(Easing.cubic) });
  const shown = Number.isInteger(Number(v.value)) ? (v.plain ? String(Math.round(val)) : Math.round(val).toLocaleString("en-GB")) : val.toFixed(1);
  return (
    <Backdrop sky={(v.sky as Sky) ?? "paper"}>
      {v.icon ? (
        <div style={{ position: "absolute", left: 540, top: 300, translate: `-50% ${Math.sin(f / 8) * 8}px`, scale: pop(f, 12), rotate: `${Math.sin(f / 12) * 4}deg` }}>
          <Icon name={v.icon} size={260} />
        </div>
      ) : null}
      <div style={{ position: "absolute", top: 600, left: 60, right: 120, textAlign: "center", fontFamily: titleFont, fontSize: v.size ?? 230, color: C.brick, WebkitTextStroke: `10px ${C.ink}`, paintOrder: "stroke fill", textShadow: "0 14px 0 rgba(0,0,0,0.25)" }}>
        {v.prefix ?? ""}
        {shown}
        {v.suffix ?? ""}
      </div>
      {v.label ? (
        <div style={{ position: "absolute", top: 900, left: 80, right: 160, textAlign: "center", fontFamily: typeFont, fontSize: 54, color: C.ink, opacity: pop(f - 14, 8) }}>{v.label}</div>
      ) : null}
    </Backdrop>
  );
};

// ---------- fact (icon + optional chips) ----------
const Fact: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const items: string[] = v.items ?? [];
  const sky = (v.sky as Sky) ?? "paper";
  const light = sky === "paper" || sky === "day";
  return (
    <Backdrop sky={sky} moon={false} fog={false}>
      {v.title ? <Headline text={v.title} top={260} size={84} color={light ? C.ink : C.cream} accent={v.accent ?? []} /> : null}
      <div style={{ position: "absolute", left: 540, top: v.title ? 520 : 380, translate: "-50% 0", scale: pop(f, 12), rotate: `${Math.sin(f / 10) * 5}deg` }}>
        <Icon name={v.icon ?? "question"} size={v.iconSize ?? 340} />
      </div>
      <div style={{ position: "absolute", top: 960, left: 80, right: 160, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        {items.map((it, i) => {
          const at = (i + 1) * (dur / (items.length + 2));
          return (
            <div key={i} style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 48, color: C.ink, background: C.cream, border: `5px solid ${C.ink}`, borderRadius: 18, padding: "12px 28px", boxShadow: "0 8px 0 rgba(0,0,0,0.3)", opacity: interpolate(f - at, [0, 5], [0, 1], clamp), scale: pop(f - at, 10) }}>
              {it}
            </div>
          );
        })}
      </div>
    </Backdrop>
  );
};

// ---------- twist (the big question) ----------
const Twist: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const ansAt = (v.answerAt ?? 0.5) * dur;
  return (
    <Backdrop sky="dark" stars moon={false} fog={false}>
      <div style={{ position: "absolute", left: 540, top: 250, translate: "-50% 0", scale: pop(f, 14), rotate: `${interpolate(f, [0, 14], [-30, 0], clamp) + Math.sin(f / 9) * 4}deg` }}>
        <Icon name="question" size={360} />
      </div>
      <Headline text={v.question ?? ""} top={680} size={92} accent={v.accent ?? []} />
      {v.answer ? (
        <div style={{ position: "absolute", top: 1010, left: 90, right: 170, textAlign: "center", fontFamily: typeFont, fontSize: 52, color: C.glow, opacity: interpolate(f - ansAt, [0, 8], [0, 1], clamp), translate: `0px ${interpolate(f - ansAt, [0, 10], [30, 0], clamp)}px` }}>
          {v.answer}
        </div>
      ) : null}
    </Backdrop>
  );
};

// ---------- modern (phone that replaced the job) ----------
const Modern: React.FC<SceneProps> = ({ scene }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const ring = f > 6 && f < 70 ? Math.sin(f * 2.2) * 5 : 0;
  return (
    <Backdrop sky="modern" stars={false} moon={false} fog={false}>
      {[0, 1, 2].map((k) => {
        const p = ((f + k * 12) % 36) / 36;
        return <div key={k} style={{ position: "absolute", left: 540, top: 760, width: 420, height: 420, translate: "-50% -50%", borderRadius: "50%", border: `6px solid ${C.mustard}`, opacity: (1 - p) * 0.6, scale: 1 + p * 1.2 }} />;
      })}
      <div style={{ position: "absolute", left: 540, top: 760, translate: "-50% -50%", rotate: `${ring}deg`, scale: pop(f, 12) }}>
        <div style={{ width: 420, height: 820, borderRadius: 64, background: "#0B0B12", border: "10px solid #2B2B3A", boxShadow: "0 40px 80px rgba(0,0,0,0.6)", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 120, boxSizing: "border-box" }}>
          <div style={{ fontFamily: bodyFont, fontWeight: 500, fontSize: 34, color: "#C9C6E8", letterSpacing: 2 }}>{v.label ?? "Alarm"}</div>
          <div style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 150, color: "#fff", marginTop: 10 }}>{v.time ?? "6:00"}</div>
          {v.sublabel ? <div style={{ fontFamily: bodyFont, fontWeight: 500, fontSize: 32, color: "#C9C6E8" }}>{v.sublabel}</div> : null}
          <div style={{ marginTop: "auto", marginBottom: 90, display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>
            <div style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 40, color: C.ink, background: C.mustard, borderRadius: 999, padding: "20px 70px", scale: interpolate(f, [40, 46, 52], [1, 0.9, 1], clamp) }}>{v.button ?? "Snooze"}</div>
            <div style={{ fontFamily: bodyFont, fontWeight: 500, fontSize: 32, color: "#8E8AB8" }}>{v.button2 ?? "Stop"}</div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
};

// ---------- stamp (VANISHED) ----------
const Stamp: React.FC<SceneProps> = ({ scene, ep, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const at = (v.stampAt ?? 0.3) * dur;
  const hit = f - at;
  const shake = hit > 0 && hit < 8 ? Math.sin(hit * 3) * (8 - hit) : 0;
  const fig: FigureSpec = v.figure ?? { prop: "pole", action: "idle" };
  // endCard (W44 review, 1 Nov 2026): optional follow banner after the stamp – card slides up, banner pops in below it.
  const ec = ep.endCard;
  const ecF = ec ? f - (ec.at ?? 0.6) * dur : -1;
  const shrink = ec ? interpolate(ecF, [0, 8], [1, 0.82], { ...clamp, easing: Easing.out(Easing.quad) }) : 1;
  return (
    <Backdrop sky="paper" moon={false} fog={false}>
      <AbsoluteFill style={{ translate: `${shake}px ${shake * 0.6}px`, scale: shrink, transformOrigin: "540px 280px" }}>
        <div style={{ position: "absolute", left: 140, right: 200, top: 280, height: 920, background: C.cream, border: `8px solid ${C.ink}`, borderRadius: 24, boxShadow: "0 20px 0 rgba(0,0,0,0.25)", rotate: "-2deg", overflow: "hidden" }}>
          <div style={{ fontFamily: typeFont, fontSize: 40, color: C.sepia, textAlign: "center", marginTop: 40, letterSpacing: 6 }}>OCCUPATION</div>
          <div style={{ fontFamily: titleFont, fontSize: (v.job ?? ep.job).length > 14 ? 74 : 92, color: C.ink, textAlign: "center", marginTop: 10, lineHeight: 1.05, padding: "0 30px" }}>{v.job ?? ep.job}</div>
          <div style={{ fontFamily: typeFont, fontSize: 44, color: C.sepia, textAlign: "center", marginTop: 16 }}>{v.years ?? ep.years}</div>
          <svg width={740} height={620} style={{ position: "absolute", left: 0, bottom: 0, filter: "sepia(0.9) saturate(0.7)" }}>
            <Figure {...fig} x={v.figureX ?? 300} y={600} scale={v.figureScale ?? 0.68} walking={false} />
          </svg>
        </div>
        <div style={{ position: "absolute", left: 540, top: 1030, translate: "-50% -50%", rotate: "-12deg", opacity: hit > 0 ? 1 : 0, scale: interpolate(hit, [0, 5], [2.6, 1], { ...clamp, easing: Easing.in(Easing.quad) }), fontFamily: titleFont, fontSize: 130, color: C.brick, border: `14px solid ${C.brick}`, borderRadius: 26, padding: "6px 40px", mixBlendMode: "multiply", letterSpacing: 6 }}>
          VANISHED
        </div>
      </AbsoluteFill>
      {ec && ec.poll && ecF >= 0 ? (
        // W45 review (8 Nov 2026): poll answer card – the Would-you question gets an on-screen answer to comment/tag (0 shares on 18 reels).
        <div style={{ position: "absolute", left: 100, right: 160, top: 1040, background: C.mustard, border: `8px solid ${C.ink}`, borderRadius: 26, boxShadow: "0 12px 0 rgba(0,0,0,0.25)", padding: "20px 24px 22px", rotate: "1.2deg", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, translate: `0 ${interpolate(ecF, [0, 9], [300, 0], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) })}px` }}>
          <div style={{ fontFamily: titleFont, fontSize: (ec.poll.ask ?? "SO… WOULD YOU?").length > 18 ? 48 : 58, color: C.ink, lineHeight: 1.0, textAlign: "center" }}>{ec.poll.ask ?? "SO… WOULD YOU?"}</div>
          <div style={{ display: "flex", gap: 22, width: "100%", justifyContent: "center" }}>
            {[ec.poll.yes ?? "YES", ec.poll.no ?? "NO WAY"].map((label, k) => {
              const pf = ecF - 6 - k * 8; // second pill pops 8 frames after the first
              const pulse = Math.floor(Math.max(0, ecF - 24) / 18) % 2 === k ? 1.08 : 1; // alternating "tap" pulse
              return (
                <div key={k} style={{ flex: 1, maxWidth: 360, textAlign: "center", fontFamily: bodyFont, fontWeight: 900, fontSize: label.length > 10 ? 36 : 44, color: C.cream, background: k === 0 ? "#2E7D4F" : C.brick, border: `6px solid ${C.ink}`, borderRadius: 999, padding: "14px 18px", whiteSpace: "nowrap", opacity: pf > 0 ? 1 : 0, scale: pf > 0 ? pop(pf, 8) * pulse : 0 }}>{label}</div>
              );
            })}
          </div>
          {ec.poll.tag !== "" ? <div style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 30, color: C.ink, lineHeight: 1.15, textAlign: "center", opacity: interpolate(ecF, [22, 30], [0, 1], clamp) }}>{ec.poll.tag ?? "Comment YES or NO · tag the friend who'd say YES"}</div> : null}
        </div>
      ) : ec && ecF >= 0 ? (
        <div style={{ position: "absolute", left: 110, right: 170, top: 1070, minHeight: 170, background: C.mustard, border: `8px solid ${C.ink}`, borderRadius: 26, boxShadow: "0 12px 0 rgba(0,0,0,0.25)", display: "flex", alignItems: "center", gap: 22, padding: "18px 26px", rotate: "1.5deg", translate: `0 ${interpolate(ecF, [0, 9], [260, 0], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) })}px` }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: titleFont, fontSize: (ec.text ?? "A NEW VANISHED JOB DAILY").length > 16 ? 50 : 62, color: C.ink, lineHeight: 1.0 }}>{ec.text ?? "A NEW VANISHED JOB DAILY"}</div>
            {ec.sub !== "" ? <div style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 30, color: C.ink, marginTop: 8, lineHeight: 1.15 }}>{ec.sub ?? "Follow so you don't miss tomorrow's"}</div> : null}
          </div>
          <div style={{ fontFamily: bodyFont, fontWeight: 900, fontSize: 40, color: C.cream, background: C.brick, border: `6px solid ${C.ink}`, borderRadius: 999, padding: "14px 26px", whiteSpace: "nowrap", scale: interpolate(ecF % 30, [0, 6, 12], [1, 1.08, 1], clamp) }}>+ FOLLOW</div>
        </div>
      ) : null}
    </Backdrop>
  );
};

// ---------- outro ----------
const Outro: React.FC<SceneProps> = ({ scene }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  return (
    <Backdrop sky="night" fog={false}>
      <Street scroll={600 + f} lit="all" tint={0.5} />
      <div style={{ position: "absolute", top: 330, left: 80, right: 160, textAlign: "center", fontFamily: titleFont, fontSize: 120, lineHeight: 1.0, color: C.mustard, WebkitTextStroke: `12px ${C.ink}`, paintOrder: "stroke fill", scale: pop(f, 12) }}>
          JOBS THAT VANISHED
      </div>
      <div style={{ position: "absolute", top: 640, left: 80, right: 160, textAlign: "center", fontFamily: bodyFont, fontWeight: 900, fontSize: 64, color: C.cream, WebkitTextStroke: `10px ${C.ink}`, paintOrder: "stroke fill", opacity: pop(f - 10, 8) }}>
        {v.cta ?? "Follow for more"}
      </div>
      {v.next ? (
        <div style={{ position: "absolute", top: 800, left: 540, translate: "-50% 0", fontFamily: typeFont, fontSize: 46, color: C.ink, background: C.cream, border: `5px solid ${C.ink}`, borderRadius: 14, padding: "12px 30px", whiteSpace: "nowrap", rotate: "-2deg", opacity: pop(f - 22, 8), scale: pop(f - 22, 12) }}>
          Next: {v.next}
        </div>
      ) : null}
    </Backdrop>
  );
};

const Custom: React.FC<SceneProps> = (p) => {
  const Comp = CUSTOM[p.scene.visual.component as string];
  if (!Comp) return <Backdrop sky="dark"><Headline text={`Missing custom: ${p.scene.visual.component}`} /></Backdrop>;
  return <Comp {...p} />;
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  hook: Hook,
  setting: Setting,
  worker: Worker,
  stat: Stat,
  fact: Fact,
  twist: Twist,
  modern: Modern,
  stamp: Stamp,
  outro: Outro,
  versus: Versus,
  timeline: Timeline,
  desk: Desk,
  photo: Photo,
  custom: Custom,
};

// Where captions sit by default for each scene type (avoids covering the main visual).
export const CAPTION_POS: Record<string, "low" | "high" | "mid"> = {
  hook: "low",
  setting: "high",
  worker: "high",
  stat: "low",
  fact: "low",
  twist: "low",
  modern: "low",
  stamp: "low",
  outro: "low",
  versus: "low",
  timeline: "low",
  desk: "low",
  photo: "low",
  custom: "low",
};

// Scenes whose on-screen text already shows the narration.
export const CAPTIONS_OFF_BY_DEFAULT = new Set(["hook", "stamp", "outro", "versus"]);
