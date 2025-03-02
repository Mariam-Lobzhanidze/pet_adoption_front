import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/models/item.model';
import { IconCardComponent } from '../shared/icon-card/icon-card.component';
import { SearchComponent } from '../shared/search/search.component';
import { ALL_BREEDS } from '../constants/breeds-constants';
import { PetDetails } from '../shared/models/petModel';
import { CardComponent } from '../shared/card/card.component';
import { PetForAdoptionService } from '../services/pet-for-adoption.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../shared/section-title/section-title.component';
import { SeeMoreCardComponent } from '../shared/see-more-card/see-more-card.component';
import { PetStoriesCarouselComponent } from '../shared/pet-stories-carousel/pet-stories-carousel.component';
import { PET_STORIES } from '../constants/pet-stories';
import { ICON_CARDS_ITEMS } from '../constants/dropdown-constants';
import { GEORGIAN_CITIES } from '../constants/georgianCities';
import { SuggestionDropdownComponent } from '../shared/suggestion-dropdown/suggestion-dropdown.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IconCardComponent,
    SearchComponent,
    CardComponent,
    CommonModule,
    SectionTitleComponent,
    SeeMoreCardComponent,
    PetStoriesCarouselComponent,
    SuggestionDropdownComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public petBreeds: string[] = ALL_BREEDS;
  public cityNames: string[] = GEORGIAN_CITIES;
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

  public getSearchQuery(query: string): void {
    console.log(query);
  }
}
