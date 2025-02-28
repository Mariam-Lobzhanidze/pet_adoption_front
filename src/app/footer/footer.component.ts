import { Component } from '@angular/core';
import { JoinUsCardComponent } from '../shared/join-us-card/join-us-card.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [JoinUsCardComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
