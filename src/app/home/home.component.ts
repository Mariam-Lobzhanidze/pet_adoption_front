import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/models/item.model';
import { IconCardComponent } from '../shared/icon-card/icon-card.component';
import { PetDetails } from '../shared/models/pet.model';
import { CardComponent } from '../shared/card/card.component';
import { PetForAdoptionService } from '../services/pet-for-adoption.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../shared/section-title/section-title.component';
import { SeeMoreCardComponent } from '../shared/see-more-card/see-more-card.component';
import { PetStoriesCarouselComponent } from '../shared/pet-stories-carousel/pet-stories-carousel.component';
import { PET_STORIES } from '../constants/pet-stories';
import { ICON_CARDS_ITEMS } from '../constants/dropdown-constants';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IconCardComponent,
    CardComponent,
    CommonModule,
    SectionTitleComponent,
    SeeMoreCardComponent,
    PetStoriesCarouselComponent,
    SearchBarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public petCards: Item[] = ICON_CARDS_ITEMS;

  public imageLoaded: Record<string, boolean> = {};

  public placeholders = Array(10).fill(null);
  //
  public totalPetsCount = 100;

  public petCardData!: Observable<PetDetails[]>;

  public petStories: {
    image: string;
    petName: string;
    owner: string;
    description: string;
  }[] = PET_STORIES;

  constructor(public petService: PetForAdoptionService) {}

  public ngOnInit(): void {
    this.petCardData = this.petService.petItems$;
  }
}
