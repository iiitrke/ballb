import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Language, LanguageService } from '@ballb/shared/ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly languageService = inject(LanguageService);

  protected readonly universityName = 'Shakambhari University';
  protected readonly currentYear = new Date().getFullYear();

  /** Active UI language; the header toggle switches it. */
  protected readonly language = this.languageService.language;

  protected readonly navLinks = [
    { label: 'Home', path: '/', exact: true },
    { label: 'Semesters', path: '/semesters', exact: false },
    { label: 'Legal Glossary', path: '/glossary', exact: false },
  ];

  protected setLanguage(lang: Language): void {
    this.languageService.setLanguage(lang);
  }
}
