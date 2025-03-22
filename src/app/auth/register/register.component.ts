import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DividerComponent } from '../../shared/divider/divider.component';
import {
  addValidators,
  clearValidators,
  resetFormValues,
} from '../../validators/dynamic-validation';
import { NgClass } from '@angular/common';
import { passwordMatchValidator } from '../../validators/validators';
import { ErrorComponent } from '../../shared/error/error.component';
import { ONLY_NUMBERS_AND_PLUS_SIGN } from '../../validators/patterns';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DividerComponent,
    NgClass,
    ErrorComponent,
    SpinnerComponent,
  ],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;

  public isSubmitting = false;

  public constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  public ngOnInit(): void {
    this.initRegisterForm();
    this.handleFormTypeChange();
  }

  private initRegisterForm(): void {
    this.registerForm = this.fb.group(
      {
        isShelter: [false],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        terms: [false, Validators.requiredTrue],
        username: ['', Validators.required],
        shelterName: [''],
        address: [''],
        phone: [''],
        logo: [null],
      },
      {
        validators: passwordMatchValidator('password', 'confirmPassword'),
      }
    );
  }

  private handleFormTypeChange(): void {
    this.registerForm.get('isShelter')?.valueChanges.subscribe((isShelter) => {
      this.toggleFormType(isShelter);
    });
  }

  private toggleFormType(isShelter: boolean): void {
    this.resetRegisterForm();
    isShelter ? this.applyShelterValidators() : this.applyUserValidators();
  }

  private applyShelterValidators(): void {
    addValidators(
      [
        this.registerForm.get('shelterName')!,
        this.registerForm.get('address')!,
      ],
      [Validators.required]
    );

    addValidators(
      [this.registerForm.get('phone')!],
      [Validators.required, Validators.pattern(ONLY_NUMBERS_AND_PLUS_SIGN)]
    );
    clearValidators([this.registerForm.get('username')!]);
  }

  private applyUserValidators(): void {
    addValidators([this.registerForm.get('username')!], [Validators.required]);
    clearValidators([
      this.registerForm.get('shelterName')!,
      this.registerForm.get('address')!,
      this.registerForm.get('phone')!,
    ]);
  }

  private resetRegisterForm() {
    resetFormValues(this.registerForm, {
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
      shelterName: '',
      address: '',
      phone: '',
      logo: null,
      username: '',
    });
  }

  public get passwordMismatchError() {
    return (
      this.registerForm.hasError('passwordMismatch') &&
      this.registerForm.get('confirmPassword')?.touched
    );
  }

  public isShelter(): boolean {
    return this.registerForm.get('isShelter')?.value;
  }

  public isUser(): boolean {
    return !this.isShelter();
  }

  private handleError(error: HttpErrorResponse): void {
    if (error?.error?.message?.includes('Email is already registered.')) {
      this.registerForm
        .get('email')
        ?.setErrors({ emailAlreadyRegistered: true });
    } else {
      this.toastService.showToast(
        'Something went wrong. Please try again later',
        'error'
      );
      this.resetRegisterForm();
    }
    this.isSubmitting = false;
  }

  private getPayload(formData: User): Partial<User> {
    if (this.isShelter()) {
      const { username, confirmPassword, ...shelterData } = formData;
      return shelterData;
    } else {
      const {
        shelterName,
        address,
        phone,
        logo,
        confirmPassword,
        ...userData
      } = formData;
      return userData;
    }
  }

  public onSubmit(): void {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      this.isSubmitting = true;

      const payload = this.getPayload(this.registerForm.value);

      this.authService.registerUser(payload).subscribe({
        next: (response) => {
          // this.toastService.showToast(
          //   'Registration successful! ' + response.message,
          //   'success'
          // );

          this.toastService.showToast(
            'Thanks for signing up! You should receive a confirmation email shortly.'
          );
        },
        error: (error) => {
          console.log(error);
          this.handleError(error);
        },
        complete: () => {
          this.isSubmitting = false;
          this.resetRegisterForm();
        },
      });
    }
  }
}
