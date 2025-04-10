import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(
  passwordKey: string,
  confirmPasswordKey: string
): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const password = form.get(passwordKey)?.value;
    const confirmPassword = form.get(confirmPasswordKey)?.value;

    if (confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  };
}

export function emptyArrayValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as any[];
    if (!Array.isArray(value) || value.length === 0) {
      return { emptyArray: true };
    }
    return null;
  };
}
