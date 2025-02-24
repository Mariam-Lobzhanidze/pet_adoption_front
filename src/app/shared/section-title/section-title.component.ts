import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './section-title.component.html',
  styleUrl: './section-title.component.scss',
})
export class SectionTitleComponent {
  @Input() title: string = '';
  @Input() routerLink: string = '';
  @Input() icon: string = '';
}
