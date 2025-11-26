import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideEnvironment } from './core/environment.token';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    // Ensure ENVIRONMENT is provided in SSR and can read process.env
    provideEnvironment(),
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
