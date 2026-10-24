import * as fontkit from "fontkit";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const source = new URL("../src/assets/social-card.svg", import.meta.url);
const destination = new URL("../public/social-card.png", import.meta.url);
const titleFont = fontkit.openSync(
  fileURLToPath(new URL("../public/font/Geometos.ttf", import.meta.url)),
);
const bodyFont = fontkit.openSync(
  fileURLToPath(new URL("../public/font/CenturyGothic.ttf", import.meta.url)),
);

function textToPaths(text, font, x, baseline, fontSize, letterSpacing = 0) {
  const scale = fontSize / font.unitsPerEm;
  const run = font.layout(text);
  let cursorX = x;

  return run.glyphs
    .map((glyph, index) => {
      const position = run.positions[index];
      const glyphX = cursorX + position.xOffset * scale;
      const glyphY = baseline - position.yOffset * scale;
      cursorX += position.xAdvance * scale + letterSpacing;

      const path = glyph.path.toSVG();
      if (!path) return "";

      return `<path d="${path}" transform="translate(${glyphX.toFixed(3)} ${glyphY.toFixed(3)}) scale(${scale} ${-scale})"/>`;
    })
    .join("\n");
}

const replacements = {
  "<!-- TITLE_PATHS -->": textToPaths("Vincent Udén", titleFont, 140, 275, 72),
  "<!-- SUBTITLE_PATHS -->": textToPaths(
    "Software ·  open source ·  technical writing",
    bodyFont,
    144,
    342,
    27,
  ),
  "<!-- DESCRIPTION_PATHS -->": textToPaths(
    "Writing about projects and whatever I'm currently working on.",
    bodyFont,
    144,
    405,
    23,
  ),
  "<!-- DOMAIN_PATHS -->": textToPaths(
    "WWW.UDEN.DEV",
    bodyFont,
    144,
    535,
    22,
    2,
  ),
};

let svg = await readFile(source, "utf8");
for (const [marker, paths] of Object.entries(replacements)) {
  if (!svg.includes(marker)) throw new Error(`Missing SVG marker: ${marker}`);
  svg = svg.replace(marker, paths);
}

await sharp(Buffer.from(svg)).png().toFile(fileURLToPath(destination));
