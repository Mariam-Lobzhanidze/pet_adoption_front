import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ALL_BREEDS,
  PET_AGE_OPTIONS,
  PET_GENDER_OPTIONS,
  PET_SIZE_OPTIONS,
  PET_TYPE_OPTIONS,
} from '../../constants/pet.constants';
import { GEORGIAN_CITIES } from '../../constants/georgianCities';

@Component({
  selector: 'app-filter-chips',
  standalone: true,
  imports: [],
  templateUrl: './filter-chips.component.html',
  styleUrl: './filter-chips.component.scss',
})
export class FilterChipsComponent {
  public petBreeds: { value: string; label: string }[] = ALL_BREEDS;
  public petTypes: { value: string; label: string }[] = PET_TYPE_OPTIONS;
  public petAges: { value: string; label: string }[] = PET_AGE_OPTIONS;
  public petGenders: { value: string; label: string }[] = PET_GENDER_OPTIONS;
  public cityNames: { value: string; label: string }[] = GEORGIAN_CITIES;
  public petSizes: { value: string; label: string }[] = PET_SIZE_OPTIONS;

  @Input() filters: { [key: string]: string } = {};
  @Output() remove = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  public filterKeys(): string[] {
    return Object.keys(this.filters);
  }

  public removeFilter(key: string): void {
    this.remove.emit(key);
  }

  public clearAll(): void {
    this.clear.emit();
  }

  public getFilterLabel(key: string, value: string): string {
    if (!value) return '';

    const labelMap: { [key: string]: { value: string; label: string }[] } = {
      type: this.petTypes,
      breed: this.petBreeds,
      city: this.cityNames,
      age: this.petAges,
      gender: this.petGenders,
      size: this.petSizes,

      //  other filters like gender, age, size ...later
    };

    const items = labelMap[key];

    if (items) {
      const found = items.find((item) => item.value === value);
      return found?.label || '';
    }

    return value;
  }
}
