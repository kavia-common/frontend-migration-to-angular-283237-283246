import { Component } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * FooterComponent displays footer information.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  /** Current year used in footer copyright notice. */
  year = new Date().getFullYear();
}
