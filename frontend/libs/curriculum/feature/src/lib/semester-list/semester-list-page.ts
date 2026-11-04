import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurriculumService } from '@ballb/curriculum/data-access';
import { PageHeader } from '@ballb/shared/ui';

@Component({
  selector: 'ballb-semester-list-page',
  imports: [RouterLink, PageHeader],
  template: `
    <ballb-page-header
      eyebrow="Programme structure"
      heading="Semesters"
      subtitle="The five-year integrated BA.LLB programme is divided into ten semesters. Pick a semester to see its subjects."
    />

    @for (year of years(); track year.year) {
      <section class="year" [attr.aria-labelledby]="'year-' + year.year">
        <h2 [id]="'year-' + year.year">Year {{ year.year }}</h2>
        <div class="grid">
          @for (semester of year.semesters; track semester.number) {
            <a class="card" [routerLink]="[semester.number]">
              <h3>Semester {{ semester.number }}</h3>
              <ul class="subject-list">
                @for (subject of semester.subjects; track subject.code) {
                  <li>{{ subject.title }}</li>
                }
              </ul>
            </a>
          }
        </div>
      </section>
    }
  `,
  styles: `
    .year {
      margin-bottom: 2rem;
    }
    .subject-list {
      margin: 0;
      padding-left: 1.1rem;
      color: var(--color-muted);
      font-size: 0.95rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SemesterListPage {
  protected readonly years = inject(CurriculumService).years;
}
