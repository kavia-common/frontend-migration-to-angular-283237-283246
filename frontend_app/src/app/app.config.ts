import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, Title } from '@angular/platform-browser';
import { provideEnvironment } from './core/environment.token';
import { AppTitleStrategy } from './core/title.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    // Provide ENVIRONMENT token (browser uses built files; SSR reads process.env)
    provideEnvironment(),
    // Title service and custom TitleStrategy to control document titles via route data
    Title,
    { provide: TitleStrategy, useClass: AppTitleStrategy },
  ],
};
