import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shelter',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './shelter.component.html',
  styleUrl: './shelter.component.scss',
})
export class ShelterComponent {}
