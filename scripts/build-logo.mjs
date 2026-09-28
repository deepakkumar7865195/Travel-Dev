import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Turns the flat JPEG brand board (assets/logo-source.jpeg) into clean,
 * transparent PNG assets:
 *   assets/logo.png        — full lockup (mark + TRAVELDEV + Let's go)
 *   assets/logo-mark.png   — mark only (arc + plane + swoosh)
 *   public/images/logo.png, public/images/logo-mark.png
 *   src/app/icon.png       — square favicon built from the mark
 */
const SRC = path.resolve("assets/logo-source.jpeg");
const OUT_DIRS = [path.resolve("assets"), path.resolve("public/images"), path.resolve("src/app")];
const BG_MIN = 240; // anything this close to white is background
const DESAT_MAX = 14; // pale, unsaturated pixels are background / jpeg mush
const ALPHA_MIN = 0.05;

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

function average(list) {
  const s = [0, 0, 0];
  for (const [r, g, b] of list) {
    s[0] += r;
    s[1] += g;
    s[2] += b;
  }
  return s.map((v) => Math.round(v / list.length));
}

// --- 1. dominant flat colours (used for reporting the brand palette) --------
function dominant(filter) {
  const list = [];
  for (let i = 0; i < data.length; i += 4) {
    const c = [data[i], data[i + 1], data[i + 2]];
    if (filter(c)) list.push(c);
  }
  if (!list.length) return null;
  return average(list);
}
const RED = dominant((c) => c[0] >= 200 && c[1] <= 60 && c[2] <= 60);
const BLUE_DEEP = dominant((c) => c[2] > c[0] + 40 && c[2] > c[1] + 20 && c[2] <= 210 && c[0] < 40);
const BLUE_LIGHT = dominant((c) => c[2] > c[0] + 40 && c[2] >= 225 && c[0] < 40);

// --- 2. key the artwork off white, per pixel --------------------------------
// The board only holds two hues. Brand red has ~0 green/blue, brand blue has
// ~0 red, so the channel that sits furthest from white gives coverage directly
// and survives the blue gradient and the jpeg edges.
const hex = (c) => (c ? `#${c.map((v) => v.toString(16).padStart(2, "0")).join("")}` : "n/a");
const clamp = (v) => Math.min(255, Math.max(0, Math.round(v)));

const out = Buffer.alloc(W * H * 4);
const rowHits = new Uint32Array(H);

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const hi = Math.max(r, g, b);
    const lo = Math.min(r, g, b);
    let alpha = 1;
    let color = [r, g, b];

    if (lo >= BG_MIN || hi - lo <= DESAT_MAX) {
      alpha = 0;
    } else {
      alpha = r >= b ? Math.max(255 - g, 255 - b) / 255 : (255 - r) / 255;
      alpha = Math.min(1, Math.max(0, alpha));
      if (alpha < ALPHA_MIN) {
        alpha = 0;
      } else if (alpha < 1) {
        color = [r, g, b].map((c) => clamp((c - 255 * (1 - alpha)) / alpha));
      }
    }

    out[i] = color[0];
    out[i + 1] = color[1];
    out[i + 2] = color[2];
    out[i + 3] = Math.round(alpha * 255);
    if (out[i + 3] > 32) rowHits[y]++;
  }
}

// --- 3. split the mark from the wordmark (first empty row band) -------------
let first = 0;
while (first < H && rowHits[first] === 0) first++;
let markEnd = H;
let run = 0;
for (let y = first; y < H; y++) {
  run = rowHits[y] === 0 ? run + 1 : 0;
  if (run >= 12) {
    markEnd = y - run + 1;
    break;
  }
}

function bbox(y0, y1) {
  let minX = W;
  let maxX = -1;
  let minY = -1;
  let maxY = -1;
  for (let y = y0; y < y1; y++) {
    for (let x = 0; x < W; x++) {
      if (out[(y * W + x) * 4 + 3] > 32) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (minY < 0) minY = y;
        maxY = y;
      }
    }
  }
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

const full = bbox(0, H);
const mark = bbox(0, markEnd);

// --- 4. write the assets ----------------------------------------------------
const img = sharp(out, { raw: { width: W, height: H, channels: 4 } });
await Promise.all(OUT_DIRS.map((d) => mkdir(d, { recursive: true })));

const png = (buf) => buf.png({ compressionLevel: 9, palette: false });
await Promise.all([
  png(img.clone().extract(full)).toFile(path.resolve("assets/logo.png")),
  png(img.clone().extract(full)).toFile(path.resolve("public/images/logo.png")),
  png(img.clone().extract(mark)).toFile(path.resolve("assets/logo-mark.png")),
  png(img.clone().extract(mark)).toFile(path.resolve("public/images/logo-mark.png")),
]);

// square favicon: mark centred on a transparent 512x512 canvas
const iconPad = Math.round(mark.width * 0.08);
const iconW = 512;
const fitted = await png(
  img
    .clone()
    .extract(mark)
    .resize({ width: iconW - iconPad * 2, withoutEnlargement: false }),
).toBuffer();
const fittedMeta = await sharp(fitted).metadata();
await sharp({
  create: {
    width: iconW,
    height: iconW,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite([
    {
      input: fitted,
      left: Math.round((iconW - fittedMeta.width) / 2),
      top: Math.round((iconW - fittedMeta.height) / 2),
    },
  ])
  .png({ compressionLevel: 9 })
  .toFile(path.resolve("src/app/icon.png"));

console.log(
  JSON.stringify(
    {
      red: hex(RED),
      blue: `${hex(BLUE_DEEP)} → ${hex(BLUE_LIGHT)}`,
      source: `${W}x${H}`,
      markSplitRow: markEnd,
      full,
      mark,
    },
    null,
    2,
  ),
);
