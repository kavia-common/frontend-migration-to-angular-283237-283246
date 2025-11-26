import { Component } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * ExamplePageComponent demonstrates a lazily loaded standalone component route.
 */
@Component({
  selector: 'app-example-page',
  standalone: true,
  template: `
    <section class="example">
      <h2>Example Feature</h2>
      <p>This page is lazy-loaded using Angular's loadComponent.</p>
      <ul>
        <li>Standalone component</li>
        <li>Lazy route with data.title for document title</li>
      </ul>
    </section>
  `,
  styles: [`
    .example {
      padding: 1rem;
    }
    .example h2 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
      color: #0f172a;
    }
    .example p, .example li {
      color: #334155;
    }
    .example ul {
      margin-top: 0.5rem;
      margin-left: 1.25rem;
      list-style: disc;
    }
  `],
})
export class ExamplePageComponent {}
