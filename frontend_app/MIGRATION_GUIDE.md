# Migration Guide: React to Angular

## Introduction
This guide describes how to migrate a React frontend to Angular using the structure and patterns already present in this repository. It documents a practical mapping between React and Angular concepts, conventions for component and route conversion, a per-page migration checklist, and the environment variable mapping from React’s process.env usage to Angular’s NG_APP_* variables loaded via the environment files.

## React to Angular: Conceptual Mapping

### Application bootstrap and root
- React:
  - Entry: index.tsx or main.jsx
  - Root: <App/> rendered into a DOM node via ReactDOM
- Angular:
  - Entry: src/main.ts
  - Root: AppComponent (standalone) bootstrapped using bootstrapApplication

Relevant code:
- src/main.ts
- src/app/app.component.ts

### Routing
- React:
  - Libraries: react-router-dom with <Routes>, <Route>, useNavigate, Link
  - Route configuration often colocated with components
- Angular:
  - Router: Routes array (src/app/app.routes.ts)
  - View outlet: <router-outlet>
  - Links: routerLink directive
  - Programmatic navigation: Router service

Relevant code:
- src/app/app.routes.ts
- src/app/app.component.html (contains router-outlet)
- src/app/layout/sidebar/sidebar.component.html (routerLink usage)

### Components and props
- React:
  - Function components with props and hooks
  - Props via function parameters; defaultProps or default values
- Angular:
  - @Component with standalone: true
  - Inputs: @Input() for inbound props
  - Outputs: EventEmitter for outbound events
  - Templates: Separate HTML; styles: separate CSS

Relevant code:
- src/app/shared/components/placeholder/placeholder.component.ts (demonstrates @Input defaults)

### State and side effects
- React:
  - useState, useReducer, Context, useEffect
- Angular:
  - Component class state and lifecycle hooks (ngOnInit, ngOnDestroy)
  - Shared state in services (Injectable), RxJS Observables/Subjects
  - Consider NgRx for complex global state (not yet added in this repo)

Relevant code:
- src/app/core/services/api.service.ts (service pattern with HttpClient)

### Data fetching
- React:
  - fetch, axios, SWR/RTK Query
- Angular:
  - HttpClient service injected into a service layer
  - Observables with RxJS and catchError

Relevant code:
- src/app/core/services/api.service.ts

## Conventions for Conversion

### Folder and file naming
- Keep the original feature boundaries from React; map each feature into src/app/<feature-name>.
- Use Angular standalone components; colocate *.component.ts, *.component.html, *.component.css.
- Reuse React component names, capitalized for the Angular class and PascalCase file names, for example: user-profile -> UserProfileComponent.

### Routing structure
- Define route entries in src/app/app.routes.ts.
- For larger features, define a feature route file (e.g., src/app/<feature>/feature.routes.ts) and lazy-load it using loadComponent or loadChildren.
- Keep titles and route data in the route definition for SEO and accessibility.

Example snippet:
```ts
export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'users', loadComponent: () => import('./features/users/users.page').then(m => m.UsersPageComponent), data: { title: 'Users' } },
  { path: '**', redirectTo: '' },
];
```

### Component conversion guidelines
- JSX to Angular templates:
  - Replace jsx-like attributes with Angular template syntax.
  - className → class
  - onClick → (click)
  - value/checked/bindings → use [value], [(ngModel)], or reactive forms depending on the case.
- Props to Inputs:
  - Convert React props to @Input() properties with proper typing and defaults.
- Callbacks to Outputs:
  - Convert function props used for callbacks to @Output() with EventEmitter.

### Styles
- Prefer component-scoped CSS in *.component.css.
- Keep global styles minimal in src/styles.css.

### Services and utilities
- Move cross-cutting concerns and data access into services under src/app/core/services.
- Inject services where needed rather than passing data via props.

## Per-Page Migration Checklist

For each React page or route, follow this checklist:

1. Identify the React route path and component.
   - Example: /feature -> FeaturePage
2. Create an Angular standalone component for the page.
   - ng generate component features/feature-page --standalone
3. Convert JSX to Angular template syntax.
   - Replace className, event handlers, conditional rendering, and list rendering with Angular equivalents (*ngIf, *ngFor).
4. Map props to @Input() and callbacks to @Output() where the page composes child components.
5. Move data fetching into a service (if not already existent) and inject HttpClient or ApiService.
6. Handle side effects in ngOnInit/ngOnDestroy and manage subscriptions via RxJS (consider takeUntil pattern).
7. Add or update the route in src/app/app.routes.ts or in a feature route module.
8. Wire navigation using routerLink or Router.navigate and update the sidebar/menu links if applicable.
9. Add unit tests for the component using Angular TestBed.
10. Ensure styles are component-scoped and responsive.
11. Verify accessibility (landmark elements, aria-* attributes, focus order).
12. Validate environment variables used are available via environment.*.
13. Manually test the route on http://localhost:3000 and adjust per feedback.

## Environment Variables: React process.env → Angular NG_APP_*

Angular reads environment variables at build time. In this repo, the environment files read from process.env.NG_APP_* safely when present. Below is the mapping:

- NG_APP_API_BASE → environment.apiBase
  - Typical React: process.env.API_BASE or VITE_/NEXT_PUBLIC_/REACT_APP_API_BASE
  - Angular usage example:
    ```ts
    import { environment } from '../environments/environment';
    const url = `${environment.apiBase}/v1/items`;
    ```
- NG_APP_BACKEND_URL → environment.backendUrl
- NG_APP_FRONTEND_URL → environment.frontendUrl
- NG_APP_WS_URL → environment.wsUrl
- NG_APP_NODE_ENV → environment.nodeEnv
- NG_APP_NEXT_TELEMETRY_DISABLED → environment.telemetryDisabled (string 'true' interpreted as boolean)
- NG_APP_ENABLE_SOURCE_MAPS → environment.enableSourceMaps (string 'true' to boolean)
- NG_APP_PORT → environment.port (number)
- NG_APP_TRUST_PROXY → environment.trustProxy (boolean)
- NG_APP_LOG_LEVEL → environment.logLevel (string; defaults to 'info' in production env file)
- NG_APP_HEALTHCHECK_PATH → environment.healthcheckPath
- NG_APP_FEATURE_FLAGS → environment.featureFlags (JSON string parsed to object)
  - Example:
    ```
    NG_APP_FEATURE_FLAGS='{"newNavbar":true,"betaUser":false}'
    ```
- NG_APP_EXPERIMENTS_ENABLED → environment.experimentsEnabled (boolean)

Sources in this repo:
- src/environments/environment.ts
- src/environments/environment.development.ts

Important notes:
- These variables are read at build time. Rebuild when variables change.
- For CI/CD, set variables in the environment before the build step.
- For local development, export variables in your shell before running npm start or ng serve.

## Example: Converting a React Route to Angular

React (simplified):
```tsx
// routes.tsx
<Route path="/feature" element={<FeaturePage title="Feature" />} />

// FeaturePage.tsx
export function FeaturePage({ title = 'Feature' }) {
  useEffect(() => { /* fetch data */ }, []);
  return <section><h2>{title}</h2></section>;
}
```

Angular:
```ts
// src/app/features/feature-page/feature-page.component.ts
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feature-page',
  standalone: true,
  template: `
    <section>
      <h2>{{ title }}</h2>
    </section>
  `,
})
export class FeaturePageComponent implements OnInit {
  @Input() title = 'Feature';

  ngOnInit(): void {
    // fetch data via injected service or ApiService
  }
}

// src/app/app.routes.ts
import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: 'feature', loadComponent: () => import('./features/feature-page/feature-page.component').then(m => m.FeaturePageComponent), data: { title: 'Feature' } },
];
```

## API Access Example with ApiService

```ts
import { Injectable } from '@angular/core';
import { ApiService } from '../core/services/api.service';

@Injectable({ providedIn: 'root' })
export class ItemsRepository {
  constructor(private api: ApiService) {}

  list() {
    return this.api.get('/v1/items');
  }
}
```

The ApiService automatically prefixes relative paths with environment.apiBase and applies JSON headers, matching typical React axios instance behavior.

## SSR and Hosting Notes

- This repo includes an SSR server entry (src/server.ts) using Angular Universal and Express.
- For pure client-side hosting, static builds in dist/angular can be served by any static host.
- For SSR, build the SSR targets and run npm run serve:ssr:angular.

## Appendix: Useful Angular CLI Commands

- Generate component: ng generate component features/feature-page --standalone
- Generate service: ng generate service core/services/items
- Build: ng build
- Test: ng test
- Serve: ng serve --port 3000

## References
- Angular CLI: https://angular.dev/tools/cli
- Angular Router: https://angular.dev/guide/router
- HttpClient: https://angular.dev/guide/http
- Repo sources referenced:
  - src/app/app.component.ts
  - src/app/app.routes.ts
  - src/app/core/services/api.service.ts
  - src/app/shared/components/placeholder/placeholder.component.ts
  - src/environments/environment.ts
  - src/environments/environment.development.ts
