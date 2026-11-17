import type { ItemSpec, PartEntry, Registry, Style } from "./types.js";

/** "anubis" + style "egypt-tomb" -> "egypt-tomb/anubis" if it exists, else "core/anubis". Full ids pass through. */
export const resolveId = (reg: Registry, t: string, styleId: string): string | undefined => {
  if (t.includes("/")) return reg[t] ? t : undefined;
  if (reg[`${styleId}/${t}`]) return `${styleId}/${t}`;
  if (reg[`core/${t}`]) return `core/${t}`;
  return undefined;
};

export const getPart = (reg: Registry, t: string, styleId: string): PartEntry | undefined => {
  const id = resolveId(reg, t, styleId);
  return id ? reg[id] : undefined;
};

export const FALLBACK_STYLE: Style = { id: "core", ink: "#1a1410", accent: "#c8413a", font: "Georgia, 'Times New Roman', serif", paper: { base: "#efe6cf" } };

export const getStyle = (reg: Registry, styleId: string): Style => reg[`${styleId}/style`]?.style ?? reg["core/style"]?.style ?? FALLBACK_STYLE;

/** Every part id an item tree references (items inside "items"/"item"-typed params included). */
export const partRefs = (it: ItemSpec): string[] => {
  const out = [it.t];
  for (const v of Object.values(it)) {
    if (v && typeof v === "object" && !Array.isArray(v) && typeof (v as ItemSpec).t === "string") out.push(...partRefs(v as ItemSpec));
    if (Array.isArray(v)) for (const x of v) if (x && typeof x === "object" && typeof x.t === "string") out.push(...partRefs(x));
  }
  return out;
};
