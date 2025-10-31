import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { filesReducer, filesFeatureKey } from './state/files.reducer';
import { FilesEffects } from './state/files.effects';

/**
 * Application configuration.
 * Sets up NgRx store, effects, routing, and zone configuration.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ [filesFeatureKey]: filesReducer }),
    provideEffects([FilesEffects]),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
  ],
};
