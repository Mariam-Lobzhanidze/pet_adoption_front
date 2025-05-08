import { Component, Input } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss',
})
export class UserAvatarComponent {
  public currentUser!: Partial<User> | null;
  constructor(private authService: AuthService) {
    this.currentUser = this.authService.user();
  }
}
