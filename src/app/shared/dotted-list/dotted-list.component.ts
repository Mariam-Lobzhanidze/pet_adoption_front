import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dotted-list',
  standalone: true,
  imports: [],
  templateUrl: './dotted-list.component.html',
  styleUrl: './dotted-list.component.scss',
})
export class DottedListComponent {
  @Input()
  listItems: string[] = [];
}
