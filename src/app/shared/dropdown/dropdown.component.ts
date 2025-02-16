import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Item } from '../models/item.model';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [RouterLink, UpperCasePipe],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  @Input({ required: true }) toggleText!: string;
  @Input() items: Item[] = [];
}
