import { Component } from '@angular/core';
import { ALL_BREEDS } from '../constants/breeds-constants';
import { GEORGIAN_CITIES } from '../constants/georgianCities';
import { SuggestionDropdownComponent } from '../shared/suggestion-dropdown/suggestion-dropdown.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [SuggestionDropdownComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  public petBreeds: string[] = ALL_BREEDS;
  public cityNames: string[] = GEORGIAN_CITIES;

  public selectedBreed: string = '';
  public selectedCity: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  public onSearch(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        breed: this.selectedBreed || null,
        city: this.selectedCity || null,
      },
      queryParamsHandling: 'merge',
    });
    console.log(this.selectedBreed, this.selectedCity);
  }
}
