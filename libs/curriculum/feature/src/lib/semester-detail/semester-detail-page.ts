import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurriculumService } from '@ballb/curriculum/data-access';
import { PageHeader } from '@ballb/shared/ui';

@Component({
  selector: 'ballb-semester-detail-page',
  imports: [RouterLink, PageHeader],
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
        [subtitle]="sem.subjects.length + ' subjects · ' + totalCredits() + ' credits'"
      />

      <div class="grid">
        @for (subject of sem.subjects; track subject.code) {
          <a class="card" [routerLink]="[subject.code]">
            <span class="badge">{{ subject.category }}</span>
            <h3>{{ subject.title }}</h3>
            <p class="muted">{{ subject.summary }}</p>
            <small class="muted">{{ subject.code }} · {{ subject.credits }} credits</small>
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
  protected readonly totalCredits = computed(
    () => this.data()?.subjects.reduce((sum, s) => sum + s.credits, 0) ?? 0,
  );
  protected readonly lastSemester = computed(() => this.curriculum.semesters().length);
}
