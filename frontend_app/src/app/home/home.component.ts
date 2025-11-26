import { Component } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * HomeComponent is the default landing page for the application.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <section class="home">
      <h2>Welcome</h2>
      <p>This is the Home page for the migrated Angular app.</p>
    </section>
  `,
  styles: [`
    .home {
      padding: 1rem;
    }
    .home h2 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
      color: #0f172a;
    }
    .home p {
      color: #334155;
    }
  `],
})
export class HomeComponent {}
