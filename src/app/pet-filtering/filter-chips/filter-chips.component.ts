import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ALL_BREEDS } from '../../constants/pet.constants';
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
  public cityNames: { value: string; label: string }[] = GEORGIAN_CITIES;

  @Input() filters: { [key: string]: string } = {};
  @Output() remove = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  ngOnInit() {
    console.log(this.filters);
  }

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
      breed: this.petBreeds,
      city: this.cityNames,
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
