import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../shared/models/item.model';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-submenu',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './submenu.component.html',
  styleUrl: './submenu.component.scss',
})
export class SubMenuComponent {
  @Input() showSubmenu: boolean = false;
  @Input() submenuData: { title: string; items: Item[] } | null = null;
  @Output() close = new EventEmitter<void>();

  public onCloseSubMenu(): void {
    this.close.emit();
  }
}
