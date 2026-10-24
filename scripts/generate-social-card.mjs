import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { generateSocialCard } from "../src/utils/social-card.js";

const output = new URL("../public/social-card.png", import.meta.url);
const image = await generateSocialCard(
  "Vincent Udén",
  "Software ·  open source ·  technical writing",
);

await writeFile(fileURLToPath(output), image);

const faviconSource = new URL("../public/bitmap.svg", import.meta.url);
const faviconOutput = new URL("../public/favicon.png", import.meta.url);
await sharp(await readFile(faviconSource))
  .resize(48, 48)
  .png()
  .toFile(fileURLToPath(faviconOutput));
