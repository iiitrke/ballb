import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Consistent page heading used at the top of every portal page.
 *
 * Usage:
 * <ballb-page-header eyebrow="Year 1" heading="Semester 1" subtitle="..." />
 */
@Component({
  selector: 'ballb-page-header',
  template: `
    <header class="page-header">
      @if (eyebrow()) {
        <p class="page-header__eyebrow">{{ eyebrow() }}</p>
      }
      <h1 class="page-header__title">{{ heading() }}</h1>
      @if (subtitle()) {
        <p class="page-header__subtitle">{{ subtitle() }}</p>
      }
      <ng-content />
    </header>
  `,
  styles: `
    .page-header {
      margin-bottom: 2rem;
    }
    .page-header__eyebrow {
      margin: 0;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--color-muted);
    }
    .page-header__title {
      margin: 0.25rem 0 0.5rem;
      font-size: clamp(1.75rem, 4vw, 2.5rem);
    }
    .page-header__subtitle {
      margin: 0;
      max-width: 70ch;
      color: var(--color-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeader {
  readonly heading = input.required<string>();
  readonly eyebrow = input<string>();
  readonly subtitle = input<string>();
}
