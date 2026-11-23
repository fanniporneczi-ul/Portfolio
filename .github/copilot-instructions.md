# Repository Instructions

- **Stack:** React, TypeScript, and Vite. Keep the GitHub Pages base path set to `/Portfolio/`. Use the existing plain CSS files and component stylesheets; do not add styling dependencies without a specific need.
- **Page routing:** Keep `Introduction.tsx`, `Projects.tsx`, `Experience.tsx`, and `Contact.tsx` as separate page components in `src/components/sections/`. `App.tsx` controls routing with `activePage`, typed as `'home' | 'introduction' | 'projects' | 'experience' | 'contact'`.
- **Page rendering:** Keep the top navigation persistent, with the `Fanni Pörneczi` brand at the top-left. Selecting a page renders only that page component; selecting the brand returns to `'home'`. The home route renders only the standalone Hero and fits the viewport without scrolling into subpages. Subpages use at least `100vh` and scroll vertically when their own content exceeds the viewport.
- **No stacked or modal pages:** Do not stack every page on one scrolling homepage. Do not show subpages in modal overlays, popups, or over a blurred background.
- **Content:** Keep existing copy, titles, and project/experience details intact during visual changes unless explicitly asked to change them.
- **Accessibility and quality:** Use semantic HTML, strict TypeScript (no `any`), WCAG AA contrast, visible keyboard focus, and keyboard-operable controls.
- **Changes and verification:** Follow existing patterns and keep changes focused. For code changes, run `npm run lint` and `npm run build`; update relevant tests or documentation when behavior or usage changes.
- **Visual redesigns:** Follow `.github/instructions/redesign-theme.instructions.md` when changing the portfolio’s visual theme.
