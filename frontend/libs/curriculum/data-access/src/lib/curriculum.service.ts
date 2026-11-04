import { Injectable, computed, signal } from '@angular/core';
import { CURRICULUM } from './curriculum.data';
import { Semester, StudyYear, Subject } from './curriculum.models';

/**
 * Read-only access to the BA.LLB curriculum.
 *
 * Data is bundled statically for now. Later it can be replaced with an HTTP
 * call (e.g. httpResource) without changing the public signal-based API.
 */
@Injectable({ providedIn: 'root' })
export class CurriculumService {
  private readonly data = signal<Semester[]>(CURRICULUM);

  readonly semesters = this.data.asReadonly();

  readonly years = computed<StudyYear[]>(() => {
    const byYear = new Map<number, Semester[]>();
    for (const semester of this.data()) {
      byYear.set(semester.year, [...(byYear.get(semester.year) ?? []), semester]);
    }
    return [...byYear.entries()]
      .sort(([a], [b]) => a - b)
      .map(([year, semesters]) => ({ year, semesters }));
  });

  readonly allSubjects = computed<Subject[]>(() => this.data().flatMap((s) => s.subjects));

  semester(number: number): Semester | undefined {
    return this.data().find((s) => s.number === number);
  }

  subject(semesterNumber: number, code: string): Subject | undefined {
    return this.semester(semesterNumber)?.subjects.find(
      (s) => s.code.toLowerCase() === code.toLowerCase(),
    );
  }
}
