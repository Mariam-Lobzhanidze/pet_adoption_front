import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmailVerificationComponent } from './auth/email-verification.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'verify-email', component: EmailVerificationComponent },
];
