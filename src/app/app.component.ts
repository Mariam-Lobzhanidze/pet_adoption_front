import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';

import { FooterComponent } from './footer/footer.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ToastMessageComponent } from './shared/toast-message/toast-message.component';
import { filter } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavComponent,
    FooterComponent,
    RouterOutlet,
    ToastMessageComponent,
    NgClass,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isPetDetails = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.isPetDetails = e.urlAfterRedirects.startsWith('/pet/');
      });
  }
}
