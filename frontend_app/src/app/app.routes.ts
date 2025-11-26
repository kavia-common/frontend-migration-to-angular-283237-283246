import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  // Home landing route with title
  { path: '', component: HomeComponent, data: { title: 'Home' } },
  // Lazy-loaded example feature route
  {
    path: 'feature',
    loadComponent: () => import('./features/example/example.page').then(m => m.ExamplePageComponent),
    data: { title: 'Example Feature' },
  },
  // Fallback
  { path: '**', redirectTo: '' },
];
