import { Component, OnInit, ViewChild } from '@angular/core';
import { PetService } from '../services/pet.service';
import { Pet } from '../shared/models/pet.model';
import { CardComponent } from '../shared/card/card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterChipsComponent } from './filter-chips/filter-chips.component';
import { FilterSelectComponent } from './filter-select/filter-select.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-pet-filtering',
  standalone: true,
  imports: [
    CardComponent,
    FilterChipsComponent,
    FilterSelectComponent,
    SidebarComponent,
  ],
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

  @ViewChild(SidebarComponent) filtersSidebar!: SidebarComponent;

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

      this.currentPage = 1;

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
        // console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public onRemoveFilter(key: string) {
    const updatedFilters = { ...this.filters };

    delete updatedFilters[key];
    this.router.navigate([], {
      queryParams: { [key]: null },
      queryParamsHandling: 'merge',
    });
  }

  public onClearAllFilters() {
    this.router.navigate([], {
      queryParams: {},
    });
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.limit);
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  public goToPage(page: number) {
    this.currentPage = page;
    this.loadPets(this.filters);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public onOpenFilters() {
    this.filtersSidebar.open();
  }

  public onCloseFilters() {
    this.filtersSidebar.close();
  }
}
