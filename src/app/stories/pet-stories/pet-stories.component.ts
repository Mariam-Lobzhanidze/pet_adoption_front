import { Component } from '@angular/core';
import { PET_STORIES } from '../../constants/pet-stories';

@Component({
  selector: 'app-pet-stories',
  standalone: true,
  imports: [],
  templateUrl: './pet-stories.component.html',
  styleUrl: './pet-stories.component.scss',
})
export class PetStoriesComponent {
  public petStories: {
    image: string;
    petName: string;
    owner: string;
    history: String;
  }[] = PET_STORIES;
}
