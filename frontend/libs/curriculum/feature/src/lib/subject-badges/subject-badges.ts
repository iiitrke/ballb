import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Subject } from '@ballb/curriculum/data-access';

/** Row of badges describing a subject: source, paper number, optional/practical, category. */
@Component({
  selector: 'ballb-subject-badges',
  template: `
    <div class="badges">
      @if (subject().source === 'official') {
        <span class="badge badge--official">Official syllabus</span>
      } @else {
        <span class="badge badge--sample">Sample content</span>
      }
      @if (subject().paper) {
        <span class="badge">{{ subject().paper }}</span>
      }
      @if (subject().optional) {
        <span class="badge">Optional</span>
      }
      @if (subject().practical) {
        <span class="badge">Practical</span>
      }
      <span class="badge">{{ subject().category }}</span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectBadges {
  readonly subject = input.required<Subject>();
}
