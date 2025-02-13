import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-colored-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './colored-card.component.html',
  styleUrl: './colored-card.component.scss',
})
export class ColoredCardComponent {
  @Input() cardWidth: string = '220px';
  @Input() cardHeight: string = 'auto';
  @Input() cardLink: string = '';

  @Input() showFooter: boolean = true;
  @Input() bgColor: 'primary' | 'light' = 'primary';
}
