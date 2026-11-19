import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { taper } from "../quadruped/index";

// Flat vector reptile generator: lizard, crocodile, snake, turtle or coiled snake, side view.
// Origin = ground under the body (bottom centre), faces right, honours flip. Sizes are px at s = 1.
// Body = ellipse (lizard / croc / turtle shell) or a row of circles along a wave (snake).
// Limbs and tails are tapered tubes (taper helper from quadruped). Solid fills, no outlines, one darker shade.
// Poses: stand, walk (legs swing from f), slither (snake wave travels from f), idle (breathing, blink, tongue flick), raised (head up).

export type RBody = "lizard" | "croc" | "snake" | "turtle" | "coil";
export type RPose = "stand" | "walk" | "slither" | "idle" | "raised";
export type RPattern = "none" | "spots" | "bands" | "diamonds" | "stripes" | "scales";
export type RRidge = "none" | "spikes" | "plates";
export type RSnout = "round" | "long" | "broad" | "pointed";
export type RShell = "none" | "dome" | "flat" | "sea";

export type ReptileSpec = {
  body?: RBody; pose?: RPose; len?: number; bodyH?: number; head?: number; snout?: number; snoutShape?: RSnout;
  tailLen?: number; tailCurl?: boolean; legLen?: number; legW?: number; toes?: "normal" | "pads"; color?: string; belly?: string;
  back?: string; pattern?: RPattern; patternColor?: string; ridge?: RRidge; dewlap?: string; casque?: boolean; hood?: boolean;
  eyeSize?: number; eyeBulge?: boolean; teeth?: boolean; tongue?: boolean; shell?: RShell; shellColor?: string; plateColor?: string;
};

type P2 = [number, number];
const rad = (d: number) => (d * Math.PI) / 180;
const sm = (t: number) => { const u = Math.max(0, Math.min(1, t)); return u * u * (3 - 2 * u); };
const fmt = (v: number) => v.toFixed(1);

/** Head: snout taper, round head, eye(s), optional teeth, tongue, casque and dewlap. Faces right; (hx, hy) is the head centre. */
function headParts(o: {
  hx: number; hy: number; hr: number; sn: number; shape: RSnout; col: string; dk: string; eyeK: number; blink: boolean;
  teeth: boolean; tongue: string | false; casque: boolean; dewlap: string; eyeBulge: boolean; patC: string; oval?: boolean;
}) {
  const { hx, hy, hr, sn, shape, col, dk, eyeK, blink, teeth, tongue, casque, dewlap, eyeBulge } = o;
  const w0 = shape === "broad" ? hr * 1.7 : shape === "long" ? hr * 1.0 : shape === "pointed" ? hr * 1.2 : hr * 1.5;
  const w1 = shape === "broad" ? hr * 1.5 : shape === "long" ? hr * 0.62 : shape === "pointed" ? hr * 0.2 : hr * 0.9;
  const tip: P2 = [hx + hr * 0.45 + sn, hy + hr * 0.12];
  const ex = hx + hr * 0.32, ey = hy - hr * 0.22, er = hr * 0.27 * eyeK;
  const tongueLen = tongue === false ? 0 : hr * 0.35 + hr * 1.5 * Number(tongue === "flick");
  return (
    <g>
      {dewlap !== "none" && <ellipse cx={hx + hr * 0.2} cy={hy + hr * 0.75} rx={hr * 0.42} ry={hr * 0.6} fill={dewlap} />}
      {casque && <ellipse cx={hx - hr * 0.35} cy={hy - hr * 0.78} rx={hr * 0.85} ry={hr * 0.32} fill={dk} transform={`rotate(-12 ${fmt(hx - hr * 0.35)} ${fmt(hy - hr * 0.78)})`} />}
      {eyeBulge && (
        <g>
          <circle cx={ex - hr * 0.15} cy={ey - hr * 0.32} r={er * 1.35} fill={col} />
          <circle cx={ex + hr * 0.3} cy={ey - hr * 0.32} r={er * 1.35} fill={col} />
        </g>
      )}
      {tongue !== false && tongueLen > 0 && (
        <g fill={C.red} transform={`translate(${fmt(tip[0])} ${fmt(tip[1])})`}>
          <rect x={0} y={-hr * 0.04} width={tongueLen * 0.7} height={hr * 0.08} rx={hr * 0.04} />
          <path d={`M ${fmt(tongueLen * 0.6)} 0 L ${fmt(tongueLen)} ${fmt(-hr * 0.2)} L ${fmt(tongueLen * 0.92)} 0 L ${fmt(tongueLen)} ${fmt(hr * 0.2)} Z`} />
        </g>
      )}
      {taper([hx, hy], [hx + hr * 0.4 + sn * 0.5, hy + hr * 0.02], tip, w0, w1, col, "snout")}
      {o.oval ? <ellipse cx={hx} cy={hy} rx={hr * 1.15} ry={hr * 0.78} fill={col} /> : <circle cx={hx} cy={hy} r={hr} fill={col} />}
      {teeth && Array.from({ length: 6 }, (_, i) => {
        const t = 0.25 + i * 0.12, bx = hx + hr * 0.45 + sn * t, half = (w0 + (w1 - w0) * t) / 2;
        const by2 = hy + hr * 0.12 * t + half * 0.92;
        return <path key={i} d={`M ${fmt(bx - hr * 0.09)} ${fmt(by2 - hr * 0.02)} L ${fmt(bx)} ${fmt(by2 - hr * 0.2)} L ${fmt(bx + hr * 0.09)} ${fmt(by2 - hr * 0.02)} Z`} fill={C.white} />;
      })}
      <g transform={blink ? `translate(${fmt(ex)} ${fmt(ey)}) scale(1 0.12) translate(${fmt(-ex)} ${fmt(-ey)})` : undefined}>
        <circle cx={ex} cy={ey} r={er} fill={C.white} />
        <circle cx={ex + er * 0.25} cy={ey} r={er * 0.6} fill={C.ink} />
        <circle cx={ex + er * 0.05} cy={ey - er * 0.3} r={er * 0.2} fill={C.white} />
      </g>
    </g>
  );
}

const hexPath = (cx: number, cy: number, r: number) => {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) { const a = rad(60 * i + 30); pts.push(`${fmt(cx + Math.cos(a) * r)} ${fmt(cy + Math.sin(a) * r)}`); }
  return `M ${pts.join(" L ")} Z`;
};

export function Reptile(p: PartProps<any> & ReptileSpec) {
  const f = p.f ?? 0, s = p.s ?? 1, body: RBody = p.body ?? "lizard", pose: RPose = p.pose ?? "stand";
  const L = p.len ?? 260, bh0 = p.bodyH ?? 56, hr = p.head ?? 44, sn = p.snout ?? 34, shape: RSnout = p.snoutShape ?? "round";
  const tailLen = p.tailLen ?? 120, curl = !!p.tailCurl, legL0 = p.legLen ?? 80;
  const col = p.color ?? "#7BC05A", dk = shade(col, 0.2), farC = shade(col, 0.18);
  const bel = p.belly ?? "none", backC = p.back ?? "none", patC = p.patternColor ?? C.ink, pat: RPattern = p.pattern ?? "none";
  const ridge: RRidge = p.ridge ?? "none", ridgeC = backC !== "none" ? backC : dk;
  const eyeK = p.eyeSize ?? 1, dewlap = p.dewlap ?? "none", tongueOn = !!p.tongue;
  const flip = !!p.flip, x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1560;
  const idle = pose === "idle", walk = pose === "walk", raised = pose === "raised";
  const blink = idle && f % 120 < 5;
  const flick = (idle || pose === "slither") ? Math.pow(Math.max(0, Math.sin(f * 0.22)), 10) : 0;
  const breathe = 1 + Math.sin(f / 12) * 0.012;
  const tonguePart: string | false = tongueOn ? (flick > 0.05 ? "flick" : "still") : false;
  const parts: React.ReactNode[] = [];
  const sh = <ellipse cx={0} cy={0} rx={L * 0.5} ry={Math.max(8, L * 0.03)} fill={C.shadow} />;

  if (body === "snake" || body === "coil") {
    const bh = bh0;
    const r = bh / 2;
    if (body === "snake") {
      // Wave along the ground. Slither moves the wave toward the head (right) using f.
      const waves = 1.5, A = bh * 1.5, ph = pose === "slither" ? -f * 0.2 : 0;
      const raise = pose === "raised" ? hr * 2.2 : 0;
      const N = 64, spine: [number, number, number][] = [];
      for (let i = 0; i <= N; i++) {
        const t = i / N, sx = -L / 2 + t * L;
        const wave = -r - A * (0.5 + 0.5 * Math.sin(2 * Math.PI * waves * t + ph));
        const lift = -raise * sm((t - 0.82) / 0.18);
        const w = (r) * (t < 0.22 ? 0.3 + 0.7 * (t / 0.22) : 1);
        spine.push([sx, wave + lift + (idle ? Math.sin(f / 14 - t * 3) * 1.5 : 0), w]);
      }
      const [hx, hy, hw] = spine[N];
      const headY = hy - (hw * 0.05);
      parts.push(
        <g key="snake">
          {spine.map(([sx, sy, w], i) => <circle key={"b" + i} cx={sx} cy={sy} r={w} fill={col} />)}
          {pat !== "none" && spine.filter((_, i) => i % 6 === 3).map(([sx, sy, w], i) => (
            pat === "spots" ? <circle key={"p" + i} cx={sx} cy={sy} r={w * 0.35} fill={patC} /> :
            pat === "stripes" ? <rect key={"p" + i} x={sx - w * 0.2} y={sy - w * 0.95} width={w * 0.4} height={w * 1.9} fill={patC} /> :
            <ellipse key={"p" + i} cx={sx} cy={sy} rx={w * 0.7} ry={w * 0.95} fill={patC} />
          ))}
          {bel !== "none" && spine.map(([sx, sy, w], i) => <circle key={"bb" + i} cx={sx} cy={sy + w * 0.5} r={w * 0.55} fill={bel} />)}
          {headParts({ hx: hx + hr * 0.25, hy: headY - hr * 0.05, hr, sn, shape, col, dk, eyeK, blink, teeth: !!p.teeth, tongue: tonguePart, casque: false, dewlap, eyeBulge: false, patC })}
        </g>
      );
    } else {
      // coiled snake: stacked loops with the head raised on top, optional cobra hood
      const loops = [0, 1, 2];
      const rings = loops.map((k) => {
        const rx = L * 0.3 * (1 - 0.1 * k);
        const cy = -bh * 0.55 - k * bh * 0.9;
        return <ellipse key={k} cx={0} cy={cy} rx={rx} ry={bh * 0.38} fill="none" stroke={k === 1 ? farC : col} strokeWidth={bh * 0.72} />;
      });
      const topY = -bh * 0.55 - 2 * bh * 0.9;
      const rise = raised ? 1 : 0.5;
      const hx = L * 0.12, hy = topY - bh * 0.55 - hr * 1.8 * rise;
      parts.push(
        <g key="coil">
          {rings}
          <path d={`M ${fmt(L * 0.2)} ${fmt(topY + bh * 0.3)} Q ${fmt(L * 0.2)} ${fmt(hy + hr * 1.2)} ${fmt(hx)} ${fmt(hy)}`} stroke={col} strokeWidth={bh * 0.55} fill="none" strokeLinecap="round" />
          {p.hood && <ellipse cx={hx - hr * 0.45} cy={hy - hr * 0.1} rx={hr * 1.05} ry={hr * 1.45} fill={dk} />}
          {headParts({ hx, hy, hr, sn, shape, col, dk, eyeK, blink, teeth: !!p.teeth, tongue: tonguePart, casque: false, dewlap, eyeBulge: false, patC })}
        </g>
      );
    }
  } else if (body === "turtle") {
    const legL = legL0, by0 = -legL, shH = bh0, lw = p.legW || 26;
    const sea = p.shell === "sea";
    const ph = walk ? f * 0.2 : 0, swing = (o: number) => Math.sin(ph + o) * (walk ? 10 : 0);
    const flat = p.shell === "flat" || sea;
    const shellRy = flat ? shH * 0.5 : shH;
    const shellPath = flat
      ? <ellipse cx={0} cy={by0 - shellRy * 0.5} rx={L * 0.5} ry={shellRy} fill={p.shellColor ?? col} />
      : <path d={`M ${fmt(-L / 2)} ${fmt(by0)} A ${fmt(L / 2)} ${fmt(shellRy)} 0 0 1 ${fmt(L / 2)} ${fmt(by0)} Z`} fill={p.shellColor ?? col} />;
    const plates: React.ReactNode[] = [];
    if (p.shell !== "sea") {
      const pr = L * 0.075, pc = p.plateColor ?? shade(p.shellColor ?? col, 0.3);
      const cyBase = flat ? by0 - shellRy * 0.5 : by0;
      for (let row = -3; row <= 3; row++) for (let c = -4; c <= 4; c++) {
        const cx = c * pr * 1.75 + (row % 2) * pr * 0.9, cy = cyBase - Math.abs(row) * pr * 1.5 * (flat ? 0.6 : 1) - (flat ? 0 : pr * 0.2);
        const k = (cx / (L * 0.5)) ** 2 + ((cy - cyBase) / shellRy) ** 2;
        if (k < 0.55 && cy < by0 - 2) plates.push(<path key={`${row}-${c}`} d={hexPath(cx, cy, pr * 0.82)} fill={pc} />);
      }
    }
    const fx = L * 0.28, rx2 = -L * 0.28;
    const limb = (hx: number, dir: number, o: number, far: boolean, key: string) => {
      const c = far ? farC : col;
      if (sea) {
        const tipX = hx + dir * L * 0.2 + swing(o), tipY = by0 + legL * 0.4 + swing(o) * 0.3;
        return <g key={key}>{taper([hx, by0 - 6], [hx + dir * L * 0.14, by0 + legL * 0.05], [tipX, tipY], lw * 1.5, lw * 0.6, c)}</g>;
      }
      return <g key={key}>{taper([hx, by0 + 8], [hx + dir * 6, -legL * 0.5], [hx + dir * 18 + swing(o), -lw * 0.5], lw, lw * 0.8, c)}</g>;
    };
    const tailT = taper([-L * 0.46, by0 - shellRy * 0.3], [-L * 0.6, by0 - shellRy * 0.1], [-L * 0.5 - tailLen * 0.4, by0 - shellRy * 0.12], 10, 4, col);
    const nx = L * 0.42, ny = by0 - shellRy * 0.25, HX = L * 0.5 + hr * 0.7, HY = by0 - shellRy * (raised ? 0.85 : 0.6);
    parts.push(
      <g key="turtle">
        {sh}
        {!sea && <g>{limb(rx2, -1, Math.PI, true, "bf")}{limb(fx, 1, 0, true, "ff")}</g>}
        {tailT}
        {!sea && limb(rx2, -1, 0, false, "bn")}
        {limb(fx, 1, Math.PI, false, "fn")}
        {sea && <g>{limb(rx2, -1, 0, false, "bn")}{limb(fx, 1, 0, false, "fn")}</g>}
        {taper([nx, ny], [nx + hr * 0.6, (ny + HY) / 2], [HX - hr * 0.2, HY], shH * 0.36 * 0.9, hr * 1.2, col)}
        {headParts({ hx: HX, hy: HY, hr, sn: sn * 0.6, shape: "round", col, dk, eyeK, blink, teeth: false, tongue: tonguePart, casque: false, dewlap, eyeBulge: false, patC })}
        {shellPath}
        {plates}
        {pat === "spots" && <ellipse cx={-L * 0.1} cy={by0 - shellRy * 0.5} rx={L * 0.06} ry={shellRy * 0.2} fill={patC} />}
      </g>
    );
  } else {
    // lizard and crocodile: horizontal body, four legs, neck and head
    const croc = body === "croc";
    const bh = croc ? bh0 * 0.82 : bh0;
    const legL = croc ? Math.min(legL0, 46) : legL0;
    const lw = p.legW || Math.max(14, bh * 0.3);
    const ry = bh / 2, rxB = L / 2;
    const bob = walk ? Math.abs(Math.sin(f * 0.22)) * 3 : 0;
    const by = -(legL + ry) + ry * 0.1 - bob;
    const ph = walk ? f * 0.22 : 0, amp = walk ? 16 : 0;
    const sw = (o: number) => Math.sin(ph + o) * amp;
    const spread = croc ? 0.42 : 0.3;
    const hipY = by + ry * 0.15;
    const legs = (far: boolean) => {
      const c = far ? farC : col;
      const specs: [number, number, number][] = far ? [[L * 0.3, 1, Math.PI], [-L * 0.3, -1, 0]] : [[L * 0.3, 1, 0], [-L * 0.3, -1, Math.PI]];
      return specs.map(([hx, dir, o], i) => {
        const a: P2 = [hx, hipY], k: P2 = [hx + dir * legL * spread, -legL * 0.55], b: P2 = [hx + dir * legL * (spread + 0.3) + sw(o), -lw * 0.5];
        const toe = p.toes === "pads" ? <g>{[-1, 0, 1].map((j) => <ellipse key={j} cx={b[0] + dir * lw * 0.4 + j * lw * 0.32} cy={-lw * 0.3 + Math.abs(j) * 2} rx={lw * 0.3} ry={lw * 0.24} fill="#E9F2C4" />)}</g> : null;
        return <g key={(far ? "f" : "n") + i}>{taper(a, k, b, lw, lw * 0.7, c)}{toe}</g>;
      });
    };
    // tail
    const TA: P2 = [-rxB + L * 0.06, by + ry * 0.1];
    const tw = croc ? bh * 0.42 : bh * 0.4;
    const TE: P2 = curl ? [-rxB - tailLen * 0.3, by - tailLen * 0.75] : [-rxB - tailLen, by + tailLen * 0.14];
    const TC: P2 = curl ? [-rxB - tailLen * 0.7, by - tailLen * 0.05] : [-rxB - tailLen * 0.6, by - tailLen * 0.05];
    const tail = taper(TA, TC, TE, tw, Math.max(4, tw * 0.22), col, "tail", true);
    // neck and head
    const raisedK = raised ? 1 : 0;
    const HX = croc ? rxB + hr * 0.25 + sn * 0.25 : rxB + hr * 0.2 + (raised ? 0 : 0);
    const HY = by - ry * (croc ? 0.15 : 0.1) - raisedK * ry * 1.1 - (idle ? Math.sin(f / 18) * 2 : 0);
    const N0: P2 = [L * 0.36, by - ry * 0.2];
    const neck = croc ? null : taper(N0, [L * 0.48, (N0[1] + HY) / 2], [HX - hr * 0.2, HY], bh * 0.62, hr * 1.2, col, "neck", true);
    const dorsal = backC !== "none" ? <path d={`M ${fmt(-rxB * 0.9)} ${fmt(by - ry * 0.7)} Q 0 ${fmt(by - ry * 1.25)} ${fmt(rxB * 0.9)} ${fmt(by - ry * 0.7)} L ${fmt(rxB * 0.9)} ${fmt(by - ry * 0.45)} Q 0 ${fmt(by - ry * 0.95)} ${fmt(-rxB * 0.9)} ${fmt(by - ry * 0.45)} Z`} fill={backC} /> : null;
    const ridgeEls: React.ReactNode[] = [];
    if (ridge === "spikes") for (let i = 0; i < 11; i++) {
      const xx = -rxB * 0.82 + (i * rxB * 1.64) / 10, t = xx / rxB, top = by - ry * Math.sqrt(Math.max(0, 1 - t * t));
      ridgeEls.push(<path key={i} d={`M ${fmt(xx - bh * 0.1)} ${fmt(top + ry * 0.12)} L ${fmt(xx)} ${fmt(top - bh * 0.3 * (1 - Math.abs(t) * 0.4))} L ${fmt(xx + bh * 0.1)} ${fmt(top + ry * 0.12)} Z`} fill={ridgeC} />);
    }
    if (ridge === "plates") for (let i = 0; i < 14; i++) {
      const xx = -rxB * 0.85 + (i * rxB * 1.7) / 13, t = xx / rxB, top = by - ry * Math.sqrt(Math.max(0, 1 - t * t));
      ridgeEls.push(<rect key={i} x={xx - bh * 0.1} y={top - bh * 0.02} width={bh * 0.2} height={bh * 0.14} rx={bh * 0.05} fill={ridgeC} />);
    }
    const patEls: React.ReactNode[] = [];
    if (pat === "spots") SPOTS.forEach(([u, v, k], i) => patEls.push(<circle key={i} cx={u * rxB * 0.85} cy={by + v * ry * 0.6} r={bh * 0.09 * k} fill={patC} />));
    if (pat === "diamonds") for (let i = -3; i <= 3; i++) patEls.push(<rect key={i} x={-bh * 0.14} y={-bh * 0.14} width={bh * 0.28} height={bh * 0.28} transform={`translate(${fmt(i * rxB * 0.27)} ${fmt(by - ry * 0.1)}) rotate(45)`} fill={patC} />);
    if (pat === "bands") for (let i = -3; i <= 3; i++) patEls.push(<ellipse key={i} cx={i * rxB * 0.27} cy={by} rx={bh * 0.13} ry={ry * 0.92} fill={patC} />);
    if (pat === "stripes") [-0.5, -0.15, 0.2, 0.55].forEach((v, i) => patEls.push(<rect key={i} x={-rxB * 0.85} y={by + v * ry - bh * 0.04} width={rxB * 1.7} height={bh * 0.08} rx={bh * 0.04} fill={patC} />));
    if (pat === "scales") for (let i = -4; i <= 4; i++) for (let j = -1; j <= 1; j++) patEls.push(<circle key={`${i}${j}`} cx={i * rxB * 0.18 + (j ? rxB * 0.09 : 0)} cy={by + j * ry * 0.45} r={bh * 0.07} fill={patC} opacity={0.45} />);
    parts.push(
      <g key="lizard">
        {sh}
        {tail}
        {legs(true)}
        <ellipse cx={0} cy={by} rx={rxB} ry={ry * breathe} fill={col} />
        {bel !== "none" && <ellipse cx={L * 0.02} cy={by + ry * 0.5} rx={rxB * 0.78} ry={ry * 0.42} fill={bel} />}
        {dorsal}
        {patEls}
        {ridgeEls}
        {legs(false)}
        {neck}
        {dewlap !== "none" && !croc && <ellipse cx={HX} cy={HY + hr * 0.75} rx={hr * 0.42} ry={hr * 0.6} fill={dewlap} />}
        {headParts({ hx: HX, hy: HY, hr, sn: croc ? sn * 1.8 : sn, shape: croc ? (shape === "round" ? "long" : shape) : shape, col, dk, eyeK, blink, teeth: !!p.teeth, tongue: tonguePart, casque: !!p.casque, dewlap: "none", eyeBulge: !!p.eyeBulge, patC, oval: croc })}
      </g>
    );
  }

  return (
    <g transform={`translate(${fmt(x)} ${fmt(y)}) scale(${flip ? -s : s} ${s})`}>
      {parts}
    </g>
  );
}

const SPOTS: [number, number, number][] = [[-0.7, -0.3, 1], [-0.35, 0.25, 0.8], [-0.05, -0.45, 0.9], [0.3, 0.1, 1.1], [0.62, -0.32, 0.8], [-0.55, 0.55, 0.7], [0.1, 0.55, 0.75], [0.45, 0.5, 0.7], [-0.2, -0.05, 0.6], [0.75, 0.15, 0.6]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Reptile {...p} />;
}
