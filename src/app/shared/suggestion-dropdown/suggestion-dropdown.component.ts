import { Component, EventEmitter, Input, Output } from '@angular/core';
import { debounceTime, map, Observable, tap } from 'rxjs';
import {
  NgbTypeaheadModule,
  NgbTypeaheadSelectItemEvent,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-suggestion-dropdown',
  standalone: true,
  imports: [NgbTypeaheadModule, FormsModule, NgClass],
  templateUrl: './suggestion-dropdown.component.html',
  styleUrl: './suggestion-dropdown.component.scss',
})
export class SuggestionDropdownComponent {
  public searchQuery = '';
  @Input() suggestions: string[] = [];
  @Input() placeholderText: string = 'Search by...';

  @Input() showBorder: boolean = true;

  @Output() queryChange = new EventEmitter<string>();

  public search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      map((term) =>
        this.suggestions
          .filter((v) => v.toLowerCase().includes(term.toLowerCase()))
          .slice(0, 6)
      )
    );

  public onSearch(event: NgbTypeaheadSelectItemEvent<any>) {
    this.searchQuery = event.item;
    this.queryChange.emit(this.searchQuery);
  }

  public clearSearch() {
    this.searchQuery = '';
    this.queryChange.emit('');
  }
}
