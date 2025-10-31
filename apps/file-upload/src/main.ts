import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

/**
 * Bootstrap the Angular application.
 * Initializes the app with provided configuration and bootstraps the root component.
 *
 * @param err - Error object if bootstrap fails
 */
bootstrapApplication(App, appConfig).catch(err => console.error(err));
