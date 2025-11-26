import { Component, Input } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * PlaceholderComponent shows a simple placeholder message while features are migrated.
 */
@Component({
  selector: 'app-placeholder',
  standalone: true,
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.css'],
})
export class PlaceholderComponent {
  /** Optional title for the placeholder */
  @Input() title = 'Placeholder';
  /** Optional description for the placeholder */
  @Input() description = 'This section will be implemented in the migration steps.';
}
