import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { skyColours, lit, asTime, asWeather, WeatherFx } from "../backdrop/index";

// Airplane cabin (flat-vector background): the view down the aisle from behind the seats. Large seat backs
// with headrest covers fill the lower left and right, rows recede to a vanishing point at the far bulkhead,
// overhead bins curve across the top, oval windows on both walls show the sky and weather, and seat-belt
// sign lights sit over the bulkhead. The centre stage (x 220-860, y 1300-1750) stays clear.
const VX = 540, VY = 860; // vanishing point
const xl = (q: number) => VX - VX * q, xr = (q: number) => VX + VX * q; // outer wall x at depth q
const yc = (q: number) => VY - VY * q, yf = (q: number) => VY + (1920 - VY) * q; // ceiling / floor y at depth q
const FAR = 0.3; // depth of the far bulkhead

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const seat = L(p.seat ?? C.blue), head = shade(seat, 0.25), panel = mixHex(seat, "#FFFFFF", 0.14);
  const wall = L(p.wall ?? "#EEF2F7"), wallDk = shade(wall, 0.06), ceil = L("#F7F9FB"), bin = L("#C9D3E0");
  const carpet = L("#8A97B8"), [skyTop, , skyHz] = skyColours(time, weather);
  const ft = drift ? f : 0;

  // one seat-back column at depth q, on the left (side -1) or right (side 1)
  const seatCol = (side: number, q: number, key: string) => {
    const outer = side < 0 ? xl(q) : xr(q), inner = side < 0 ? VX - 320 * q : VX + 320 * q;
    const x = Math.min(outer, inner), w = 220 * q, h = 880 * q, y = yf(q) - h, r = 40 * q;
    return (
      <g key={key}>
        <rect x={f1(x)} y={f1(y)} width={f1(w)} height={f1(h)} rx={f1(r)} fill={seat} />
        <rect x={f1(x + w * 0.12)} y={f1(y + h * 0.3)} width={f1(w * 0.76)} height={f1(h * 0.58)} rx={f1(r * 0.6)} fill={panel} />
        <rect x={f1(x + w * 0.12)} y={f1(y - h * 0.04)} width={f1(w * 0.76)} height={f1(h * 0.2)} rx={f1(r * 0.8)} fill={head} />
      </g>
    );
  };

  // an oval window on a wall at depth q: sky, weather inside the oval, a frame ring
  const win = (side: number, q: number, i: number) => {
    const cx = side < 0 ? xl(q) : xr(q), cy = yc(q) + 0.4 * (yf(q) - yc(q));
    const rx = 104 * q, ry = 156 * q, id = `ac-win-${side < 0 ? "l" : "r"}-${i}`;
    return (
      <g key={id}>
        <ellipse cx={f1(cx)} cy={f1(cy)} rx={f1(rx + 12)} ry={f1(ry + 12)} fill={C.white} />
        <clipPath id={id}><ellipse cx={f1(cx)} cy={f1(cy)} rx={f1(rx)} ry={f1(ry)} /></clipPath>
        <g clipPath={`url(#${id})`}>
          <rect x={f1(cx - rx)} y={f1(cy - ry)} width={f1(2 * rx)} height={f1(2 * ry)} fill={skyTop} />
          <rect x={f1(cx - rx)} y={f1(cy)} width={f1(2 * rx)} height={f1(ry)} fill={skyHz} />
          <WeatherFx kind={weather} f={ft + i * 13} seed={5 + i} x={Number(f1(cx - rx))} y={Number(f1(cy - ry))} w={Number(f1(2 * rx))} h={Number(f1(2 * ry))} intensity={1.2} />
        </g>
      </g>
    );
  };

  const rows = [0.13, 0.22, 0.31, 0.4]; // receding rows, all above the stage
  const blink = drift && Math.floor(f / 30) % 2 === 0;
  return (
    <g>
      {/* ceiling and curved overhead bins */}
      <rect x={0} y={0} width={1080} height={1920} fill={ceil} />
      <path d={`M 0 0 L 1080 0 L 1080 150 Q 540 250 0 150 Z`} fill={bin} />
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={f1(30 + i * 180)} y={f1(50 + Math.abs(i - 2.5) * 6)} width={150} height={14} rx={7} fill={shade(bin, 0.18)} />)}
      <ellipse cx={VX} cy={300} rx={130} ry={18} fill="#FFFFFF" opacity={0.9} />
      {/* side walls and the bulkhead at the far end */}
      <path d={`M 0 0 L ${f1(xl(FAR))} ${f1(yc(FAR))} L ${f1(xl(FAR))} ${f1(yf(FAR))} L 0 1920 Z`} fill={wall} />
      <path d={`M 1080 0 L ${f1(xr(FAR))} ${f1(yc(FAR))} L ${f1(xr(FAR))} ${f1(yf(FAR))} L 1080 1920 Z`} fill={wall} />
      <path d={`M 0 0 L ${f1(xl(FAR))} ${f1(yc(FAR))} L ${f1(xr(FAR))} ${f1(yc(FAR))} L 1080 0 Z`} fill={wallDk} opacity={0.5} />
      <rect x={f1(xl(FAR))} y={f1(yc(FAR))} width={f1(xr(FAR) - xl(FAR))} height={f1(yf(FAR) - yc(FAR))} fill={wall} />
      {/* aisle carpet running to the far end */}
      <path d={`M ${f1(xl(FAR))} ${f1(yf(FAR))} L ${f1(xr(FAR))} ${f1(yf(FAR))} L 1080 1920 L 0 1920 Z`} fill={carpet} />
      <path d={`M ${f1(VX - 60 * FAR)} ${f1(yf(FAR))} L ${f1(VX + 60 * FAR)} ${f1(yf(FAR))} L ${VX + 60} 1920 L ${VX - 60} 1920 Z`} fill={shade(carpet, 0.08)} />
      {/* oval windows on both walls */}
      {[0.9, 0.62, 0.42].map((q, i) => win(-1, q, i))}
      {[0.9, 0.62, 0.42].map((q, i) => win(1, q, i))}
      {/* seat-belt sign over the bulkhead */}
      <rect x={480} y={634} width={120} height={46} rx={8} fill={C.ink} />
      <circle cx={510} cy={657} r={9} fill={blink ? C.orange : shade(C.orange, 0.5)} />
      <circle cx={570} cy={657} r={9} fill={blink ? shade(C.red, 0.5) : C.red} />
      {/* seat rows: far to near, the nearest pair fills the lower corners */}
      {rows.map((q, i) => seatCol(-1, q, `l${i}`))}
      {rows.map((q, i) => seatCol(1, q, `r${i}`))}
      {seatCol(-1, 1, "nl")}
      {seatCol(1, 1, "nr")}
    </g>
  );
}

const f1 = (v: number) => (Math.round(v * 10) / 10).toString();
const mixHex = (a: string, b: string, t: number) => {
  const h = (s: string) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16));
  const A = h(a), B = h(b);
  return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("");
};
