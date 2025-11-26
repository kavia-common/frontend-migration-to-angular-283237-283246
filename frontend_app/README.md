# Angular Frontend (Migrated from React)

This Angular application is the migrated frontend from a previous React implementation. It uses Angular 19 standalone components, Angular Router for navigation, and HttpClient for API access. A basic layout shell (header, sidebar, content, footer) is already set up.

## Quick Start

- Install dependencies:
  - npm ci
- Start development server on port 3000:
  - npm start
- Open: http://localhost:3000

## Smoke Test

Use this checklist to quickly verify the app after install or changes:

1. Install and start
   - npm ci
   - npm start
   - Visit http://localhost:3000
2. Routing and layout
   - Header and footer are visible
   - Sidebar links render and navigate to “Home” and “Example Feature”
   - Document title updates based on route (e.g., “Home • Migrated Angular App”)
3. API service wiring (no backend required)
   - Confirm no runtime errors in console when navigating
4. Build and SSR preview
   - npm run build
   - npm run serve:ssr:angular
   - Visit http://localhost:4000 (default in SSR server.ts) and load “Home” and “Example Feature”

If any NG_APP_* values change, rebuild before validating again.

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

Angular reads NG_APP_* variables primarily at build time via the environment files, and at runtime on the server when using SSR. The following variables are supported:

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

How to use NG_APP_*:

- Build-time (browser bundle):
  - Export variables before building or serving:
    - Example (Linux/macOS):
      - export NG_APP_API_BASE="http://localhost:3001/api"
      - export NG_APP_FRONTEND_URL="http://localhost:3000"
      - npm start
    - For production builds:
      - export NG_APP_API_BASE="https://api.example.com"
      - npm run build
  - Changing these values requires rebuilding because the browser code is statically bundled.

- Runtime (SSR/Node):
  - The SSR server reads process.env at runtime via ENVIRONMENT provider.
  - To run with custom values without rebuilding:
    - NG_APP_API_BASE="http://localhost:3001/api" node dist/angular/server/server.mjs
  - This allows toggling flags or endpoints on the server without a rebuild. The browser still uses values baked into the client bundle.

Notes:
- For CI/CD, set NG_APP_* in the job environment before the build step.
- For local development, export them in your shell or use a .env loader in the container runtime if applicable.

## Commands

- Development (serves on port 3000):
  - npm start
- Build:
  - npm run build
- Unit tests:
  - npm test
- SSR preview (after building with SSR target):
  - npm run serve:ssr:angular

## SSR Serve Notes

- Build the SSR target with npm run build (configured via angular.json to output to dist/angular).
- Start the SSR server:
  - npm run serve:ssr:angular
- Default SSR port is 4000 (configurable via PORT env var):
  - PORT=8080 npm run serve:ssr:angular
- Static assets are served from dist/angular/browser; server rendering entry is dist/angular/server/server.mjs.
- During SSR, NG_APP_* can be supplied at runtime as environment variables to affect server-side behavior without rebuilding.

## Additional Resources

- Angular CLI docs: https://angular.dev/tools/cli
- Angular Router: https://angular.dev/guide/router
- HttpClient: https://angular.dev/guide/http

For a step-by-step migration checklist and detailed React-to-Angular mapping, see MIGRATION_GUIDE.md.
