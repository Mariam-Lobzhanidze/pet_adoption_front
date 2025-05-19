import { Component, OnInit } from '@angular/core';
import { PetService } from '../services/pet.service';
import { Pet } from '../shared/models/pet.model';
import { CardComponent } from '../shared/card/card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { FilterChipsComponent } from './filter-chips/filter-chips.component';
import { SectionTitleComponent } from '../shared/section-title/section-title.component';

@Component({
  selector: 'app-pet-filtering',
  standalone: true,
  imports: [CardComponent, FilterChipsComponent, SectionTitleComponent],
  templateUrl: './pet-filtering.component.html',
  styleUrl: './pet-filtering.component.scss',
})
export class PetFilteringComponent implements OnInit {
  public filters: { [key: string]: string } = {};
  public loading = true;
  public myPets: Partial<Pet>[] = [];
  public totalCount: number = 0;
  public limit: number = 10;
  public currentPage: number = 1;

  constructor(
    private petService: PetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const allowedFilters = ['type', 'breed', 'city', 'gender', 'age', 'size'];
      this.filters = {};

      for (const key of allowedFilters) {
        if (params[key]) {
          this.filters[key] = params[key];
        }
      }

      this.loadPets(this.filters);
    });
  }

  private loadPets(filters: { [key: string]: string } = {}) {
    const offset = (this.currentPage - 1) * this.limit;

    this.petService.getAllPets(this.limit, offset, filters).subscribe({
      next: (response) => {
        this.myPets = response.pets;
        this.totalCount = response.totalCount;
        this.loading = false;
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onRemoveFilter(key: string) {
    const updatedFilters = { ...this.filters };
    delete updatedFilters[key];
    this.router.navigate([], {
      queryParams: { [key]: null },
      queryParamsHandling: 'merge',
    });
  }

  onClearAllFilters() {
    this.router.navigate([], {
      queryParams: {},
    });
  }

  public goToPage(page: number) {
    this.currentPage = page;
    this.loadPets();
  }
}
