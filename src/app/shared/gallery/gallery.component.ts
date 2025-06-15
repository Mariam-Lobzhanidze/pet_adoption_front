import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-carousel',
  standalone: true,

  imports: [NgbCarouselModule, NgFor, NgIf],
  templateUrl: './gallery.component.html',
})
export class ImageCarouselComponent {
  @Input() images: { src: string; title: string }[] = [];
}
