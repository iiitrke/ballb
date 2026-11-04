import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { PageHeader } from '@ballb/shared/ui';
import { GLOSSARY } from './glossary.data';

@Component({
  selector: 'ballb-glossary-page',
  imports: [PageHeader],
  template: `
    <ballb-page-header
      eyebrow="Study tools"
      heading="Legal Glossary"
      subtitle="Latin maxims and legal terms you will meet throughout the BA.LLB programme."
    />

    <label class="search">
      <span class="muted">Search terms, meanings or subjects</span>
      <input
        #search
        class="input"
        type="search"
        placeholder="e.g. writ, torts, natural justice"
        [value]="query()"
        (input)="query.set(search.value)"
      />
    </label>

    <p class="muted" aria-live="polite">{{ results().length }} of {{ total }} terms</p>

    <dl class="terms">
      @for (item of results(); track item.term) {
        <div class="card term">
          <dt>{{ item.term }}</dt>
          <dd>{{ item.meaning }}</dd>
          <dd>
            <span class="badge">{{ item.context }}</span>
          </dd>
        </div>
      } @empty {
        <p class="notice">No terms match "{{ query() }}".</p>
      }
    </dl>
  `,
  styles: `
    .search {
      display: grid;
      gap: 0.35rem;
      margin-bottom: 0.75rem;
      max-width: 480px;
    }
    .terms {
      display: grid;
      gap: 0.75rem;
      margin: 0;
    }
    dt {
      font-family: var(--font-serif);
      font-style: italic;
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--color-primary-dark);
    }
    dd {
      margin: 0.25rem 0 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlossaryPage {
  protected readonly total = GLOSSARY.length;
  protected readonly query = signal('');

  protected readonly results = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return GLOSSARY;
    return GLOSSARY.filter((t) => `${t.term} ${t.meaning} ${t.context}`.toLowerCase().includes(q));
  });
}
