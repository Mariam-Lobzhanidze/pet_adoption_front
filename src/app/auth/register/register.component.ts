import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DividerComponent } from '../../shared/divider/divider.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, DividerComponent, NgClass],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;

  public constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phone: [''],
      terms: [false, Validators.required],
      username: ['', Validators.minLength(6)],
      shelterName: [''],
      address: [''],
      logo: [null],
      isShelter: [false],
    });
  }

  public isShelter(): boolean {
    return this.registerForm.get('isShelter')?.value;
  }

  public isUser(): boolean {
    return !this.isShelter();
  }

  public onFileChange(event: Event, fieldName: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.registerForm.patchValue({ [fieldName]: input.files[0] });
    }
  }

  public onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.registerForm.reset();
    } else {
      console.log('Form is invalid', this.registerForm.errors);
    }
  }
}
