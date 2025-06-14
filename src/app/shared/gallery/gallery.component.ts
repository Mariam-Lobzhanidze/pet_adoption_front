import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pet-gallery',
  standalone: true,
  imports: [NgbCarouselModule, NgFor],
  template: `
    <ngb-carousel
      [interval]="3000"
      [wrap]="true"
      [keyboard]="true"
      [pauseOnHover]="true"
    >
      <ng-template
        ngbSlide
        *ngFor="let img of images; let i = index"
        id="slide-{{ i }}"
      >
        <img [src]="img" class="d-block w-100" alt="pet photo {{ i + 1 }}" />
      </ng-template>
    </ngb-carousel>
  `,
})
export class PetGalleryComponent {
  @Input() images: string[] = [];
}
