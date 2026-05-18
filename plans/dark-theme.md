# Dark Theme Support — PRD

## Problem Statement

Users want a dark theme option to reduce eye strain during extended use. Currently the app only renders in light mode. The CSS variables for dark mode exist but are never applied.

## Solution

Add a theme toggle (Light / Dark / System) in Settings → Interface that:
- Persists the user's preference to `app-state.json`
- Applies the `.dark` class to `<html>` element on toggle
- Reads preference on app startup and applies before first paint (prevent flash)
- Transitions smoothly between themes

## User Stories

1. As a user, I want to switch to dark theme so I can reduce eye strain in low-light environments
2. As a user, I want my theme preference to persist across app restarts so I don't have to re-select it
3. As a user, I want to follow my OS theme setting automatically so the app feels native
4. As a user, I want smooth color transitions when switching themes so the change feels polished
5. As a user, I want theme to apply before first paint so I don't see a flash of light colors
6. As a user with accessibility needs, I want high contrast in dark mode so content remains readable

## Implementation Decisions

### Modules to Modify

**1. Theme Store (`src/stores/wiki-store.ts`)**
- Add `themePreference: "light" | "dark" | "system"` to `WikiState`
- Add `setThemePreference` action

**2. Settings Draft (`src/components/settings/settings-types.ts`)**
- Add `theme: "light" | "dark" | "system"` to `SettingsDraft`

**3. Persistence Layer (`src/lib/project-store.ts`)**
- Add `saveThemePreference` / `loadThemePreference` functions
- Use existing `app-state.json` store
- Key: `themePreference`

**4. Settings UI (`src/components/settings/sections/interface-section.tsx`)**
- Add theme selector with three buttons: Light ☀️, Dark 🌙, System 💻
- Active state styled with `border-primary bg-primary`

**5. Theme Application (`src/App.tsx`)**
- On mount, load persisted theme preference
- Compute effective theme (resolve "system" to actual using `matchMedia`)
- Apply/remove `.dark` class on `<html>` element
- Listen for OS theme changes when in "system" mode
- Add CSS transition for smooth theme changes

**6. CSS (`src/index.css`)**
- Add `transition: background-color 200ms, color 200ms` to `body`
- Ensure custom scrollbar styles work in dark mode

### Key Interfaces

```typescript
// WikiState addition
interface WikiState {
  // ...existing fields...
  themePreference: "light" | "dark" | "system"
  setThemePreference: (theme: "light" | "dark" | "system") => void
}

// Persisted shape
type ThemePreference = "light" | "dark" | "system"
```

### Theme Resolution Logic

```
effectiveTheme =
  if themePreference === "system"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    : themePreference

apply:
  document.documentElement.classList.toggle("dark", effectiveTheme === "dark")
```

### System Theme Listening

When `themePreference === "system"`:
1. Add listener to `matchMedia("prefers-color-scheme")`
2. Re-apply theme on change
3. Remove listener on preference change to non-system

## Testing Decisions

- **Module focus**: Theme application logic (pure function, no DOM)
- **Behavior tests**: 
  - Verify `.dark` class applied/removed correctly
  - Verify system preference change triggers update
  - Verify persistence roundtrip
- **Visual regression**: Manual verification that all components render correctly in both modes
- **Prior art**: Existing `settings-types` tests pattern

## Out of Scope

- Per-project theme settings (global setting only)
- Custom color scheme customization
- Automatic scheduling (e.g., dark mode at night)
- Tauri native window theming (CSS-only approach)

## Further Notes

- CSS dark mode variables already defined in `src/index.css`
- Need to ensure no hardcoded colors bypass CSS variables
- Flash prevention requires synchronous theme application in `<head>` via inline script OR loading from persisted storage before React hydration
- Consider `data-theme` attribute alternative to `.dark` class for Tailwind compatibility