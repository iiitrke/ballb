import { Route } from '@angular/router';
import { GlossaryPage } from './glossary-page';

/** Lazy-loaded under /glossary by the portal app. */
export const glossaryRoutes: Route[] = [
  {
    path: '',
    component: GlossaryPage,
    title: 'Legal Glossary | BA.LLB Learning Portal',
  },
];
