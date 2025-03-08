import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [NgClass],
})
export class SidebarComponent {
  @Input({ required: true }) offcanvasId: string = 'offcanvasMobileNav';
  @Input({ required: true }) offcanvasPosition:
    | 'start'
    | 'end'
    | 'bottom'
    | 'top' = 'start';

  public get offcanvasPositionClass(): string {
    return `offcanvas-${this.offcanvasPosition}`;
  }
}
