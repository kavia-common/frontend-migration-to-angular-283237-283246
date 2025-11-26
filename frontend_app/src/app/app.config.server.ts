import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideEnvironment } from './core/environment.token';
import { Title } from '@angular/platform-browser';
import { TitleStrategy } from '@angular/router';
import { AppTitleStrategy } from './core/title.strategy';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    // Ensure ENVIRONMENT is provided in SSR and can read process.env
    provideEnvironment(),
    // Keep SSR title generation consistent with client
    Title,
    { provide: TitleStrategy, useClass: AppTitleStrategy },
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
