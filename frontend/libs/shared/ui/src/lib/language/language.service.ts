import { Injectable, effect, signal } from '@angular/core';

/** Languages the portal can display content in. */
export type Language = 'en' | 'hi';

const STORAGE_KEY = 'ballb.language';

/**
 * Holds the active UI language as a signal and persists it across visits.
 *
 * Components read {@link language} (directly or via the `tr` pipe); toggling it
 * re-renders anything that resolved translatable content.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly language = signal<Language>(readInitial());

  constructor() {
    // Persist the choice and reflect it on <html lang> for accessibility.
    effect(() => {
      const lang = this.language();
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        // Storage may be unavailable (private mode); the toggle still works in-session.
      }
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
      }
    });
  }

  setLanguage(lang: Language): void {
    this.language.set(lang);
  }

  toggle(): void {
    this.language.update((l) => (l === 'en' ? 'hi' : 'en'));
  }
}

function readInitial(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'hi') return stored;
  } catch {
    // ignore
  }
  return 'en';
}
