# Angular Frontend (Migrated from React)

This Angular application is the migrated frontend from a previous React implementation. It uses Angular 19 standalone components, Angular Router for navigation, and HttpClient for API access. A basic layout shell (header, sidebar, content, footer) is already set up.

## Quick Start

- Install dependencies:
  - npm ci
- Start development server on port 3000:
  - npm start
- Open: http://localhost:3000

## Project Layout

- src/app/app.component.*: Root layout shell with Header, Sidebar, Footer, and router-outlet
- src/app/app.routes.ts: Route table
- src/app/core/services/api.service.ts: HTTP helper using environment.apiBase
- src/app/layout/*: Layout components (header, sidebar, footer)
- src/app/shared/components/placeholder/*: Placeholder component to stub pages during migration
- src/environments/*: Environment configuration and NG_APP_* variable mapping

## React → Angular: Fast Mapping

- Entry/root:
  - React: index.tsx + <App/>
  - Angular: src/main.ts + AppComponent (standalone)
- Routing:
  - React Router: <Routes>, <Route>, useNavigate
  - Angular Router: Routes array, RouterOutlet, RouterLink, Router
- Components:
  - React Function Component + hooks
  - Angular @Component (standalone), inputs via @Input(), outputs via EventEmitter
- State:
  - React useState/useReducer/Context
  - Angular component state, injectable services, RxJS, or NgRx (if adopted later)
- Side effects:
  - React useEffect
  - Angular lifecycle hooks (ngOnInit, ngOnDestroy) and RxJS subscriptions
- Data fetching:
  - React fetch/axios + context or SWR/RTK Query
  - Angular HttpClient in services (see ApiService)

See MIGRATION_GUIDE.md for deeper guidance and examples.

## Conventions for Migration

- Component naming: Keep React component names; use PascalCase in Angular file/class names.
- Folder mapping: React feature folders map to Angular feature folders under src/app/feature-name.
- Standalone components: Prefer standalone components; import dependencies in the component metadata.
- Styles: Keep component-scoped CSS in the same folder as the component.
- Routing: Add new routes to app.routes.ts and lazy-load feature routes when appropriate.

## Environment Variables (React → Angular)

Angular reads NG_APP_* variables at build time through the environment files. The following variables are supported:

- NG_APP_API_BASE → environment.apiBase
- NG_APP_BACKEND_URL → environment.backendUrl
- NG_APP_FRONTEND_URL → environment.frontendUrl
- NG_APP_WS_URL → environment.wsUrl
- NG_APP_NODE_ENV → environment.nodeEnv
- NG_APP_NEXT_TELEMETRY_DISABLED → environment.telemetryDisabled
- NG_APP_ENABLE_SOURCE_MAPS → environment.enableSourceMaps
- NG_APP_PORT → environment.port
- NG_APP_TRUST_PROXY → environment.trustProxy
- NG_APP_LOG_LEVEL → environment.logLevel
- NG_APP_HEALTHCHECK_PATH → environment.healthcheckPath
- NG_APP_FEATURE_FLAGS (JSON) → environment.featureFlags (object)
- NG_APP_EXPERIMENTS_ENABLED → environment.experimentsEnabled

Place these variables in your container’s .env or CI environment before building. For local dev, you can export them in your terminal session.

## Commands

- Development:
  - npm start
- Build:
  - npm run build
- Unit tests:
  - npm test
- SSR preview (after building with SSR target):
  - npm run serve:ssr:angular

## Additional Resources

- Angular CLI docs: https://angular.dev/tools/cli
- Angular Router: https://angular.dev/guide/router
- HttpClient: https://angular.dev/guide/http

For a step-by-step migration checklist and detailed React-to-Angular mapping, see MIGRATION_GUIDE.md.
