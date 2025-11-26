import { Routes } from '@angular/router';
import { PlaceholderComponent } from './shared/components/placeholder/placeholder.component';

export const routes: Routes = [
  { path: '', component: PlaceholderComponent, title: 'Home' },
  { path: 'feature', component: PlaceholderComponent, data: { title: 'Feature' } },
  { path: '**', redirectTo: '' },
];
