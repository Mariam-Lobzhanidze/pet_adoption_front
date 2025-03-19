import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export const addValidators = (
  controls: AbstractControl[],
  validators: ValidatorFn[]
): void => {
  controls.forEach((control) => {
    control.setValidators(validators);
    control.updateValueAndValidity();
  });
};

export const clearValidators = (controls: AbstractControl[]): void => {
  controls.forEach((control) => {
    control.clearValidators();
    control.updateValueAndValidity();
  });
};

export const resetFormValues = (
  formGroup: FormGroup,
  values: { [key: string]: any }
): void => {
  formGroup.patchValue(values);
  formGroup.markAsPristine();
  formGroup.markAsUntouched();
};
