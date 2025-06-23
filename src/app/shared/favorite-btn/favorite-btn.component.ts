import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-favorite-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-btn.component.html',
  styleUrl: './favorite-btn.component.scss',
})
export class FavoriteBtnComponent {
  @Input() isFavorite: boolean = false;
  @Input() positions: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  } = { top: '0px', bottom: '0px', left: '0px', right: '0px' };

  @Output() isFavoriteChange = new EventEmitter<void>();

  public toggleFavorite(): void {
    this.isFavoriteChange.emit();
  }
}
