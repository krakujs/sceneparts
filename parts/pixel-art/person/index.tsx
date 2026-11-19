import React from "react";
import type { PartProps } from "@sceneparts/core";
import { PAL, PX, Pixels, SKIN, HAIR, col, shade, makeGrid, fill, stamp, outlined, type Grid, type PixelMap } from "../style/index";

// Pixel person generator: a chunky front-facing game sprite (big head, eyes looking right) built from layers on a
// cell grid: body build, hair, hat, top, overlay (apron, hi-vis...), legs, shoes, neckwear, glasses, beard, a held
// item, back gear, an optional seat, plus free pixel-map `extra` overlays for preset details.
// Adult ≈ 41 cells × 24 px ≈ 980 px tall at s = 1. Origin = bottom centre on (x, y). Motion only from p.f.
// Role chars in maps: s/S skin, h/H hair, t/T top, i/I inner, l/L legs, z/Z shoes, a/A hat, j/J overlay,
// q/Q item / back gear; all other chars are the pixel-art palette.

type Hat = { m: string[]; ox: number; oy: number; back?: { m: string[]; ox: number; oy: number } };
const HATS: Record<string, Hat> = {
  cap: { ox: 0, oy: -2, m: ["...aaaa......", ".aaaaaaaa....", "aaaaaaaaaa...", "AAAAAAAAAAAAA"] },
  hardhat: { ox: -1, oy: -3, m: ["....aaaa....", "..aaaaaaaa..", ".aaaaAaaaaa.", ".aaaaAaaaaa.", "AAAAAAAAAAAA"] },
  minerhat: { ox: -1, oy: -3, m: ["....aaaa....", "..aaaaaawy..", ".aaaaAaawya.", ".aaaaAaaaaa.", "AAAAAAAAAAAA"] },
  beanie: { ox: 0, oy: -3, m: ["....ww....", "..aaaaaa..", ".aaaaaaaa.", "aaaaaaaaaa", "AAAAAAAAAA", "AAAAAAAAAA"] },
  chef: { ox: -1, oy: -7, m: ["...ww.ww....", "..wwwwwwww..", ".wwwwwwwwwg.", ".wwwwwwwwwg.", "..wwwwwwwg..", "..wwwwwwwg..", "..gggggggg..", "..wwwwwwww.."] },
  peaked: { ox: -1, oy: -3, m: ["..aaaaaaaa..", ".aaaaaaaaaa.", ".aaaayyaaaa.", "..AAAAAAAAA.", "......kkkkk."] },
  nurse: { ox: 0, oy: -3, m: ["..wwwww...", ".wwwrwww..", ".wwrrrww..", ".wwwrwww.."] },
  surgical: { ox: 0, oy: -1, m: ["..aaaaaa..", ".aaaaaaaaa", "aaaaaaaaaA", "AAAAAAAAA."] },
  cowboy: { ox: -3, oy: -3, m: ["......aaaa......", ".....aaaaaa.....", ".....AAAAAA.....", "AaaaaaaaaaaaaaaA", ".AAAAAAAAAAAAAA."] },
  tophat: { ox: 0, oy: -6, m: ["..aaaaaa..", "..aaaaaa..", "..aaaaaa..", "..aaaaaa..", "..AAAAAA..", "..aaaaaa..", "aaaaaaaaaa"] },
  helmet: { ox: -1, oy: -3, m: ["...aaaaaa...", "..aaaaaaaa..", ".aaaaaaaaaa.", ".aaaaaaaaaa.", "AAAAAAAAAAAA"] },
  firehelmet: { ox: -2, oy: -3, m: ["....aaaaaa....", "...aaaaaayy...", "..aaaaaaayya..", "..aaaaaaaaaa..", "AAAAAAAAAAAAA."] },
  graduation: { ox: -3, oy: -3, m: ["..aaaaaaaaaaaa..", ".AAAAAAAAAAAAAAy", "....aaaaaaaa...y", "....aaaaaaaa...y"] },
  beret: { ox: -1, oy: -3, m: ["......a.....", "...aaaaaaa..", ".aaaaaaaaaaa", "..AAAAAAAA.."] },
  witch: { ox: -3, oy: -9, m: ["..........a.....", ".........aa.....", "........aaa.....", ".......aaaa.....", "......aaaaa.....", ".....aaaaaa.....", "....aaaaaaaa....", "....yyyyyyyy....", "aaaaaaaaaaaaaaaa"] },
  crown: { ox: 1, oy: -3, m: ["y..r..y.", "yy.yy.yy", "yyyyyyyy", "yryyyryy"] },
  headset: { ox: -1, oy: -1, m: ["...dddddd...", "..d......d..", ".d........d.", ".d........d.", "kk........kk", "kk........kk", "kk........kk", "..........k.", ".........kk.", "........kk.."] },
  headscarf: { ox: -1, oy: -1, m: ["...aaaaaa...", "..aaaaaaaa..", ".aaaaaaaaaa.", ".aaaaaaaaaaA", ".aa......aaA", ".aa.......aA", ".aa.......aA", ".aa.......aA", ".aa.......aA", ".aaa.....aaA", ".aaaa...aaaA", "aaaaaaaaaaaA", "aaaaaaaaaaaA", "AAAAAAAAAAAA"] },
  bandana: { ox: -2, oy: -1, m: ["...aaaaaaa...", "..aawaaaawa..", "..aaaaaaaaaa.", ".aa..........", "aa...........", "a............"] },
  santa: { ox: -1, oy: -4, m: [".ww.rrr......", ".wwrrrrrr....", "...rrrrrrr...", "..rrrrrrrrr..", ".wwwwwwwwwww.", ".wwwwwwwwwww."] },
  sunhat: { ox: -3, oy: -3, m: ["......xxxx......", ".....xxxxxx.....", ".....aaaaaa.....", "xxxxxxxxxxxxxxxx", ".uuuuuuuuuuuuuu."] },
  party: { ox: 3, oy: -7, m: ["..y...", "..a...", ".aa...", ".aya..", ".aaaa.", "aayaa.", "aaaaya"] },
  turban: { ox: -1, oy: -3, m: ["...aaaaaa...", "..aAaaAaaa..", ".aaAaaaAaaa.", ".AaaaAaaaAa.", "..AAAAAAAA.."] },
  spacehelmet: { ox: -2, oy: -2, m: ["....wwwwww....", "..ww......ww..", ".w..........w.", "w..........ccw", "w...........cw", "w...........cw", "w............w", "w............w", "w............w", ".w..........w.", "..ww......ww..", "..gggggggggg.."] },
  pirate: { ox: -3, oy: -4, m: [".....kkkkkk.....", "...kkkkkkkkkk...", "..kkkkkwwkkkkk..", "kkkkkkkkkkkkkkkk", ".kk..........kk."] },
  flowers: { ox: 0, oy: -1, m: [".mwmymwmw.", "e........e"], back: { ox: -2, oy: -1, m: ["..wwwwwwwwww..", ".wwwwwwwwwwww.", "ww..........ww", "ww..........ww", "ww..........ww", "ww..........ww", "ww..........ww", "www........www", "www........www", "wwww......wwww", "wwww......wwww", "wwwww....wwwww", "wwwwww..wwwwww", "wwwwwwwwwwwwww", "gwwwwwwwwwwwwg", ".gwwwwwwwwwwg."] } },
  bunnyears: { ox: 1, oy: -6, m: [".ww....ww.", ".wm....wm.", ".wm....wm.", ".wm....wm.", ".ww....ww.", "aaaaaaaa.."] },
};

// hair: drawn relative to the 10×10 head box
const HAIRS: Record<string, { m: string[]; ox: number; oy: number }> = {
  short: { ox: 0, oy: -1, m: ["..hhhhhh..", ".hhhhhhhhh", "hhhhhhhhhH", "hhhhhhhhH.", "hh........", "hh........", "h........."] },
  spiky: { ox: 0, oy: -3, m: ["..h..h..h.", ".hh.hh.hhh", "..hhhhhh..", ".hhhhhhhhh", "hhhhhhhhhH", "hhhhhhhhH.", "hh........", "hh........", "h........."] },
  long: { ox: -1, oy: -1, m: ["...hhhhhh...", "..hhhhhhhhh.", ".hhhhhhhhhhH", ".hhhhhhhhhhH", "hhh.......hH", "hhh.......hH", "hhh.......hH", "hhh.......hH", "hhH.......H.", "hhH.........", "hhH.........", "hhH.........", ".H.........."] },
  bob: { ox: -1, oy: -1, m: ["...hhhhhh...", "..hhhhhhhhh.", ".hhhhhhhhhhH", ".hhhhhhhhhhH", "hhh.......hH", "hhh.......hH", "hhh.......hH", "hhH.......HH", ".H.........."] },
  bun: { ox: 0, oy: -4, m: ["...hhhh...", "..hhhhhH..", "...HHHH...", "..hhhhhh..", ".hhhhhhhhh", "hhhhhhhhhH", "hhhhhhhhH.", "hh........", "hh........", "h........."] },
  ponytail: { ox: -3, oy: -1, m: [".....hhhhhh..", "....hhhhhhhhh", "..hhhhhhhhhhH", "hhhhhhhhhhhH.", "hhH.hh.......", "hhH.hh.......", ".hH.h........", ".hH..........", "..H.........."] },
  curly: { ox: -1, oy: -2, m: ["..hh.hh.hh..", ".hhhhhhhhhh.", "hhhhhhhhhhhh", "hhHhhHhhHhhH", "hhh.......h.", "hhh.........", ".hh.........", "..h........."] },
  afro: { ox: -2, oy: -4, m: ["....hhhhhh....", "..hhhhhhhhhh..", ".hhhhhhhhhhhh.", "hhhhhhhhhhhhhH", "hhhhhhhhhhhhhH", "hhhhhhhhhhhhhH", "hhhhhhhhhhhhhH", "hhh........hhH", "hhh.........hH", "hhh.........hH", ".hH..........H", "..H..........."] },
  bald: { ox: 0, oy: 3, m: ["hh........", "hh........", "h........."] },
  buzz: { ox: 0, oy: 0, m: [".HHHHHHHH.", "HHHHHHHHHH", "H........."] },
  mohawk: { ox: 0, oy: -3, m: ["...hhh....", "...hhh....", "...hhhh...", ".HHhhhhHH.", "HH........"] },
  pigtails: { ox: -2, oy: -1, m: ["....hhhhhh....", "...hhhhhhhhh..", "hh.hhhhhhhhhhh", "hhhhhhhhhhhhhh", "hhhh......hhhh", "hh..........hh", "hh..........hh", "H............H"] },
  braids: { ox: -1, oy: -1, m: ["...hhhhhh...", "..hhhhhhhhh.", ".hhhhhhhhhhH", ".hhhhhhhhhhH", "hhh.......hH", "hhh.......hH", "hhh.......hH", ".hH.......H.", ".hh.........", ".Hh.........", ".hH.........", ".hh.........", ".rr.........", ".hh........."] },
  none: { ox: 0, oy: 0, m: [] },
};

type Item = { m: string[]; gx: number; gy: number; chest?: boolean; hands?: [number, number][]; up?: boolean };
const ITEMS: Record<string, Item> = {
  clipboard: { gx: 0, gy: 4, m: ["..dd..", "uwwwwu", "uwkkwu", "uwwwwu", "uwkkwu", "uwwwwu", "uwkkwu", "uuuuuu"] },
  wrench: { gx: 1, gy: 5, m: ["g.g.", "ggg.", ".g..", ".g..", ".g..", ".dd.", ".dd.", ".dd."] },
  book: { gx: 0, gy: 2, m: ["qqqqw", "qqqqw", "qyyqw", "qqqqw", "qqqqw", "QQQQw"] },
  phone: { gx: 0, gy: 2, m: [".kkk", ".kck", ".kck", ".kkk"] },
  mic: { gx: 0, gy: 3, m: [".dd", ".dd", "..k", "..k", "..k", "..k"] },
  cup: { gx: 0, gy: 2, m: [".g.g.", "wwww.", "wwwwg", "wwwwg", "wwww.", "gggg."] },
  tray: { gx: 2, gy: 4, up: true, m: ["...y.oo.", "..yyy.oo", "gggggggg", ".dddddd."] },
  briefcase: { gx: 2, gy: 0, m: ["..kk..", ".k..k.", "uuuuuu", "uuyyuu", "uuuuuu", "uuuuuu", "UUUUUU"] },
  bag: { gx: 2, gy: 0, m: ["..kk..", ".k..k.", "qqqqqq", "qqqqqq", "qqwwqq", "qqqqqq", "QQQQQQ"] },
  camera: { gx: 0, gy: 2, m: ["...kk..", "kkkkkkk", "kkgggkk", "kgcbgkk", "kkgggkk", "kkkkkkk"] },
  spatula: { gx: 0, gy: 4, m: [".ggg", ".ggg", ".ggg", "..u.", "..u.", "..u.", "..u."] },
  hammer: { gx: 1, gy: 4, m: ["ddddd", "ddddd", "..u..", "..u..", "..u..", "..u.."] },
  magnifier: { gx: 2, gy: 6, m: [".ddd.", "dcccd", "dcwcd", "dcccd", ".ddd.", "...u.", "...u.", "...u."] },
  paintbrush: { gx: 0, gy: 3, m: [".q", ".x", ".u", ".u", ".u", ".u"] },
  palette: { gx: 0, gy: 2, m: ["..xxxx.", ".xrxxyx", "xxxxxxx", "xexxxbx", ".xxxxx."] },
  envelope: { gx: 0, gy: 1, m: ["wwwwww", "wgwwgw", "wwggww", "wwwwww"] },
  syringe: { gx: 0, gy: 1, m: ["......g", "gccccwg", "gccccw.", "......."] },
  bottle: { gx: 0, gy: 2, m: ["..gg", ".qqq", "qqqq", "qwwq", "qqqq", "QQQQ"] },
  torch: { gx: 0, gy: 1, m: ["ddddyy", "ddddyy", "dddd.."] },
  sword: { gx: 1, gy: 7, m: ["..w..", "..w..", "..w..", "..w..", "..w..", "..g..", "yyyyy", "..u..", "..u.."] },
  wand: { gx: 0, gy: 4, m: ["..y.", ".yyy", "..y.", ".u..", ".u..", ".u..", "u..."] },
  ball: { gx: 0, gy: 2, m: [".oooo.", "oooooo", "okkooo", "oooooo", ".oooo."] },
  baton: { gx: 0, gy: 1, m: ["kkkkkkk", "kkkkkkk"] },
  gavel: { gx: 0, gy: 3, m: ["..uuu", "..uuu", "..uuu", "uu.u.", "uu..."] },
  // held across the chest with both hands
  guitar: { chest: true, gx: 0, gy: 1, hands: [[3, 6], [10, 1]], m: ["...........kk", "..........kuk", ".........kuk.", "..kkkk..kuk..", ".kxxxxkkuk...", "kxxxxxxuk....", "kxxkkxxxk....", "kxxkkxxxk....", ".kxxxxxk.....", "..kkkkk......"] },
  baby: { chest: true, gx: 0, gy: 4, hands: [[0, 3], [8, 4]], m: ["......hh..", ".....sssss", "qqqq.sksks", "qqqqqssss.", "qqqqqqqqq.", ".qqqqqqqq."] },
  openbook: { chest: true, gx: -1, gy: 3, hands: [[-1, 2], [10, 2]], m: [".wwwwkwwww.", "qwggwkwggwq", "qwwwwkwwwwq", "qwggwkwggwq", "qwwwwkwwwwq", "qqqqqqqqqqq"] },
  parcel: { chest: true, gx: 0, gy: 2, hands: [[-1, 2], [9, 2]], m: ["xxxxxxxxxx", "xxxxuuxxxx", "xxxxuuxxxx", "xxxxxxxxxx", "xxxxxxxxxx", "uuuuuuuuuu"] },
  controller: { chest: true, gx: 1, gy: 4, hands: [[-1, 1], [7, 1]], m: [".dddddd.", "dkdddrbd", "ddd..ddd"] },
  laptop: { chest: true, gx: 0, gy: 2, hands: [[-1, 4], [9, 4]], m: [".gggggggg.", ".gccccccg.", ".gccccccg.", ".gggggggg.", "dddddddddd"] },
  bouquet: { chest: true, gx: 2, gy: 3, hands: [[2, 5], [4, 5]], m: [".m.r.m.", "mrmymrm", ".mrmrm.", "..eee..", "...e...", "...e..."] },
  tablet: { chest: true, gx: 1, gy: 2, hands: [[-1, 3], [7, 3]], m: ["kkkkkkkk", "kccccwck", "kcccccck", "kcccccck", "kkkkkkkk"] },
  bowl: { chest: true, gx: 1, gy: 4, hands: [[-1, 1], [8, 1]], m: [".yyoyyy.", "wwwwwwww", ".wwwwww.", "..gggg.."] },
};
// long poles reaching the ground beside the front hand
const POLES = ["cane", "whitecane", "broom", "crutch", "shovel", "rake", "pitchfork", "mop", "staff", "flag", "fishingrod"];

const NECK: Record<string, { m: string[]; ox: number; oy: number }> = {
  tie: { ox: 4, oy: 0, m: ["EE", "EE", "EE", "EE", "FF", ".F"] },
  bowtie: { ox: 3, oy: 0, m: ["E..E", "EFFE", "E..E"] },
  stethoscope: { ox: 2, oy: 0, m: ["d....d", "d....d", ".d..d.", "..dd..", "...d..", "...gg.", "...gg."] },
  lanyard: { ox: 2, oy: 0, m: ["E....E", ".E..E.", "..EE..", ".wwww.", ".wccw.", ".wwww."] },
  scarf: { ox: 1, oy: -1, m: ["EEEEEEEE", "EEFFFFEE", "....EE..", "....EF..", "....EE..", "....FF.."] },
  medal: { ox: 3, oy: 0, m: ["r..b", ".rb.", ".yy.", ".yy."] },
  necklace: { ox: 2, oy: 0, m: ["y....y", ".y..y.", "..yy..", "..EE.."] },
  whistle: { ox: 2, oy: 0, m: ["E....E", ".E..E.", "..EE..", "..gg..", "..gd.."] },
  cameraneck: { ox: 1, oy: 0, m: ["k......k", ".k....k.", "..kkkk..", "..kgck..", "..kkkk.."] },
  pearls: { ox: 2, oy: 0, m: ["w....w", ".w..w.", "..ww.."] },
};

export type PersonSpec = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const BUILD: Record<string, { torso: number; legs: number; shoe: number }> = {
  adult: { torso: 11, legs: 11, shoe: 3 },
  teen: { torso: 10, legs: 9, shoe: 3 },
  child: { torso: 8, legs: 6, shoe: 2 },
  toddler: { torso: 6, legs: 4, shoe: 2 },
};

/** Build the cell grid for one frame (before the outline). Returns the grid and some anchors. */
export function personGrid(q: PersonSpec, f: number) {
  const b = BUILD[q.build ?? "adult"] ?? BUILD.adult;
  const W = 34, B = 12, H0 = 9; // grid width, body left column, head top row
  const seat: string = q.seat ?? "none";
  const sit = seat !== "none" || q.pose === "sit";
  const anim: string = q.anim ?? "idle";
  const T0 = H0 + 11, L0 = T0 + b.torso;
  const shinH = sit ? Math.max(2, Math.round(b.legs * 0.45)) : b.legs;
  const S0 = sit ? L0 + 3 + shinH : L0 + b.legs;
  const Hh = S0 + b.shoe;
  const g: Grid = makeGrid(W, Hh);
  const back: Grid = makeGrid(W, Hh);
  const ph = Math.floor(f / 6) % 4;
  const walk = !sit && (anim === "walk" || anim === "run");
  const blink = anim !== "none" && f % 90 > 84;
  const handRow = T0 + b.torso - 2;
  const top: string = q.top ?? "tee";
  const legsStyle: string = q.legs ?? (["dress", "gown", "robe"].includes(top) ? "none" : "trousers");
  const item = q.hold && q.hold !== "none" ? q.hold : "";
  const it = ITEMS[item];
  const armsMode: string = anim === "wave" || it?.up ? "one-up" : anim === "cheer" || anim === "jump" ? "up" : (q.arms ?? "down");
  const belly = !!q.belly;
  const fa = B + 10; // front arm column

  // ----- back gear (behind everything)
  const bk: string = q.back ?? "none";
  if (bk === "backpack") { fill(back, B - 3, T0 + 1, 4, b.torso - 2, "v"); fill(back, B - 3, T0 + b.torso - 3, 4, 1, "V"); fill(back, B - 2, T0 + 3, 2, 2, "V"); }
  if (bk === "cape") { for (let r = T0; r < S0 + b.shoe - 1; r++) { const k = Math.floor((r - T0) / 3); fill(back, B - 2 - k, r, 14 + 2 * k, 1, r === S0 + b.shoe - 2 ? "V" : "v"); } }
  if (bk === "wings") { const wm = ["....ww", "..wwww", ".wwwwg", "wwwwg.", "wwwg..", ".wg..."]; stamp(back, wm, B - 6, T0); stamp(back, wm, B + 10, T0, true); }
  if (bk === "tank") { fill(back, B - 3, T0, 4, b.torso, "g"); fill(back, B - 3, T0 - 1, 2, 1, "d"); fill(back, B - 1, T0 + 2, 1, b.torso - 3, "d"); }
  if (bk === "guitar") { const gm = ["..........kk", ".........u..", "........u...", ".......u....", "..xxx.u.....", ".xxxxu......", "xxxkxxx.....", "xxxxxxx.....", ".xxxxx......"]; stamp(back, gm, B - 4, T0 - 2, true); }
  if (bk === "quiver") { fill(back, B - 2, T0 - 2, 3, b.torso, "u"); fill(back, B - 2, T0 - 3, 1, 1, "w"); fill(back, B, T0 - 3, 1, 1, "r"); }
  const hat = HATS[q.hat ?? "none"];
  if (hat?.back) stamp(back, hat.back.m, B + hat.back.ox, H0 + hat.back.oy);
  if (q.hair === "long" || q.hair === "braids") { /* long hair falls behind the shoulders too */ fill(back, B - 1, H0 + 8, 3, 5, "h"); }

  // ----- seat
  if (seat === "chair") { fill(g, B - 2, L0 - 6, 2, 9, "u"); fill(g, B - 2, L0 + 1, 12, 2, "x"); fill(g, B - 2, L0 + 3, 1, S0 + b.shoe - L0 - 3, "u"); fill(g, B + 8, L0 + 3, 1, S0 + b.shoe - L0 - 3, "u"); }
  if (seat === "wheelchair") {
    // big rear wheel behind the hips, push handle, seat, front caster, footrest
    const cx = B + 3, cy = L0 + 2, R = 6;
    for (let r = -R; r <= R; r++) for (let c = -R; c <= R; c++) {
      const d2 = r * r + c * c;
      if (d2 <= R * R + 2 && d2 >= (R - 1.6) * (R - 1.6)) back[cy + r] && (back[cy + r][cx + c] = "d");
      else if (d2 <= 2) back[cy + r] && (back[cy + r][cx + c] = "g");
      else if ((r === 0 || c === 0) && d2 < (R - 1.6) * (R - 1.6)) back[cy + r] && (back[cy + r][cx + c] = "g");
    }
    fill(back, B - 3, T0 + 1, 2, b.torso + 1, "g"); fill(back, B - 4, T0 + 1, 2, 1, "k");
    fill(g, B - 1, L0 + 2, 12, 1, "g");
    fill(g, B + 12, S0 + b.shoe - 2, 2, 2, "k"); fill(g, B + 12, S0 - 1, 1, b.shoe - 1, "g"); fill(g, B + 10, S0 + b.shoe - 1, 6, 1, "g");
  }

  // ----- legs + shoes
  const lift = (side: number) => (walk && ((ph === 1 && side === 0) || (ph === 3 && side === 1)) ? 1 : 0);
  if (!sit) {
    for (let side = 0; side < 2; side++) {
      const lx = B + 1 + side * 4, up = lift(side);
      const h = b.legs - up;
      const shortsH = legsStyle === "shorts" ? Math.ceil(b.legs * 0.45) : legsStyle === "skirt" ? 0 : legsStyle === "none" ? 0 : h;
      fill(g, lx, L0, 4, h, legsStyle === "trousers" ? "l" : "s");
      if (legsStyle !== "trousers") fill(g, lx + 3, L0, 1, h, "S");
      if (shortsH) { fill(g, lx, L0, 4, shortsH, "l"); fill(g, lx + 3, L0, 1, shortsH, "L"); }
      const sx = B + side * 5, sy = S0 - up;
      const shoe: string = q.shoeStyle ?? "shoes";
      if (shoe === "boots") fill(g, lx, sy - 2, 4, 2, "z");
      if (shoe !== "bare") {
        fill(g, sx, sy, 5, b.shoe, "z"); fill(g, sx + 5, sy + b.shoe - 2, 1, 2, "z"); fill(g, sx, sy + b.shoe - 1, 6, 1, "Z");
        if (shoe === "sneakers") fill(g, sx, sy + b.shoe - 1, 6, 1, "w");
      } else { fill(g, sx + 1, sy, 4, b.shoe, "s"); fill(g, sx + 1, sy + b.shoe - 1, 5, 1, "S"); }
    }
  } else {
    // seated: thighs forward (to the right), shins down
    fill(g, B + 1, L0, 13, 3, legsStyle === "trousers" ? "l" : "s"); fill(g, B + 1, L0 + 2, 13, 1, legsStyle === "trousers" ? "L" : "S");
    if (legsStyle === "shorts") fill(g, B + 1, L0, 7, 3, "l");
    fill(g, B + 10, L0 + 3, 4, shinH, legsStyle === "trousers" ? "l" : "s"); fill(g, B + 13, L0 + 3, 1, shinH, legsStyle === "trousers" ? "L" : "S");
    if (q.shoeStyle !== "bare") { fill(g, B + 10, S0, 6, b.shoe, "z"); fill(g, B + 10, S0 + b.shoe - 1, 6, 1, "Z"); }
    else fill(g, B + 10, S0, 5, b.shoe, "s");
  }

  // ----- torso + skirts
  fill(g, B, T0, 10, b.torso, "t"); fill(g, B + 9, T0, 1, b.torso, "T"); fill(g, B, T0 + b.torso - 1, 10, 1, "T");
  const neckOpen = ["tee", "tank", "dress", "gown"].includes(top);
  if (neckOpen) fill(g, B + 4, T0, 2, 1, "s");
  if (top === "tank") { fill(g, B, T0, 2, 2, "."); fill(g, B + 8, T0, 2, 2, "."); fill(g, B + 3, T0, 4, 2, "s"); }
  if (top === "shirt" || top === "uniform") { fill(g, B + 3, T0, 1, 1, "i"); fill(g, B + 6, T0, 1, 1, "i"); for (let r = T0 + 2; r < T0 + b.torso - 1; r += 2) fill(g, B + 5, r, 1, 1, "T"); }
  if (top === "uniform") { fill(g, B + 1, T0 + 2, 2, 2, "T"); fill(g, B + 7, T0 + 2, 2, 2, "T"); }
  if (top === "jacket" || top === "suit" || top === "coat" || top === "labcoat") { fill(g, B + 4, T0, 2, b.torso - 1, "i"); fill(g, B + 3, T0, 1, 3, "T"); fill(g, B + 6, T0, 1, 3, "T"); }
  if (top === "hoodie") { fill(g, B, T0, 10, 1, "T"); fill(g, B + 3, T0 + 1, 1, 2, "w"); fill(g, B + 6, T0 + 1, 1, 2, "w"); fill(g, B + 2, T0 + b.torso - 4, 6, 2, "T"); }
  if (top === "sweater") { fill(g, B, T0 + 3, 9, 1, "i"); fill(g, B, T0 + 5, 9, 1, "i"); fill(g, B, T0, 10, 1, "T"); }
  if (top === "overalls") { fill(g, B, T0, 10, b.torso, "i"); fill(g, B + 9, T0, 1, b.torso, "I"); fill(g, B + 2, T0 + 3, 6, b.torso - 3, "l"); fill(g, B + 2, T0, 1, 3, "l"); fill(g, B + 7, T0, 1, 3, "l"); fill(g, B + 2, T0 + 3, 1, 1, "y"); fill(g, B + 7, T0 + 3, 1, 1, "y"); fill(g, B + 4, T0 + 5, 2, 2, "L"); }
  if (top === "coat" || top === "labcoat") {
    const n = sit ? 2 : Math.max(2, Math.round(b.legs * 0.6));
    for (let r = 0; r < n; r++) { fill(g, B, L0 - 1 + r, 4, 1, "t"); fill(g, B + 6, L0 - 1 + r, 4, 1, "t"); fill(g, B + 9, L0 - 1 + r, 1, 1, "T"); }
    fill(g, B, L0 - 1 + n - 1, 4, 1, "T"); fill(g, B + 6, L0 - 1 + n - 1, 4, 1, "T");
    if (top === "labcoat") { fill(g, B + 1, T0 + 5, 2, 2, "T"); fill(g, B + 7, T0 + 2, 2, 1, "c"); }
  }
  if (top === "dress" || top === "gown" || top === "robe") {
    const n = sit ? 3 : top === "dress" ? Math.max(2, Math.round(b.legs * 0.6)) : b.legs;
    for (let r = 0; r < n; r++) { const k = top === "robe" ? 0 : Math.min(2, Math.floor(r / 3)); fill(g, B - k, L0 + r, 10 + 2 * k, 1, "t"); fill(g, B + 9 + k, L0 + r, 1, 1, "T"); }
    fill(g, B - (top === "robe" ? 0 : 2), L0 + n - 1, top === "robe" ? 10 : 14, 1, "T");
    if (top === "dress" || top === "gown") fill(g, B, L0 - 1, 10, 1, "T");
  }
  if (legsStyle === "skirt" && !sit) { for (let r = 0; r < Math.max(2, Math.round(b.legs * 0.45)); r++) { const k = r > 1 ? 1 : 0; fill(g, B - k, L0 + r, 10 + 2 * k, 1, "l"); } }
  if (q.belt) { fill(g, B, L0 - 1, 10, 1, "k"); fill(g, B + 4, L0 - 1, 2, 1, "y"); }

  // ----- overlay garments
  const over: string = q.over ?? "none";
  if (over === "apron") { fill(g, B + 2, T0 + 2, 6, b.torso - 2, "j"); fill(g, B + 3, T0, 1, 2, "j"); fill(g, B + 6, T0, 1, 2, "j"); if (!sit) fill(g, B + 2, L0, 6, Math.round(b.legs * 0.5), "j"); fill(g, B + 3, T0 + b.torso - 4, 4, 1, "J"); }
  if (over === "hivis" || over === "vest") { fill(g, B, T0, 3, b.torso, "j"); fill(g, B + 7, T0, 3, b.torso, "j"); fill(g, B + 9, T0, 1, b.torso, "J"); if (over === "hivis") { fill(g, B, T0 + 3, 3, 1, "g"); fill(g, B + 7, T0 + 3, 3, 1, "g"); fill(g, B, T0 + 6, 3, 1, "g"); fill(g, B + 7, T0 + 6, 3, 1, "g"); } }
  if (over === "sash") for (let r = 0; r < b.torso - 1; r++) fill(g, B + 1 + Math.floor((r * 8) / (b.torso - 1)), T0 + r, 2, 1, "j");
  if (over === "lifejacket") { fill(g, B, T0, 10, b.torso - 2, "j"); fill(g, B + 4, T0, 2, b.torso - 2, "J"); fill(g, B, T0 + 4, 10, 1, "k"); }
  if (q.badge && q.badge !== "none") fill(g, B + 7, T0 + 2, 2, 2, col(q.badge, "y").length === 1 ? q.badge : "y");

  // ----- arms (back arm darker, front arm on top)
  const sleeve = top === "tee" || top === "dress" ? 3 : top === "tank" || top === "gown" ? 0 : 99;
  const armLen = b.torso - 2;
  const chestItem = it?.chest;
  const drawArm = (cx: number, front: boolean, mode: "down" | "up", swing: number) => {
    const sc = front ? "t" : "T", sk = front ? "s" : "S";
    if (mode === "down") {
      const len = chestItem ? Math.min(4, armLen) : armLen + swing;
      for (let r = 0; r < len; r++) fill(g, cx, T0 + r + (r === 0 ? 1 : 0), 2, 1, r < sleeve ? sc : sk);
      if (!chestItem) fill(g, cx, T0 + len, 2, 2, sk);
    } else {
      const top0 = T0 - armLen + 2;
      for (let r = top0; r < T0 + 3; r++) fill(g, cx, r, 2, 1, T0 + 3 - r <= sleeve ? sc : sk);
      fill(g, cx, top0 - 2, 2, 2, sk);
    }
  };
  const sw = walk ? (ph === 1 ? 1 : ph === 3 ? -1 : 0) : 0;
  drawArm(B - 2, false, armsMode === "up" ? "up" : "down", -sw);
  if (q.hair !== "long") fill(g, B - 2, T0, 1, 1, ".");
  drawArm(fa, true, armsMode === "up" || armsMode === "one-up" ? "up" : "down", sw);
  if (armsMode === "one-up" && anim === "wave" && Math.floor(f / 8) % 2) { const top0 = T0 - armLen + 2; fill(g, fa, top0 - 2, 2, 2, "."); fill(g, fa + 1, top0 - 2, 2, 2, "s"); }

  if (belly) { // rounded bump in front of the front arm
    const ws = [1, 2, 3, 3, 3, 2, 1];
    ws.forEach((w, r) => { const yy = T0 + b.torso - 8 + r; fill(g, B + 9, yy, w + 1, 1, "t"); fill(g, B + 9 + w, yy, 1, 1, "T"); });
    fill(g, B + 7, T0 + b.torso - 7, 2, 1, "T");
  }
  // ----- neck + head
  fill(g, B + 3, H0 + 10, 4, 1, "S");
  fill(g, B, H0, 10, 10, "s"); fill(g, B + 9, H0, 1, 10, "S"); fill(g, B + 1, H0 + 9, 8, 1, "S");
  g[H0][B] = "."; g[H0][B + 9] = "."; g[H0 + 9][B] = "."; g[H0 + 9][B + 9] = ".";
  // eyes look right
  const eyes: string = q.eyes ?? "open";
  if (blink || eyes === "closed") { fill(g, B + 3, H0 + 5, 2, 1, "k"); fill(g, B + 6, H0 + 5, 2, 1, "k"); }
  else if (eyes === "happy") { fill(g, B + 3, H0 + 4, 2, 1, "k"); fill(g, B + 6, H0 + 4, 2, 1, "k"); }
  else { fill(g, B + 4, H0 + 4, 1, 2, "k"); fill(g, B + 7, H0 + 4, 1, 2, "k"); }
  if (q.blush) { fill(g, B + 2, H0 + 6, 1, 1, "m"); fill(g, B + 8, H0 + 6, 1, 1, "m"); }
  const hr = HAIRS[q.hair ?? "short"] ?? HAIRS.short;
  if (q.hat !== "headscarf") stamp(g, hr.m, B + hr.ox, H0 + hr.oy);
  const beard: string = q.beard ?? "none";
  if (beard === "beard") stamp(g, ["h........h", "h........h", "hh..hhhh.h", "hhhh..hhhh", "hhhh..hhhh", ".hhhhhhhh.", "..hhhhhh.."], B, H0 + 4);
  if (beard === "moustache") stamp(g, ["hhhh"], B + 4, H0 + 6);
  if (beard === "goatee") stamp(g, ["hhhh", "hhhh", ".hh."], B + 4, H0 + 6);
  if (beard === "stubble") stamp(g, ["S.S.S.S", ".S.S.S."], B + 2, H0 + 8);
  // mouth
  const talk = anim === "talk" && Math.floor(f / 5) % 2 === 0;
  const mouth: string = talk ? "open" : (q.mouth ?? "smile");
  if (mouth === "smile") { g[H0 + 7][B + 4] = "k"; g[H0 + 7][B + 7] = "k"; fill(g, B + 5, H0 + 8, 2, 1, "k"); }
  else if (mouth === "open") { fill(g, B + 5, H0 + 7, 2, 2, "r"); fill(g, B + 5, H0 + 7, 2, 1, "k"); }
  else if (mouth === "flat") fill(g, B + 5, H0 + 8, 2, 1, "k");
  else if (mouth === "frown") { g[H0 + 8][B + 4] = "k"; g[H0 + 8][B + 7] = "k"; fill(g, B + 5, H0 + 7, 2, 1, "k"); }
  else if (mouth === "mask") { fill(g, B + 2, H0 + 6, 8, 3, "c"); fill(g, B + 1, H0 + 6, 1, 1, "w"); }
  const gl: string = q.glasses ?? "none";
  if (gl === "glasses") { fill(g, B + 3, H0 + 3, 6, 1, "k"); g[H0 + 4][B + 2] = "k"; fill(g, B + 3, H0 + 4, 1, 2, "c"); fill(g, B + 5, H0 + 4, 2, 2, "c"); fill(g, B + 8, H0 + 4, 1, 2, "c"); g[H0 + 4][B + 5] = "k"; }
  if (gl === "shades") { fill(g, B + 2, H0 + 3, 8, 1, "k"); fill(g, B + 3, H0 + 4, 2, 2, "k"); fill(g, B + 6, H0 + 4, 3, 2, "k"); g[H0 + 4][B + 3] = "d"; g[H0 + 4][B + 6] = "d"; }
  if (gl === "goggles") { fill(g, B, H0 + 3, 10, 1, "d"); fill(g, B + 3, H0 + 3, 2, 3, "c"); fill(g, B + 6, H0 + 3, 3, 3, "c"); }
  if (gl === "eyepatch") { fill(g, B + 6, H0 + 3, 3, 3, "k"); fill(g, B, H0 + 2, 10, 1, "k"); }
  if (hat) stamp(g, hat.m, B + hat.ox, H0 + hat.oy);

  // ----- neckwear
  const nk = NECK[q.neck ?? "none"];
  if (nk) stamp(g, nk.m, B + nk.ox, T0 + nk.oy);

  // ----- held item
  const hy = armsMode === "one-up" ? T0 - armLen : T0 + armLen + sw;
  if (it && !it.chest) {
    stamp(g, it.m, fa - it.gx, hy - it.gy);
    fill(g, fa, hy, 2, 2, "s");
  }
  if (it && it.chest) {
    const ox = B + 1 - it.gx, oy = T0 + it.gy;
    stamp(g, it.m, ox, oy);
    (it.hands ?? []).forEach(([hx, hy2]) => fill(g, ox + hx, oy + hy2, 2, 2, "s"));
  }
  if (POLES.includes(item)) {
    const px0 = fa + 2, bottom = Hh - 1;
    const topR = item === "crutch" ? T0 + 1 : item === "flag" || item === "staff" ? hy - 8 : item === "fishingrod" ? hy - 12 : hy - 2;
    const pc = item === "whitecane" ? "w" : item === "crutch" ? "g" : "u";
    if (item !== "fishingrod") fill(g, px0, topR, 1, (item === "flag" ? hy + 3 : bottom + 1) - topR, pc);
    if (item === "cane") fill(g, px0 - 2, topR - 1, 3, 1, "u");
    if (item === "whitecane") { fill(g, px0, bottom - 1, 1, 2, "r"); fill(g, px0 - 1, topR - 1, 2, 1, "w"); }
    if (item === "crutch") { fill(g, px0 - 1, topR - 1, 3, 1, "d"); fill(g, px0 - 1, hy, 3, 1, "d"); fill(g, px0, bottom, 1, 1, "k"); }
    if (item === "broom") { fill(g, px0 - 2, bottom - 3, 5, 4, "y"); fill(g, px0 - 2, bottom - 3, 5, 1, "r"); }
    if (item === "mop") { fill(g, px0 - 2, bottom - 2, 5, 3, "w"); fill(g, px0 - 1, bottom, 1, 1, "g"); }
    if (item === "shovel") { fill(g, px0 - 1, bottom - 3, 3, 4, "g"); fill(g, px0, bottom, 1, 1, "d"); }
    if (item === "rake") { fill(g, px0 - 3, bottom - 1, 7, 1, "d"); for (let k = -3; k <= 3; k += 2) fill(g, px0 + k, bottom, 1, 1, "d"); }
    if (item === "pitchfork") { fill(g, px0 - 2, topR - 1, 5, 1, "d"); fill(g, px0 - 2, topR - 4, 1, 3, "d"); fill(g, px0, topR - 4, 1, 3, "d"); fill(g, px0 + 2, topR - 4, 1, 3, "d"); }
    if (item === "staff") { fill(g, px0 - 1, topR - 2, 3, 2, "c"); g[topR - 3] && (g[topR - 3][px0] = "w"); }
    if (item === "flag") { fill(g, px0 + 1, topR, 6, 4, "q"); fill(g, px0 + 1, topR + 3, 6, 1, "Q"); fill(g, px0 + 3, topR + 1, 2, 2, "w"); }
    if (item === "fishingrod") { for (let k = 0; k < 12; k++) fill(g, px0 + Math.floor(k / 2), hy + 1 - k, 1, 1, "u"); const tx = px0 + 6; fill(g, tx, hy - 10, 1, 14, "g"); fill(g, tx, hy + 4, 1, 1, "r"); }
    fill(g, fa, hy, 2, 2, "s");
  }

  // ----- free overlays: [{map, at:[col,row], ref, back}]
  const refs: Record<string, [number, number]> = { grid: [0, 0], head: [B, H0], torso: [B, T0], hand: [fa, hy], legs: [B, L0], feet: [B, S0] };
  const extras = Array.isArray(q.extra) ? q.extra : [];
  for (const e of extras) {
    if (!e || !e.map) continue;
    const [rx, ry] = refs[e.ref ?? "grid"] ?? [0, 0];
    const at = e.at ?? [0, 0];
    stamp(e.back ? back : g, e.map as PixelMap, rx + at[0], ry + at[1]);
  }
  // merge back layer under the body
  const out: Grid = back.map((row, r) => row.map((c, k) => (g[r][k] !== "." ? g[r][k] : c)));
  return { grid: out, W, Hh };
}

export const Person: React.FC<PersonSpec & { x: number; y: number; s?: number; f: number; flip?: boolean }> = (q) => {
  const { x, y, s = 1, f, flip } = q;
  const px: number = q.px ?? PX;
  const skin = col(q.skin, SKIN.fair, SKIN), hairC = col(q.hairColour, HAIR.brown, HAIR);
  const topC = col(q.topColour, PAL.b), innerC = col(q.inner, PAL.w), legC = col(q.legsColour, PAL.n), shoeC = col(q.shoes, "#3a2a22");
  const hatC = col(q.hatColour, PAL.r), overC = col(q.overColour, PAL.w), itemC = col(q.itemColour, PAL.r);
  const pal: Record<string, string> = {
    ...PAL, s: skin, S: shade(skin, 0.16), h: hairC, H: shade(hairC, 0.3), t: topC, T: shade(topC), i: innerC, I: shade(innerC),
    l: legC, L: shade(legC), z: shoeC, Z: shade(shoeC, 0.35), a: hatC, A: shade(hatC), j: overC, J: shade(overC), q: itemC, Q: shade(itemC), v: col(q.backColour, itemC), E: col(q.neckColour, PAL.r), F: shade(col(q.neckColour, PAL.r)), V: shade(col(q.backColour, itemC)),
    ...(q.pal ?? {}),
  };
  const { grid } = personGrid(q, f);
  const gr = q.outline === false ? grid : outlined(grid);
  const w = gr[0].length * px, h = gr.length * px;
  const anim: string = q.anim ?? "idle";
  let dy = 0;
  if (anim === "walk" || anim === "run") dy = Math.floor(f / 6) % 2 ? -px : 0;
  if (anim === "cheer") dy = Math.floor(f / 8) % 2 ? -px : 0;
  if (anim === "jump") dy = -Math.round(Math.abs(Math.sin((f * Math.PI) / 30)) * 6) * px;
  return (
    <g transform={`translate(${x} ${y + dy}) scale(${flip ? -s : s} ${s})`}>
      <Pixels grid={gr} px={px} pal={pal} x={-w / 2} y={-h + px} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...p} x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip} />;
}
