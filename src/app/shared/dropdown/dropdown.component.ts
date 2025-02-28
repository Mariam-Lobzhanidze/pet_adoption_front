import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Item } from '../models/item.model';


@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  @Input({ required: true }) toggleText!: string;
  @Input({ required: true }) items: Item[] = [];
}
