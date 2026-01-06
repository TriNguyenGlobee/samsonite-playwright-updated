export function getLocales(): string[] {
    const localeEnv = process.env.LOCALE;

    if (!localeEnv) {
        console.warn("LOCALE not set. Defaulting to ['jp'].");
        return ["jp"];
    }

    return localeEnv
        .split(",")
        .map(l => l.trim().toLowerCase())
        .filter(Boolean);
}

export function shouldRunForLocale(testLocales: string[], currentLocales: string[]): boolean {
    return testLocales.some(locale => currentLocales.includes(locale.toLowerCase()));
}
