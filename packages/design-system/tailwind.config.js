import { typography, colors } from "./tokens.js";

console.log(`design system tailwind.config`)
module.exports = {
  theme: {
    extend: {
        colors,
        fontFamily: {
                body: typography.body.fontFamily,
                heading: typography.h1.fontFamily,
            },
            fontSize: {
                h1: [typography.h1.fontSize, typography.h1.lineHeight],
                h2: [typography.h2.fontSize, typography.h2.lineHeight],
                h3: [typography.h3.fontSize, typography.h3.lineHeight],
                body: [typography.body.fontSize, typography.body.lineHeight],
                bodyEmphasis: [typography.bodyEmphasis.fontSize, typography.bodyEmphasis.lineHeight],
                small: [typography.small.fontSize, typography.small.lineHeight],
                caption: [typography.caption.fontSize, typography.caption.lineHeight],
                button: [typography.button.fontSize, typography.button.lineHeight],
                tag: [typography.tag.fontSize, typography.tag.lineHeight],
                labelAllCaps: [typography.labelAllCaps.fontSize, typography.labelAllCaps.lineHeight],
            },
            fontWeight: {
                regular: 400,
                medium: 500,
                bold: 700,
            },
    }
  },
  plugins: []
};