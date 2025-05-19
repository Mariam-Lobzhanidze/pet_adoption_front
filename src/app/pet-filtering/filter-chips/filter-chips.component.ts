import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-chips',
  standalone: true,
  imports: [],
  templateUrl: './filter-chips.component.html',
  styleUrl: './filter-chips.component.scss',
})
export class FilterChipsComponent {
  @Input() filters: { [key: string]: string } = {};
  @Output() remove = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  public filterKeys(): string[] {
    return Object.keys(this.filters);
  }

  public removeFilter(key: string): void {
    this.remove.emit(key);
  }

  public clearAll(): void {
    this.clear.emit();
  }
}
