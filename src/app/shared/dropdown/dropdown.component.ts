import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Item } from '../models/item.model';
import { UIStateService } from '../../services/ui-state.service';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  @Input() toggleText: string = '';
  @Input({ required: true }) items: Item[] = [];
  @Input() dropup: boolean = false;

  constructor(private ui: UIStateService) {}

  handleClick(item: Item): void {
    if (item.action) {
      item.action();
    }
    this.ui.hideSecondaryNav();
  }
}
