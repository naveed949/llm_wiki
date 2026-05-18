# Issue 003: Theme Application — Class Toggling + System Listening

## Parent

Dark Theme Support (plans/dark-theme.md)

## What to build

Core theme application logic that applies `.dark` class to `<html>` and listens for system theme changes.

**Tasks:**
1. Create `src/lib/theme-utils.ts` with:
   - `resolveEffectiveTheme(preference: ThemePreference): "light" | "dark"` — resolves "system" to actual using `window.matchMedia("(prefers-color-scheme: dark)").matches`
   - `applyTheme(theme: "light" | "dark"): void` — toggles `.dark` class on `document.documentElement`
   - `setupSystemThemeListener(onChange: (theme: "light" | "dark") => void): () => void` — returns cleanup function
2. In `App.tsx`:
   - After theme preference loads, call `applyTheme(resolveEffectiveTheme(preference))`
   - If preference is "system", set up listener to re-apply on OS theme change
   - Clean up listener on preference change or unmount
3. When user changes theme in settings (after save), re-apply theme

## Acceptance criteria

- [ ] `.dark` class added to `<html>` when effective theme is "dark"
- [ ] `.dark` class removed from `<html>` when effective theme is "light"
- [ ] Switching to "system" follows OS preference immediately
- [ ] OS theme change while in "system" mode updates the app theme
- [ ] Listener cleaned up properly on preference change

## Blocked by

Issue 001 (needs theme preference loaded and applyTheme utility)