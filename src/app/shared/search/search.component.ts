import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, NgbTypeaheadModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  public searchQuery = '';

  @Input() suggestions: string[] = [];
  @Input() placeholderText: string = 'Search by...';
  @Output() queryChange = new EventEmitter<string>();

  public search = (text$: Observable<string>) =>
    text$.pipe(
      map((term) =>
        this.suggestions
          .filter((v) => v.toLowerCase().includes(term.toLowerCase()))
          .slice(0, 6)
      )
    );

  public onSearch() {
    this.queryChange.emit(this.searchQuery);
    this.searchQuery = '';
    console.log(this.searchQuery);
  }

  public clearSearch() {
    this.searchQuery = '';
    this.queryChange.emit('');
  }
}
