import { Route } from '@angular/router';
import { HomePage } from './home/home-page';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomePage,
    title: 'BA.LLB Learning Portal | Shakambhari University',
  },
  {
    path: 'semesters',
    loadChildren: () => import('@ballb/curriculum/feature').then((m) => m.curriculumRoutes),
  },
  {
    path: 'glossary',
    loadChildren: () => import('@ballb/glossary/feature').then((m) => m.glossaryRoutes),
  },
  { path: '**', redirectTo: '' },
];
