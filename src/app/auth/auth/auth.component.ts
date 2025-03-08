import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { AuthButtonsComponent } from '../auth-buttons/auth-buttons.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    SidebarComponent,
    AuthButtonsComponent,
    LoginComponent,
    RegisterComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  public authView: 'default' | 'login' | 'register' = 'default';
  public constructor(private router: Router, private route: ActivatedRoute) {}

  public ngOnInit(): void {
    // console.log(this.route);
  }

  handleAuthChange(view: 'login' | 'register') {
    this.authView = view;
  }
}
