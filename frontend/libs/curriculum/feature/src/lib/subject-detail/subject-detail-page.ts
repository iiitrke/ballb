import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurriculumService } from '@ballb/curriculum/data-access';
import { PageHeader, TranslatePipe } from '@ballb/shared/ui';
import { SubjectBadges } from '../subject-badges/subject-badges';

@Component({
  selector: 'ballb-subject-detail-page',
  imports: [RouterLink, PageHeader, SubjectBadges, TranslatePipe],
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
      <ballb-subject-badges [subject]="sub" />
      <ballb-page-header [eyebrow]="eyebrow()" [heading]="sub.title" [subtitle]="sub.summary" />

      @if (sub.source === 'sample') {
        <p class="notice section">
          This is sample content, not the official Shakambhari University syllabus.
        </p>
      }

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
        <h2>{{ sub.practical ? 'Course components' : 'Unit outline' }}</h2>
        @for (unit of sub.units; track unit.title; let i = $index) {
          <details class="card unit" [open]="i === 0">
            <summary>
              @if (!sub.practical) {
                <strong>Unit {{ i + 1 }}:</strong>
              }
              {{ unit.title }}
            </summary>
            <ul>
              @for (topic of unit.topics; track topic) {
                <li>{{ topic | tr }}</li>
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

      @if (sub.assessment?.length) {
        <section class="card section">
          <h2>Marking scheme</h2>
          @if (sub.maxMarks) {
            <p class="muted">Maximum marks: {{ sub.maxMarks }}</p>
          }
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Component</th>
                <th scope="col">Marks</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              @for (row of sub.assessment; track row.component) {
                <tr>
                  <td>{{ row.component }}</td>
                  <td>{{ row.marks }}</td>
                  <td>{{ row.details }}</td>
                </tr>
              }
            </tbody>
          </table>
          @if (sub.assessmentNote) {
            <p class="muted small">{{ sub.assessmentNote }}</p>
          }
        </section>
      }

      @if (sub.books?.length) {
        <section class="card section">
          <h2>Books recommended</h2>
          <ul class="books">
            @for (book of sub.books; track book.author + book.title) {
              <li>
                {{ book.author }}, <cite>{{ book.title }}</cite>
              </li>
            }
          </ul>
        </section>
      }
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
    .small {
      font-size: 0.85rem;
      margin-bottom: 0;
    }
    .books li {
      margin-bottom: 0.35rem;
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

  protected readonly eyebrow = computed(() => {
    const sub = this.subject();
    if (!sub) return '';
    const parts = [sub.source === 'official' ? `Paper Code ${sub.code}` : sub.code];
    if (sub.credits) parts.push(`${sub.credits} credits`);
    if (sub.maxMarks) parts.push(`Max. marks ${sub.maxMarks}`);
    return parts.join(' · ');
  });
}
