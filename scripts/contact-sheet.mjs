import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const RAW = path.resolve("public/images/raw");
const files = (await readdir(RAW)).filter((f) => f.endsWith(".jpg")).sort();
const PER = 48;
const COLS = 8;
const CW = 240;
const CH = 160;

await mkdir(path.resolve(".cache"), { recursive: true });

for (let s = 0; s * PER < files.length; s++) {
  const slice = files.slice(s * PER, (s + 1) * PER);
  const rows = Math.ceil(slice.length / COLS);
  const composites = [];
  for (let i = 0; i < slice.length; i++) {
    const c = i % COLS;
    const r = Math.floor(i / COLS);
    const thumb = await sharp(path.join(RAW, slice[i]))
      .resize(CW, CH, { fit: "cover" })
      .toBuffer();
    composites.push({ input: thumb, left: c * CW, top: r * CH });
    const label = Buffer.from(
      `<svg width="${CW}" height="26" xmlns="http://www.w3.org/2000/svg"><rect width="${CW}" height="26" fill="rgba(0,0,0,0.75)"/><text x="7" y="19" font-family="Arial" font-size="17" font-weight="bold" fill="#7dd3fc">${slice[i].replace(".jpg", "")}</text></svg>`
    );
    composites.push({ input: label, left: c * CW, top: r * CH + CH - 26 });
  }
  await sharp({ create: { width: COLS * CW, height: rows * CH, channels: 3, background: "#111" } })
    .composite(composites)
    .jpeg({ quality: 82 })
    .toFile(path.resolve(`.cache/sheet-${s + 1}.jpg`));
}
console.log("done");
