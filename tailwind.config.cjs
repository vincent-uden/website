/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      onyx: "#383a3e",
      xanadu: "#808F85",
      eton: "#91C499",
      linen: "#F2E9DC",
      coral: "#FE6D73",
      "pale-grey": "#DCE8F2",
      "slate-blue": "#8C9DBF",
      "slate-dark": "#5B647B",
      "dark-grey": "#383A3E",
      "darker-grey": "#202125bb",
    },
    fontFamily: {
      geo: ["Geometos", "sans-serif"],
      gothic: ["Century Gothic", "sans-serif"],
    },
  },
  plugins: [],
};
