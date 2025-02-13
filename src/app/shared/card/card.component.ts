import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FavoriteBtnComponent } from '../favorite-btn/favorite-btn.component';
import { CardPlaceholderComponent } from '../placeholders/card-placeholder.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FavoriteBtnComponent, CardPlaceholderComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  public isFavorite = false;
  @Input() imageUrl: string = '';

  @Input() cardWidth: string = '220px';
  @Input() imageHeight: string = '260px';
}
