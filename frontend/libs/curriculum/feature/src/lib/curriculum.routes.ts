import { Route } from '@angular/router';
import { SemesterDetailPage } from './semester-detail/semester-detail-page';
import { SemesterListPage } from './semester-list/semester-list-page';
import { SubjectDetailPage } from './subject-detail/subject-detail-page';

/** Lazy-loaded under /semesters by the portal app. */
export const curriculumRoutes: Route[] = [
  {
    path: '',
    component: SemesterListPage,
    title: 'Semesters | BA.LLB Learning Portal',
  },
  {
    // Component inputs `semester` and `code` are bound from these params.
    path: ':semester',
    component: SemesterDetailPage,
    title: (route) => `Semester ${route.paramMap.get('semester')} | BA.LLB Learning Portal`,
  },
  {
    path: ':semester/:code',
    component: SubjectDetailPage,
    title: (route) => `${route.paramMap.get('code')?.toUpperCase()} | BA.LLB Learning Portal`,
  },
];
