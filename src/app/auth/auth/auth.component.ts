import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { AuthButtonsComponent } from '../auth-buttons/auth-buttons.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ActivatedRoute, Router } from '@angular/router';

type AuthType = 'default' | 'login' | 'register';
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
  public authView: AuthType = 'default';
  private isAuthRoute = false;

  @ViewChild(SidebarComponent) authSidebar!: SidebarComponent;

  public constructor(private route: ActivatedRoute, private router: Router) {}

  public ngOnInit(): void {
    this.checkIfAuthRoute();
    this.defineAuthView();
  }

  public checkIfAuthRoute(): void {
    this.route.url.subscribe((segments) => {
      this.isAuthRoute = segments.some((segment) => segment.path === 'auth');
    });
  }

  private defineAuthView(): void {
    this.route.queryParams.subscribe((params) => {
      if (!params['authView']) {
        this.handleAuthViewChange('default');
      } else {
        this.authView = params['authView'] as AuthType;
      }
    });
  }

  public ngAfterViewInit(): void {
    if (this.isAuthRoute) {
      this.authSidebar?.open();
    }
  }

  public handleAuthViewChange(view: AuthType = 'default') {
    this.authView = view;
    this.router.navigate([], {
      queryParams: { authView: view },
    });
  }
}
