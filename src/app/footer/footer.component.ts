import { Component } from '@angular/core';
import { DOG_ITEMS } from '../constants/dropdown-constants';
import { Item } from '../shared/models/item.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  public items: Item[] = DOG_ITEMS;
}
