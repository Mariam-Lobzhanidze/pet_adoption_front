import { Component, Input } from '@angular/core';
import { Shelter } from '../../shared/models/petModal';

@Component({
  selector: 'app-shelter-card',
  standalone: true,
  imports: [],
  templateUrl: './shelter-card.component.html',
  styleUrl: './shelter-card.component.scss',
})
export class ShelterCardComponent {
  @Input() shelter: Shelter = { title: '', address: '', phone: '', logo: '' };
}
