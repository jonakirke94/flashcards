const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./public/index.html", "./src/**/*.svelte"],
  darkMode: "class", // or 'media'
  theme: {
    fontFamily: {
      sans: ["Inter var", ...defaultTheme.fontFamily.sans],
    },
    colors: {
      ...colors,
      gray: colors.warmGray,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
