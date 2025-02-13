import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DropdownItem } from '../models/dropdown-item.model';
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
  @Input() items: DropdownItem[] = [];
}
