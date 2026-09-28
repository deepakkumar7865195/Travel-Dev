import sharp from "sharp";
import { readFile } from "node:fs/promises";
import path from "node:path";

const logo = await readFile(path.resolve("assets/logo.svg"), "utf8");
const encoded = `data:image/svg+xml;base64,${Buffer.from(logo).toString("base64")}`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#0F3A5C"/>
      <stop offset="0.55" stop-color="#0B2942"/>
      <stop offset="1" stop-color="#04101C"/>
    </linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1769AA" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#1769AA" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="wave" x1="0" y1="520" x2="1200" y2="440" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#E91E25"/>
      <stop offset="1" stop-color="#FF6B6F"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <ellipse cx="180" cy="60" rx="520" ry="360" fill="url(#glow)"/>
  <ellipse cx="1150" cy="620" rx="420" ry="300" fill="#1769AA" opacity="0.18"/>

  <path d="M0 560 C 160 512, 300 588, 470 556 S 760 500, 940 542 S 1120 592, 1200 552 L1200 630 L0 630 Z" fill="url(#wave)" opacity="0.92"/>
  <path d="M0 560 C 160 512, 300 588, 470 556 S 760 500, 940 542 S 1120 592, 1200 552" fill="none" stroke="#FFFFFF" stroke-opacity="0.5" stroke-width="3"/>

  <path d="M120 470 C 340 300, 640 240, 900 300" fill="none" stroke="#FF6B6F" stroke-opacity="0.5" stroke-width="3" stroke-dasharray="4 16" stroke-linecap="round"/>
  <circle cx="120" cy="470" r="9" fill="#FFFFFF"/>

  <image href="${encoded}" xlink:href="${encoded}" x="100" y="120" width="150" height="150"/>

  <text x="290" y="196" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="74" font-weight="800" letter-spacing="4" fill="#FFFFFF">TRAVEL <tspan fill="#FF6B6F">DEV</tspan></text>
  <text x="292" y="246" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="30" font-weight="600" letter-spacing="16" fill="#8CC6F2">LET&#39;S GO</text>

  <text x="100" y="374" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="58" font-weight="800" fill="#FFFFFF">Your journey starts here.</text>
  <text x="102" y="428" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="27" font-weight="400" fill="#C4E2F8">Curated destinations · Seamless trips · Designed around you</text>

  <text x="102" y="600" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="26" font-weight="700" letter-spacing="3" fill="#FFFFFF" opacity="0.92">traveldev.in</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(path.resolve("public/og-cover.png"));
await sharp(Buffer.from(svg)).resize(1200, 630).jpeg({ quality: 88 }).toFile(path.resolve("public/og-cover.jpg"));
console.log("og images written");
