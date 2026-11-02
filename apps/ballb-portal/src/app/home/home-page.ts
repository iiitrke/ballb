import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurriculumService } from '@ballb/curriculum/data-access';
import { PageHeader } from '@ballb/shared/ui';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, PageHeader],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private readonly curriculum = inject(CurriculumService);

  protected readonly years = this.curriculum.years;
  protected readonly semesterCount = computed(() => this.curriculum.semesters().length);
  protected readonly subjectCount = computed(() => this.curriculum.allSubjects().length);
}
