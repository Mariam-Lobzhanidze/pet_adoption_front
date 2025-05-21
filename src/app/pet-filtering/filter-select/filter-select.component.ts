import { Component, OnInit } from '@angular/core';
import { SuggestionDropdownComponent } from '../../shared/suggestion-dropdown/suggestion-dropdown.component';
import {
  ALL_BREEDS,
  BIRD_BREEDS_OPTIONS,
  CAT_BREEDS_OPTIONS,
  DOG_BREEDS_OPTIONS,
  HORSE_BREEDS_OPTIONS,
  RABBIT_BREEDS_OPTIONS,
} from '../../constants/pet.constants';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../../services/pet.service';

interface Options {
  value: string;
  label: string;
}

@Component({
  selector: 'app-filter-select',
  standalone: true,
  imports: [SuggestionDropdownComponent],
  templateUrl: './filter-select.component.html',
  styleUrl: './filter-select.component.scss',
})
export class FilterSelectComponent implements OnInit {
  public petBreeds: { [key: string]: Options[] } = {
    dogs: DOG_BREEDS_OPTIONS,
    cats: CAT_BREEDS_OPTIONS,
    horses: HORSE_BREEDS_OPTIONS,
    birds: BIRD_BREEDS_OPTIONS,
    rabbits: RABBIT_BREEDS_OPTIONS,
  };
  public breedsByType: { value: string; label: string }[] = [];

  public selectedBreed: string = '';

  constructor(private route: ActivatedRoute, private petService: PetService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['type']) {
        this.breedsByType = this.petBreeds[params['type']];
      }

      if (params['breed'] && !params['type']) {
      }
    });

    this.petService.getBreedsCount().subscribe((res) => {
      // Convert response to a Map for faster lookup
      const breedCountMap = new Map<string, string>();
      res.forEach((item: { breed: string; count: string }) => {
        breedCountMap.set(item.breed, item.count);
      });

      // Append count to breed label
      this.breedsByType = this.breedsByType.map((breed) => {
        const count = breedCountMap.get(breed.value) ?? '0';
        return {
          ...breed,
          label: `${breed.label} (${count})`,
        };
      });
    });
  }

  public onSearch(): void {}
}
