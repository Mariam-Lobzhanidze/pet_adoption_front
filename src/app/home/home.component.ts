import { Component } from '@angular/core';
import { Item } from '../shared/models/item.model';
import { PET_TYPE_CARDS_ITEMS } from '../shared/constants/dropdown-constants';
import { IconCardComponent } from '../shared/icon-card/icon-card.component';
import { SearchComponent } from '../shared/search/search.component';
import { ALL_BREEDS } from '../shared/constants/breeds-constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IconCardComponent, SearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public petCards: Item[] = PET_TYPE_CARDS_ITEMS;
  public petBreeds: string[] = ALL_BREEDS;
}
