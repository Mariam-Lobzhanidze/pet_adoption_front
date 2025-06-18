import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Shelter } from '../../shared/models/user.model';
import { NgIf, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-shelter-card',
  standalone: true,
  imports: [TitleCasePipe, NgIf],
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
  @Input() loading = false;

  @Output() viewPets = new EventEmitter<string>();
}
