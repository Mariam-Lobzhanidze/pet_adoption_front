import { Component, Input, OnInit } from '@angular/core';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-dotted-list',
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: './dotted-list.component.html',
  styleUrl: './dotted-list.component.scss',
})
export class DottedListComponent implements OnInit {
  @Input() listItems: string[] = [];
  public chunkedList: string[][] = [];

  public ngOnInit(): void {
    this.chunkedList = this.chunk(this.listItems, 2);
  }

  private chunk<T>(arr: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  }
}
