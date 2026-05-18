import type { ThemePreference } from "@/components/settings/settings-types"

/**
 * Resolve effective theme from user preference.
 * "system" is resolved using OS preference.
 */
export function resolveEffectiveTheme(preference: ThemePreference): "light" | "dark" {
  if (preference === "system") {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return "light"
  }
  return preference
}

/**
 * Apply the .dark class to document root based on effective theme.
 */
export function applyTheme(theme: "light" | "dark"): void {
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }
}

/**
 * Set up a listener for system theme changes.
 * Returns a cleanup function.
 */
export function setupSystemThemeListener(onChange: (theme: "light" | "dark") => void): () => void {
  if (typeof window === "undefined" || !window.matchMedia) {
    return () => {}
  }
  
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  
  const handler = (e: MediaQueryListEvent) => {
    onChange(e.matches ? "dark" : "light")
  }
  
  mediaQuery.addEventListener("change", handler)
  
  return () => {
    mediaQuery.removeEventListener("change", handler)
  }
}