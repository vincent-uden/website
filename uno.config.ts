import { defineConfig } from "unocss";
import { presetWebFonts, presetWind, presetMini, presetIcons, transformerDirectives } from "unocss";
import { presetScrollbar } from "unocss-preset-scrollbar";

export default defineConfig({
    theme: {
      colors: {
        onyx: "#383a3e",
        xanadu: "#808F85",
        eton: "#91C499",
        linen: "#F2E9DC",
        coral: "#FE6D73",
        paleGrey: "#DCE8F2",
        slateBlue: "#8C9DBF",
        slateDark: "#5B647B",
        darkGrey: "#383A3E",
        darkerGrey: "#202125bb",
      },
    },
    presets: [
      presetMini({}),
      presetWind({}),
      presetIcons({}),
      presetWebFonts({
        provider: "google",
        fonts: {
          sans: "Roboto:100,200,300,400,500,600,700,800,900",
          geo: ["Geometos", "Roboto"],
          gothic: ["Century Gothic", "Roboto"],
        },
      }),
      presetScrollbar({}),
    ],
    transformers: [
        transformerDirectives(),
    ],
});
