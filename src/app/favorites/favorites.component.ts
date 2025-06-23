import { Component, effect, signal, Signal } from '@angular/core';
import { Pet } from '../shared/models/pet.model';

import { CardComponent } from '../shared/card/card.component';
import { SectionTitleComponent } from '../shared/section-title/section-title.component';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CardComponent, SectionTitleComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  public loading!: Signal<boolean>;
  public myPets!: Signal<Pet[]>;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.myPets = this.favoritesService.favorites;
    this.loading = this.favoritesService.loading;
  }
}
