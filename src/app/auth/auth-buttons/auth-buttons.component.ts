import { Component, EventEmitter, Output } from '@angular/core';
import { DividerComponent } from '../../shared/divider/divider.component';

type AuthType = 'login' | 'register';
@Component({
  selector: 'app-auth-buttons',
  standalone: true,
  imports: [DividerComponent],
  templateUrl: './auth-buttons.component.html',
  styleUrl: './auth-buttons.component.scss',
})
export class AuthButtonsComponent {
  @Output() loadAuth = new EventEmitter<AuthType>();

  public onEmitAuthType(type: AuthType): void {
    this.loadAuth.emit(type);
  }
}
