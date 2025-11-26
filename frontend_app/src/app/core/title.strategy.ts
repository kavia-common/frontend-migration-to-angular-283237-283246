import { Injectable, Inject, Optional } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { ENVIRONMENT, EnvShape } from '../core/environment.token';
import { environment as builtEnvironment } from '../../environments/environment';

/**
 * PUBLIC_INTERFACE
 * AppTitleStrategy sets the document title based on the deepest route's data.title or title field.
 * It appends the application name suffix for consistency.
 */
@Injectable()
export class AppTitleStrategy extends TitleStrategy {
  private readonly env: EnvShape;

  constructor(
    private readonly title: Title,
    @Optional() @Inject(ENVIRONMENT) injectedEnv?: EnvShape
  ) {
    super();
    this.env = injectedEnv ?? builtEnvironment;
  }

  /**
   * PUBLIC_INTERFACE
   * Builds and sets the page title from the route tree.
   * Uses the deepest route's `data.title` or `title` field if present.
   */
  override updateTitle(snapshot: RouterStateSnapshot): void {
    // Traverse to the deepest primary route to find a title
    let route: ActivatedRouteSnapshot | null = snapshot.root;
    let pageTitle: string | undefined;

    while (route) {
      const currentTitle = (route.data?.['title'] as string | undefined) ?? (route.title as string | undefined);
      if (currentTitle) {
        pageTitle = currentTitle;
      }
      route = route.firstChild ?? null;
    }

    const suffix = 'Migrated Angular App';
    const finalTitle = pageTitle ? `${pageTitle} • ${suffix}` : suffix;
    this.title.setTitle(finalTitle);
  }
}
