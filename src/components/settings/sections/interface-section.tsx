import { useTranslation } from "react-i18next"
import { Label } from "@/components/ui/label"
import type { SettingsDraft, DraftSetter } from "../settings-types"

interface Props {
  draft: SettingsDraft
  setDraft: DraftSetter
}

const UI_LANGUAGES = [
  { value: "en", label: "English" },
  { value: "zh", label: "中文" },
]

export function InterfaceSection({ draft, setDraft }: Props) {
  const { t } = useTranslation()
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">{t("settings.sections.interface.title")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("settings.sections.interface.description")}
        </p>
      </div>

      <div className="space-y-2">
        <Label>{t("settings.sections.interface.uiLanguage")}</Label>
        <div className="flex flex-wrap gap-2">
          {UI_LANGUAGES.map((l) => {
            const active = draft.uiLanguage === l.value
            return (
              <button
                key={l.value}
                type="button"
                onClick={() => setDraft("uiLanguage", l.value)}
                className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:bg-accent"
                }`}
              >
                {l.label}
              </button>
            )
          })}
        </div>
        <p className="text-xs text-muted-foreground">
          {t("settings.sections.interface.uiLanguageHint")}
        </p>
      </div>

      <div className="space-y-2">
        <Label>{t("settings.sections.interface.theme")}</Label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setDraft("themePreference", "light")}
            className={`rounded-md border px-3 py-1.5 text-sm transition-colors flex items-center gap-1.5 ${
              draft.themePreference === "light"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:bg-accent"
            }`}
          >
            <span>☀️</span> {t("settings.sections.interface.light")}
          </button>
          <button
            type="button"
            onClick={() => setDraft("themePreference", "dark")}
            className={`rounded-md border px-3 py-1.5 text-sm transition-colors flex items-center gap-1.5 ${
              draft.themePreference === "dark"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:bg-accent"
            }`}
          >
            <span>🌙</span> {t("settings.sections.interface.dark")}
          </button>
          <button
            type="button"
            onClick={() => setDraft("themePreference", "system")}
            className={`rounded-md border px-3 py-1.5 text-sm transition-colors flex items-center gap-1.5 ${
              draft.themePreference === "system"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:bg-accent"
            }`}
          >
            <span>💻</span> {t("settings.sections.interface.system")}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          {t("settings.sections.interface.themeHint")}
        </p>
      </div>
    </div>
  )
}
