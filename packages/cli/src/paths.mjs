import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

export const CLI_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const CACHE = path.join(CLI_DIR, ".cache");
export const REPO = process.env.SCENEPARTS_REPO ?? "krakujs/sceneparts";
export const REF = process.env.SCENEPARTS_REF ?? "main";

const isRegistry = (dir) => fs.existsSync(path.join(dir, "parts", "core", "style", "part.json"));

/** Find the library: --registry, $SCENEPARTS_REGISTRY, a parent folder that is a clone, or a cached download. */
export async function registryRoot(flag) {
  const explicit = flag ?? process.env.SCENEPARTS_REGISTRY;
  if (explicit) {
    if (!isRegistry(explicit)) throw new Error(`${explicit} is not a SceneParts registry (no parts/core/style)`);
    return path.resolve(explicit);
  }
  for (let d = process.cwd(); ; d = path.dirname(d)) {
    if (isRegistry(d)) return d;
    if (path.dirname(d) === d) break;
  }
  return downloadRegistry();
}

const token = () => {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try { return execFileSync("gh", ["auth", "token"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim(); } catch { return null; }
};

/** Download the registry at REF into the cache (refreshed once a day, or with --refresh). */
export async function downloadRegistry({ refresh = false } = {}) {
  const dir = path.join(CACHE, "registry", REPO.replace("/", "__"), REF);
  const stamp = path.join(dir, ".fetched");
  const fresh = fs.existsSync(stamp) && Date.now() - fs.statSync(stamp).mtimeMs < 24 * 3600e3;
  if (isRegistry(dir) && fresh && !refresh) return dir;
  const t = token();
  const url = `https://api.github.com/repos/${REPO}/tarball/${REF}`;
  const r = await fetch(url, { headers: { "User-Agent": "sceneparts-cli", ...(t ? { Authorization: `Bearer ${t}` } : {}) } });
  if (!r.ok) {
    if (isRegistry(dir)) { console.error(`sceneparts: could not refresh the library (${r.status}); using the cached copy`); return dir; }
    throw new Error(`could not download the library from ${REPO}@${REF} (${r.status}). Clone it and pass --registry <path>, or set GITHUB_TOKEN.`);
  }
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const tgz = path.join(os.tmpdir(), `sceneparts-${Date.now()}.tgz`);
  fs.writeFileSync(tgz, Buffer.from(await r.arrayBuffer()));
  execFileSync("tar", ["xzf", tgz, "-C", dir, "--strip-components=1"]);
  fs.rmSync(tgz);
  fs.writeFileSync(stamp, new Date().toISOString());
  return dir;
}

/** Commit of a registry clone, if it is a git checkout. */
export const registryCommit = (root) => {
  try { return execFileSync("git", ["-C", root, "rev-parse", "HEAD"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim(); } catch { return null; }
};
