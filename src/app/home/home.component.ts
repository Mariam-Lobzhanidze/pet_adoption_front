import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/models/item.model';
import { IconCardComponent } from '../shared/icon-card/icon-card.component';
import { Pet, PetStory } from '../shared/models/pet.model';
import { CardComponent } from '../shared/card/card.component';
import { PetService } from '../services/pet.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../shared/section-title/section-title.component';
import { SeeMoreCardComponent } from '../shared/see-more-card/see-more-card.component';
import { PetStoriesCarouselComponent } from '../shared/pet-stories-carousel/pet-stories-carousel.component';
import { PET_STORIES } from '../constants/pet-stories';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ICON_CARDS_ITEMS } from '../constants/pet.constants';

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
  private petIconCards: Item[] = ICON_CARDS_ITEMS;
  public imageLoaded: Record<string, boolean> = {};
  public placeholders = Array(10).fill(null);
  //
  public totalPetsCount = 100;

  public petCardData!: Observable<Partial<Pet>[]>;
  public petStories: PetStory[] = PET_STORIES;

  constructor(public petService: PetService) {}

  public ngOnInit(): void {
    this.petCardData = this.petService.petItems$ as Observable<Partial<Pet>[]>;
  }

  public get petTypes(): Item[] {
    return this.petIconCards.slice(0, 4);
  }
}
