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
import { concatMap, map, Observable, Subject, takeUntil, tap } from 'rxjs';

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
  public selectedPetType: string | null = null;

  public petAges: { value: string; label: string }[] = PET_AGE_OPTIONS;
  public selectedPetAge: string | null = '';

  public petGenders: { value: string; label: string }[] = PET_GENDER_OPTIONS;
  public selectedPetGender: string | null = '';

  public petCities: { value: string; label: string }[] = GEORGIAN_CITIES;
  public selectedPetCity: string | null = '';

  public petSizes: { value: string; label: string }[] = PET_SIZE_OPTIONS;
  public selectedPetSize: string | null = '';

  private breedCountMap = new Map<string, string>();
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getBreedsCount()
      .pipe(
        concatMap(() => this.route.queryParams),
        takeUntil(this.destroy$)
      )
      .subscribe((params) => {
        const newType = params['type'] || null;

        this.selectedBreed = params['breed'] || null;
        this.selectedPetAge = params['age'] || null;
        this.selectedPetGender = params['gender'] || null;
        this.selectedPetCity = params['city'] || null;
        this.selectedPetSize = params['size'] || null;

        const typeChanged = newType !== this.selectedPetType;

        if (typeChanged) {
          this.selectedBreed = null;
          this.router.navigate([], {
            queryParams: { breed: null },
            queryParamsHandling: 'merge',
          });
        }

        this.selectedPetType = newType;

        if (this.selectedPetType) {
          this.breedsByType = this.petBreeds[this.selectedPetType];
          this.updateBreedsCountOnTypeChange();
        } else {
          this.breedsByType = [];
        }
      });
  }

  private getBreedsCount(): Observable<void> {
    return this.petService.getBreedsCount().pipe(
      tap((res) => {
        res.forEach((item: { breed: string; count: string }) => {
          this.breedCountMap.set(item.breed, item.count);
        });
      }),
      map(() => void 0)
    );
  }

  private updateBreedsCountOnTypeChange() {
    this.breedsByType = this.breedsByType?.map((breed) => {
      const count = this.breedCountMap.get(breed.value) ?? '0';

      return {
        ...breed,
        label: `${breed.label} (${count})`,
      };
    });
  }

  public onPetTypeChange(type: string) {
    this.router.navigate([], {
      queryParams: { type: type || null },
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
