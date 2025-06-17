import { Component, Input } from '@angular/core';
import { Shelter } from '../../shared/models/user.model';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-shelter-card',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './shelter-card.component.html',
  styleUrl: './shelter-card.component.scss',
})
export class ShelterCardComponent {
  @Input() shelter: Shelter = {
    id: '',
    shelterName: '',
    address: '',
    phone: '',
    logo: '',
    email: '',
  };
}
