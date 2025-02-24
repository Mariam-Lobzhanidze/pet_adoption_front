import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-see-more-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './see-more-card.component.html',
  styleUrl: './see-more-card.component.scss',
})
export class SeeMoreCardComponent {
  @Input() routePath: string = '';
  @Input() totalAmount: number = 0;
}
