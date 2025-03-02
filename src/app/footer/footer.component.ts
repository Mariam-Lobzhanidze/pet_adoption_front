import { Component } from '@angular/core';
import { CallToActionCard } from '../shared/call-to-action-card/call-to-action-card.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CallToActionCard],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
