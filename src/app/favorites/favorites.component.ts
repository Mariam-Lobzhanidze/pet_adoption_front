import { Component } from '@angular/core';
import { Pet } from '../shared/models/pet.model';
import { PetService } from '../services/pet.service';
import { CardComponent } from '../shared/card/card.component';
import { SectionTitleComponent } from '../shared/section-title/section-title.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CardComponent, SectionTitleComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  public loading = true;
  public myPets: Partial<Pet>[] = [];
  // public totalCount: number = 0;
  // public limit: number = 10;
  // public currentPage: number = 1;

  constructor(private petService: PetService) {}

  ngOnInit() {
    this.loadPets();
  }

  private loadPets() {
    // const offset = (this.currentPage - 1) * this.limit;

    this.petService.getFavoritePets().subscribe({
      next: (response) => {
        console.log(response);

        this.myPets = response.pets;
        // this.totalCount = response.totalCount;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  // public goToPage(page: number) {
  //   this.currentPage = page;
  //   this.loadPets();
  // }
}
