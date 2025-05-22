// eslint-disable-next-line import/no-anonymous-default-export
export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  }
};

// apps/landing/postcss.config.js

// apps/landing/postcss.config.cjs
/* const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const sharedConfig = require("@cadence/design-system/tailwind.config.js");

module.exports = {
  plugins: [
    // 1) Probe that PostCSS sees this file
    {
      postcssPlugin: "postcss-probe",
      Once(root, { result }) {
        console.log("✅ PostCSS config loaded from postcss.config.cjs");
      }
    },

    // 2) Tailwind plugin pointed explicitly at your landing/Tailwind config
    tailwindcss({
      config: "./tailwind.config.cjs"
    }),

    // 3) Autoprefixer
    autoprefixer()
  ]
};
module.exports.postcss = true; */
