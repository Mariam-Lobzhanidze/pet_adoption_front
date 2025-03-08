import { Component, EventEmitter, Output } from '@angular/core';
import { DividerComponent } from '../../shared/divider/divider.component';

@Component({
  selector: 'app-auth-buttons',
  standalone: true,
  imports: [DividerComponent],
  templateUrl: './auth-buttons.component.html',
  styleUrl: './auth-buttons.component.scss',
})
export class AuthButtonsComponent {
  @Output() loadAuth = new EventEmitter<'login' | 'register'>();

  public onEmitAuthType(type: 'login' | 'register') {
    this.loadAuth.emit(type);
  }
}
