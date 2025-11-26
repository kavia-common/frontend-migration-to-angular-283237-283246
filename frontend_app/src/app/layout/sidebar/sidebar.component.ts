import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * PUBLIC_INTERFACE
 * SidebarComponent renders navigation links and collapses on small screens via CSS.
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {}
