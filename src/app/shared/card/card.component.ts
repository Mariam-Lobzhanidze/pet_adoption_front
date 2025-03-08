import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PetDetails } from '../models/pet.model';
import { FavoriteBtnComponent } from '../favorite-btn/favorite-btn.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FavoriteBtnComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() loading: boolean = true;
  public imageLoaded: boolean = false;
  @Input() item: Partial<PetDetails> = {};

  public isFavorite: boolean = false;

  //go to service
  public updateFavoriteStatus(newStatus: boolean): void {
    this.isFavorite = newStatus;

    console.log(`card with id ${this.item.id} changed to ${this.isFavorite}`);
  }
}
