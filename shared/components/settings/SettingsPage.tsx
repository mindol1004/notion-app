"use client"

import { ArrowLeft, Globe, Palette, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Icon } from "../common/Icon"
import { useSettingsLogic } from "./hooks/use-settings-logic"

export function SettingsPage() {
  const { theme, isDarkMode, locale, t, handleThemeChange, handleLanguageChange, handleBack } = useSettingsLogic()

  return (
    <div className="flex flex-col h-full">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-6">
        <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
          <Icon icon={ArrowLeft} />
          {t.common.back}
        </Button>
        <Separator orientation="vertical" className="mx-2 h-4" />
        <h1 className="text-sm font-medium">{t.settings.title}</h1>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{t.settings.title}</h2>
            <p className="text-muted-foreground">{t.settings.description}</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon icon={Globe} />
                  {t.settings.language}
                </CardTitle>
                <CardDescription>{t.settings.languageDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="language">{t.settings.selectLanguage}</Label>
                  <Select value={locale} onValueChange={handleLanguageChange}>
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ko">{t.settings.korean}</SelectItem>
                      <SelectItem value="en">{t.settings.english}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon icon={Palette} />
                  {t.settings.appearance}
                </CardTitle>
                <CardDescription>{t.settings.themeDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Label>{t.settings.selectTheme}</Label>
                  <RadioGroup value={theme} onValueChange={handleThemeChange} className="grid grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light">{t.settings.light}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark">{t.settings.dark}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system">{t.settings.system}</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon icon={Info} />
                  {t.settings.about}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{t.settings.version}</span>
                    <span className="text-sm font-mono">1.0.0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
