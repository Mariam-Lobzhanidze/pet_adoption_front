import { Component } from '@angular/core';
import { CallToActionCard } from '../shared/call-to-action-card/call-to-action-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CallToActionCard, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
