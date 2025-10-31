import { Route } from '@angular/router';

/**
 * Application routes configuration.
 * Defines all routes for the application with lazy-loaded components.
 */
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/welcome/welcome').then(m => m.Welcome),
  },
  {
    path: 'files',
    loadComponent: () => import('./pages/files/files').then(m => m.Files),
  },
  { path: '**', redirectTo: '' },
];
