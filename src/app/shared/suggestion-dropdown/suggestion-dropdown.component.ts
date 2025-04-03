import { Component, EventEmitter, Input, Output } from '@angular/core';
import { debounceTime, map, Observable } from 'rxjs';
import {
  NgbTypeaheadModule,
  NgbTypeaheadSelectItemEvent,
} from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-suggestion-dropdown',
  standalone: true,
  imports: [NgbTypeaheadModule, ReactiveFormsModule, NgClass],
  templateUrl: './suggestion-dropdown.component.html',
  styleUrl: './suggestion-dropdown.component.scss',
})
export class SuggestionDropdownComponent {
  public formGroup!: FormGroup;
  @Input() suggestions: { value: string; label: string }[] = [];

  @Input() placeholderText: string = 'Search by...';
  @Output() queryChange = new EventEmitter<string>();

  @Input() set resetSearchQuery(value: number | null) {
    if (this.formGroup && value) {
      this.formGroup.get('searchQuery')?.setValue('');
      this.queryChange.emit('');
    }
  }
  @Input() formControlValue: string | null = '';

  //styles
  @Input() showBorder: boolean = true;
  @Input() showInvalidBorder: boolean = false;
  //

  public constructor(private fb: FormBuilder) {}

  public ngOnInit() {
    this.formGroup = this.fb.group({
      searchQuery: [this.formControlValue || '', Validators.required],
    });

    this.setInitialQuery();
  }

  private setInitialQuery() {
    if (this.formControlValue) {
      const selectedSuggestion = this.suggestions.find(
        (s) => s.value === this.formControlValue
      );

      this.formGroup?.patchValue({ searchQuery: selectedSuggestion });
    }
  }
  public formatter = (item: { value: string; label: string }) => item.label;

  public search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      map((term) =>
        this.suggestions
          .filter((s) => s.label.toLowerCase().includes(term.toLowerCase()))
          .slice(0, 6)
      )
    );

  public onSearch(event: NgbTypeaheadSelectItemEvent<any>) {
    this.formGroup.get('searchQuery')?.setValue(event.item.label);
    this.queryChange.emit(event.item.value);
  }

  public clearSearch() {
    this.formGroup.get('searchQuery')?.setValue('');
    this.queryChange.emit('');
  }
}
