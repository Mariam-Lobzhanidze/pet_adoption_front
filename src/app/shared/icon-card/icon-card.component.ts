import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Item } from '../models/item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-icon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-card.component.html',
  styleUrl: './icon-card.component.scss',
})
export class IconCardComponent {
  @Input({ required: true }) item!: Item;

  constructor(private router: Router) {}

  public onSelectCard(item: Item): void {
    if (this.item.route) {
      this.router.navigate([this.item.route]);
    }
  }
}
