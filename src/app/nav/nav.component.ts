import { Component } from '@angular/core';
import { UserAvatarComponent } from '../shared/user-avatar/user-avatar.component';
import { SecondaryNavComponent } from './secondary-nav/secondary-nav.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [UserAvatarComponent, SecondaryNavComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  public isLoggedIn: boolean = true;
  public showSecondaryNav: boolean = false;

  public toggleSecondaryNav(): void {
    this.showSecondaryNav = !this.showSecondaryNav;
  }
}
