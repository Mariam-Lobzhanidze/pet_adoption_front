import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  @Input({ required: true }) control!: AbstractControl | null;
  @Input() form!: AbstractControl | null;

  @Input({ required: true }) backgroundColor: string = 'var(--bs-pageBody)';
  @Input() textColor: string = 'var(--bs-danger)';

  public get errorMessage(): string | null {
    if (this.control?.touched && this.control?.invalid) {
      if (this.form?.hasError('passwordMismatch')) {
        return 'Passwords do not match';
      }

      if (this.control?.hasError('pattern')) {
        return 'Please enter a valid phone number';
      }

      if (this.control?.errors?.['minlength']) {
        return 'Please type at least 6 characters';
      }

      if (this.control?.hasError('required')) {
        return 'Please fill out this field';
      }

      if (this.control?.hasError('email')) {
        return 'Invalid email address';
      }

      if (this.control?.hasError('emailAlreadyRegistered')) {
        return 'Email already registered';
      }

      if (this.control?.errors?.['emptyArray']) {
        return 'Please upload at least one pet image';
      }
    }

    return null;
  }
}
