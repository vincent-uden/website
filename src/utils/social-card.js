import * as fontkit from "fontkit";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const titleFont = fontkit.openSync(
  resolve(process.cwd(), "public/font/Geometos.ttf"),
);
const bodyFont = fontkit.openSync(
  resolve(process.cwd(), "public/font/CenturyGothic.ttf"),
);
const template = readFile(resolve(process.cwd(), "src/assets/social-card.svg"), "utf8");

const TEXT_X = 140;
const SUBTITLE_X = 144;
const MAX_TEXT_WIDTH = 940;
const TITLE_SIZE = 72;
const TITLE_LINE_HEIGHT = 82;
const SUBTITLE_SIZE = 27;
const SUBTITLE_LINE_HEIGHT = 36;
const GROUP_GAP = 20;
const BLOCK_CENTER_Y = 295;
const MAX_TITLE_LINES = 2;
const MAX_SUBTITLE_LINES = 3;

function measureText(text, font, fontSize) {
  const scale = fontSize / font.unitsPerEm;
  return font.layout(text).positions.reduce(
    (width, position) => width + position.xAdvance * scale,
    0,
  );
}

function wrapText(text, font, fontSize, maxWidth, maxLines) {
  const words = text.trim().split(/\s+/u).filter(Boolean);
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (!currentLine || measureText(candidate, font, fontSize) <= maxWidth) {
      currentLine = candidate;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  if (lines.length <= maxLines) return lines.length ? lines : [""];

  const visibleLines = lines.slice(0, maxLines);
  let finalLine = visibleLines[maxLines - 1].replace(/[.…]+$/u, "");
  while (
    finalLine &&
    measureText(`${finalLine}…`, font, fontSize) > maxWidth
  ) {
    const lastSpace = finalLine.lastIndexOf(" ");
    finalLine = lastSpace > 0
      ? finalLine.slice(0, lastSpace)
      : Array.from(finalLine).slice(0, -1).join("");
  }
  visibleLines[maxLines - 1] = `${finalLine}…`;
  return visibleLines;
}

function textToPaths(text, font, x, baseline, fontSize) {
  const scale = fontSize / font.unitsPerEm;
  const run = font.layout(text);
  let cursorX = x;

  return run.glyphs
    .map((glyph, index) => {
      const position = run.positions[index];
      const glyphX = cursorX + position.xOffset * scale;
      const glyphY = baseline - position.yOffset * scale;
      cursorX += position.xAdvance * scale;

      const path = glyph.path.toSVG();
      if (!path) return "";

      return `<path d="${path}" transform="translate(${glyphX.toFixed(3)} ${glyphY.toFixed(3)}) scale(${scale} ${-scale})"/>`;
    })
    .join("\n");
}

export async function generateSocialCard(title, subtitle) {
  const titleLines = wrapText(
    title,
    titleFont,
    TITLE_SIZE,
    MAX_TEXT_WIDTH,
    MAX_TITLE_LINES,
  );
  const subtitleLines = wrapText(
    subtitle,
    bodyFont,
    SUBTITLE_SIZE,
    MAX_TEXT_WIDTH,
    MAX_SUBTITLE_LINES,
  );
  const blockHeight =
    titleLines.length * TITLE_LINE_HEIGHT +
    GROUP_GAP +
    subtitleLines.length * SUBTITLE_LINE_HEIGHT;
  const blockTop = BLOCK_CENTER_Y - blockHeight / 2;
  const titleBaselineStart = blockTop + TITLE_SIZE * 0.93;
  const subtitleBaselineStart =
    blockTop + titleLines.length * TITLE_LINE_HEIGHT + GROUP_GAP + SUBTITLE_SIZE * 1.04;
  const accentHeight = Math.max(304, blockHeight + 48);
  const accentTop = BLOCK_CENTER_Y - accentHeight / 2;

  const titlePaths = titleLines
    .map((line, index) =>
      textToPaths(
        line,
        titleFont,
        TEXT_X,
        titleBaselineStart + index * TITLE_LINE_HEIGHT,
        TITLE_SIZE,
      ),
    )
    .join("\n");
  const subtitlePaths = subtitleLines
    .map((line, index) =>
      textToPaths(
        line,
        bodyFont,
        SUBTITLE_X,
        subtitleBaselineStart + index * SUBTITLE_LINE_HEIGHT,
        SUBTITLE_SIZE,
      ),
    )
    .join("\n");

  let svg = await template;
  const replacements = {
    "<!-- ACCENT_BAR -->": `<rect x="96" y="${accentTop.toFixed(2)}" width="8" height="${accentHeight.toFixed(2)}" rx="4" fill="#8c9dbf"/>`,
    "<!-- TITLE_PATHS -->": titlePaths,
    "<!-- SUBTITLE_PATHS -->": subtitlePaths,
  };
  for (const [marker, value] of Object.entries(replacements)) {
    if (!svg.includes(marker)) throw new Error(`Missing SVG marker: ${marker}`);
    svg = svg.replace(marker, value);
  }

  return sharp(Buffer.from(svg)).png().toBuffer();
}
