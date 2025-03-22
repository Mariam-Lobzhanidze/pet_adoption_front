import { Component, OnInit } from '@angular/core';
import { ErrorComponent } from '../../shared/error/error.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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

  public constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public ngOnInit(): void {}

  public onSubmit(): void {
    if (this.loginForm.valid) {
      this.isSubmitted = true;
      setTimeout(() => {
        console.log(this.loginForm.value);
        this.isSubmitted = false;
      }, 2000);
    }
  }
}
