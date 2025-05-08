import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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
export class SuggestionDropdownComponent implements OnInit, OnChanges {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formControlValue'] && this.formGroup) {
      const newValue = changes['formControlValue'].currentValue;

      this.formGroup
        .get('searchQuery')
        ?.setValue(newValue, { emitEvent: false });
    }
  }

  public ngOnInit() {
    this.formGroup = this.fb.group({
      searchQuery: [this.formControlValue || '', Validators.required],
    });
  }

  public formatter = (item: { value: string; label: string } | string) => {
    if (typeof item === 'string') {
      const match = this.suggestions.find((s) => s.value === item);
      return match?.label || item;
    }
    return item.label;
  };

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
    this.formGroup.get('searchQuery')?.setValue(event.item.value);
    this.queryChange.emit(event.item.value);
  }

  public clearSearch() {
    this.formGroup.get('searchQuery')?.setValue('');
    this.queryChange.emit('');
  }
}
