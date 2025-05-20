import { Component } from '@angular/core';
import { SuggestionDropdownComponent } from '../../shared/suggestion-dropdown/suggestion-dropdown.component';
import { ALL_BREEDS } from '../../constants/pet.constants';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter-select',
  standalone: true,
  imports: [SuggestionDropdownComponent],
  templateUrl: './filter-select.component.html',
  styleUrl: './filter-select.component.scss',
})
export class FilterSelectComponent {
  public petBreeds: { value: string; label: string }[] = ALL_BREEDS;
  public selectedBreed: string = '';

  constructor(private route: ActivatedRoute) {}

  public onSearch(): void {}
}
