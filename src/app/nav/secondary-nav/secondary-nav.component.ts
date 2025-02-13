import { Component, Input } from '@angular/core';
import { DropdownComponent } from '../../shared/dropdown/dropdown.component';
import { DropdownItem } from '../../shared/models/dropdown-item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-secondary-nav',
  standalone: true,
  imports: [DropdownComponent, CommonModule],
  templateUrl: './secondary-nav.component.html',
  styleUrl: './secondary-nav.component.scss',
})
export class SecondaryNavComponent {
  @Input() isVisible: boolean = false;
  @Input() secondaryNavItems: { title: string; items: DropdownItem[] }[] = [];
}
