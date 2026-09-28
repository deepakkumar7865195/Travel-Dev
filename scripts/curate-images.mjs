import sharp from "sharp";
import { mkdir, copyFile, rm } from "node:fs/promises";
import path from "node:path";

const RAW = path.resolve("public/images/raw");
const OUT = path.resolve("public/images");

/** semantic name -> source thumbnail id */
const MAP = {
  "hero": "p001",
  "hero-alt": "p074",

  "dest-kashmir": "p010",
  "dest-kerala": "p090",
  "dest-rajasthan": "p088",
  "dest-goa": "p089",
  "dest-darjeeling": "p006",
  "dest-sikkim": "p074",
  "dest-agra": "p004",
  "dest-delhi": "p020",
  "dest-bali": "p086",
  "dest-thailand": "p076",
  "dest-japan": "p031",
  "dest-malaysia": "p084",
  "dest-vietnam": "p058",
  "dest-greece": "p027",
  "dest-paris": "p003",
  "dest-italy": "p030",
  "dest-london": "p053",
  "dest-switzerland": "p009",
  "dest-dubai": "p005",
  "dest-jordan": "p071",
  "dest-maldives": "p061",
  "dest-nepal": "p059",
  "dest-banff": "p039",
  "dest-kenya": "p042",

  "pkg-darjeeling": "p041",
  "pkg-sikkim": "p075",
  "pkg-goa": "p089",
  "pkg-rajasthan": "p088",
  "pkg-kerala": "p077",
  "pkg-kashmir": "p066",
  "pkg-international": "p051",
  "pkg-featured": "p016",

  "exp-mountains": "p038",
  "exp-beach": "p002",
  "exp-culture": "p067",
  "exp-wildlife": "p044",
  "exp-luxury": "p022",
  "exp-honeymoon": "p083",
  "exp-family": "p023",
  "exp-weekend": "p069",

  "about-parallax": "p075",
  "about-story": "p017",
  "about-team-1": "p051",
  "about-team-2": "p073",
  "about-team-3": "p066",
  "about-cinematic": "p048",

  "misc-wing": "p014",
  "misc-flatlay": "p015",
  "misc-lagoon": "p048",
  "misc-wave": "p065",
  "misc-city": "p036",
  "misc-market": "p068",
};

async function run() {
  await mkdir(OUT, { recursive: true });
  const names = Object.keys(MAP);
  for (const name of names) {
    const src = path.join(RAW, `${MAP[name]}.jpg`);
    const dst = path.join(OUT, `${name}.jpg`);
    await sharp(src)
      .resize({ width: 1800, withoutEnlargement: true })
      .jpeg({ quality: 74, mozjpeg: true, progressive: true })
      .toFile(dst);
  }

  await copyFile(path.resolve("assets/logo.png"), path.join(OUT, "logo.png"));
  await copyFile(path.resolve("assets/logo-mark.png"), path.join(OUT, "logo-mark.png"));

  console.log(`curated ${names.length} images`);
}

await run();
await rm(RAW, { recursive: true, force: true });
console.log("raw folder removed");
