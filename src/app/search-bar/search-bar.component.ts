import { Component } from '@angular/core';
import { GEORGIAN_CITIES } from '../constants/georgianCities';
import { SuggestionDropdownComponent } from '../shared/suggestion-dropdown/suggestion-dropdown.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ALL_BREEDS } from '../constants/pet.constants';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [SuggestionDropdownComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  public petBreeds: { value: string; label: string }[] = ALL_BREEDS;
  public cityNames: { value: string; label: string }[] = GEORGIAN_CITIES;

  public selectedBreed: string = '';
  public selectedCity: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  public onSearch(): void {
    this.router.navigate(['/pets/search'], {
      queryParams: {
        breed: this.selectedBreed || null,
        city: this.selectedCity || null,
      },
      queryParamsHandling: 'merge',
    });
  }
}
