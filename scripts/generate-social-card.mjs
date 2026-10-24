import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const source = new URL("../src/assets/social-card.svg", import.meta.url);
const destination = new URL("../public/social-card.png", import.meta.url);

await sharp(await readFile(source))
  .png()
  .toFile(fileURLToPath(destination));
