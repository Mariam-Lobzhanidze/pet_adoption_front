import { Component, OnInit, signal } from '@angular/core';
import { Item } from '../shared/models/item.model';
import { IconCardComponent } from '../shared/icon-card/icon-card.component';
import { Pet, PetStory } from '../shared/models/pet.model';
import { CardComponent } from '../shared/card/card.component';
import { PetService } from '../services/pet.service';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../shared/section-title/section-title.component';
import { SeeMoreCardComponent } from '../shared/see-more-card/see-more-card.component';
import { PetStoriesCarouselComponent } from '../shared/pet-stories-carousel/pet-stories-carousel.component';
import { PET_STORIES } from '../constants/pet-stories';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ICON_CARDS_ITEMS } from '../constants/pet.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

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
  public loading = signal(true);
  private petIconCards: Item[] = ICON_CARDS_ITEMS;
  public imageLoaded: Record<string, boolean> = {};
  public placeholders = Array(10).fill(null);
  //
  public moreAvailablePetsCount = 0;

  public petCardData: Partial<Pet>[] = [];
  public petStories: PetStory[] = PET_STORIES;

  constructor(
    public petService: PetService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.petService.getAllPets().subscribe((response) => {
      this.loading.set(false);
      this.petCardData = response.pets;
      this.moreAvailablePetsCount =
        response.totalCount - this.petCardData.length;
    });
  }

  public get petTypes(): Item[] {
    return this.petIconCards.slice(0, 4);
  }

  public onSearch(value: string | undefined): void {
    if (value) {
      this.router.navigate(['/pets/search'], {
        queryParams: { type: value },
        queryParamsHandling: 'merge',
      });
    }
  }
}
