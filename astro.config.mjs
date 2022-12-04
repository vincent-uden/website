import { defineConfig } from "astro/config";

import Unocss from "unocss/vite";
import { presetWebFonts, presetWind, presetMini, presetIcons, transformerDirectives } from "unocss";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [
      Unocss({
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
        ],
        transformers: [
            transformerDirectives(),
        ],
      }),
    ],
  },
});
