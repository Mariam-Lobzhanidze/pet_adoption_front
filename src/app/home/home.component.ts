import { Component } from '@angular/core';
import { Item } from '../shared/models/item.model';
import { PET_TYPE_CARDS_ITEMS } from '../shared/constants/dropdown-constants';
import { IconCardComponent } from '../shared/icon-card/icon-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IconCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public petCards: Item[] = PET_TYPE_CARDS_ITEMS;
}
