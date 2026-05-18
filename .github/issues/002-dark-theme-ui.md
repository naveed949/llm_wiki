# Issue 002: Settings UI — Theme Selector

## Parent

Dark Theme Support (plans/dark-theme.md)

## What to build

Add theme selector UI in Settings → Interface section.

**Tasks:**
1. Add three-button toggle in `src/components/settings/sections/interface-section.tsx`
   - Light ☀️ button with label "Light"
   - Dark 🌙 button with label "Dark"  
   - System 💻 button with label "System"
2. Active state: `border-primary bg-primary text-primary-foreground`
3. Inactive state: `border-border hover:bg-accent`
4. Wire up `setDraft("themePreference", value)` for each button
5. Display current selection from `draft.themePreference`

## Acceptance criteria

- [ ] Three buttons displayed: Light, Dark, System with icons
- [ ] Active theme button has primary styling
- [ ] Clicking a button updates the draft state
- [ ] Initial state reflects current `themePreference` value

## Blocked by

Issue 001 (needs themePreference in SettingsDraft)