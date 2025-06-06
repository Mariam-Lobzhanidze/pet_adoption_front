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
  NgbDropdownModule,
  NgbTypeaheadModule,
  NgbTypeaheadSelectItemEvent,
} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-dropdown',
  standalone: true,
  imports: [NgbTypeaheadModule, NgbDropdownModule, ReactiveFormsModule],
  templateUrl: './select-dropdown.component.html',
  styleUrl: './select-dropdown.component.scss',
})
export class SelectDropdownComponent implements OnInit, OnChanges {
  public selectedOption: string | undefined | null = 'Any';
  public dropdownOpen: boolean = false;

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

  public constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes['formControlValue']);

    if (changes['formControlValue'] && this.formGroup) {
      const newValue = changes['formControlValue'].currentValue;

      this.formGroup
        .get('searchQuery')
        ?.setValue(newValue, { emitEvent: false });
      this.setSelectedOption();
    }
  }

  public ngOnInit() {
    this.formGroup = this.fb.group({
      searchQuery: [this.formControlValue || ''],
    });
    this.setSelectedOption();
  }

  private setSelectedOption() {
    const match = this.suggestions.find(
      (s) => s.value === this.formControlValue
    );
    // console.log(match);

    this.selectedOption = match?.label || 'Any';
  }

  public formatter = (item: { value: string; label: string } | string) => {
    if (typeof item === 'string') {
      const match = this.suggestions?.find((s) => s.value === item);
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
    this.selectedOption = event.item.label;
  }

  public clearSearch() {
    this.formGroup.get('searchQuery')?.setValue('');
    this.queryChange.emit('');
    this.selectedOption = 'Any';
  }

  public onSelectOption(option: { value: string; label: string } | null) {
    this.selectedOption = option?.label;
    this.queryChange.emit(option?.value || '');
  }
}
