# frontend-migration-to-angular-283237-283246

## Overview
This repository contains the Angular-based frontend for a migrated application originally implemented in React. The migration focuses on maintaining feature parity while adopting Angular’s standalone component architecture, Angular Router, and Angular CLI build system.

- Container: frontend_app
- Framework: Angular 19 (standalone components, Angular Router, HttpClient)
- UI layout: Header, Sidebar, Content area, Footer
- Server: Angular Universal SSR entry available (Express) for future SSR enablement

## Getting Started
Navigate to the frontend_app folder for commands and developer documentation.

- Development server: npm start (defaults to port 3000)
- Build: ng build
- Tests: ng test

For detailed migration guidance, refer to MIGRATION_GUIDE.md and the README inside frontend_app.

## Migration Guide
See the full migration plan, mapping between React concepts and Angular, per-page migration checklist, and environment variable mapping in:
- frontend-migration-to-angular-283237-283246/frontend_app/MIGRATION_GUIDE.md

## Repository Structure
- frontend_app/: Angular application (source code, configuration, and docs)
- frontend_app/src/app/: App shell components (header, sidebar, footer), routes, core services
- frontend_app/src/environments/: Environment configuration mapping NG_APP_* variables

## Links
- Angular CLI docs: https://angular.dev/tools/cli
- Angular Router: https://angular.dev/guide/router
- HttpClient: https://angular.dev/guide/http