import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pet-stories-carousel',
  standalone: true,
  imports: [],
  templateUrl: './pet-stories-carousel.component.html',
  styleUrl: './pet-stories-carousel.component.scss',
})
export class PetStoriesCarouselComponent {
  @Input() displayMode: 'text' | 'both' = 'both';

  @Input() petStories: {
    image: string;
    petName: string;
    owner: string;
    description: string;
  }[] = [];
}
