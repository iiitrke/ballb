import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from '../language/language.service';

/**
 * A string, or text available per language. Structurally matches the curriculum
 * `Text` type without creating a dependency on the data-access library.
 */
export type Translatable = string | { en: string; hi?: string };

/**
 * Resolves a {@link Translatable} to the active language, falling back to English
 * when no translation exists.
 *
 * Usage: `{{ topic | tr }}`
 *
 * Impure so it re-resolves when the language signal changes (the signal is read
 * during transform, so toggling it re-renders the host view).
 */
@Pipe({ name: 'tr', pure: false })
export class TranslatePipe implements PipeTransform {
  private readonly languageService = inject(LanguageService);

  transform(value: Translatable | null | undefined): string {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    const lang = this.languageService.language();
    return (lang === 'hi' && value.hi) || value.en;
  }
}
