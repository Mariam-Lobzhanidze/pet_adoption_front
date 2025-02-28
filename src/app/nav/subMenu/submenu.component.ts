import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../shared/models/item.model';

@Component({
  selector: 'app-submenu',
  standalone: true,
  imports: [],
  templateUrl: './submenu.component.html',
  styleUrl: './submenu.component.scss',
})
export class SubMenuComponent {
  @Input() submenuData: { title: string; items: Item[] } | null = null;
  @Output() close = new EventEmitter<void>();

  public closeSidebar(): void {
    this.close.emit();
  }
}
