import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';

import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { ToastMessageComponent } from './shared/toast-message/toast-message.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, FooterComponent, RouterOutlet, ToastMessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public confirmDeletion() {}

  public cancelDeletion() {}
}
