import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, Title } from '@angular/platform-browser';
import { provideEnvironment } from './core/environment.token';
import { AppTitleStrategy } from './core/title.strategy';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    // Register HTTP client with a no-op auth interceptor scaffold.
    // This preserves current behavior; interceptor can be extended later.
    provideHttpClient(withInterceptors([authInterceptor])),
    // Provide ENVIRONMENT token (browser uses built files; SSR reads process.env)
    provideEnvironment(),
    // Title service and custom TitleStrategy to control document titles via route data
    Title,
    { provide: TitleStrategy, useClass: AppTitleStrategy },
  ],
};
