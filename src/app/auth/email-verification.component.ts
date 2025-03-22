import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  template: `
    <div class="container d-flex justify-content-center mt-3">
      <div
        class="card shadow p-4 text-center d-flex gap-3 flex-column bg-primary "
        style="width: 400px; min-height:160px"
      >
        <header class="d-flex justify-content-center">
          <h4 class="text-uppercase fw-bold text-tertiary">
            Email verification
          </h4>
        </header>

        <p
          class="d-flex flex-column align-items-center gap-3"
          [class.text-light]="isVerified"
          [class.text-danger]="!isVerified"
        >
          {{
            isVerified
              ? 'You will be redirected to login in a few seconds...'
              : message
          }}
        </p>

        @if (isVerified) {
        <app-spinner color="secondary"></app-spinner>
        }
      </div>
    </div>
  `,
})
export class EmailVerificationComponent implements OnInit {
  private readonly REDIRECT_DELAY = 5000;

  public message = 'wait until verified';
  public isVerified = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      if (token) {
        this.verifyEmail(token);
      }
    });
  }

  private verifyEmail(token: string): void {
    this.authService.verifyEmail(token).subscribe({
      next: () => {
        this.isVerified = true;
        setTimeout(() => this.navigateToAuth(), this.REDIRECT_DELAY);
      },
      error: () => {
        this.isVerified = false;
        this.message =
          'Email verification failed. Something went wrong. Please check your email or try again later.';
        this.handleVerificationError('/home', this.REDIRECT_DELAY);
      },
    });
  }

  private handleVerificationError(route: string, duration: number): void {
    setTimeout(() => {
      this.router.navigate([route]);
    }, duration);
  }

  private navigateToAuth(): void {
    this.router.navigate(['/auth'], {
      queryParams: { token: null, authView: 'login' },

      replaceUrl: true,
    });
  }
}
