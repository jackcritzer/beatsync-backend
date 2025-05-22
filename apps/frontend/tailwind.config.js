// apps/frontend/tailwind.config.js
import shared from "@cadence/design-system/tailwind.config.js";

export default config = {
  // inherit all your colors, fonts, and extensions
  ...shared,
  // but override the "content" paths to include your frontend source
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    // include your shared components so Tailwind picks up their classes
    "../packages/design-system/src/components/**/*.{js,ts,jsx,tsx}"
  ],
};