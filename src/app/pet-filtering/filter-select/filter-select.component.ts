import { Component, OnInit } from '@angular/core';
import {
  BIRD_BREEDS_OPTIONS,
  CAT_BREEDS_OPTIONS,
  DOG_BREEDS_OPTIONS,
  HORSE_BREEDS_OPTIONS,
  PET_AGE_OPTIONS,
  PET_GENDER_OPTIONS,
  PET_SIZE_OPTIONS,
  PET_TYPE_OPTIONS,
  RABBIT_BREEDS_OPTIONS,
} from '../../constants/pet.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { SelectDropdownComponent } from '../../shared/select-dropdown/select-dropdown.component';
import { GEORGIAN_CITIES } from '../../constants/georgianCities';

interface Options {
  value: string;
  label: string;
}

@Component({
  selector: 'app-filter-select',
  standalone: true,
  imports: [SelectDropdownComponent],
  templateUrl: './filter-select.component.html',
  styleUrl: './filter-select.component.scss',
})
export class FilterSelectComponent implements OnInit {
  private petBreeds: { [key: string]: Options[] } = {
    dogs: DOG_BREEDS_OPTIONS,
    cats: CAT_BREEDS_OPTIONS,
    horses: HORSE_BREEDS_OPTIONS,
    birds: BIRD_BREEDS_OPTIONS,
    rabbits: RABBIT_BREEDS_OPTIONS,
  };
  public breedsByType: { value: string; label: string }[] = [];
  public selectedBreed: string | null = '';

  public petTypes: { value: string; label: string }[] = PET_TYPE_OPTIONS;
  public selectedPetType: string | null = '';

  public petAges: { value: string; label: string }[] = PET_AGE_OPTIONS;
  public selectedPetAge: string | null = '';

  public petGenders: { value: string; label: string }[] = PET_GENDER_OPTIONS;
  public selectedPetGender: string | null = '';

  public petCities: { value: string; label: string }[] = GEORGIAN_CITIES;
  public selectedPetCity: string | null = '';

  public petSizes: { value: string; label: string }[] = PET_SIZE_OPTIONS;
  public selectedPetSize: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['type']) {
        this.selectedPetType = params['type'];
        this.breedsByType = this.petBreeds[params['type']];

        this.petService.getBreedsCount().subscribe((res) => {
          const breedCountMap = new Map<string, string>();
          res.forEach((item: { breed: string; count: string }) => {
            breedCountMap.set(item.breed, item.count);
          });

          // Append count
          this.breedsByType = this.breedsByType?.map((breed) => {
            const count = breedCountMap.get(breed.value) ?? '0';
            return {
              ...breed,
              label: `${breed.label} (${count})`,
              // (${count})
            };
          });
        });
      } else {
        this.selectedPetType = null;
        this.selectedBreed = null;

        this.router.navigate([], {
          queryParams: { breed: null },
          queryParamsHandling: 'merge',
        });
        this.breedsByType = [];
      }

      this.selectedBreed = params['breed'] || '';
      this.selectedPetAge = params['age'] || '';
      this.selectedPetGender = params['gender'] || '';
      this.selectedPetCity = params['city'] || '';
      this.selectedPetSize = params['size'] || '';
    });
  }

  public onPetTypeChange(type: string) {
    this.selectedPetType = type;
    this.router.navigate([], {
      queryParams: { type: this.selectedPetType || null },
      queryParamsHandling: 'merge',
    });
  }

  public onPetBreedChange(breed: string) {
    this.selectedBreed = breed;
    this.router.navigate([], {
      queryParams: { breed: this.selectedBreed || null },
      queryParamsHandling: 'merge',
    });
  }

  public onPetAgeChange(age: string) {
    this.selectedPetAge = age;
    this.router.navigate([], {
      queryParams: { age: this.selectedPetAge || null },
      queryParamsHandling: 'merge',
    });
  }

  public onPetGenderChange(gender: string) {
    this.selectedPetGender = gender;
    this.router.navigate([], {
      queryParams: { gender: this.selectedPetGender || null },
      queryParamsHandling: 'merge',
    });
  }

  public onPetCityChange(city: string) {
    this.selectedPetCity = city;
    this.router.navigate([], {
      queryParams: { city: this.selectedPetCity || null },
      queryParamsHandling: 'merge',
    });
  }

  public onPetSizeChange(size: string) {
    this.selectedPetSize = size;
    this.router.navigate([], {
      queryParams: { size: this.selectedPetSize || null },
      queryParamsHandling: 'merge',
    });
  }

  public onSearch(): void {}
}
