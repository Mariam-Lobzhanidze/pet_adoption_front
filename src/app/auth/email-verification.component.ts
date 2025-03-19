import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  template: `<p>{{ message }}</p>`,
})
export class EmailVerificationComponent implements OnInit {
  public message = 'Verifying email...';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      if (token) {
        this.authService.verifyEmail(token).subscribe({
          next: (response) => {
            this.message = response.message;
            // this.router.navigate(['/home']);
          },
          error: () => {
            this.message = 'Email verification failed.';
          },
        });
      } else {
        this.message = 'Invalid verification link.';
      }
    });
  }
}
