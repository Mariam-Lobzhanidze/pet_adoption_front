import { Component, Input } from '@angular/core';
import { Item } from '../models/item.model';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-icon-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './icon-card.component.html',
  styleUrls: ['./icon-card.component.scss'],
})
export class IconCardComponent {
  @Input({ required: true }) item!: Item;

  public constructor(private sanitizer: DomSanitizer) {}

  public getSanitizedSVG(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.item.icon as string);
  }
}
