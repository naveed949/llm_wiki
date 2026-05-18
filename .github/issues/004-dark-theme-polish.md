# Issue 004: Polish — Transitions + Flash Prevention

## Parent

Dark Theme Support (plans/dark-theme.md)

## What to build

Smooth visual transitions and flash prevention for theme switching.

**Tasks:**
1. **CSS Transitions** — In `src/index.css`:
   - Add `transition: background-color 200ms ease, color 200ms ease, border-color 200ms ease` to `body`
   - Ensure all color-affecting elements use CSS variables (no hardcoded colors)

2. **Dark Mode Scrollbar** — Update `.legend-scroll` scrollbar styles in `src/index.css`:
   - Webkit scrollbar thumb: use `oklch(0.7 0 0)` for dark mode (already has light mode)
   - Add `color-scheme: light dark` to support browser-native scrollbars

3. **Flash Prevention** — In `index.html`:
   - Add inline `<script>` before React bundle that:
     - Reads `themePreference` from localStorage (key: `app-state.json` -> `themePreference`)
     - OR reads from `localStorage.getItem('theme')` for immediate access
     - Computes effective theme
     - Immediately applies/removes `.dark` class before any content renders
   - This prevents flash of wrong theme on page load

4. **Settings Save** — When saving settings in `src/components/settings/settings-view.tsx`:
   - After saving, immediately call `applyTheme()` to update the UI
   - The current implementation may already do this, verify and enhance if needed

## Acceptance criteria

- [ ] Theme transition is smooth (200ms ease, no jarring snaps)
- [ ] Scrollbar styling works in both light and dark modes
- [ ] No flash of wrong theme on page reload (verified by refreshing page)
- [ ] Theme change from settings applies immediately with smooth transition

## Blocked by

Issue 003 (needs applyTheme function to call after save)