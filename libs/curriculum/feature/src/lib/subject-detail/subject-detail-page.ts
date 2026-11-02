import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurriculumService } from '@ballb/curriculum/data-access';
import { PageHeader } from '@ballb/shared/ui';

@Component({
  selector: 'ballb-subject-detail-page',
  imports: [RouterLink, PageHeader],
  template: `
    <nav aria-label="Breadcrumb">
      <ol class="breadcrumb">
        <li><a routerLink="/">Home</a></li>
        <li><a routerLink="/semesters">Semesters</a></li>
        <li>
          <a [routerLink]="['/semesters', semester()]">Semester {{ semester() }}</a>
        </li>
        <li aria-current="page">{{ code() }}</li>
      </ol>
    </nav>

    @if (subject(); as sub) {
      <ballb-page-header
        [eyebrow]="sub.code + ' · ' + sub.category + ' · ' + sub.credits + ' credits'"
        [heading]="sub.title"
        [subtitle]="sub.summary"
      />

      @if (sub.statutes?.length) {
        <section class="card section">
          <h2>Statutes to read</h2>
          <ul>
            @for (statute of sub.statutes; track statute) {
              <li>{{ statute }}</li>
            }
          </ul>
        </section>
      }

      <section class="section">
        <h2>Unit outline</h2>
        @for (unit of sub.units; track unit.title; let i = $index) {
          <details class="card unit" [open]="i === 0">
            <summary>
              <strong>Unit {{ i + 1 }}:</strong> {{ unit.title }}
            </summary>
            <ul>
              @for (topic of unit.topics; track topic) {
                <li>{{ topic }}</li>
              }
            </ul>
          </details>
        } @empty {
          <p class="notice">
            The unit outline for this subject has not been added yet. Please refer to the official
            Shakambhari University syllabus.
          </p>
        }
      </section>
    } @else {
      <ballb-page-header heading="Subject not found" />
      <p>
        No subject "{{ code() }}" in semester {{ semester() }}.
        <a [routerLink]="['/semesters', semester()]">Back to the semester</a>.
      </p>
    }
  `,
  styles: `
    .section {
      margin-bottom: 1.5rem;
    }
    .unit {
      margin-bottom: 0.75rem;
      padding-block: 0.75rem;
    }
    summary {
      cursor: pointer;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectDetailPage {
  private readonly curriculum = inject(CurriculumService);

  /** Bound from the `:semester` route param. */
  readonly semester = input.required<string>();
  /** Bound from the `:code` route param. */
  readonly code = input.required<string>();

  protected readonly subject = computed(() =>
    this.curriculum.subject(Number(this.semester()), this.code()),
  );
}
