import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  NgbTypeaheadModule,
  NgbTypeaheadSelectItemEvent,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-suggestion-dropdown',
  standalone: true,
  imports: [NgbTypeaheadModule, FormsModule],
  templateUrl: './suggestion-dropdown.component.html',
  styleUrl: './suggestion-dropdown.component.scss',
})
export class SuggestionDropdownComponent {
  //use signal for search query
  public searchQuery = '';
  @Input() suggestions: string[] = [];
  @Input() placeholderText: string = 'Search by...';

  @Output() queryChange = new EventEmitter<string>();

  //if used in many places can be in other place,search service maybe
  public search = (text$: Observable<string>) =>
    text$.pipe(
      map((term) =>
        this.suggestions
          .filter((v) => v.toLowerCase().includes(term.toLowerCase()))
          .slice(0, 6)
      )
    );

  public onSearch(event: NgbTypeaheadSelectItemEvent<any>) {
    // console.log(event.item);
    this.searchQuery = event.item;
    this.queryChange.emit(this.searchQuery);
  }

  public clearSearch() {
    this.searchQuery = '';
    // this.queryChange.emit('');
  }
}
