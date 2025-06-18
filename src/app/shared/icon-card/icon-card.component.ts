import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../models/item.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-icon-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './icon-card.component.html',
  styleUrls: ['./icon-card.component.scss'],
})
export class IconCardComponent {
  @Input({ required: true }) item!: Item;
  @Input({ required: true }) selectable: boolean = false;
  @Input() selected: boolean = false;
  @Output() clicked = new EventEmitter<void>();

  public constructor(private sanitizer: DomSanitizer) {}

  public getSanitizedSVG(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.item.icon as string);
  }

  public onClick(event: MouseEvent) {
    this.clicked.emit();
  }
}
