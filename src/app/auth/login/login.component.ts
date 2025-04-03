import { Component, OnInit } from '@angular/core';
import { ErrorComponent } from '../../shared/error/error.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ErrorComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public isSubmitted = false;
  public loginForm!: FormGroup;

  public constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  private resetForm(): void {
    this.isSubmitted = false;
    this.loginForm.reset();
  }

  public onSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.isSubmitted = true;

      this.authService.loginUser(this.loginForm.value).subscribe({
        next: () => {
          this.resetForm();

          this.toastService.showToast(
            'Welcome back! Your furry friends are waiting for you. 🐶🐱',
            'success'
          );
        },
        error: (err) => {
          this.toastService.showToast(err.error.message, 'error');
          this.resetForm();
        },
      });
    }
  }
}
