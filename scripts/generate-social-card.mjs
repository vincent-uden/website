import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { generateSocialCard } from "../src/utils/social-card.js";

const output = new URL("../public/social-card.png", import.meta.url);
const image = await generateSocialCard(
  "Vincent Udén",
  "Software ·  open source ·  technical writing",
);

await writeFile(fileURLToPath(output), image);
