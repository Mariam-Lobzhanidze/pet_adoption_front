import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth/auth.component').then((m) => m.AuthComponent),
  },

  {
    path: 'verify-email',
    loadComponent: () =>
      import('./auth/email-verification.component').then(
        (m) => m.EmailVerificationComponent
      ),
  },
  {
    path: 'pets/create',
    loadComponent: () =>
      import('./new-pet/new-pet.component').then((m) => m.NewPetComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'pets/edit/:id',
    loadComponent: () =>
      import('./new-pet/new-pet.component').then((m) => m.NewPetComponent),
    canActivate: [AuthGuard],
  },
];
