import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownItem } from '../../shared/models/dropdown-item.model';

@Component({
  selector: 'app-submenu',
  standalone: true,
  imports: [],
  templateUrl: './submenu.component.html',
  styleUrl: './submenu.component.scss',
})
export class SubMenuComponent {
  @Input() sidebarData: { title: string; items: DropdownItem[] } | null = null;
  @Output() close = new EventEmitter<void>();

  public closeSidebar(): void {
    this.close.emit();
  }
}
