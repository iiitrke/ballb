import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurriculumService } from '@ballb/curriculum/data-access';
import { PageHeader } from '@ballb/shared/ui';
import { SubjectBadges } from '../subject-badges/subject-badges';

@Component({
  selector: 'ballb-semester-detail-page',
  imports: [RouterLink, PageHeader, SubjectBadges],
  template: `
    <nav aria-label="Breadcrumb">
      <ol class="breadcrumb">
        <li><a routerLink="/">Home</a></li>
        <li><a routerLink="/semesters">Semesters</a></li>
        <li aria-current="page">Semester {{ semester() }}</li>
      </ol>
    </nav>

    @if (data(); as sem) {
      <ballb-page-header
        [eyebrow]="'Year ' + sem.year"
        [heading]="'Semester ' + sem.number"
        [subtitle]="subtitle()"
      />

      @if (sem.note) {
        <p class="notice note">{{ sem.note }}</p>
      }

      @if (hasOptional()) {
        <p class="muted">
          Papers marked <strong>Optional</strong> that share the same paper number are alternatives:
          students take one of them.
        </p>
      }

      <div class="grid">
        @for (subject of sem.subjects; track subject.code) {
          <a class="card" [routerLink]="[subject.code]">
            <ballb-subject-badges [subject]="subject" />
            <h3>{{ subject.title }}</h3>
            <p class="muted">{{ subject.summary }}</p>
            <small class="muted">
              {{ subject.source === 'official' ? 'Paper Code ' : '' }}{{ subject.code }}
              @if (subject.credits) {
                · {{ subject.credits }} credits
              }
              @if (subject.maxMarks) {
                · Max. marks {{ subject.maxMarks }}
              }
            </small>
          </a>
        }
      </div>

      <nav class="pager" aria-label="Semester navigation">
        @if (sem.number > 1) {
          <a [routerLink]="['/semesters', sem.number - 1]">&larr; Semester {{ sem.number - 1 }}</a>
        }
        @if (sem.number < lastSemester()) {
          <a class="next" [routerLink]="['/semesters', sem.number + 1]">
            Semester {{ sem.number + 1 }} &rarr;
          </a>
        }
      </nav>
    } @else {
      <ballb-page-header heading="Semester not found" />
      <p>
        There is no semester "{{ semester() }}". <a routerLink="/semesters">See all semesters</a>.
      </p>
    }
  `,
  styles: `
    .note {
      margin-bottom: 1.25rem;
    }
    .pager {
      display: flex;
      margin-top: 2rem;
    }
    .next {
      margin-left: auto;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SemesterDetailPage {
  private readonly curriculum = inject(CurriculumService);

  /** Bound from the `:semester` route param. */
  readonly semester = input.required<string>();

  protected readonly data = computed(() => this.curriculum.semester(Number(this.semester())));
  protected readonly lastSemester = computed(() => this.curriculum.semesters().length);
  protected readonly hasOptional = computed(
    () => this.data()?.subjects.some((s) => s.optional) ?? false,
  );

  protected readonly subtitle = computed(() => {
    const subjects = this.data()?.subjects ?? [];
    const credits = subjects.reduce((sum, s) => sum + (s.credits ?? 0), 0);
    const count = `${subjects.length} ${subjects.length === 1 ? 'paper' : 'papers'}`;
    return credits > 0 ? `${count} · ${credits} credits` : count;
  });
}
