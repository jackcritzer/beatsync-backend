console.log("⚡️ Tailwind config loaded from:", __filename);
console.log("  • Content globs:", module.exports.content);

// apps/landing/tailwind.config.cjs
import shared from "@cadence/design-system/tailwind.config.js"

console.log(`SHARED: ${shared}`)

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/app/globals.css",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],

  theme: {
    // <-- here’s the magic: extend, not replace
    extend: {
      // your design-system tokens
      ...shared.theme.extend
    }
  },

  // include any plugins your design-system defines
  plugins: shared.plugins || []
};
