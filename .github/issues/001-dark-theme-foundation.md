# Issue 001: Foundation — Types, Store, Persistence

## Parent

Dark Theme Support (plans/dark-theme.md)

## What to build

Add the foundational types and persistence layer for theme preference.

**Tasks:**
1. Add type `ThemePreference = "light" | "dark" | "system"` to `src/components/settings/settings-types.ts`
2. Add `themePreference: ThemePreference` field to `SettingsDraft` interface
3. Add `themePreference: ThemePreference` field to `WikiState` interface in `src/stores/wiki-store.ts`
4. Add `setThemePreference` action to `WikiState`
5. Add `saveThemePreference` / `loadThemePreference` functions to `src/lib/project-store.ts`
   - Key: `themePreference`
   - Uses existing `getStore()` pattern
6. In `src/App.tsx` init section, load persisted theme preference after other configs load

## Acceptance criteria

- [ ] `ThemePreference` type defined and exported
- [ ] Theme preference stored in `WikiState` with default `"system"`
- [ ] Theme preference persisted to `app-state.json` under key `themePreference`
- [ ] Theme preference loaded on app startup in `App.tsx` init

## Blocked by

None - can start immediately