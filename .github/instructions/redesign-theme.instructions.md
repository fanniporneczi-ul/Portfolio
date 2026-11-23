---
applyTo: "src/**/*.{tsx,ts,css}"
---

# Visual Design System

## Aesthetic

Editorial EdTech portfolio—bold, warm, structured, and playful without looking juvenile. Use crisp editorial color-blocking and fine borders; do not use chalkboard or wood textures.

## Page Routing

- Keep `Introduction.tsx`, `Projects.tsx`, `Experience.tsx`, and `Contact.tsx` as separate page components in `src/components/sections/`.
- `App.tsx` owns `activePage` with the exact union `'home' | 'introduction' | 'projects' | 'experience' | 'contact'`.
- Keep the top navigation visible on every page, with the `Fanni Pörneczi` brand at the top-left. Clicking `Introduction`, `Projects`, `Experience`, or `Contact` switches to and renders only that page component. Clicking the brand returns to `'home'`.
- The `'home'` route renders only the standalone editorial Hero, sized to fit the viewport without scrolling into subpages.
- Each subpage renders alone with `min-height: 100vh` and vertical scrolling when its content exceeds the viewport. Never stack all pages in a scrolling homepage or present subpages as modal overlays/popups over a blurred background.

## Hero Layout

- Use a deep crimson (`#6B141A`) editorial split layout with a persistent top navbar and outlined pill links.
- Use `Headshot_unblurred.png` as the Home hero portrait within the rich crimson/terracotta accent card.
- Place stacked hollow `PORTFOLIO` echo typography to the right, using `-webkit-text-stroke` for the outlined treatment.
- Place a short welcome tagline at the bottom-left without replacing existing portfolio copy.
- Use the reusable `<CrayonStars />` SVG component for star accents.

## Color Palette

- Deep crimson background: `#6B141A`
- Crimson/terracotta accent: `#8E1B20`
- Warm buttercream surfaces: `#F3EAE0` and `#EFE6DB`
- Deep espresso ink on light surfaces: `#1E1818`
- Soft cream ink on crimson surfaces: `#F7F1E8`
- Powdery sky blue accent: `#BFD1E5`

## Typography

- Load `Plus Jakarta Sans` and `Inter` from Google Fonts in `index.html`.
- Use `Plus Jakarta Sans` for headings and navigation, with bold weights and tight tracking (`-0.02em`). Use it for the Hero headline and echo typography.
- Use `Inter` for body text, lists, and metadata (weights 400–500, `1rem`, `line-height: 1.6`).

## Crayon Star Motif

- Implement stars as a reusable `<CrayonStars />` SVG component, not external PNG assets.
- Define an SVG filter using `feTurbulence` and `feDisplacementMap` to give the star shapes an asymmetrical hand-drawn crayon/chalk texture.
- Color the stars with buttercream `#F3EAE0` and sky blue `#BFD1E5`. Keep decorative SVGs out of the accessibility tree.

## Interaction and Content

- Give the persistent navigation links and all other interactive links/buttons clear `1.5px` pill outlines, subtle hover lift, and visible keyboard focus.
- Preserve every existing title, description, and project/experience detail. The welcome tagline is additional copy, not a replacement.
- Use semantic, keyboard-operable controls and maintain WCAG AA contrast.
